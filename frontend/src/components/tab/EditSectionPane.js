import { useContext, useEffect, useState } from 'react';
import { Button, TextInput, EditExercises } from '../components';
import AuthContext from '../../utils/AuthContext';
import _ from 'lodash';
import ironAPI from '../../utils/ironAPI';

const EditSectionPane = ({setEdit, section, fetchWorkout}) => {
  const { state } = useContext(AuthContext);
  const initialValues = section ? _.cloneDeep(section) : sectionShape()
  const [data, setData] = useState(initialValues)

  const sectionShape = () => {
    return {
      section_type: "",
      workout: null,
      number: null,
      exercises: [
        {
          exercise_base: {
            id: -1,
            name: ""
          },
          schema: {
            is_reps: false,
            is_weight: false,
            is_distance: false,
            is_time: false,
          },
          sets: [
            {
              number: 1,
              planned_reps: 0,
              reps: 0,
              planned_weight: 0,
              weight: 0,
              planned_distance: 0,
              distance: 0,
              planned_time_secs: 0,
              time_secs: 0
            }
          ]
        }
      ]
    }
  }

  const updateData = (key, value) => {
    let newData = data
    newData[key] = value
    setData(newData)
  }

  const handleSubmit = async () => {
    console.log("form data:", data)
    try {
      // update the section itself
      let sectionData = {
        section_type: data.section_type,
        description: data.description,
        workout: data.workout,
        number: data.number
      }
      let response = await ironAPI.createOrUpdateSection(data.id, sectionData, state.userToken)
      console.log('Success updating section object')

      data.exercises.forEach( async (exercise)=>{
        // first update the exercise base, if needed
        // exerciseBaseId is to pass the exercise base id on to the exercise in its update
        // and if a new exercise base, to capture the newly created exercise base if 
        // after its created
        let exerciseBaseId = exercise.exercise_base.value
        if ( exerciseBaseId === -1 ) {
          let exerciseBaseData = {
            name: exercise.exercise_base.label
          }
          response = await ironAPI.createExerciseBase(exerciseBaseData, state.userToken)
          console.log('Success creating exercise_base object')
          exerciseBaseId = response.data.id
        }

        // then update the main exercise object itself
        // updatedExercise is to capture the newly created/updated exercise to use in
        // follow up calls to update its dependent objects in the event its newly created
        // and now has an Id
        let updatedExercise = null
        let exerciseData = {
          exercise_base: exerciseBaseId,
          section: data.id,
          number: exercise.number
        }
        response = await ironAPI.createOrUpdateExercise(exercise.id, exerciseData, state.userToken)
        console.log('Success updating exercise object')
        console.log('Updated exercise: ', response.data)
        updatedExercise = response.data

        // then update the exercise's set schema
        let setSchemaData = {
          is_distance: exercise.set_schema.is_distance,
          is_reps: exercise.set_schema.is_reps,
          is_time: exercise.set_schema.is_time,
          is_weight: exercise.set_schema.is_weight
        }
        response = ironAPI.updateSetSchema(updatedExercise.set_schema, setSchemaData, state.userToken)
        console.log('Success updating set schema object')

        // finally update each of the sets
        exercise.sets.forEach(async (set)=>{
          let setData = {
            exercise: updatedExercise.id,
            number: set.number,
            planned_reps: parseInt(set.planned_reps),
            planned_weight: parseInt(set.planned_weight),
            planned_distance: parseFloat(set.planned_distance).toFixed(2),
            planned_time_secs: parseInt(set.planned_time_secs)
          }
          response = await ironAPI.createOrUpdateSet(set.id, setData, state.userToken)
          console.log('Success updating set object')
        })
      })
    } catch (error) {
      alert('Issue with saving exercise')
      throw new Error(error)
    }
    fetchWorkout()
    setEdit(false)
  }

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
            <Button variant="green" onClick={handleSubmit} disabled={false}>
                Save
            </Button>
          </div> 
        </div>
      }
    </div>
    }
    </>
  )
}

export default EditSectionPane