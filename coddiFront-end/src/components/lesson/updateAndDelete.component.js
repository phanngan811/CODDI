import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonService from "../../services/lesson.service";
import CreateQuestion from "../questions/createQuestion.component";
export default function UpdateAndDelete() {
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetchLesson();
  }, []);
  function fetchLesson() {
    LessonService.getALesson(id).then((data) => {
      setTitle(data.data.Lesson.titleLesson);
      setDecription(data.data.Lesson.descriptionLesson);
      console.log(data);
    });
  }
  function updateLesson(e) {
    e.preventDefault();
    LessonService.updateLesson(id, {
      titleLesson: title,
      descriptionLesson: description,
    });
  }

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function onChangeDescription(e) {
    setDecription(e.target.value);
  }

  function deleteLesson(e) {
    LessonService.deleteLesson(id).then(() => {
      setSuccess(true);
    });
  }

  return (
    <div className="mainContent pb-4 pt-4">
    <div className="">
      <div className="container bg-white border rounded">
      <form onSubmit={updateLesson}>
        <label>Title</label>
        <input className="form-control" type="text" onChange={onChangeTitle} value={title} />
        <label htmlFor="">Description</label>
        <textarea className="form-control" type="text" rows="6" onChange={onChangeDescription} value={description} />
        <button className="btn btn-outline-primary">Update</button>
        {success ? "Successfully" : ""}
        <button className="btn btn-outline-danger" type="button" onClick={deleteLesson}>
          Delete
        </button>
        {success ? "Successfully" : ""}
      </form>
    </div>
      <CreateQuestion id={id} />
    </div>
    </div>
  );
}
