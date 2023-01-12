import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../ContextObjs';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/Form.css';
import ironAPI from '../utils/ironAPI';
import weights from '../assets/weights.jpg';
import '../styles/Program.css';
import CreateProgramWeek from '../components/CreateProgramWeek';

const CreateWorkoutsPage = () => {
  const { state } = useContext(StateContext);
  const [program, setProgram] = useState(null);
  let { programId } = useParams();

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

  let displayWeeks = () => {
    let weeks = [];
    for (let i=0; i<program.duration_wks; i++){
      weeks.push(<CreateProgramWeek key={`wk-${i}`} week={i} program={program}/>)
    }
    return weeks
  }

  return (
    <div>
      <img className="header-pic" src={weights} alt=""/>
      <div className="program-title">{program && program.name}</div>
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0">Schedule</div>
          <Container>
            <Row className='my-2'>
              {program && program.duration_wks > 1 && 
                <Col className='text-center'><Button variant="outline-dark">Copy Week 1 Template</Button></Col>
              }
            </Row>
            {program && program.duration_wks && displayWeeks()}
          </Container>
        </div>
      </div>
    </div>
  )
}

export default CreateWorkoutsPage