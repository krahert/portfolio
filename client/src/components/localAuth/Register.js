import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions';

import formField from './formField';
import validateEmail from '../../utils/validateEmail';
import strongPasswords from '../../utils/strongPasswords';

class Register extends Component {
  
  renderFields() {
    return (
      <div>
        <Field
          key="username"
          component={formField}
          type="text"
          label="User Name"
          name="username"
        />
        <Field
          key="email"
          component={formField}
          type="text"
          label="Email"
          name="email"
        />
        <Field
          key="password"
          component={formField}
          type="password"
          label="Password"
          name="password"
        />
        <Field
          key="password2"
          component={formField}
          type="password"
          label="Verify Password"
          name="password2"
        />
      </div>
    );
  }

  callActionCreator() {
    this.props.registerUser(this.props.formValues, this.props.history);
  }

  render() {
    return (
        <form
          className="auth-form"
          autoComplete="off"  
          onSubmit={ this.props.handleSubmit(this.callActionCreator.bind(this)) }
        >
          {this.renderFields()}
          <button className="auth-button" type="submit">Sign Up</button>
        </form>
    );
  }
}

// Redux Form Validation
const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'You must provide a name'
  }

  if (!values.email) {
    errors.email = 'You must provide an email';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'You must provide a password';
  } else if (!strongPasswords(values.password)) {
    errors.password = 'Your password must be at least 8 characters and contain at least: 1 lowercase character (a-z), 1 uppercase character (A-Z), 1 numeric character (0-9), 1 special character (!@#$&*)';
  }

  if (!values.password2) {
    errors.password2 = "Please verify your password";
  }

  if (values.password !== values.password2) {
    errors.password1 = "Your passwords do not match";
    errors.password2 = "Your passwords do not match";
  }

  return errors;
};

const mapStateToProps = state => {
  return { formValues: state.form.authForm.values };
};

export default reduxForm({
  validate,
  form: 'authForm'
})(
  connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register))
);