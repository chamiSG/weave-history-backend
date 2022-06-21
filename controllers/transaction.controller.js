const Transaction = require("../models/transaction.model.js");
// Create and Save a new Transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Transaction
  const transaction = new Transaction({
    address: req.body.address,
    type: req.body.type,
    transactionHash: req.body.transactionHash,
    methodId: req.body.methodId,
    fromAddress: req.body.fromAddress,
    toAddress: req.body.toAddress,
    value: req.body.value,
    userAddress: req.body.userAddress,
    blockTimestamp: req.body.blockTimestamp,
    blockNumber: req.body.blockNumber,
    blockHash: req.body.blockHash,
    network: req.body.network
  });
  // Save Transaction in the database
  Transaction.create(transaction, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    else res.send(data);
  });
};
// Retrieve all Transactions from the database (with condition).
exports.findAll = (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const transactionHash = req.query.transactionHash;
  const address = req.query.address;
  const fromAddress = req.query.fromAddress;
  const toAddress = req.query.toAddress;
  Transaction.getAll(transactionHash, fromAddress, toAddress, address, limit, offset, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving transactions."
      });
    else res.send(data);
  });
  // if (transactionHash) {
  //   Transaction.getAllByTransactionHash(transactionHash, limit, offset, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving transactions."
  //       });
  //     else res.send(data);
  //   });
  // } else if (fromAddress) {
  //   Transaction.getAllByFromAddress(fromAddress, limit, offset, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving transactions."
  //       });
  //     else res.send(data);
  //   });
  // } else if (toAddress) {
  //   Transaction.getAllByToAddress(toAddress, limit, offset, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving transactions."
  //       });
  //     else res.send(data);
  //   });
  // } else if (address) {
  //   Transaction.getAllByAddress(address, limit, offset, (err, data) => {
  //     if (err)
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving transactions."
  //       });
  //     else res.send(data);
  //   });
  // }
};
// Find a single Transaction with a id
exports.findOne = (req, res) => {
  Transaction.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Transaction with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
// Update a Transaction identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Transaction.updateById(
    req.params.id,
    new Transaction(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Transaction with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Transaction with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
  Transaction.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Transaction with id " + req.params.id
        });
      }
    } else res.send({ message: `Transaction was deleted successfully!` });
  });
};
// Delete all Transactions from the database.
exports.deleteAll = (req, res) => {
  Transaction.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all transactions."
      });
    else res.send({ message: `All Transactions were deleted successfully!` });
  });
};