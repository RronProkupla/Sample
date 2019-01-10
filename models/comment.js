const db = require('../config/db')

const makeComment = async (userId, bookId, content, stars) => {
  const sql = `INSERT INTO REVIEW(USERID, BOOKID, CONTENT, REVIEWTIME, STARS)
               VALUES(:userId, :bookId, :content, ${new Date()}, :stars)`
  const conn = db.getConnect()
  console.log('got here')
  await db.executeAsync(sql, [userId, bookId, content, stars], conn)
  return db.doRelease()
}

module.exports = {
  makeComment
}
