import {useEffect, useContext, useState} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Timer from '../Timer'
import QuestionDetails from '../QuestionDetails'
import QuestionsContext from '../../context/QuestionsContext'

const Assessment = props => {
  const [questionsList, setQuestionsList] = useState([])
  const {
    timer,
    answeredQuestions,
    currentQuestion,
    setCurrentQuestion,
    startTimer,
  } = useContext(QuestionsContext)

  const questionNumbers = () => {
    let i = 1
    const res = []
    while (i <= questionsList.length) {
      res.push(i)
      i++
    }
    return res
  }
  useEffect(() => {
    fetchQuestions()
    startTimer()
  }, [])
  const fetchQuestions = async () => {
    const response = await fetch('https://apis.ccbp.in/assess/questions')
    const resData = await response.json()
    setQuestionsList(resData.questions)
  }

  const submitTest = () => {
    props.history.replace('/results')
  }
  const redirecttoQuestion = ques => {
    setCurrentQuestion(ques)
  }
  return (
    <div>
      {timer === 0 && <Redirect to="/results" />}

      {timer !== 0 && (
        <>
          <Header />
          {questionsList.length !== 0 && (
            <>
              <QuestionDetails
                question={questionsList[currentQuestion - 1]}
                currentQuestion={currentQuestion}
              />
              <Timer handleSubmit={submitTest} />
              <p>{answeredQuestions.length}</p>
              <p>Answered Questions</p>
              <p>{questionsList.length - answeredQuestions.length}</p>
              <p>Unanswered Questions</p>
              <h1>Questions ({questionsList.length})</h1>

              <ul>
                {questionNumbers().map(question => (
                  <li key={question}>
                    <button onClick={() => redirecttoQuestion(question)}>
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {questionsList.length === 0 && (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#263868" height={50} width={50} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Assessment
