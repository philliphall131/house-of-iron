import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ironAPI from '../utils/ironAPI';
import AuthContext from '../utils/AuthContext';
import { EditorContainer, ExercisePick } from '../components/components';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';

const EditExercisePage = () => {
  const { state } = useContext(AuthContext);
  let { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    if (exerciseId > 0){
      fetchExercise();
    }
  }, [exerciseId, state]);

  const onSubmit = (values)=> {
    console.log(values)
    // ironAPI.login(values)
    //   .then((response)=>{
    //     dispatch({ type: 'SIGN_IN', data: response.data });
    //     navigate("/dashboard", { replace: true });
    //   })
    //   .catch(error=>{
    //     setFieldError('general', error.response.data.error)
    //   })
    //   .finally(()=>{
    //     setSubmitting(false)
    //   })
  }

  const fetchExercise = () => {
    ironAPI.getExercise(exerciseId, state.userToken)
      .then((response)=>{
        console.log(response.data)
        setExercise(response.data)
      })
      .catch(()=>{
        console.log('error with getting exercise')
      })
  }

  return (
    <div>
      {/* <EditorHeader title={exercise ? exercise.exercise_base.name : 'New Exercise'}/> */}
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0">Exercise Editor</div>
          <div className="workout-editor-body">
            <ExercisePick />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditExercisePage