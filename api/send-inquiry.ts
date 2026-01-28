import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message, path } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Trusted AI Advisory <onboarding@resend.dev>',
      to: ['info@trustedaiadvisory.ca'],
      replyTo: email,
      subject: `New Inquiry: ${path === 'A' ? 'Explore AI Potential' : 'Audit & Implementation'}`,
      html: `
        <h2>New Client Inquiry</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Path:</strong> ${path === 'A' ? 'Explore the Potential' : 'Audit & Implement'}</p>
        <hr />
        <h3>Client Summary:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
