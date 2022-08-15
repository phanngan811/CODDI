const Question = require("../models/question.model");

exports.createQuestion = (req, res) => {
  const question = new Question({
    aQuestion: req.body.aQuestion,
    aCorrectAnswer: req.body.aCorrectAnswer,
    answers: req.body.answers,
    description: req.body.description,
  });
  question
    .save()
    .then((newQuestion) => {
      return res.status(201).json({
        success: true,
        message: "New question created successfully",
        Question: newQuestion,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.getQuestions = (req, res) => {
  Question.find()
    .select("aQuestion aCorrectAnswer answers description")
    .then((allQuestions) => {
      return res.status(200).json({
        success: true,
        message: "List all questions",
        Question: allQuestions,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

exports.updateQuestion = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.questionId;
  const updateObject = req.body;
  Question.findByIdAndUpdate(id, updateObject, { useFindAndModify: false })
    .then((newQuestion) => {
      res.status(200).json({
        success: true,
        message: "This question was updated successfully",
        updateQuestion: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This question does not exist",
        error: err.message,
      });
    });
};

exports.deleteQuestion = (req, res) => {
  const id = req.params.questionId;
  Question.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
        message: "This question was deleted successfully",
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};
