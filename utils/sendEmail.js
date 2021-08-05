const nodemailer = require('nodemailer');



const emailSender = async options => {
  // Transporter.
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Options.
  const mailingOptions = {
    from: 'Calculatr Autoresponder <donotreply@mern-calculatr.herokuapp.com>',
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