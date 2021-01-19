module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    os: {
      type: Sequelize.STRING,
    },
    camera: {
      type: Sequelize.STRING,
    },
    cpu: {
      type: Sequelize.STRING,
    },
    battery: {
      type: Sequelize.STRING,
    },
    ram: {
      type: Sequelize.STRING,
    },
    internal_memory: {
      type: Sequelize.STRING,
    },
    brand_name: {
      type: Sequelize.STRING,
    },
    brand_id: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    overall_rating: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
