
const ExerciseTable = ({num, exercise}) => {
  return (
    <div className='exercise-container'>
      <h6>{num}. {exercise.exercise_base.name}</h6>
      <div className="exercise-table-container">
      <table className="exercise-table">
        <thead>
          <tr>
            <th className="cell set-col rcell">Set</th>
            <th className="cell data-col">Reps</th>
            <th className="cell data-col">Weight</th>
            <th className="cell data-col">Distance</th>
            <th className="cell data-col">Time</th>
          </tr>
        </thead>
        <tbody>
          {exercise.sets.sort((a,b)=>{return a.number-b.number}).map((set, index)=>(
            <tr key={`es${index}`}>
              <td className="cell rcell">{set.number}</td>
              <td className="cell">{set.planned_reps}</td>
              <td className="cell">{set.planned_weight}</td>
              <td className="cell">{set.planned_distance}</td>
              <td className="cell">{set.planned_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ExerciseTable