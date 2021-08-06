const nodemailer = require('nodemailer');



const emailSender = async options => {
  // Transporter.
  let transporter = nodemailer.createTransport({
    host: 'hotmail',
    port: 2525,
    auth: {
      user: 'mern-7863141975920158@outlook.com',
      pass: 'node47918151417106447'
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