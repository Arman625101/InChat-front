import React, { Component } from 'react';
import { withFormik } from 'formik';
import './Login.scss';

/* eslint-disable */
const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form className="formik login" onSubmit={handleSubmit}>
    <div className={'inp_holder ' + (touched.email && errors.email ? 'error' : '')}>
      {touched.email && errors.email && <label className="error">{errors.email}</label>}
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      <div className="line" />
    </div>
    <div className="inp_holder">
      {touched.password && errors.password && <label className="error">{errors.password}</label>}
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        className={touched.password && errors.password ? 'error' : ''}
      />
      <div className="line" />
    </div>
    <button type="submit" disabled={isSubmitting}>
      Login
    </button>
  </form>
);

const LogForm = withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  validate: values => {
    let errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 5) {
      errors.password = 'Password must be 5 or more characters';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    //backend call register
  },
})(LoginForm);

export default LogForm;
