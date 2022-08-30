const mongoose = require("mongoose");
const Comment = require("../models/comment.model");
exports.createComment = (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    question: req.query.questionId,
    author: req.body.author,
  });
  comment
    .save()
    .then((newComment) => {
      return res.status(201).json({
        success: true,
        message: "New Comment created successfully",
        Comment: newComment,
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

exports.getComments = (req, res) => {
  Comment.find({
    question: req.query.questionId,
  })
    .select("text question author")
    .then((allComments) => {
      return res.status(200).json({
        success: true,
        message: "List all lessons",
        Comment: allComments,
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
