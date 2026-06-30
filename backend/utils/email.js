import nodemailer from 'nodemailer';

/**
 * Send an email using Nodemailer config
 * Fallback to logging in console if EMAIL_USER/EMAIL_PASS are missing
 */
export const sendEmail = async ({ to, subject, html }) => {
  const isConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS;

  if (!isConfigured) {
    console.log('----------------------------------------');
    console.log(`[EMAIL DEV LOG] Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML: ${html}`);
    console.log('----------------------------------------');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000,
  });

  await transporter.sendMail({
    from: `"Abhay Portfolio Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
