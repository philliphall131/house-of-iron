import { Card, Button, Badge } from "react-bootstrap";

const CreateProgramDayCard = ({day}) => {
  return (
    <Card style={{ width: '10rem' }}>
      <Card.Body>
        <Card.Title>Day {day && day.day}</Card.Title>
        <Card.Subtitle>Type:</Card.Subtitle>
        <Card.Text className="mb-0">{day && day.day_type}</Card.Text>
        <Badge pill bg="secondary" className="my-1">No Workouts</Badge>
        <Button variant="success">Add Workout</Button>
      </Card.Body>
    </Card>
  )
}

export default CreateProgramDayCard