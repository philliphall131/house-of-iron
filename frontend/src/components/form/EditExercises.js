import { useState, useEffect } from "react"
import { EditExercise } from "../components"

const EditExercises = ({name, value, updateData}) => {
  const [exercisesData, setExercisesData] = useState(value ? value : null)

  useEffect(()=>{
    updateData(name, exercisesData)
  }, [JSON.stringify(exercisesData)])

  const updateExercisesData = (subName, val) => {
    let newData = exercisesData
    let index = parseInt(subName)
    newData[index] = val
    setExercisesData(newData)
  }

  return (
    <div className="edit-exercises-container">
      {
        exercisesData && exercisesData.map((exercise, index)=>(
          <EditExercise
            key={`ee${index}`}
            name={index}
            value={exercise}
            updateExercisesData={updateExercisesData}
          />
        ))
      }
    </div>
  )
}

export default EditExercises