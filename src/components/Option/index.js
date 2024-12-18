const Option = props => {
  const {optionValue, type, optionSelect} = props
  const selectOption = () => {
    optionSelect(optionValue.id)
  }
  return (
    <>
      {type !== 'SINGLE_SELECT' && (
        <li>
          {type === 'DEFAULT' && (
            <button onClick={selectOption}>{optionValue.text}</button>
          )}
          {type === 'IMAGE' && (
            <button onClick={selectOption}>
              <img src={optionValue.image_url} alt={optionValue.text} />
            </button>
          )}
        </li>
      )}
      {type === 'SINGLE_SELECT' && (
        <option value={optionValue.id}>{optionValue.text}</option>
      )}
    </>
  )
}
export default Option
