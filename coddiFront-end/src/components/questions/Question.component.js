import React from "react";
import { useState } from "react";

function Question({
  aQuestion,
  answers,
  correct,
  computeScore,
  onAnswered,
  index,
  isFinished,
}) {
  const [message, setMessage] = useState();
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState();

  function computeAnswer(answer, correctAns) {
    setSelected(answer);
    onAnswered();
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
      {index + 1 + ". " + aQuestion}
      {answers.map((text, _id) => (
        <div key={_id}>
          {console.log(text === correct)}
          <button
            disabled={answered}
            className={
              "btn btn-primary " +
              (text === selected && !isFinished ? "btn-secondary" : "") +
              (correct === selected &&
              answered &&
              selected === text &&
              isFinished
                ? "btn btn-success"
                : "") +
              (selected !== correct &&
              text === selected &&
              answered &&
              isFinished
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
      {isFinished && <p>{message}</p>}
    </div>
  );
}
export default Question;
