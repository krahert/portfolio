import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions';

import formField from './formField';
import validateEmail from '../../utils/validateEmail';

class Login extends Component {

  renderFields() {
    return (
      <div>
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
      </div>
    );
  }

  callActionCreator() {
    this.props.loginUser(this.props.formValues, this.props.history);
  }

  render() {
    return (
        <form
          className="auth-form"
          autoComplete="off"
          onSubmit={ this.props.handleSubmit(this.callActionCreator.bind(this)) }
        >
          {this.renderFields()}
          <button className="auth-button" type="submit">Log In</button>
        </form>
    );
  }
}

// Redux Form Validation
const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'You must provide an email';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'You must provide a password';
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
    { loginUser }
  )(withRouter(Login))
);
