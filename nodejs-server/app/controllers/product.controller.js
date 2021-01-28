const db = require('../models');
const { Op } = require('sequelize');
const { notFound } = require('../utils/error')
const Product = db.product;

// Retrieve all Products from the database.
exports.findAllProducts = async (req, res) => {
  try {
    let token = req.cookies['authToken'];

    const data = await Product.findAll();

    return res.status(200).send(data);
  } catch (err) {}
};

// Find a single Product with an id
exports.findOneProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.findByPk(id);
    if (!data)
      return res
        .status(404)
        .send({ message: notFound("product",id) });
    else return res.send(data);
  } catch (err) {}
};

