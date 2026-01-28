
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const COMPANY_CONTEXT = `
Trusted AI Advisory Inc. Service Dimensions:
1. Workflow Discovery: We bridge the gap between policy and daily operations. We observe how your team works to find where AI can actually save hours. Best for "I want to explore what's possible."
2. Effort Audit & Assessment: We provide an independent "truth" check on technical complexity. We reveal if a vendor's price matches the actual work required. Best for "I need to verify a plan or a quote."
3. Secure Prototype Design: We build real, working AI tools (MVPs) inside secure, policy-compliant environments. Best for "I need a functional prototype that follows government rules."
4. Literacy Calibration: We align your leadership and staff on what AI can and cannot do. We fix the "expectation gap." Best for "I need my team to understand and trust AI."
`;

const SYSTEM_INSTRUCTION = `
You are the "Strategic Intake Synthesizer" for Trusted AI Advisory Inc.
Your job is to take the client's self-assessment data and turn it into a professional, plain-language "Strategic Brief."

Instructions:
1. Write from the client's perspective (using "I" and "We").
2. Summarize their current situation and pain points clearly.
3. Map their specific needs to one of our four Service Dimensions (Workflow Discovery, Effort Audit, Prototype Design, or Literacy Calibration).
4. Recommend exactly one service and explain why it fits their current goal.
5. Use plain, professional English. Avoid buzzwords.
6. CRITICAL: Provide the output as a cohesive, flowing narrative (complete sentences and paragraphs). DO NOT use bullet points or lists of any kind.

The tone should be architectural, honest, and helpful.
`;

export const getAdvisoryResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\n\nCompany Context:\n" + COMPANY_CONTEXT,
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The advisory interface is currently offline. Please contact us directly.";
  }
};

export const generateInquirySummary = async (path: string, answers: any) => {
  const pathLabel = path === 'A' ? 'Exploring AI potential' : 'Audit & Implementation';

  const prompt = `
Summarize this client inquiry in 3-4 short sentences:

Intent: ${pathLabel}
Current challenge: ${answers.q1}
Main barrier: ${answers.q2}
Desired outcome: ${answers.q3}

Write a brief, professional summary from the client's perspective (use "We"). End with which service fits best: Workflow Discovery, Effort Audit, Prototype Design, or Literacy Calibration.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: "Write a concise 3-4 sentence summary. Be direct and professional. No bullet points.",
        temperature: 0.3,
        maxOutputTokens: 150,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Inquiry Summary Error:", error);
    return `We are looking to ${path === 'A' ? 'explore AI opportunities' : 'audit and implement AI solutions'}. Our main challenge is ${answers.q1}. We believe ${path === 'A' ? 'Workflow Discovery' : 'an Effort Audit'} would be the best next step.`;
  }
};
