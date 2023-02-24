import { useState, useEffect } from "react";


const TextInput = ({ label, className, name, placeholder, valu, updateData }) => {
  const [val, setVal] = useState(valu)

  useEffect(() => {
    updateData(name, val)
  }, [val])
  

  const handleChange = (e) => {
    setVal(e.target.value)
  }

  return (
    <div className={className}>
      <label>
        {label}: 
      </label>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
      />
    </div>
   );
}

export default TextInput