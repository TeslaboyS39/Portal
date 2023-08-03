const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const path = require('path')
app.use(session({
  secret: 'secure',
  resave: false,
  saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(require('./routes'))
app.use(express.static(path.join(__dirname, 'views')))


app.listen(port, () => {
  console.log(`I love you ${port}`)
})