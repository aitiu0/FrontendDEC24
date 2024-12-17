import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { resetQuiz } from "../../redux/quizSlice";

export default function Results() {
    const dispatch = useDispatch();
    const { questions, answers } = useSelector((state) => state.quiz);

    const correctAnswers = questions.reduce((acc, question, index) => {
        if (question.type === "essay") return acc + 1; // Las preguntas de tipo ensayo siempre se consideran correctas
        if (question.type === "matching") {
            const allCorrect = Object.entries(
                answers[index]
            ).every(([key, value]) =>
                question.pairs.find(
                    (pair) => pair.left === key && pair.right === value
                )
            );
            return acc + (allCorrect ? 1 : 0);
        }
        return acc + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / questions.length) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto p-6 space-y-6"
        >
            <h2 className="text-3xl font-bold text-center">
                Resultados del Quiz
            </h2>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-4xl font-bold"
            >
                {score}%
            </motion.div>
            <p className="text-center">
                Respondiste correctamente {correctAnswers} de {questions.length}{" "}
                preguntas.
            </p>
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-100 p-4 rounded-lg"
                    >
                        <h3 className="font-bold">{question.question}</h3>
                        <p>Tu respuesta: {JSON.stringify(answers[index])}</p>
                        {question.type !== "essay" && (
                            <p>
                                Respuesta correcta:{" "}
                                {JSON.stringify(question.correctAnswer)}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-center"
            >
                <button
                    onClick={() => dispatch(resetQuiz())}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Reiniciar Quiz
                </button>
            </motion.div>
        </motion.div>
    );
}
