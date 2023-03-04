import CreatableSelect from 'react-select/creatable';
import { useContext, useEffect, useState } from 'react';
import ironAPI from '../../utils/ironAPI';
import AuthContext from '../../utils/AuthContext';
import { CloseButton } from 'react-bootstrap';

const createOption = (exercise) => {
  if (exercise == null){
    return null
  }
  return { 
    value: exercise.id, label: exercise.name 
  }
}

const ExerciseSelect = ({name, value, num, updateExercise}) => {
  const { state } = useContext(AuthContext);
  const [options, setOptions] = useState([]);
  const [selectValue, setSelectValue] = useState(value ? createOption(value):null)

  useEffect(() => {
    loadExercises()
  }, []);

  useEffect(() => {
    updateExercise(name, selectValue)
  }, [selectValue]);

  const loadExercises = () => {
    ironAPI.getBaseExercises(state.userToken)
      .then((response)=>{
        const newOptions = response.data.map((exercise)=>createOption(exercise))
        setOptions(newOptions)
      })
      .catch(()=>{
        console.log('issue with getting Base Exercises')
      });
  };

  const handleCreate = (inputValue) => {
    let newObj = {id: -1, name: inputValue}
    setOptions([...options, createOption(newObj)]);
    let obj = createOption(newObj)
    setSelectValue(obj);
  };

  const handleChange = (val) => {
    setSelectValue(val)
  }

  return (
    <div className='exercise-select-container'>
      <label>{num}. </label>
      <div className='exercise-select'>
        <CreatableSelect
          isClearable 
          onChange={handleChange}
          onCreateOption={handleCreate}
          options={options}
          value={selectValue}
          classNamePrefix="ph"
          placeholder="Select or type an exercise"
        />
      </div>
    </div>
  )
}

export default ExerciseSelect