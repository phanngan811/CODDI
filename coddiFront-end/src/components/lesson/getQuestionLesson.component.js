import React, { useState, useEffect } from "react";
import QuestionService from "../../services/question.service";
import LessonService from "../../services/lesson.service";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DisplayQuestion from "./displayQuestion.component";
function GetQuestion({ id }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestionLesson();
  }, []);
  function getQuestionLesson() {
    QuestionService.getAllQuestionLesson(id)
      .then((response) => {
        setQuestions(response.data.Question);
        console.log(response.data.Question);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div>
      {questions.map(({ aQuestion, answers, correct, _id }) => (
        <div>
          <DisplayQuestion
            key={_id}
            aQuestion={aQuestion}
            answers={answers}
            correct={correct}
          />
          <Link to={`/question/${id}/comment`}>Discusion</Link>
        </div>
      ))}
    </div>
  );
}

export default GetQuestion;
