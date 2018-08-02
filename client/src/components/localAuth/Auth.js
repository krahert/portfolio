import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

// import { Link } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

class Auth extends Component {
  state = { showRegister: false };

  renderComponent() {
    if (this.state.showRegister) {
      return <Register />;
    }

    return <Login />;
  }

  render() {
    return (
      <div className="auth-container">
        <div className="auth-switch">
          <button
            className={
              !this.state.showRegister
              ? "auth-switch-button-selected"
              : "auth-switch-button"
            }
            onClick={() => this.setState({ showRegister: false })}
          >
            Log In
          </button>
          <button
            className={
              this.state.showRegister
              ? "auth-switch-button-selected"
              : "auth-switch-button"
            }
            onClick={() => this.setState({ showRegister: true })}
          >
            Sign up
          </button>
        </div>
        {this.renderComponent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'authForm'
})(Auth);
