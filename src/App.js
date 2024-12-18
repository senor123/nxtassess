import './App.css'
import {useState, useEffect, useRef} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Result from './components/Result'
import Assessment from './components/Assessment'
import QuestionsContext from './context/QuestionsContext'
// write your code here
const App = () => {
  const [questionNumber, setQuestion] = useState(1)
  const [timer, setTimer] = useState(600)
  const [totalAnswersQuestioned, setAnswers] = useState([])
  const timeInterval = useRef()
  const handleQuestionNumber = id => {
    setQuestion(id)
  }
  const startTimer = () => {
    timeInterval.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(timeInterval.current)
  }
  const restartTimer = () => {
    setTimer(600)
  }
  const handleScore = answer => {
    const index = totalAnswersQuestioned.findIndex(
      tempanswer => tempanswer.questionNo === answer.questionNo,
    )

    if (index !== -1) {
      const tempAnswers = [...totalAnswersQuestioned]
      const resAnswers = tempAnswers.map(tempanswer => {
        if (tempanswer.questionNo === answer.questionNo) {
          return answer
        }
        return tempanswer
      })
      setAnswers(resAnswers)
    } else {
      setAnswers(prevAnswers => [...prevAnswers, {...answer}])
    }
  }

  console.log(totalAnswersQuestioned)
  return (
    <QuestionsContext.Provider
      value={{
        currentQuestion: questionNumber,
        setCurrentQuestion: handleQuestionNumber,
        timer,
        answeredQuestions: totalAnswersQuestioned,
        setAnswers: handleScore,
        startTimer,
        stopTimer,
        restartTimer,
      }}
    >
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/assessment" component={Assessment} />
        <ProtectedRoute exact path="/results" component={Result} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </QuestionsContext.Provider>
  )
}

export default App
