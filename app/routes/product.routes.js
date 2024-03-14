const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/product",
    controller.product
  );

  app.post(
    "/api/createproduct",
    controller.createproduct
  );

  app.delete("/api/products/:id", controller.deleteProduct);

  app.put("/api/products/:id",controller.updateproduct);
  
};
