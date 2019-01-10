const Comment = require('../models/comment')
const Joi = require('joi')

const commentSchema = Joi.object().keys({
  bookId: Joi.number().required(),
  content: Joi.string().required(),
  stars: Joi.number().min(1).max(5).required()
})

const makeComment = async (req, res) => {
  // if (!req.session.user) {
  //   return next(new Error('Unauthorized'))
  // }

  const { bookId, content, stars } = req.body

  const { error } = Joi.validate({bookId, content, stars}, commentSchema)

  if (error) {
    return res.redirect(`/book/${bookId}`)
  }

  // const userId = req.session.userId
  const userId = 23

  await Comment.makeComment(userId, bookId, content, stars)
  return res.redirect(`/book/${bookId}`)
}

module.exports = {
  makeComment
}
