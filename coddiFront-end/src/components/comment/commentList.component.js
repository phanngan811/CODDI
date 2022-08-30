import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentService from "../../services/comment.service";

export default function CommentList() {
  const [comments, setComment] = useState([]);
  const { questionId } = useParams();
  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    CommentService.getComments(questionId).then((comment) => {
      setComment(comment.data.Comment);
    });
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>{comment.text}</div>
      ))}
    </div>
  );
}
