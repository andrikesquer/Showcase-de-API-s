"use client";

import { useState, useEffect } from "react";
import RefreshBtn from "../../../components/RefreshBtn";

const Trivia = () => {
  const [pregunta, setPregunta] = useState(null);
  const [eleccion, setEleccion] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const fetchTrivia = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=15"
      );
      const data = await response.json();

      const preguntaAleatoria = data.results[Math.floor(Math.random() * data.results.length)];

      const answers = [
        preguntaAleatoria.correct_answer,
        ...preguntaAleatoria.incorrect_answers,
      ].sort(() => Math.random() - 0.5);

      setPregunta({
        question: preguntaAleatoria.question,
        correctAnswer: preguntaAleatoria.correct_answer,
        answers,
      });

      setFeedback(null);
      setEleccion(null);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchTrivia();
  }, []);

  const handleEleccion = (eleccion) => {
    setEleccion(eleccion);
    if (eleccion === pregunta.correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect, the correct answer was: " + pregunta.correctAnswer);
    }
  };

  const handleRefresh = () => {
    fetchTrivia();
  };

  if (!pregunta) return <div className="text-center text-black">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700 text-black p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl mb-6 font-bold">Video game trivia</h1>
        <p className="mb-6 text-xl" dangerouslySetInnerHTML={{ __html: pregunta.question }}></p>
        <div className="flex flex-col space-y-4">
          {pregunta.answers.map((eleccion, index) => (
            <button
              key={index}
              className="bg-stone-400 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
              onClick={() => handleEleccion(eleccion)}
            >
              {eleccion}
            </button>
          ))}
        </div>

        <div className="mt-4 mb-2"></div>

        {feedback && (
          <div className="mt-4 text-xl text-slate-700">
            {feedback}
          </div>
        )}

        <RefreshBtn onClick={handleRefresh} />
      </div>
    </div>
  );
};

export default Trivia;
