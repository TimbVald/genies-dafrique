import { Resend } from 'resend';

// Initialize Resend client with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Get the from email address from environment
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

/**
 * Send an email using Resend
 * @param to - Recipient email address
 * @param subject - Email subject
 * @param html - HTML content of the email
 * @param replyTo - Optional reply-to address
 * @returns Promise with the result of the email send operation
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      replyTo,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Check if Resend is properly configured
 * @returns true if API key is present and valid format
 */
export function isResendConfigured(): boolean {
  const apiKey = process.env.RESEND_API_KEY;
  return !!apiKey && apiKey.startsWith('re_');
}
