const express = require('express')
const router = express.Router()
const { registerGet, registerPost, loginGet, loginPost, logoutGet } = require('../controllers/userController')
const { loadUser } = require('../middlewares/loadUser')

router.get('/register', loadUser, registerGet)

router.post('/register', loadUser, registerPost)

router.get('/login', loadUser, loginGet)

router.post('/login', loadUser, loginPost)

router.get('/logout', logoutGet)

module.exports = router
