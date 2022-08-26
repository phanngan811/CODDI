import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import CourseService from "../../services/course.service";
import QuestionService from "../../services/question.service";
import NavAdmin from "../nav/navAdmin";
import Question from "./Question.component";

export default function ListQuestion({ id }) {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestion();
  }, []);

  function getQuestion() {
    QuestionService.getAllQuestionCourse(id)
      .then((response) => {
        setQuestions(response.data.Question);
        console.log(response.data.Question);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(id);
  }

  function computeScore() {
    setScore(score + 1);
  }
  // handleAnswer

  return (
    <div>
      <NavAdmin/>
      {questions.map(({ aQuestion, answers, correct, _id }) => (
        <Question
          computeScore={computeScore}
          aQuestion={aQuestion}
          answers={answers}
          correct={correct}
          key={_id}
        />
      ))}
      <p>{score}</p>
    </div>
  );
}

//  {questions.map((question, index) => (
//   <div key={index}>
//     {question.aQuestion}
//     {question.alternatives.map((alternative) => {
//       return <button>{alternative.text}</button>;
//     })}
//   </div>
// ))}

// {questions.map(({ aQuestion, answers, correct, _id }) => (
//   <div key={_id}>
//     {aQuestion}
//     {answers.map((text, _id) => (
//       <div key={_id}>
//         <button
//           onClick={() => {
//             this.computeAnswer(text, correct);
//           }}
//         >
//           {text}
//         </button>
//         <p>{this.state.message}</p>
//       </div>
//     ))}
//   </div>
// ))}
