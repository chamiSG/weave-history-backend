const sql = require("./db.js");
// constructor
const BlockNumber = function(blocknumber) {
  this.blocknumber = blocknumber.title;
};

BlockNumber.create = (newBlocknumber, result) => {
  sql.query("INSERT INTO blocknumber VALUES('', ?)", newBlocknumber, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created blocknumber: ", { id: res.insertId, ...newBlocknumber });
    result(null, { id: res.insertId, ...newBlocknumber });
  });
};

BlockNumber.findById = (id, result) => {
  sql.query(`SELECT * FROM blocknumber WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found blocknumber: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found BlockNumber with the id
    result({ kind: "not_found" }, null);
  });
};

BlockNumber.updateById = (id, blocknumber, result) => {
  sql.query(
    "UPDATE blocknumber SET blocknumber = ? WHERE id = ?",
    [blocknumber, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found BlockNumber with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated blocknumber: ", { id: id, ...blocknumber });
      result(null, { id: id, ...blocknumber });
    }
  );
};

module.exports = BlockNumber;

