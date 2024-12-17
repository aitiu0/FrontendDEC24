import { useState } from "react";
import { motion } from "framer-motion";

export default function Matching({ question, pairs, onAnswer }) {
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [matches, setMatches] = useState({});

    const handleMatch = (right) => {
        if (selectedLeft) {
            setMatches({ ...matches, [selectedLeft]: right });
            setSelectedLeft(null);
        }
    };

    const isCompleted = Object.keys(matches).length === pairs.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-4"
        >
            <h2 className="text-2xl font-bold">{question}</h2>
            <div className="flex justify-between">
                <div className="space-y-2">
                    {pairs.map(({ left }, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => setSelectedLeft(left)}
                                className={`px-4 py-2 border rounded-md ${
                                    selectedLeft === left
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-black"
                                } ${
                                    matches[left]
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={!!matches[left]}
                            >
                                {left}
                            </button>
                        </motion.div>
                    ))}
                </div>
                <div className="space-y-2">
                    {pairs.map(({ right }, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => handleMatch(right)}
                                className={`px-4 py-2 border rounded-md ${
                                    Object.values(matches).includes(right)
                                        ? "opacity-50 cursor-not-allowed"
                                        : "bg-white text-black"
                                }`}
                                disabled={Object.values(matches).includes(
                                    right
                                )}
                            >
                                {right}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
            {isCompleted && (
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        onClick={() => onAnswer(matches)}
                        className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                        Enviar
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
