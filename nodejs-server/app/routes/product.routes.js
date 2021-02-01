const controller = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/product", controller.findAllProducts);

  app.get("/api/product/:id", controller.findOneProduct);

  app.get("/api/productsbyfilters", controller.findProductsByFilters);

};

