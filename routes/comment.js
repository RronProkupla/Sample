const express = require('express')
const router = express.Router()
const { loadUser } = require('../middlewares/loadUser')
const { makeComment } = require('../controllers/commentController')

router.post('/', loadUser, makeComment)

module.exports = router
