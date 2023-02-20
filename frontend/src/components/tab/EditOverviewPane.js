import { useContext } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import ironAPI from '../../utils/ironAPI';
import AuthContext from '../../utils/AuthContext';
import { Button } from '../components';

const EditOverviewPane = ({setEdit, workout, fetchWorkout}) => {
  const { state } = useContext(AuthContext);

  const validationSchema = yup.object().shape({
    description: yup.string()
  })

  const initialValues = {
    description: workout.description,
  };

  const onSubmit = async (values, { setSubmitting, setFieldError })=> {
    ironAPI.updateWorkout(workout.id, values, state.userToken)
      .then((response)=>{
        fetchWorkout()
        setEdit(false)
      })
      .catch(error=>{
        console.log(error)
        setFieldError('general', error.response.data.error)
      })
      .finally(()=>{
        setSubmitting(false)
      })
  }

  return (
    <Formik 
      validateOnBlur={false}
      validateOnChange={false} 
      {...{initialValues, onSubmit, validationSchema }}
    >
      {({ 
        handleSubmit, 
        handleBlur, 
        handleChange, 
        values, 
        errors, 
        isSubmitting, 
        touched 
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <div className="form-body">
            <Form.Group className="form-input-overview" controlId="formDescription">
              <h5>Workout Overview:</h5>
              <Form.Control 
                  as="textarea" 
                  rows={10} 
                  name="description"
                  value={values.description}
                  placeholder="Sketch out an overview of the workout's sections, exercises and general order here" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="green" type="submit" disabled={isSubmitting}>
                Save
            </Button>
            <div className="general-error">{errors.general}</div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditOverviewPane