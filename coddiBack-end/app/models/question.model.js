const mongoose = require("mongoose");
const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    aQuestion: String,
    aCorrectAnswer: String,
    answers: Array,
    description: String,
  })
);

module.exports = Question;
