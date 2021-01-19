const db = require("../models");

const Brand = db.brand;

exports.findAll = (req, res) => {
  Brand.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving brands.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Brand.findByPk(id)
    .then((data) => {
      if (!data)
        res.status(400).send({ message: "Not found brand with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occured while retrieving brand with id: " + id,
      });
    });
};
