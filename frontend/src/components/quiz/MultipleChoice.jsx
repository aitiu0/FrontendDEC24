import { motion } from "framer-motion";

export default function MultipleChoice({ question, options, onAnswer }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-4"
        >
            <h2 className="text-2xl font-bold">{question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            onClick={() => onAnswer(option)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-left justify-start hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        >
                            {option}
                        </button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
