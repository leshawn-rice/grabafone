const nodemailer = require('nodemailer');
const { EMAIL_ADDRESS, EMAIL_PASSWORD } = require('../config/general.config');
const { utilLogger } = require('../config/logging.config')


const email_transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
});

const send_email = (subject='', body='', recipients=[]) => {
  const mail_options = {
    from: EMAIL_ADDRESS,
    to: recipients,
    subject: subject,
    text: body
  };

  email_transporter.sendMail(mail_options, (error, info) => {
    if (error) {
      utilLogger.error({ level: 'error', message: error });
    }
    else {
      utilLogger.info({ level: 'info', message: `Email Sent: ${info.response}`});
    }
  });
}

module.exports = {send_email};