const { User, UserDetail } = require('../models')
const bcrypt = require('bcryptjs');

class Controller {
  static home(req, res) {
    res.render('landing-page')
  }

  static user(req, res) {
    User.findAll({
      include: UserDetail
    })
      .then((users) => {
        res.render('user', { users })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static userDetail(req, res) {
    UserDetail.findOne({
      where: {
        userId: UserDetail.id
      }
    })
      .then((detail) => {
        res.render('user-detail', { detail })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static admin(req, res) {
    res.send('admin')
  }

  static registerForm(req, res) {
    res.render('register')
  }

  static createUser(req, res) {
    const { email, password } = req.body
    User.create({ email, password })
      .then((user) => {
        req.session.userId = user.id
        req.session.role = user.role
        res.redirect('/users')
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static loginForm(req, res) {
    res.render('login')
  }

  static loginHandler(req, res) {
    const { email, password } = req.body
    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) throw 'Unregistered email'
        const validUser = bcrypt.compareSync(password, user.password);
        if (!validUser) throw 'Incorrect password!'
        // after register, redirect to user page
        req.session.userId = user.id
        req.session.role = user.role
        res.redirect('/users')
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })

  }

  static logout(req, res) {

  }

}

module.exports = Controller 