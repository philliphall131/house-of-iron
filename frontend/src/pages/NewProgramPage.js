import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import '../styles/Form.css';
import ironAPI from '../utils/ironAPI';

const NewProgramPage = ({state}) => {
    const maxDuration = 26;
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('A name for your program is required'),
        duration_wks: yup.number()
            .required('Pick a program duration'),
        description: yup.string()
    })

    const initialValues = {
        name:'',
        duration_wks:'4',
        description:''
    };

    const onSubmit = (values, { setSubmitting, setFieldError })=> {
        ironAPI.createNewProgram(values, state.userToken)
          .then((response)=>{
            navigate(`/program/edit/${response.data.id}`, {replace:true})
          })
          .catch(error=>{
            alert('error')
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
                            name="duration_wks"
                            value={values.duration_wks}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.duration_wks && !!errors.duration_wks}
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