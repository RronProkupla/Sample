const db = require('../config/db')

const getBook = async (bookId) => {
  const sql = `SELECT * FROM BOOKS WHERE BOOKID=:bookId`
  const conn = await db.getConnect()
  const book = await db.executeAsync(sql, [bookId], conn)
  const sql2 = `WITH t1(id, reqId) AS (
    SELECT id, reqId
    FROM PREREQUISITES
    WHERE id = :bookId
    UNION ALL
    SELECT t2.id, t2.reqId
    FROM PREREQUISITES t2, t1
    WHERE t2.id = t1.reqId
    )
    SELECT BOOKS.title, BOOKS.bookId
    FROM BOOKS, t1
    WHERE t1.reqId = BOOKS.bookId`
  book[0].PREQUELS = await db.executeAsync(sql2, [bookId], conn)
  const sql3 = `SELECT U.USERNAME, R.CONTENT, R.REVIEWTIME, R.STARS
  FROM USERS U, REVIEW R
  WHERE R.BOOKID=:bookId AND U.USERID=R.USERID`
  book[0].COMMENTS = await db.executeAsync(sql3, [bookId], conn)
  console.log(book)
  return book
}

const getBooks = async (title) => {
  const lowerTitle = `%${title.toLowerCase()}%`
  const sql = `SELECT * FROM BOOKS WHERE LOWER(TITLE) LIKE :lowerTitle`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [lowerTitle], conn)
}

const insertBook = async (title, summary, isbn, authorName, authorSurname) => {
  const sql = `INSERT INTO BOOKS(TITLE, SUMMARY, ISBN, AUTHOR) VALUES(
    :title, :summary, ISBN(:isbn), AUTHOR(:authorName, :authorSurname)
  )`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [title, summary, isbn, authorName, authorSurname], conn)
}

const updateBook = async (bookId, title, summary, isbn, authorName, authorSurname) => {
  const sql = `UPDATE BOOKS SET
  TITLE=:title,
  SUMMARY=:summary,
  ISBN=ISBN(:isbn),
  AUTHOR=AUTHOR(:authorName, :authorSurname)
  WHERE BOOKID=:bookId`
  const sql2 = `SELECT * FROM BOOKS WHERE BOOKID=:bookId`
  const conn = await db.getConnect()
  await db.executeAsync(sql, [title, summary, isbn, authorName, authorSurname, bookId], conn)
  return db.executeAsync(sql2, [bookId], conn)
}

const deleteBook = async (bookId) => {
  const sql = `DELETE FROM BOOKS WHERE BOOKID=:bookId`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [bookId], conn)
}

module.exports = {
  getBook,
  getBooks,
  insertBook,
  updateBook,
  deleteBook
}
