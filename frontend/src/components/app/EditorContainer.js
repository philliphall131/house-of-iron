import weights from '../../assets/weights.jpg';

const EditorContainer = ({children, title, subtitle}) => {
  return (
    <div>
      <div className='header-container'>
        <img className="header-picture" src={weights} alt=""/>
        <div className="header-title">{title}</div>
      </div>
      <div className="sub-title">{subtitle}</div>
      <div className="editor-body">
        { children }
      </div>
    </div>
  )
}

export default EditorContainer