import { useContext, useEffect, useState } from 'react';
import ironAPI from '../utils/ironAPI';
import AuthContext from '../utils/AuthContext';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';

const ExercisePick = () => {
  const { state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    loadExercises()
  }, []);

  useEffect(() => {
    console.log('New Value: ', value)
  }, [value]);

  const createOption = (exercise) => {
    return { value: exercise.id, label: exercise.name }
  }

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
    setIsLoading(true);
    ironAPI.checkExerciseBase(inputValue, state.userToken)
      .then((response)=>{
        if (response.data.exercise_exists){
          console.log('that one already exists')
        }
      })
      .catch(()=>{
        console.log('error with checking the new Base Exercise')
      })
      .finally(()=>{
        setIsLoading(false)
        let newObj = {id: 0, name: inputValue}
        setOptions([...options, createOption(newObj)]);
        setValue(createOption(newObj));
      })
    // setTimeout(() => {
      // const newOption = {
      //   label: inputValue,
      //   value: inputValue.toLowerCase().replace(/\W/g, ''),
      // };
      // setIsLoading(false);
      // setOptions((prev) => [...prev, newOption]);
      // setValue(newOption);
    //   console.log(inputValue)
    // }, 1000);
  };

  return (
    <div className="exercise-select">
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </div>
  );
}

export default ExercisePick