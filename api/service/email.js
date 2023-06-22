require('dotenv').config();
const nodemailer = require('nodemailer');


function sendEmail(subject, message, sender = process.env.smtp_email, recipients = process.env.smtp_email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: sender,
      pass: process.env.smtp_password
    }
  });

  const mailOptions = {
    from: sender,
    to: recipients,
    subject: subject,
    html: message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendEmail
};