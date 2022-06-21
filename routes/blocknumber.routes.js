module.exports = app => {
  const blocknumber = require("../controllers/blocknumber.controller.js");
  var router = require("express").Router();
  // Create a new Blocknumber
  router.post("/", blocknumber.create);
  // Retrieve a single Blocknumber with id
  router.get("/:id", blocknumber.findOne);
  // Update a Blocknumber with id
  router.put("/:id", blocknumber.update);
  app.use('/api/blocknumber', router);
};