import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ironAPI from '../utils/ironAPI';
import '../styles/Form.css';
import weights from '../assets/weights.jpg';
import '../styles/Program.css';
import AuthContext from '../utils/AuthContext';
import AddSectionModal from '../components/AddSectionModal';
import EditWorkoutSection from '../components/EditWorkoutSection';

const EditWorkoutPage = () => {
  const { state } = useContext(AuthContext);
  let { workoutId } = useParams();
  const [workout, setWorkout] = useState(null)
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, [workoutId, state]);

  const fetchWorkout = () => {
    ironAPI.getWorkout(workoutId, state.userToken)
      .then((response)=>{
        setWorkout(response.data)
      })
  }

  const handleClose = (update=false) => {
    if (update){
      fetchWorkout()
    }
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const deleteSection = (sectionId) => {
    ironAPI.deleteSection(sectionId, state.userToken)
      .then((response)=>{
        fetchWorkout()
      })
      .catch(()=>{
        console.log('Error deleting section')
      })
  }

  const renderSections = () => {
    return (
      <>
        {
          workout && workout.sections
            ?
              workout.sections.map((section, i)=>(
                <EditWorkoutSection key={`EWS${i}`} section={section} deleteSection={deleteSection}/>
              ))
            :
              <p>
                To get started, click below to give the workout its first 'section',
                then add some exercises to that section. 
              </p>
        }
      </>
    )
  }

  return (
    <div>
      { workout ? 
      <>
      <img className="header-pic" src={weights} alt=""/>
      <div className="program-title">{workout.name}</div>
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0">Workout Editor</div>
          <div className="workout-editor-body">
            { renderSections() }
            <div className="edit-workout-section pb-3">
              <Button variant="primary" onClick={handleShow}>
                Add a section
              </Button>
            </div>
          </div>
          <div className="save-workout-col my-3">
            <Button>Save Workout</Button>
          </div>
          <AddSectionModal show={show} handleClose={handleClose} workoutId={workoutId}/>
        </div>
      </div>
      </> : <>
      <p>Loading</p>
      </>
      }
    </div>
  )
}

export default EditWorkoutPage