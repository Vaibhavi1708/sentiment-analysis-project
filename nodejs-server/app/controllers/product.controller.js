const db = require('../models');

const Product = db.product;

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  let token = req.cookies['authToken'];

  Product.findAll()

    .then((data) => {
      res.status(200).send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retrieving products.',
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      if (!data)
        res.status(400).send({ message: 'Not found product with id: ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Some error occured while retrieving product with id: ' + id,
      });
    });
};
//Retrieve all products by particular brands

exports.findAllProductsByBrands = (req, res) => {
  Product.findAll({
    where: {
      brand_name: req.query.brand_name
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving products.",
      });
    });
};