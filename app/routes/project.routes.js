const { authJwt } = require("../middleware");
const controller = require("../controllers/project.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/project",
    controller.project
  );

  app.post(
    "/api/createproject",
    controller.createproject
  );

  
};
