import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "../components";

const CreateProgramDayCard = ({day, addWorkout}) => {

  return (
    <Card style={{ width: '10rem' }}>
      <Card.Body className="px-0">
        <Card.Title>Day {day && day.day}</Card.Title>
        { day.workouts.length ?
          day.workouts.map((workout, i)=>{
            if (!workout.name){
              workout.name = 'A workout'
            }
            return(
              <Link to={`/workout/edit/${workout.id}`} key={`wb${i}`}>
                <Button variant="orange">{workout.name}</Button>
              </Link>
            )
          }) :
          <Badge pill bg="secondary" className="my-1">No Workouts</Badge>
        }
      </Card.Body>
      <Card.Footer>
        <Button variant="green" size="md" onClick={()=>addWorkout(day)}>Add Workout</Button>
      </Card.Footer>
      
    </Card>
  )
}

export default CreateProgramDayCard