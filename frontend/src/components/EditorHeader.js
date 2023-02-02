import weights from '../assets/weights.jpg';

const EditorHeader = ({title}) => {
  return (
    <>
      <img className="header-pic" src={weights} alt=""/>
      <div className="program-title">{title}</div>
    </>
  )
}

export default EditorHeader