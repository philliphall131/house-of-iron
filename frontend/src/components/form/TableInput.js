import { useState, useEffect } from "react"

const TableInput = ({name, value, updateRowData, disabled}) => {
  const [inputValue, setInputValue] = useState(value ? value : "")

  useEffect(() => {
    updateRowData(name, inputValue)
  }, [inputValue])
  

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <td className={"cell " + (disabled ? "cell-disabled" : "")}>
      <input 
        name={name}
        type="text"
        className={"table-input " + (disabled ? "cell-disabled" : "")}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
      ></input>
    </td>
  )
}

export default TableInput