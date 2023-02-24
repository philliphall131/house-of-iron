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

  const handleSubmit = () => {
    console.log("form data:", data)
    let sectionData = {
      section_type: data.section_type,
      description: data.description
    }
    ironAPI.updateSection(data.id, sectionData, state.userToken)
      .then(()=>{
        fetchWorkout()
      })
      .catch((error)=>{
        alert('Issue with update section on save')
        console.log(error)
      })
  }

  return (
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
  )
}

export default EditSectionPane