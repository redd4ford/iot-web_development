import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./LoginPage.css";
import { useHistory, Link } from "react-router-dom";

export default function LoginPage(props) {

    const history = useHistory();

    const initialValues = {
        username: '',
        password: ''
    };

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
                    .required('Please enter your username.'),
        password: Yup.string()
                    .required('Please enter your password.')
    });

    function validation(values) {
        var user = JSON.parse(window.localStorage.getItem(values.username));
        console.log(user);
        console.log(values);
        if (user !== null && user !== undefined) {
            if (user.password === values.password) {
                return true;
            } else {
                return false;
            }
        } else {
            if (values.username === 'admin') {
                return false;
            } else {
                return false;
            }
        }
    }
  
      return (
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                var isValid = validation(values);
                if (isValid) {
                    window.alert('Successfully logged in! Hello, ' + values.username);
                    setTimeout(props.signIn(), 4000);
                    setTimeout(history.push('/'), 4000);

                } else {
                    window.alert('Data is incorrect.');
                }
            }}
          >
            {(formik) => {
              const { errors, touched } = formik;
              return (
                <div className="signup-block">
                  <h1>DOORIFY</h1>
                  <h2>Sign in</h2>
  
                  {
                      ((errors.username && touched.username) || (errors.email && touched.email) ||
                      (errors.password && touched.password)) ? (
                          <div className="signup-errors-container">
                            <ErrorMessage name="username" component="span" className="error" />
                            <ErrorMessage name="password" component="span" className="error" />
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
  
                            <div className={errors.password && touched.password ? "signup-form-input signup-form-input-error" : "signup-form-input"}>
                                <label htmlFor="password">Password</label>
                                <Field
                                  type="password"
                                  name="password"
                                  id="password"
                                  placeholder="Enter password..."
                                />
                            </div>
                    
                        <div className="button">
                          <Link to='/auth/signup'>I don't have an account.</Link>
                          <button
                            type="submit"
                            className={"checkout-form-submit"}
                          >
                            Sign in
                          </button>
                        </div>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        );
}