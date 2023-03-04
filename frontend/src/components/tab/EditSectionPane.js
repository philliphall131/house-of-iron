import { useContext, useState, useEffect } from 'react';
import { Button, TextInput, EditExercises, NotificationnModal } from '../components';
import AuthContext from '../../utils/AuthContext';
import _ from 'lodash';
import ironAPI from '../../utils/ironAPI';

const EditSectionPane = ({setEdit, section, fetchWorkout}) => {
  const { state } = useContext(AuthContext);
  const initialValues = _.cloneDeep(section)
  const [data, setData] = useState(initialValues)
  const [showNotifyModal, setShowNotifyModal] = useState(false)

  const updateData = (key, value) => {
    let newData = data
    newData[key] = value
    setData(newData)
  }

  const handleSubmit = async () => {
    console.log("form data:", data)
    ironAPI.fullUpdateSection(data.id, data, state.userToken)
      .then(()=>{
        fetchWorkout()
        setEdit(false)
      })
  }

  const addExercise = () => {
    let exerciseNum = 0
    let len = 0
    if (data && data.exercises) {
      len = data.exercises.length
      exerciseNum = len + 1
    } else {
      exerciseNum = 1
    }

    let newExercise = {
      id: -1,
      number: exerciseNum,
      exercise_base: null,
      set_schema: {
        is_reps: false,
        is_weight: false,
        is_distance: false,
        is_time: false,
      },
      sets: [
        {
          id: -1,
          number: 1,
          planned_reps: 0,
          planned_weight: 0,
          planned_distance: 0,
          planned_time_secs: 0,
        }
      ]
    }
    setData({
      ...data,
      exercises: [...data.exercises, newExercise]
    })
  }

  const removeExercise = () => {
    if (data.exercises.length == 1){
      setShowNotifyModal(true)
      return
    }
    let newExercises = [...data.exercises]
    newExercises.pop()
    setData({
      ...data,
      exercises: newExercises
    })
  }

  const handleCloseNotify = () => setShowNotifyModal(false)

  return (
    <>
    {data && 
    <div className="section-pane">
      {data &&
        <div className="section-pane-inputs">
          <TextInput
            name="section_type"
            type="text" 
            label="Section"
            className="section-title-input"
            valu={data.section_type}
            updateData={updateData}
          />
          <EditExercises 
            name="exercises"
            value={data.exercises}
            updateData={updateData}
          />
          <div className='form-footer'>
            <Button variant="green" onClick={addExercise}>Add Exercise</Button>
            <Button variant="green" onClick={removeExercise}>Remove Exercise</Button>
            <Button variant="green" onClick={handleSubmit}>Save Exercises</Button>
          </div> 
        </div>
      }
      <NotificationnModal 
        showNotifyModal={showNotifyModal} 
        handleCloseNotify={handleCloseNotify}
        notifyText={"You cannot remove all the exercises in a section. " +
          "If you want to remove this section use the panel on the left."}
      />
    </div>
    }
    </>
  )
}

export default EditSectionPane