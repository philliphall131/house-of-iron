import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { StateContext } from '../ContextObjs';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form, Row } from 'react-bootstrap';
import '../styles/Form.css';

const NewProgramPage = () => {
    const { state, dispatch } = useContext(StateContext);
    const maxDuration = 26;
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('A name for your program is required'),
        duration: yup.number()
            .required('Pick a program duration'),
        description: yup.string()
    })

    const initialValues = {
        name:'',
        duration:'4',
        description:''
    };

    const onSubmit = async (values, { setSubmitting, setFieldError })=> {
        console.log(values)
        navigate('schedule')
        // ironAPI.login(values)
        //   .then((response)=>{
        //     console.log('good', response)
        //     dispatch({ type: 'SIGN_IN', data: response.data });
        //     navigate("/dashboard", { replace: true });
        //   })
        //   .catch(error=>{
        //     setFieldError('general', error.response.data.error)
        //   })
        //   .finally(()=>{
        //     setSubmitting(false)
        // })
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
                    <Form.Group className="form-inputs" controlId="formName">
                        <Form.Label>Program Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name"
                            value={values.name}
                            placeholder="Give your program a name:" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-inputs" controlId="formDuration">
                        <Form.Label>Duration (in weeks):</Form.Label>
                        <Form.Select 
                            aria-label="duration-select" 
                            type="select"
                            name="duration"
                            value={values.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.duration && !!errors.duration}
                        >
                            {Array.from({length: maxDuration}, (x,i) => (
                                <option key={`dur-${i}`} value={i+1}>{i+1}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="form-inputs" controlId="formDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control 
                            as="textarea"
                            type="text" 
                            name="description"
                            value={values.description}
                            placeholder="Give your program a short description:" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.description && !!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <button className="submit-button mt-2" type="submit" disabled={isSubmitting}>
                        Next {`>>`}
                    </button>
                    <div className="general-error">{errors.general}</div>
                </div>
            </Form>
          )}
        </Formik>
    )
}

export default NewProgramPage