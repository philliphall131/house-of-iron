import { useEffect, useState } from 'react';
import { TableInput } from '../components';

const EditExerciseRow = ({id, set, checked, updateRow}) => {
  const [row, setRow] = useState(set)

  useEffect(()=>{
    updateRow(id, row)
  }, [row])

  const updateRowData = (name, val) => {
    let newRow = row
    newRow[name] = val
    setRow(newRow)
  }

  return (
    <tr>
      <td className="cell rcell">{row.number}</td>
      <TableInput name={`planned_reps`} value={row.planned_reps} updateRowData={updateRowData} disabled={!checked.is_reps}/>
      <TableInput name={`planned_weight`} value={row.planned_weight} updateRowData={updateRowData} disabled={!checked.is_weight}/>
      <TableInput name={`planned_distance`} value={row.planned_distance} updateRowData={updateRowData} disabled={!checked.is_distance}/>
      <TableInput name={`planned_time_secs`} value={row.planned_time} updateRowData={updateRowData} disabled={!checked.is_time}/>
    </tr>
  )
}

export default EditExerciseRow