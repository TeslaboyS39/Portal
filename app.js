const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const nodemailer = require('nodemailer');
const Controller = require('../controllers');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
