import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";

import "./SignUpPage.css";

export default function SignUpPage() {

    const history = useHistory();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        acceptTerms: false
    };

    const SignUpSchema = Yup.object().shape({
        username: Yup.string()
                        .min(3, 'Username must contain at least 3 characters.')
                        .max(39, 'Username must not be longer than 39 characters.')
                        .required('Username is required to proceed.'),
        email: Yup.string()
                        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            'Email is not valid. Check if it matches the pattern email@address.com')
                        .required('Email is required to proceed.'),
        password: Yup.string()
                        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
                            'Your password should contain at least one letter, one number and one of those characters: @$!%*#?&')
                        .min(8, 'Password must contain at least 8 characters.')
                        .max(32, 'Password should be no longer than 32 characters.')
                        .required('Password is required to proceed.'),
        passwordConfirmation: Yup.string().when("password", {
                        is: val => (val && val.length > 0 ? true : true),
                        then: Yup.string().oneOf(
                          [Yup.ref("password")],
                          'Your passwords do not match.'
                        )})
                        .required('Please confirm your password.'),
        acceptTerms: Yup.boolean()
                        .required('It is neccessary for us that you read our terms of policy.')
                        .oneOf([true], 'Please accept the terms of our service to proceed.')
        });
  
      return (
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
                var user = {
                    username: values.username,
                    email: values.email,
                    password: values.password
                }
                window.localStorage.setItem(user.username, JSON.stringify(user));
                console.log(JSON.parse(window.localStorage.getItem(user.username)));
                history.push('/auth/login');
            }}
          >
            {(formik) => {
              const { errors, touched } = formik;
              return (
                <div className="signup-block">
                  <h1>DOORIFY</h1>
                  <h2>Sign up</h2>
  
                  {
                      (errors.username && touched.username) || (errors.email && touched.email) ||
                      (errors.password && touched.password) || (errors.passwordConfirmation && touched.password && touched.passwordConfirmation) ||
                      (errors.acceptTerms && touched.acceptTerms) ? (
                          <div className="signup-errors-container">
                          <ErrorMessage name="username" component="span" className="error" />
                          <ErrorMessage name="email" component="span" className="error" />
                          <ErrorMessage name="password" component="span" className="error" />
                          <ErrorMessage name="passwordConfirmation" component="span" className="error" />
                          <ErrorMessage name="acceptTerms" component="span" className="error" />
                          </div>
                      ) : (
                          <div>
                          </div>
                      )
                  }
                  <Form>
                      <div className="signup-form">
                            <div className={errors.username && touched.username ? "signup-form-input signup-form-input-error" : "signup-form-input"}>
                              <label htmlFor="username">Username</label>
                              <Field
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter username..."
                              />
                            </div>

                            <div className={errors.email && touched.email ? "signup-form-input signup-form-input-error" : "signup-form-input"}>
                              <label htmlFor="email">Email</label>
                              <Field
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter email..."
                              />
                            </div>
  
                            <div className={errors.password && touched.password ? "signup-form-input signup-form-input-error" : "signup-form-input"}>
                                <label htmlFor="password">Password</label>
                                <Field
                                  type="password"
                                  name="password"
                                  id="password"
                                  placeholder="Enter password..."
                                />
                            </div>

                            <div className={errors.passwordConfirmation && touched.passwordConfirmation ? "signup-form-input signup-form-input-error" : "signup-form-input"}>
                                <label htmlFor="passwordConfirmation">Password confirmation</label>
                                <Field
                                  type="password"
                                  name="passwordConfirmation"
                                  id="passwordConfirmation"
                                  placeholder="Confirm your password..."
                                />
                            </div>
                      </div>
                                  
                        <div className="signup-form-one">
                        <div className="signup-form-checkbox">
                                <label htmlFor="acceptTerms">I accept the terms and blah blah.</label>
                                <Field
                                  type="checkbox"
                                  name="acceptTerms"
                                  id="acceptTerms"
                                />
                            </div>
                        </div>
                    
                        <div className="button">
                          <button
                            type="submit"
                            className={"signup-form-submit"}
                          >
                            Submit
                          </button>
                        </div>
                  </Form>
                  </div>
              );
            }}
          </Formik>
        );
}