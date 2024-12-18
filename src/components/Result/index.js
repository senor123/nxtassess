import {useContext, useState, useEffect} from 'react'
import QuestionsContext from '../../context/QuestionsContext'
import Header from '../Header'

const Result = props => {
  const {timer, answeredQuestions, restartTimer} = useContext(QuestionsContext)
  const score = answeredQuestions.map(answer => answer.is_correct === 'true')
  const [resultTime, setResultTime] = useState('')

  useEffect(() => {
    formatTime()
  }, [])
  const formatTime = () => {
    if (resultTime !== '') {
      return
    }
    const time = 600 - timer
    let seconds = time % 60
    let minutes = Math.floor(time / 60)
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    setResultTime(`00:${minutes}:${seconds}`)
  }

  const startTest = () => {
    props.history.replace('/assessment')
    restartTimer()
  }
  return (
    <div>
      <Header />
      {timer <= 0 && (
        <>
          <img
            src="https://res.cloudinary.com/dee8unwh3/image/upload/v1733903530/calender_1_1_gsckgz.png"
            alt="time up"
          />
          <h1>Time is up</h1>
          <p>Your Score: {score.length}</p>
          <button onClick={startTest}>Reattempt</button>
        </>
      )}

      {timer >= 0 && (
        <>
          <img
            src="https://res.cloudinary.com/dee8unwh3/image/upload/v1733906203/Asset_2_1_bux76a.png"
            alt="submit"
          />
          <h1>Time is up</h1>
          <p>{resultTime}</p>
          <p>Your Score: {score.length}</p>
          <button onClick={startTest}>Reattempt</button>
        </>
      )}
    </div>
  )
}

export default Result
