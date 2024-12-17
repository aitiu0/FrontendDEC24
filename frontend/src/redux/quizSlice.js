import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentQuestion: 0,
  questions: [
    {
      type: 'multiple-choice',
      question: '¿Cuál es la capital de Francia?',
      options: ['Londres', 'Berlín', 'París', 'Madrid'],
      correctAnswer: 'París',
    },
    {
      type: 'true-false',
      question: 'La Tierra es plana.',
      correctAnswer: false,
    },
    {
      type: 'fill-in-the-blank',
      question: 'El sol es una ____.',
      correctAnswer: 'estrella',
    },
    {
      type: 'essay',
      question: 'Describe tu día ideal.',
    },
    {
      type: 'matching',
      question: 'Relaciona los países con sus capitales.',
      pairs: [
        { left: 'España', right: 'Madrid' },
        { left: 'Italia', right: 'Roma' },
        { left: 'Alemania', right: 'Berlín' },
      ],
    },
  ],
  answers: [],
  quizCompleted: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      state.answers[state.currentQuestion] = action.payload;
      state.currentQuestion += 1;
      if (state.currentQuestion >= state.questions.length) {
        state.quizCompleted = true;
      }
    },
    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.answers = [];
      state.quizCompleted = false;
    },
  },
});

export const { answerQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
