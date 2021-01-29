const db = require('../models');

const Brand = db.brand;

exports.findAllBrands = async (req, res) => {
  try {
    const data = await Brand.findAll();
    return res.status(200).send(data);
  } catch (err) {}
};
