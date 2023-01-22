import { Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Program.css';

const ProgramThumbnail = ({program}) => {
  return (
    <Card className='mb-2'>
      <Card.Body className='mb-2 justify-content-center text-center'>
        <Card.Title>{program.name}</Card.Title>
        <Card.Subtitle>{program.duration_wks} week cycle</Card.Subtitle>
        <Card.Text className="mb-0">{program.description}</Card.Text>
        <Link to={`/program/edit/${program.id}`}><Button variant="success">Edit</Button></Link>
      </Card.Body>
    </Card>
  )
}

export default ProgramThumbnail