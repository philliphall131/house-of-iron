
const ExerciseTable = ({exercise}) => {

  let showR = exercise.set_schema.is_reps
  let showW = exercise.set_schema.is_weight
  let showD = exercise.set_schema.is_distance
  let showT = exercise.set_schema.is_time

  let displayTable = true
  if ((!showR && !showW && !showD && !showT) || exercise.sets.length == 0){
    displayTable = false
  }

  return (
    <div className='exercise-container'>
      <h6>{exercise.number}. {exercise.exercise_base.name}</h6>
      <div className="exercise-table-container">
      { displayTable ?
        <table className="exercise-table">
          <thead>
            <tr>
              <th className="cell set-col rcell">Set</th>
              {showR && <th className="cell data-col">Reps</th>}
              {showW && <th className="cell data-col">Weight</th>}
              {showD && <th className="cell data-col">Distance</th>}
              {showT && <th className="cell data-col">Time</th>}
            </tr>
          </thead>
          <tbody>
            {exercise.sets.sort((a,b)=>{return a.number-b.number}).map((set, index)=>(
              <tr key={`es${index}`}>
                <td className="cell rcell">{set.number}</td>
                {showR && <td className="cell">{set.planned_reps}</td>}
                {showW && <td className="cell">{set.planned_weight}</td>}
                {showD && <td className="cell">{set.planned_distance}</td>}
                {showT && <td className="cell">{set.planned_time}</td>}
              </tr>
            ))}
          </tbody>
        </table> :
        <div>No sets on this exercise, select Edit to get started</div>
      }
      </div>
    </div>
  )
}

export default ExerciseTable