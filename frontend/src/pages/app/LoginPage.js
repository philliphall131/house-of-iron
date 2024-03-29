import { useContext } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import ironAPI from '../../utils/ironAPI';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../utils/AuthContext';
  
const LoginPage = () => {
  let navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const validationSchema = yup.object().shape({
    email: yup.string()
      .required('Email is required')
      .email('Not a valid email'),
    password: yup.string()
      .required('Password is required')
      .min(4, 'Password length should be at least 4 characters'),
  })

  const initialValues = {
    email:'',
    password:'',
  };

  const onSubmit = async (values, { setSubmitting, setFieldError })=> {
    ironAPI.login(values)
      .then((response)=>{
        dispatch({ type: 'SIGN_IN', data: response.data });
        navigate("/dashboard", { replace: true });
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
          <div className="form-body-auth">
            <Form.Group className="form-inputs-auth" controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                  type="text" 
                  name="email"
                  value={values.email}
                  placeholder="Enter your email" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-inputs-auth" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                  type="password" 
                  name= "password"
                  value={values.password}
                  placeholder="Password" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <button className="green-button mt-2" type="submit" disabled={isSubmitting}>
                Submit
            </button>
            <div className="general-error">{errors.general}</div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginPage