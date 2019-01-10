const oracledb = require('oracledb')

oracledb.autoCommit = true
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
let db = {}

const connectionProperties = {
  user: process.env.ORACLE_USERNAME,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_URI
}

db.getConnect = () => new Promise((resolve, reject) => {
  oracledb.getConnection(connectionProperties, (err, connection) => {
    if (connection) {
      resolve(connection)
    } else {
      reject(err)
    }
  })
})

db.doRelease = (connection) => {
  return connection.close((err) => {
      if (err) {
        console.error(err.message);
      }
    })
}

db.executeAsync = (sql, bindParams, connection) => {
  return new Promise((resolve, reject) => {
      connection.execute(sql, bindParams, (err, result) => {
          if (err) {
              console.error(err.message)
              reject(err)
          }
          resolve(result.rows)
      })
  })
}

module.exports = db
