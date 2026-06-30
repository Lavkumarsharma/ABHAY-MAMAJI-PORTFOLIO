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
    host: 'smtp.gmail.com', // Forced host to prevent user typos
    port: 465,              // Forced port 465 for SSL
    secure: true,           // true for 465
    auth: {
      user: process.env.EMAIL_USER?.trim(),
      pass: process.env.EMAIL_PASS?.trim(),
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
  });

  await transporter.sendMail({
    from: `"Abhay Portfolio Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
