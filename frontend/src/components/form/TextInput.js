
const TextInput = ({ label, className, name, placeholder, value, updateData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData(name, value)
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
        value={value}
        onChange={handleChange}
      />
    </div>
   );
}

export default TextInput