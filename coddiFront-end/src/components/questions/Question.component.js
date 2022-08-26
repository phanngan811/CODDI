import React from "react";
import { useState } from "react";

function Question({ aQuestion, answers, correct, computeScore }) {
  const [message, setMessage] = useState();
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState();

  function computeAnswer(answer, correctAns) {
    setSelected(answer);
    if (answer === correctAns) {
      setMessage("correct Answer");
      computeScore();
    } else {
      setMessage("Incorrect Answer");
    }
    setAnswered(true);
  }
  return (
    <div>
      {aQuestion}
      {answers.map((text, _id) => (
        <div key={_id}>
          {console.log(text === correct)}
          <button
            disabled={answered}
            className={
              "btn btn-primary " +
              (correct === selected && answered && selected === text
                ? "btn btn-success"
                : "") +
              (selected !== correct && text === selected && answered
                ? "btn btn-danger"
                : "")
            }
            onClick={() => {
              computeAnswer(text, correct);
            }}
          >
            {text}
          </button>
        </div>
      ))}
      <p>{message}</p>
    </div>
  );
}
export default Question;
