import { useState } from "react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      type: "multiple-choice",
      question: "¿Qué tan fácil fue navegar en la página de la mesa de regalos?",
      options: ["1", "2", "3", "4", "5"],
      correctAnswer: "5", 
    },
    {
      type: "true-false",
      question: "¿Encontraste fácilmente los productos que querías agregar a la mesa de regalos?",
      correctAnswer: "Sí",
    },
    {
      type: "true-false",
      question: "¿Te gustó la variedad de productos disponibles para agregar a la mesa de regalos?",
      correctAnswer: "Sí",
    },
    {
      type: "true-false",
      question: "¿Recomendarías nuestra página de mesa de regalos a tus amigos o familiares?",
      correctAnswer: "Sí",
    },
    {
      type: "essay",
      question: "¿Hubo alguna funcionalidad en la página que te resultó confusa o difícil de usar? (Si es así, por favor descríbelo)",
    },
    {
      type: "multiple-choice",
      question: "En una escala del 1 al 5, ¿qué tan satisfecho estás con el diseño visual de la página de la mesa de regalos?",
      options: ["1", "2", "3", "4", "5"],
      correctAnswer: "5", 
    },
    {
      type: "true-false",
      question: "¿Te gustaría ver más opciones de personalización para tu mesa de regalos? (Ej. elegir el tema, colores, agregar un mensaje personalizado)",
      correctAnswer: "Sí",
    },
    {
      type: "true-false",
      question: "¿El proceso para compartir tu mesa de regalos con amigos y familiares fue claro y sencillo?",
      correctAnswer: "Sí",
    },
    {
      type: "essay",
      question: "¿Hubo alguna funcionalidad que te gustaría que mejoráramos o agregáramos?",
    },
    {
      type: "essay",
      question: "¿Cuál fue tu experiencia general al utilizar la mesa de regalos?",
    },
  ];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    let correctCount = 0;

    questions.forEach((question, index) => {
      if (question.type === "essay") return; // Siempre correcta
      if (answers[index] === question.correctAnswer) correctCount++;
    });

    return {
      correct: correctCount,
      total: questions.length,
    };
  };

  const results = calculateResults();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {!showResults ? (
        <div className="w-full max-w-2xl bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Pregunta {currentQuestion + 1}/{questions.length}
          </h2>
          <p className="text-gray-700 mb-6">
            {questions[currentQuestion].question}
          </p>

          
          {questions[currentQuestion].type === "multiple-choice" && (
            <div className="flex flex-col gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[currentQuestion].type === "true-false" && (
            <div className="flex gap-4">
              {["Sí", "No"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[currentQuestion].type === "essay" && (
            <div className="flex flex-col gap-4">
              <textarea
                placeholder="Escribe tu respuesta aquí..."
                onBlur={(e) => handleAnswer(e.target.value)}
                className="border rounded-lg py-2 px-4 h-32"
              />
              <button
                onClick={() => handleAnswer("Respuesta abierta")}
                className="py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white p-6 shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Resultados del Quiz</h2>
          <p className="text-lg mb-4">
            Respuestas correctas: {results.correct}/{results.total}
          </p>
          <p className="text-lg mb-4">
            Calificación: {(results.correct / results.total) * 100}%
          </p>
          <button
            onClick={() => {
              setShowResults(false);
              setAnswers({});
              setCurrentQuestion(0);
            }}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Reiniciar Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
