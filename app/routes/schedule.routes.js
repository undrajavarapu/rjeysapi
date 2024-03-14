const { authJwt } = require("../middleware");
const controller = require("../controllers/schedule.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/schedule",
    controller.listAllSchedules
  );

  app.get(
    "/api/schedule/:id",
    controller.getScheduleById
  );

  app.patch(
    "/api/schedule/:id",
    controller.updateSchedule
  )
  app.delete(
    "/api/schedule/:id",
    controller.deleteSchedule
  )
  app.post(
    "/api/schedule/",
    controller.createSchedule
  )
};
