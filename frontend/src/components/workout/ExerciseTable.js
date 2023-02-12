
const ExerciseTable = ({num, name}) => {
  return (
    <div className='exercise-container'>
      <h6>{num}. {name}</h6>
      <table className="exercise-table">
        <thead>
          <tr>
            <th className="cell set-col rcell">Set</th>
            <th className="cell data-col">Reps</th>
            <th className="cell data-col">Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="cell rcell">1</td>
            <td className="cell">10</td>
            <td className="cell">135</td>
          </tr>
          <tr>
            <td className="cell rcell">2</td>
            <td className="cell">8</td>
            <td className="cell">225</td>
          </tr>
          <tr>
            <td className="cell rcell">3</td>
            <td className="cell">6</td>
            <td className="cell">250</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ExerciseTable