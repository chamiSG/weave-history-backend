const BlockNumber = require("../models/blocknumber.model.js");
// Create and Save a new BlockNumber
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Save BlockNumber in the database
  BlockNumber.create(req.body.blocknumber, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BlockNumber."
      });
    else res.send(data);
  });
};

// Find a single BlockNumber with a id
exports.findOne = (req, res) => {
  BlockNumber.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found BlockNumber with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving BlockNumber with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a BlockNumber identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  BlockNumber.updateById(
    req.params.id,
    req.body.blocknumber,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found BlockNumber with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating BlockNumber with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
