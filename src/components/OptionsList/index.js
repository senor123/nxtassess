import {useContext, useState, useEffect} from 'react'
import Option from '../Option'
import QuestionsContext from '../../context/QuestionsContext'

const OptionsList = props => {
  const {
    answeredQuestions,
    currentQuestion,
    setCurrentQuestion,
    setAnswers,
  } = useContext(QuestionsContext)
  const {options, type} = props
  const [optionSelected, setSelection] = useState(null)
  const [activeValue, setActive] = useState(null)
  useEffect(() => {
    const value = type === 'SINGLE_SELECT' ? options[0].id : null
    if (value !== null) {
      const currentAnswer = options.find(option => option.id === value)
      const updatedAnser = {questionNo: currentQuestion, ...currentAnswer}
      setAnswers(updatedAnser)
    }
    setSelection(value)
    setActive(value)
    options.forEach(option => {
      const activeAnswer = answeredQuestions.find(
        answer => answer.id === option.id,
      )
      if (activeAnswer) {
        setActive(activeAnswer.id)
      }
    })
  }, [type])

  const moveToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1)
  }

  const handleSelection = id => {
    setSelection(prevOption => id)
    const currentAnswer = options.find(option => option.id === id)
    const updatedAnser = {questionNo: currentQuestion, ...currentAnswer}
    setAnswers(updatedAnser)
  }

  const handleOption = event => {
    setSelection(event.target.value)
    const currentAnswer = options.find(
      option => option.id === event.target.value,
    )
    const updatedAnser = {questionNo: currentQuestion, ...currentAnswer}
    setAnswers(updatedAnser)
  }

  return (
    <div>
      {type !== 'SINGLE_SELECT' && (
        <ul>
          {options.map(option => (
            <Option
              optionValue={option}
              key={option.id}
              type={type}
              optionSelect={handleSelection}
            />
          ))}
        </ul>
      )}

      {type === 'SINGLE_SELECT' && (
        <>
          <select onChange={handleOption} defaultValue={activeValue}>
            {options.map(option => (
              <Option
                optionValue={option}
                key={option.id}
                type={type}
                optionSelect={handleSelection}
              />
            ))}
          </select>
          <p>First Option is selected by default</p>
        </>
      )}
      {currentQuestion !== 10 && (
        <button onClick={moveToNextQuestion}>Next Question</button>
      )}
    </div>
  )
}
export default OptionsList
