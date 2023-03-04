import { useState, useEffect } from 'react';
import { EditExerciseTable, ExerciseSelect } from '../components';

const EditExercise = ({name, value, updateExercisesData}) => {
  const [exerciseValues, setExerciseValues] = useState(value)

  useEffect(()=>{
    updateExercisesData(name, exerciseValues)
  },[exerciseValues])

  const updateExercise = (subName, val) => {
    let newData = exerciseValues
    newData[subName] = val
    setExerciseValues(newData)
  }

  return (
    <div className='edit-exercise'>
      <ExerciseSelect
        name={'exercise_base'}
        num = {exerciseValues.number}
        value={exerciseValues.exercise_base}
        updateExercise={updateExercise}
      />
      <EditExerciseTable
        exercise={exerciseValues}
        updateExercise={updateExercise}
      />
    </div>
    
  )
}

export default EditExercise