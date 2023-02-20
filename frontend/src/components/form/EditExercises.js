import { useState, useEffect } from "react"
import { EditExercise } from "../components"

const EditExercises = ({name, value, updateData}) => {
  const [exercisesData, setExercisesData] = useState(value)

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
    <>
      <EditExercise 
        name={"0"}
        value={exercisesData[0]}
        updateExercisesData={updateExercisesData}
      />
      <div>
        
      </div>
    </>
  )
}

export default EditExercises