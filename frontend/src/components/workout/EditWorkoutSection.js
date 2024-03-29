import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import xmark from '../../assets/square-xmark.png';

const EditWorkoutSection = ({section, deleteSection}) => {
  return (
    <div className="edit-workout-section">
      <div className="section-header mb-3">
        <div className="empty-section"><div className="img-container"></div></div>
        <div className="section-title">
          <span>{section.section_type}</span>
        </div>
        <div className="remove-section">
          <span className="img-container"><img className="xmark-img" alt="X" src={xmark} onClick={()=>deleteSection(section.id)}/></span>
        </div>
      </div>
      <div className="section-body">
        <Link to={`/section/edit/${section.id}`}><Button>Edit Exercises in this section</Button></Link>
        
      </div>
    </div>
  )
}

export default EditWorkoutSection