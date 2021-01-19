const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Retrieve all products
  app.get("/api/product", controller.findAll);

  //Retrieve a single product with id
  app.get("/api/product/:id", controller.findOne);
};
