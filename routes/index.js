const router = require('express').Router()
const authorise = require('../middlewares/authorise')
const isAdmin = require('../middlewares/isAdmin')

const { 
  home, 
  user, 
  registerForm, 
  createUser, 
  loginForm, 
  loginHandler, 
  logout,
  admin,
  userDetail
} = require('../controllers')

router.get('/', home)


//register page
router.get('/register', registerForm)
router.post('/register', createUser)

//login page
router.get('/login', loginForm)
router.post('/login', loginHandler)
router.get('/logout', logout)

//user / admin
router.get(authorise)
router.get('/users', user)
router.get('/admin', isAdmin, admin)
router.get('/userDetails', userDetail)
router.post('/userDetails', userDetail)

module.exports = router 