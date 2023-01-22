import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ironAPI from '../utils/ironAPI';
import '../styles/Form.css';
import weights from '../assets/weights.jpg';
import '../styles/Program.css';

const EditWorkoutPage = ({state}) => {
  const [workout, setWorkout] = useState(null)
  let { workoutId } = useParams();

  useEffect(() => {
    // fetch the program data from API backend
    const fetchProgram = () => {
      ironAPI.getProgram(workoutId, state.userToken)
        .then((response)=>{
          setWorkout(response.data)
        })
    }
    fetchProgram();
  }, [workoutId, state]);

  return (
    <div>
      { workout ? 
      <>
      <img className="header-pic" src={weights} alt=""/>
      <div className="program-title">Workout Name</div>
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0">Workout Editor</div>
          <Container>
            <Row>
              <Col>
                <p>The Workout</p>
              </Col>
            </Row>
          </Container>
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