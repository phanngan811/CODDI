import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentService from "../../services/comment.service";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
export default function CommentList() {
  const [comments, setComment] = useState([]);
  const [text, setText] = useState("");
  const [idUser, setIdUser] = useState(0);
  const { questionId } = useParams();

  useEffect(() => {
    getComments();
    getUser();
  }, []);

  function getUser() {
    const u = JSON.parse(localStorage.getItem("user"));
    const idU = u.id;
    setIdUser(idU);
    console.log(idU);
  }

  function getComments() {
    CommentService.getComments(questionId).then((comment) => {
      setComment(comment.data.Comment);
    });
  }
  function createComment() {
    var data = {
      text,
      aQuestion: questionId,
      author: idUser,
    };
    CommentService.createComment(data, questionId)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function onChangeText(e) {
    setText(e.target.value);
  }

  return (
    <div>
      <label htmlFor="">writing your comment here:</label>
      <input className="form-control" onChange={onChangeText} value={text} />

      <button className="btn btn-success mt-4" onClick={createComment}>
        Comment
      </button>

      <h1>{idUser}</h1>
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

{
  /* <section style={{ backgroundColor: "#eee" }}>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-start align-items-center">
                    <div>
                      <h6 className="fw-bold text-primary mb-1">
                        Lily Coleman
                      </h6>
                      <p className="text-muted small mb-0">
                        Shared publicly - Jan 2020
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 mb-4 pb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip consequat.
                  </p>
                </div>
                <div
                  className="card-footer py-3 border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-start w-100">
                    <div className="form-outline w-100">
                      <textarea
                        className="form-control"
                        id="textAreaExample"
                        rows={4}
                        style={{ background: "#fff" }}
                        defaultValue={""}
                      />
                      <label className="form-label" htmlFor="textAreaExample">
                        Message
                      </label>
                    </div>
                  </div>
                  <div className="float-end mt-2 pt-1">
                    <button type="button" className="btn btn-primary btn-sm">
                      Post comment
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */
}
