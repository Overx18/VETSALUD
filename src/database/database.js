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
