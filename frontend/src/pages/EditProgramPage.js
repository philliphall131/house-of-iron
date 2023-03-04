import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ironAPI from '../utils/ironAPI';
import { CreateProgramWeek, EditorContainer } from '../components/components';
import AuthContext from '../utils/AuthContext';

const EditProgramPage = () => {
  const { state } = useContext(AuthContext);
  const [program, setProgram] = useState(null);
  let { programId } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    const fetchProgram = () => {
      ironAPI.getProgram(programId, state.userToken)
        .then((response)=>{
          setProgram(response.data)
        })
    }
    fetchProgram();
  }, [programId, state]);

  const addWorkout = (day, number) => {
    let data = {
      program_day: day.id,
      number: number
    }
    ironAPI.addWorkout(data, state.userToken)
      .then((response)=>{
        navigate(`/workout/edit/${response.data.id}`)
      })
      .catch((error)=>{
        console.log('error with adding a new workout')
        console.log(error)
      })
  }

  return (
    <>
      { 
        program && 
          <EditorContainer title={program.name}>
            <div className='program-container'>
              {/* <div className='copy-template-button'>
                {program && program.duration_wks > 1 && 
                  <Col className='text-center'><Button variant="outline-dark">Copy Week 1 Template</Button></Col>}
              </div> */}
              {Array.from({length: program.duration_wks}, (_,i) => (
                <CreateProgramWeek addWorkout={addWorkout} key={`wk-${i}`} week={i} program={program}/>
              ))}
              <Row className='mb-3'>
                <Col className='text-center'>
                  <Button variant='danger'>Delete Program</Button>
                </Col>
              </Row>
            </div>
          </EditorContainer>
      }
    </>
  )
}

export default EditProgramPage