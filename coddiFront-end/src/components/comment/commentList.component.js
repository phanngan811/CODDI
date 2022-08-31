import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentService from "../../services/comment.service";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
export default function CommentList() {
  const [comments, setComment] = useState([]);
  // const []
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
      {/* <div>
        <form className="hstack">
          <span>{comment.author.username}</span>
          <input type="text" />
        </form>
      </div> */}
      {comments.map((comment, index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">
              {comment.author.username}{" "}
              <small className="fw-normal">
                {dayjs().to(dayjs(comment.createdAt))}
              </small>
            </h5>

            <p className="card-text">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
