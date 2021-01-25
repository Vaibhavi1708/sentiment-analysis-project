const db = require("../models");

const Brand = db.brand;

exports.findAll = (req, res) => {
  Brand.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
