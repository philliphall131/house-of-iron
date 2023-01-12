import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const ProgramThumbnail = () => {
  return (
    <Col className='thumbnail-col'>
      <Card className='mb-2' style={{ width: '12rem' }}>
        <Card.Body>
          <Card.Title>A Program</Card.Title>
          <Card.Text className="mb-0">Some Program Info</Card.Text>
          <Button variant="success">Edit</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ProgramThumbnail