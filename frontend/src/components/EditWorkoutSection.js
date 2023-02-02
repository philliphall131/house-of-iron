import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Workout.css';
import xmark from '../assets/square-xmark.png';

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
        <Link to={`/exercise/edit/${-1}`}><Button>Add Exercise</Button></Link>
        
      </div>
    </div>
  )
}

export default EditWorkoutSection