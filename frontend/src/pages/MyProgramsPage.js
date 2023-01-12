import weights from '../assets/weights.jpg';
import '../styles/Program.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import ProgramThumbnail from '../components/ProgramThumbnail';

const MyProgramsPage = () => {
  return (
    <div>
      <img className="header-pic" src={weights} alt=""/>
      <div className="program-title">My Programs</div>
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0"></div>
          <Container className='program-container'>
            <Row className='my-2 text-center programs-group'>
              <Row><Col>One Type of Program</Col></Row>
              <hr/>
              <Row>
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
              </Row>
            </Row>
            <Row className='my-2 text-center programs-group'>
              <Row><Col>One Type of Program</Col></Row>
              <hr/>
              <Row>
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
                <ProgramThumbnail />
              </Row>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default MyProgramsPage