const isAdmin = (req, res, next) => {
  if(req.session.role !== 'admin') {
    return res.send("You're not Admin")
  }

  next()
}

module.exports = isAdmin