const nodemailer = require('nodemailer');



const emailSender = async options => {
  // Transporter.
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secureConnection: process.env.EMAIL_SECURE_CONNECTION,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      ciphers: process.env.EMAIL_CYPHERS
    }
  });

  // Options.
  const mailingOptions = {
    from: 'mern-7863141975920158@outlook.com',
    to: options.email,
    subject: options.subject,
    html: options.message
  }

  // Send.
  await transporter.sendMail(mailingOptions, function(err, info) {
    if (err) {
      console.log('📂utils/sendEmail.js📂, error:', err);
    } else {
      console.log('📁utils/sendEmail.js📁, info:', info);
    }
  });
}



module.exports = emailSender;