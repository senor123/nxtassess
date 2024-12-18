import OptionsList from '../OptionsList'

const QuestionDetails = props => {
  const {question, currentQuestion} = props
  return (
    <div>
      <p>
        {currentQuestion}. {question.question_text}
      </p>

      <OptionsList options={question.options} type={question.options_type} />
    </div>
  )
}
export default QuestionDetails
