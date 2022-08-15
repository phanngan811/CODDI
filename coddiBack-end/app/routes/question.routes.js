const controller = require("../controllers/question.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/question", controller.createQuestion);
  app.get("/api/question", controller.getQuestions);
  app.put("/api/question/:questionId", controller.updateQuestion);
  app.delete("/api/question/:questionId", controller.deleteQuestion);
};
