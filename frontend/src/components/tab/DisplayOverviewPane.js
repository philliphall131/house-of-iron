import { Button } from "../components"

const DisplayOverviewPane = ({setEdit, workout}) => {
  return (
    <div className='workout-pane'>
      <h5>Workout Overview</h5>
      <p>
        {workout.description ? workout.description :
        "No description yet, hit edit below to sketch out an overview of your workout"}
      </p>
      <div className="workout-pane-button-container">
        <Button variant="green" onClick={()=>setEdit(true)}>Edit</Button>
      </div>
      
      
    </div>
  )
}

export default DisplayOverviewPane