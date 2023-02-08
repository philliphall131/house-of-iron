import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import AuthContext from '../../utils/AuthContext';
import ironAPI from '../../utils/ironAPI';

const AddSectionModal = ({show, handleClose, workoutId}) => {
  const { state } = useContext(AuthContext);

  const validationSchema = yup.object().shape({
    section_type: yup.string()
      .required('A section type is required')
      .min(3, 'Password length should be at least 3 characters'),
  })

  const initialValues = {
    section_type:'',
  };

  const onSubmit = async (values, { setSubmitting, setFieldError })=> {
    values['workout'] = workoutId

    ironAPI.addSection(values, state.userToken)
      .then((response)=>{
        handleClose(true)
      })
      .catch(error=>{
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
          <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
          centered>
            <Modal.Header closeButton>
              <Modal.Title>Section Type:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="form-inputs" controlId="formSection_type">
                <Form.Control 
                    type="text" 
                    name="section_type"
                    value={values.section_type}
                    placeholder="ex. 'Stamina', 'Cardio', or 'Main Lift 1'" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.section_type && !!errors.section_type}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.section_type}
                </Form.Control.Feedback>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
              <div className="general-error">{errors.general}</div>
            </Modal.Footer>
          </Modal>
        </Form>
      )}
    </Formik>
  )
}

export default AddSectionModal