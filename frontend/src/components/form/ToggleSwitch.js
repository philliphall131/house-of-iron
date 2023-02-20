import { Form } from "react-bootstrap"

const ToggleSwitch = ({name, toggle, checked}) => {
  
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={()=>toggle(name)} />
      <span className="switch" />
    </label>
  )
}

export default ToggleSwitch