import React, { Component } from 'react';
import { withFormik } from 'formik';
import './Register.scss';

/* eslint-disable */
const RegisterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form className="register" onSubmit={handleSubmit}>
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
    </div>
    <div className="inp_holder">
      {touched.username && errors.username && <label className="error">{errors.username}</label>}
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
        className={touched.username && errors.username ? 'error' : ''}
      />
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
    </div>
    <div className="inp_holder">
      {touched.passwordConf &&
        errors.passwordConf && <label className="error">{errors.passwordConf}</label>}
      <input
        type="password"
        name="passwordConf"
        placeholder="confirm password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.passwordConf}
        className={touched.passwordConf && errors.passwordConf ? 'error' : ''}
      />
    </div>
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>
);

const RegForm = withFormik({
  mapPropsToValues: () => ({ email: '', username: '', password: '', passwordConf: '' }),

  validate: values => {
    let errors = {};

    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length < 3) {
      errors.username = 'Username must be 3 or more characters';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.username.length < 5) {
      errors.username = 'Password must be 5 or more characters';
    } else if (!values.passwordConf) {
      errors.passwordConf = 'Required';
    } else if (values.password !== values.passwordConf) {
      errors.passwordConf = "Passwords don't match";
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    //backend call register
  },
})(RegisterForm);

export default RegForm;
