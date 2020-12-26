import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, decrement } from '../../../api/store/Actions.js';

import './Checkout.css';
import { useHistory } from "react-router-dom";

export default function Checkout() {

    const dispatch = useDispatch();
    const items = useSelector(state => state);

    console.log('items');
    console.log(items);

    const history = useHistory();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        acceptTerms: false
    };

    const CheckoutSchema = Yup.object().shape({
      firstName: Yup.string()
                      .min(3, 'First name must contain at least 3 characters.')
                      .max(
                          45, 'First name must contain 45 characters at max.')
                      .matches(/^[A-Z]+([^0-9]*)$/, 'Your first name cannot contain numbers and/or should start with the capital letter.')
                      .required('First name is required to proceed.'),
      lastName: Yup.string()
                      .min(3, 'Last name must contain at least 3 characters.')
                      .max(45, 'Last name must contain 45 characters at max.')
                      .matches(/^[A-Z]+([^0-9]*)$/, 'Your last name cannot contain numbers and/or should start with the capital letter.')
                      .optional(),
      email: Yup.string()
                      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Email is not valid. Check if it matches the pattern email@address.com')
                      .required('Email is required to proceed.'),
      phone: Yup.string()
                      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
                      .optional(),
      address: Yup.string()
                      .min(15, 'Your full address must contain at least 25 characters.')
                      .max(125, 'Your full address must contain 125 characters at max.')
                      .required('Address is required to proceed.'),
      acceptTerms: Yup.boolean()
                      .required('It is neccessary for us that you read our terms of policy.')
                      .oneOf([true], 'Please accept the terms of our service to proceed.'),
      });

    return (
        <Formik
          initialValues={initialValues}
          validationSchema={CheckoutSchema}
          onSubmit={(values) => {
            history.push('/cart/success');
            for (let i = 0; i < items.length; i++) {
              for (let j = 0; j <= items[i].counter; j++) {
                dispatch(decrement(items[i]));
              }
              dispatch(removeItem(items[i]));
            }
          }}
        >
          {(formik) => {
            const { errors, touched } = formik;
            return (
              <div className="checkout-form">
                <h1>Checkout</h1>

                {
                    (errors.firstName && touched.firstName) || (errors.lastName && touched.lastName) || 
                    (errors.email && touched.email) || (errors.phone && touched.phone) || (errors.address && touched.address) ||
                    (errors.acceptTerms && touched.acceptTerms) ? (
                        <div className="checkout-errors-container">
                        <ErrorMessage name="firstName" component="span" className="error" />
                        <ErrorMessage name="lastName" component="span" className="error" />
                        <ErrorMessage name="email" component="span" className="error" />
                        <ErrorMessage name="phone" component="span" className="error" />
                        <ErrorMessage name="address" component="span" className="error" />
                        <ErrorMessage name="acceptTerms" component="span" className="error" />
                        </div>
                    ) : (
                        <div>
                        </div>
                    )
                }
                <Form>
                    <div className="checkout-form-line">
                        <div className={errors.firstName && touched.firstName ? "checkout-form-input checkout-form-input-error" : "checkout-form-input"}>
                            <label htmlFor="firstName">First name</label>
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              placeholder="Enter first name..."
                            />
                        </div>

                        <div className={errors.lastName && touched.lastName ? "checkout-form-input checkout-form-input-error" : "checkout-form-input"}>
                            <label htmlFor="lastName">Last name</label>
                            <Field
                              type="text"
                              name="lastName"
                              id="lastName"
                              placeholder="Enter last name... (opt)"
                            />
                        </div>
                    </div>

                    <div className="checkout-form-line">
                        <div className={errors.email && touched.email ? "checkout-form-input checkout-form-input-error" : "checkout-form-input"}>
                            <label htmlFor="email">Email</label>
                            <Field
                              type="text"
                              name="email"
                              id="email"
                              placeholder="Enter email..."
                            />
                        </div>

                        <div className={errors.phone && touched.phone ? "checkout-form-input checkout-form-input-error" : "checkout-form-input"}>
                            <label htmlFor="phone">Phone</label>
                            <Field
                              type="text"
                              name="phone"
                              id="phone"
                              placeholder="Enter phone... (opt)"
                            />
                        </div>
                    </div>
                    
                    <div className="checkout-form-one">
                        <div className={errors.address && touched.address ? "checkout-form-input checkout-form-input-error" : "checkout-form-input"}>
                            <label htmlFor="address">Address</label>
                            <Field
                              type="text"
                              name="address"
                              id="address"
                              placeholder="Enter address..."
                            />
                        </div>
                    </div>
                                
                    <div className="checkout-form-one">
                    <div className="checkout-form-checkbox">
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
                      className={"checkout-form-submit"}
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
    };