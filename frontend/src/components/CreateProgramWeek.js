import { Row, Col } from 'react-bootstrap';
import CreateProgramDayCard from '../components/CreateProgramDayCard';

const CreateProgramWeek = ({week, program}) => {
  return (
    <Row className="justify-content-center text-center my-2">
      <Col><CreateProgramDayCard day={program.program_days[(week * 7)]}/></Col>
      <Col><CreateProgramDayCard day={program.program_days[(week * 7) + 1]}/></Col>
      <Col><CreateProgramDayCard day={program.program_days[(week * 7) + 2]}/></Col>
      <Col><CreateProgramDayCard day={program.program_days[(week * 7) + 3]}/></Col>
      <Col><CreateProgramDayCard day={program.program_days[(week * 7) + 4]}/></Col>
      <Col><CreateProgramDayCard day={program.program_days[(week * 7) + 5]}/></Col>
      <Col><CreateProgramDayCard day={program.program_days[(week * 7) + 6]}/></Col>
    </Row>
  )
}

export default CreateProgramWeek