const authorise = (req, res) => {
  if(!req.session.userId) {
    return res.redirect('/login')
  }

  next()
}

module.exports = authorise