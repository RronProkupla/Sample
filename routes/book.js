const express = require('express')
const router = express.Router()
const { loadUser } = require('../middlewares/loadUser')
const { bookGet, booksGet, newBookGet, newBookPost, editBookGet, editBookPost, bookDelete } = require('../controllers/bookController')

router.get('/new', loadUser, newBookGet)

router.post('/new', loadUser, newBookPost)

router.get('/search', loadUser, booksGet)

router.get('/:bookId', loadUser, bookGet)

router.get('/edit/:bookId', loadUser, editBookGet)

router.post('/edit/:bookId', loadUser, editBookPost)

router.get('/delete/:bookId', loadUser, bookDelete)

module.exports = router
