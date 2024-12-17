import { useState } from "react";
import { motion } from "framer-motion";

export default function FillInTheBlank({ question, onAnswer }) {
    const [answer, setAnswer] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-4"
        >
            <h2 className="text-2xl font-bold">{question}</h2>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escribe tu respuesta aquí"
                className="w-full p-2 border rounded-md"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                    onClick={() => onAnswer(answer)}
                    disabled={!answer}
                    className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-md ${
                        !answer
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-blue-600"
                    }`}
                >
                    Enviar
                </button>
            </motion.div>
        </motion.div>
    );
}
