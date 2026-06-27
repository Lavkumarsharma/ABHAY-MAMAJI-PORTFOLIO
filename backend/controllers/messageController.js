import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';

// @desc    Submit contact form message
// @route   POST /api/messages
// @access  Public
export const submitMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please include all fields: name, email, subject, message');
  }

  // Save to DB
  const newMessage = await Message.create({
    name,
    email,
    subject,
    message,
    isRead: false
  });

  // Attempt to send email via Nodemailer
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_PORT) || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: user, // Notify portfolio owner
        subject: `New Portfolio Message: ${subject}`,
        text: `You have received a new contact message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `<p>You have received a new contact message from your portfolio website.</p>
               <h3>Contact Details:</h3>
               <ul>
                 <li><strong>Name:</strong> ${name}</li>
                 <li><strong>Email:</strong> ${email}</li>
                 <li><strong>Subject:</strong> ${subject}</li>
               </ul>
               <h3>Message:</h3>
               <p>${message.replace(/\n/g, '<br>')}</p>`
      };

      await transporter.sendMail(mailOptions);
      console.log('Nodemailer email sent successfully');
    } catch (err) {
      console.error('Nodemailer failed to send email:', err.message);
    }
  } else {
    console.log(`Nodemailer not configured. Saved message to DB. Content:`, { name, email, subject, message });
  }

  res.status(201).json(newMessage);
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
export const markMessageAsRead = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (message) {
    message.isRead = true;
    message.repliedAt = new Date();
    await message.save();
    res.json(message);
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (message) {
    res.json({ message: 'Message removed' });
  } else {
    res.status(404);
    throw new Error('Message not found');
  }
});
