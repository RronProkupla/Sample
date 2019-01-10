const express = require('express')
const router = express.Router()
const { loadUser } = require('../middlewares/loadUser')

module.exports = router

router.get('/', loadUser, (req, res) => (
  res.render('home', {user: req.session.user})
  ))
