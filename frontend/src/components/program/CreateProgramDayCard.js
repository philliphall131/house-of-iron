import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateProgramDayCard = ({day, addWorkout}) => {

  const renderWorkouts = () => {
    if (day.workouts.length) {
      return day.workouts.map((workout, i)=>{
        if (!workout.name){
          workout.name = 'A workout'
        }
        return(
          <Link to={`/workout/edit/${workout.id}`} key={`wb${i}`}>
            <Button variant="warning" text="dark" size='sm' className="my-1">{workout.name}</Button>
          </Link>
        )
      })
    } else {
      return <Badge pill bg="secondary" className="my-1">No Workouts</Badge>
    }
  }

  return (
    <Card style={{ width: '10rem' }}>
      <Card.Body>
        <Card.Title>Day {day && day.day}</Card.Title>
        <Card.Subtitle>Type:</Card.Subtitle>
        <Card.Text className="mb-0">{day && day.day_type}</Card.Text>
        { renderWorkouts() }
      </Card.Body>
      <Card.Footer>
        <Button variant="success" onClick={()=>addWorkout(day)}>Add Workout</Button>
      </Card.Footer>
      
    </Card>
  )
}

export default CreateProgramDayCard