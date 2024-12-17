import { motion } from "framer-motion";

export default function TrueFalse({ question, onAnswer }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-4"
        >
            <h2 className="text-2xl font-bold">{question}</h2>
            <div className="flex space-x-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        onClick={() => onAnswer(true)}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    >
                        Verdadero
                    </button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        onClick={() => onAnswer(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    >
                        Falso
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
