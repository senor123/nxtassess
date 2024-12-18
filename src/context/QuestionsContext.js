import {createContext} from 'react'

const QuestionsContext = createContext({
  currentQuestion: 0,
  setCurrentQuestion: () => {},
  timeAvailable: 600,
  answeredQuestions: [],
  setAnswers: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  restartTimer: () => {},
})

export default QuestionsContext
