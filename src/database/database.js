/*const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

function createConnection() {
  return mysql.createConnection({

    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
}
###
module.exports = {
  createConnection
};
*/
const mysql = require('mysql2');

function createConnection() {
  return mysql.createConnection({
    host: 'localhost',
    database: 'bd_veterinaria',
    user: 'root',
    password: ''
  });
}

module.exports = {
  createConnection
};
