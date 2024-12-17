import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { answerQuestion } from "../../redux/quizSlice";
import { useNavigate, useParams } from "react-router-dom";
import Essay from "../../components/quiz/Essay.jsx";
import Results from "../../components/quiz/Results.jsx";
import MultipleChoice from "../../components/quiz/MultipleChoice.jsx";
import TrueFalse from "../../components/quiz/TrueFalse.jsx";
import FillInTheBlank from "../../components/quiz/FillInTheBlank.jsx";
import Matching from "../../components/quiz/Matching.jsx";

const QuizScreen = () => {
    const dispatch = useAppDispatch();
    const { currentQuestion, questions, quizCompleted } = useAppSelector(
        (state) => state.quiz
    );

    const handleAnswer = (answer) => {
        dispatch(answerQuestion(answer));
    };

    if (quizCompleted) {
        return <Results />;
    }

    const question = questions[currentQuestion];

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Quiz Interactivo
                </h1>

                <div className="max-w-2xl mx-auto p-6">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            {question.type === "multiple-choice" && (
                                <MultipleChoice
                                    key="multiple-choice"
                                    question={question.question}
                                    options={question.options}
                                    onAnswer={handleAnswer}
                                />
                            )}
                            {question.type === "true-false" && (
                                <TrueFalse
                                    key="true-false"
                                    question={question.question}
                                    onAnswer={handleAnswer}
                                />
                            )}
                            {question.type === "fill-in-the-blank" && (
                                <FillInTheBlank
                                    key="fill-in-the-blank"
                                    question={question.question}
                                    onAnswer={handleAnswer}
                                />
                            )}
                            {question.type === "essay" && (
                                <Essay
                                    key="essay"
                                    question={question.question}
                                    onAnswer={handleAnswer}
                                />
                            )}
                            {question.type === "matching" && (
                                <Matching
                                    key="matching"
                                    question={question.question}
                                    pairs={question.pairs}
                                    onAnswer={handleAnswer}
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Pregunta {currentQuestion + 1} de {questions.length}
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default QuizScreen;
