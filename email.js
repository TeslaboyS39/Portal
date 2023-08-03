const nodemailer = require('nodemailer')
const env = require('dotenv')

env.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  }
})

const sendEmail = (email) => {
  const option = {
    from: "'usersatu'",
    to: email,
    subject: 'testing',
    text: 'hello',
  }

  transporter.sendMail(option, (err, info) => {
    if (err) console.error(err);
    console.log(`email sent to : ${email}`);
  })
}

sendEmail('admin2@gmail.com')