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
    <div className="container">
      <form onSubmit={updateLesson}>
        <label>Title</label>
        <input type="text" onChange={onChangeTitle} value={title} />
        <label htmlFor="">Description</label>
        <input type="text" onChange={onChangeDescription} value={description} />
        <button>Update</button>
        {success ? "Successfully" : ""}
        <button type="button" onClick={deleteLesson}>
          Delete
        </button>
        {success ? "Successfully" : ""}
      </form>

      <CreateQuestion id={id} />
    </div>
  );
}
