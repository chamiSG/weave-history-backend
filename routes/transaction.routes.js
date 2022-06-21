module.exports = app => {
  const transactions = require("../controllers/transaction.controller.js");
  var router = require("express").Router();
  // Create a new Transactions
  router.post("/", transactions.create);
  // Retrieve all Transactions
  router.get("/", transactions.findAll);
  // Retrieve a single Transaction with id
  router.get("/:id", transactions.findOne);
  // Update a Transaction with id
  router.put("/:id", transactions.update);
  // Delete a Transaction with id
  router.delete("/:id", transactions.delete);
  // Delete all Transactions
  router.delete("/", transactions.deleteAll);
  app.use('/api/transactions', router);
};