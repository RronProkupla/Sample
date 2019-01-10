const db = require('../config/db')

const getUserByEmail = async (email) => {
  const sql = `SELECT * FROM USERS WHERE USERNAME=:email`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [email], conn)
}

const getUserById = async (id) => {
  const sql = `SELECT * FROM USERS WHERE USERID=:id`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [id], conn)
}

const insertUser = async (email, password) => {
  const sql = `INSERT INTO USERS(USERNAME, PASSWORD, PRIVILEGE) VALUES (:email, :password, 'user')`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [email, password], conn)
}

module.exports = {
  getUserByEmail,
  getUserById,
  insertUser
}
