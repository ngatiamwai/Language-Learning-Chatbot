const mssql = require('mssql')
const dotenv = require('dotenv')

dotenv.config()

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server:'127.0.0.1' , // or ' localhost'
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false,
    }
}

// mssql.connect(sqlConfig)
//   .then(pool => {
//     if (pool.connected) {
//       console.log('connected to db successfully :)');
//     }
//   })
//   .catch(err => {
//     console.error('Error connecting to the database :(   :', err);
//   });


  module.exports = {
    sqlConfig
  }