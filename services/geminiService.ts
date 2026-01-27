
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
      model: 'gemini-3-flash-preview',
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
  const prompt = `
    CLIENT DIAGNOSTIC RESULTS:
    - Path Taken: ${path === 'A' ? 'Explore the Potential (I want to find out what AI can do)' : 'Audit & Implement (I have a specific task or problem)'}
    - Step 2 Answer: ${answers.q1}
    - Step 3 Answer: ${answers.q2}
    - Step 4 Answer: ${answers.q3}
    
    Synthesize these answers into a formal request for advisory support. 
    Start with: "Based on our internal review, we are currently..." 
    Include a clear recommendation for which Trusted AI service (Workflow Discovery, Effort Audit, Prototype Design, or Literacy Calibration) is the best next step.
    Ensure the response is a single, complete narrative. Do not use bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an intake specialist at Trusted AI Advisory. Synthesize client data into a plain-language executive summary. Do not use bullet points; use cohesive narrative language.\n\n" + COMPANY_CONTEXT,
        temperature: 0.4,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Inquiry Summary Error:", error);
    return `Based on our internal review, we are currently at the ${answers.q1} stage and seeking to address ${answers.q2}. We believe ${path === 'A' ? 'Workflow Discovery' : 'an Effort Audit'} is our best next step to achieve our goal of ${answers.q3}. This will allow us to move forward with security and policy alignment at the forefront of our operations.`;
  }
};
