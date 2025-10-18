import React, { useState, useEffect, useRef } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (timeRemaining > 1) {
        setTimeRemaining((prev) => prev - 1);
      } else {
        setTimeRemaining(10);
        onAnswered(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutRef.current);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    clearTimeout(timeoutRef.current);
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;