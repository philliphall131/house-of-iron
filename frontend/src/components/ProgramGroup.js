import { Row, Col } from 'react-bootstrap';
import ProgramThumbnail from './ProgramThumbnail';
import { CardGroup } from 'react-bootstrap';

const ProgramGroup = ({title, programGroup}) => {

  const renderProgramGroup = () => {
    let programs = programGroup.map((program,index)=>{
      return(
        <ProgramThumbnail key={`pg${index}`} program={program} />
      )
    })
    return (
      <CardGroup>
        {programs}
      </CardGroup>
    )
  }

  return (
    <Row className='my-2 text-center programs-group'>
      <Row><Col>{title}</Col></Row>
      <hr/>
      <Row>
        <Col>
          { 
            programGroup ? 
              renderProgramGroup() :
              <p>Looks like there arent any Programs here</p>
          }
        </Col>
      </Row>
    </Row>
  )
}

export default ProgramGroup