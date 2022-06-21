const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
// Create a connection to the database
const sql = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
// open the MySQL connection
sql.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  let createBlockNumber = `CREATE TABLE IF NOT EXISTS blocknumber (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    blocknumber int(255) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;

  let createTransaction = `CREATE TABLE IF NOT EXISTS transactions (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    address varchar(255) DEFAULT NULL,
    type tinyint(1) DEFAULT NULL,
    transactionHash varchar(255) DEFAULT NULL,
    methodId varchar(255) DEFAULT NULL,
    fromAddress varchar(255) DEFAULT NULL,
    toAddress varchar(255) DEFAULT NULL,
    value int(255) DEFAULT NULL,
    userAddress varchar(255) DEFAULT NULL,
    blockTimestamp varchar(255) DEFAULT NULL,
    blockNumber varchar(255) DEFAULT NULL,
    blockHash varchar(255) DEFAULT NULL,
    network varchar(255) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;

  sql.query(createBlockNumber, function(err, results, fields) {
    if (err) {
      throw err;
    }
  })

  sql.query(createTransaction, function(err, results, fields) {
    if (err) {
      throw err;
    }
  })

});


module.exports = sql;