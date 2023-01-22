import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/Form.css';
import weights from '../assets/weights.jpg';
import '../styles/Program.css';

const EditWorkoutPage = () => {
  const [workout, setWorkout] = useState(null)

  useEffect(() => {
    // fetch the program data from API backend
    const fetchProgram = () => {
      ironAPI.getProgram(programId, state.userToken)
        .then((response)=>{
          setWorkout(response.data)
        })
    }
    fetchProgram();
  }, [programId, state]);

  return (
    <div>
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
    </div>
  )
}

export default EditWorkoutPage