import {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import QuestionsContext from '../../context/QuestionsContext'

const Timer = props => {
  const {score, timer, stopTimer} = useContext(QuestionsContext)
  const {handleSubmit} = props
  const submitExam = () => {
    handleSubmit()
    stopTimer()
  }
  const formatTime = time => {
    let seconds = timer % 60
    let minutes = Math.floor(timer / 60)
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    return `00:${minutes}:${seconds}`
  }
  return (
    <div>
      <p>Time Left</p>
      <p>{formatTime(timer)}</p>

      <button onClick={submitExam}>Submit Assessment</button>
    </div>
  )
}

export default withRouter(Timer)
