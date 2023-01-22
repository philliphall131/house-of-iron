import { Row, Col, CardGroup } from 'react-bootstrap';
import CreateProgramDayCard from '../components/CreateProgramDayCard';

const CreateProgramWeek = ({week, program, addWorkout}) => {
  return (
    <Row className="justify-content-center text-center my-2">
      <Col>
        <CardGroup>
          <CreateProgramDayCard addWorkout={addWorkout} day={program.program_days[(week * 7)]}/>
          <CreateProgramDayCard addWorkout={addWorkout} day={program.program_days[(week * 7) + 1]}/>
          <CreateProgramDayCard addWorkout={addWorkout} day={program.program_days[(week * 7) + 2]}/>
          <CreateProgramDayCard addWorkout={addWorkout} day={program.program_days[(week * 7) + 3]}/>
          <CreateProgramDayCard addWorkout={addWorkout} day={program.program_days[(week * 7) + 4]}/>
          <CreateProgramDayCard addWorkout={addWorkout} day={program.program_days[(week * 7) + 5]}/>
          <CreateProgramDayCard addWorkout={addWorkout} day={program.program_days[(week * 7) + 6]}/>
        </CardGroup>
      </Col>
    </Row>
  )
}

export default CreateProgramWeek