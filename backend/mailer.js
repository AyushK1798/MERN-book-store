import nodemailer from 'nodemailer';

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eeviib31@rgcer.edu.in',
    pass: '9763318836'
  }
});

export default transporter;
