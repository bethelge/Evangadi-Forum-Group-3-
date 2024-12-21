const mysql2 = require("mysql2");

// const dbConnection = mysql2.createPool({
//     user:process.env.USER,
//     database:process.env.DATABASE,
//     host:"localhost",
//     password:process.env.PASSWORD,
//     connectionLimit:10
// })

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: 3306,
  connectionLimit: 10,
});

module.exports = dbConnection.promise();
