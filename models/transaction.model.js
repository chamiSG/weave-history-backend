const { off } = require("./db.js");
const sql = require("./db.js");
// constructor
const Transaction = function(transaction) {
  this.address = transaction.address;
  this.type = transaction.type;
  this.transactionHash = transaction.transactionHash;
  this.methodId = transaction.methodId;
  this.fromAddress = transaction.fromAddress;
  this.toAddress = transaction.toAddress;
  this.value = transaction.value;
  this.userAddress = transaction.userAddress;
  this.blockTimestamp = transaction.blockTimestamp;
  this.blockNumber = transaction.blockNumber;
  this.blockHash = transaction.blockHash;
  this.network = transaction.network;
};

Transaction.create = (newTransaction, result) => {
  sql.query("INSERT INTO transactions SET ?", newTransaction, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log("created transaction: ", { id: res.insertId, ...newTransaction });
    result(null, { id: res.insertId, ...newTransaction });
  });
};
Transaction.findById = (id, result) => {
  sql.query(`SELECT * FROM transactions WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found transaction: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Transaction with the id
    result({ kind: "not_found" }, null);
  });
};
Transaction.getAllByTransactionHash = (transactionHash, limit, offset, result) => {
  let query = "SELECT * FROM transactions";
  if (transactionHash) {
    query += ` WHERE transactionHash LIKE '%${transactionHash}%'`;
  }
  if (limit && offset) {
    query += ` LIMIT ${limit} OFFSET ${offset}`
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("transactions: ", res);
    result(null, res);
  });
};
Transaction.getAllByFromAddress = (fromAddress, limit, offset, result) => {
  let query = "SELECT * FROM transactions";
  if (fromAddress) {
    query += ` WHERE fromAddress LIKE '%${fromAddress}%'`;
  }
  if (limit && offset) {
    query += ` LIMIT ${limit} OFFSET ${offset}`
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("transactions: ", res);
    result(null, res);
  });
};
Transaction.getAllByToAddress = (toAddress, limit, offset, result) => {
  let query = "SELECT * FROM transactions";
  if (toAddress) {
    query += ` WHERE toAddress LIKE '%${toAddress}%'`;
  }
  if (limit && offset) {
    query += ` LIMIT ${limit} OFFSET ${offset}`
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("transactions: ", res);
    result(null, res);
  });
};
Transaction.getAllByAddress = (address, limit, offset, result) => {
  let query = "SELECT * FROM transactions";
  if (address) {
    query += ` WHERE address LIKE '%${address}%'`;
  }
  if (limit && offset) {
    query += ` LIMIT ${limit} OFFSET ${offset}`
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("transactions: ", res);
    result(null, res);
  });
};
Transaction.getAll = (transactionHash, fromAddress, toAddress, address, limit, offset, result) => {
  console.log(transactionHash, fromAddress, toAddress, address, limit, offset);
  let query = "SELECT * FROM transactions";
  if (transactionHash || fromAddress || toAddress || address) {
    query += ` WHERE`;
  }

  if (transactionHash) {
    query += ` transactionHash LIKE '%${transactionHash}%'`;
  }
  if (transactionHash && (fromAddress || toAddress || address)) {
    query += ` AND`;
  }

  if (fromAddress) {
    query += ` fromAddress LIKE '%${fromAddress}%'`;
  }
  if (fromAddress && (toAddress || address)) {
    query += ` AND`;
  }

  if (toAddress) {
    query += ` toAddress LIKE '%${toAddress}%'`;
  }
  if (toAddress && address) {
    query += ` AND`;
  }

  if (address) {
    query += ` address LIKE '%${address}%'`;
  }

  if (limit && offset) {
    query += ` LIMIT ${limit} OFFSET ${offset}`
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("transactions: ", res);
    result(null, res);
  });
};
Transaction.updateById = (id, transaction, result) => {
  sql.query(
    "UPDATE transactions SET transactionHash = ?, fromAddress = ?, toAddress = ?, value = ?, userAddress = ?, blockTimestamp = ?, blockNumber = ?, blockHash = ? WHERE id = ?",
    [transaction.transactionHash, transaction.fromAddress, transaction.toAddress, transaction.value, transaction.userAddress, transaction.blockTimestamp, transaction.blockNumber, transaction.blockHash, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Transaction with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated transaction: ", { id: id, ...transaction });
      result(null, { id: id, ...transaction });
    }
  );
};
Transaction.remove = (id, result) => {
  sql.query("DELETE FROM transactions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Transaction with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted transaction with id: ", id);
    result(null, res);
  });
};
Transaction.removeAll = result => {
  sql.query("DELETE FROM transactions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} transactions`);
    result(null, res);
  });
};
module.exports = Transaction;
