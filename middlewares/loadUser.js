const { getUserById } = require('../models/user')

const loadUser = async (req, res, next) => {
  const id = req.session.userId

  if (!id) {
    return next()
  }

  const user = await getUserById(id)
  req.session.user = user[0]
  req.session.user.isAdmin = user[0].PRIVILEGE === 'admin'
  next()
}

module.exports = {
  loadUser
}
