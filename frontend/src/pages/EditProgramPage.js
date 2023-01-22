import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/Form.css';
import ironAPI from '../utils/ironAPI';
import weights from '../assets/weights.jpg';
import '../styles/Program.css';
import CreateProgramWeek from '../components/CreateProgramWeek';

const EditProgramPage = ({state}) => {
  const [program, setProgram] = useState(null);
  let { programId } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    // fetch the program data from API backend
    const fetchProgram = () => {
      ironAPI.getProgram(programId, state.userToken)
        .then((response)=>{
          setProgram(response.data)
        })
    }
    fetchProgram();
  }, [programId, state]);

  const addWorkout = (day) => {
    let data = {
      program_day: day.id,
    }
    ironAPI.addWorkout(data, state.userToken)
      .then((response)=>{
        navigate(`/workout/edit/${response.data.id}`)
      })
      .catch(()=>{
        console.log('error with adding a new workout')
      })
  }

  let displayWeeks = () => {
    let weeks = [];
    for (let i=0; i<program.duration_wks; i++){
      weeks.push(<CreateProgramWeek addWorkout={addWorkout} key={`wk-${i}`} week={i} program={program}/>)
    }
    return weeks
  }

  return (
    <div>
      <img className="header-pic" src={weights} alt=""/>
      <div className="program-title">{program && program.name}</div>
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0">Program Editor</div>
          <Container>
            <Row className='my-2'>
              {program && program.duration_wks > 1 && 
                <Col className='text-center'><Button variant="outline-dark">Copy Week 1 Template</Button></Col>
              }
            </Row>
            {program && program.duration_wks && displayWeeks()}
            <Row className='mb-3'>
              <Col className='text-center'>
                <Button variant='danger'>Delete Program</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default EditProgramPage