const db = require("../models");

const Product = db.product;

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  let token = req.cookies["authToken"];

  Product.findAll()

    .then((data) => {
      res.status(200).send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found product with id: " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
//Retrieve all products by particular brands

exports.findProductsByBrand = (req, res) => {
  Product.findAll({
    where: {
      brand_name: req.query.brand_name,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
