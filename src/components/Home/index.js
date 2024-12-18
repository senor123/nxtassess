import {useContext} from 'react'
import Header from '../Header'

import QuestionsContext from '../../context/QuestionsContext'

const Home = props => {
  const {handleStartTimer} = useContext(QuestionsContext)
  const startAssessment = () => {
    props.history.replace('/assessment')
  }
  return (
    <div>
      <Header />

      <div>
        <h1>Instructions</h1>
        <ol>
          <li>Total Questions: 10</li>
          <li>Types of Questions: MCQs</li>
          <li>Duration: 10 Mins</li>
          <li>Marking Scheme: Every Correct response, get 1 mark</li>
          <li>
            All the progress will be lost, if you reload during the assessment
          </li>
          <li>
            <button onClick={startAssessment}>Start Assessment</button>
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dee8unwh3/image/upload/v1733879419/Group_uy3zi6.png"
              alt="assessment"
            />
          </li>
        </ol>
      </div>
    </div>
  )
}
export default Home
