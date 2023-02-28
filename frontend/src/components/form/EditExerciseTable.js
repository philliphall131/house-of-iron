import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../utils/AuthContext';
import ironAPI from '../../utils/ironAPI';
import { ToggleSwitch, EditExerciseRow, IconButton } from '../components';

const EditExerciseTable = ({exercise, updateExercise}) => {
  const { state } = useContext(AuthContext);
  const [sets, setSets] = useState(exercise.sets.sort((a,b)=>{return a.number-b.number}))
  const [checked, setChecked] = useState({
    is_reps: exercise.set_schema.is_reps,
    is_weight: exercise.set_schema.is_weight,
    is_distance: exercise.set_schema.is_distance,
    is_time: exercise.set_schema.is_time
  })

  useEffect(()=>{
    updateExercise('sets', sets)
  }, [JSON.stringify(sets)])

  useEffect(()=>{
    if (sets.length == 0){
      addRow()
    }
  },[])

  const updateChecked = (key) =>{
    setChecked({
      ...checked,
      [key]: !checked[key]
    })
    let newSchema = exercise.set_schema
    newSchema[key] = !exercise.set_schema[key]
    updateExercise('set_schema', newSchema)
  }

  const updateRow = (id, val) => {
    let newSets = sets
    newSets[id] = val
    setSets(newSets)
  }

  const addRow = () => {
    let newSet = {
      id: -1,
      exercise: sets[0] ? (sets[0].exercise ? sets[0].exercise : -1): -1,
      number: sets.length + 1,
      planned_reps: null,
      planned_weight: null,
      planned_distance: null,
      planned_time_secs: null
    }
    setSets([...sets, newSet])
  }

  const removeRow = async () => {
    if (sets.length > 1) {
      let newSets = [...sets]
      let delSet = newSets.pop()
      setSets(newSets)
      let response = await ironAPI.deleteSet(delSet.id, state.userToken)
      console.log("Deleted set")
    }
  }

  return (
    <div className='edit-exercise-table-container'>
      <div className="exercise-table-container">
        <table className="exercise-table">
          <thead>
            <tr>
              <th className="cell set-col rcell">
                <div className="table-header-cell">
                  <span>Set</span>
                </div>
              </th>
              <th className="cell data-col">
                <div className="table-header-cell">
                  <span>Reps</span>
                  <ToggleSwitch 
                    id={1} 
                    name={'is_reps'} 
                    toggle={updateChecked}
                    checked={checked.is_reps}
                  />
                </div>
              </th>
              <th className="cell data-col">
                <div className="table-header-cell">
                  <span>Weight</span>
                  <ToggleSwitch 
                    id={2} 
                    name={'is_weight'} 
                    toggle={updateChecked}
                    checked={checked.is_weight}
                  />
                </div>
              </th>
              <th className="cell data-col">
                <div className="table-header-cell">
                  <span>Distance</span>
                  <ToggleSwitch 
                    id={3} 
                    name={'is_distance'} 
                    toggle={updateChecked}
                    checked={checked.is_distance}
                  />
                </div>
              </th>
              <th className="cell data-col">
                <div className="table-header-cell">
                  <span>Time</span>
                  <ToggleSwitch 
                    id={4} 
                    name={'is_time'} 
                    toggle={updateChecked}
                    checked={checked.is_time}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            { 
              sets.map((set, index)=>(
                <EditExerciseRow 
                  key={`${set.id}eer${index}`}
                  id={index}
                  set={set}
                  checked={checked} 
                  updateRow={updateRow}
                />
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='exercise-table-buttons'>
        <IconButton type='plus' onClick={addRow} />
        <IconButton type='minus' onClick={removeRow} />
      </div>
      
    </div>
  )
}

export default EditExerciseTable