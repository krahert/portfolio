import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';
import { createPost } from '../../actions';

class NewPost extends Component {
  submitNewPost() {
    this.props.createPost(
      this.props.newData.values,
      this.props.history,
      this.props.match.params.board
    );
  }

  render() {
    return (
      <div className="new-post-container">
        <div className="back-link-container">
          <Link className="back-link mod2" to={`/b/${this.props.match.params.board}`}>&lt; Back</Link>
          <h2 className="new-post-h2">Create Post</h2>
          <div className="empty-block"></div>
        </div>
        <form
          className="auth-form"
          autoComplete="off"
          onSubmit={this.props.handleSubmit(this.submitNewPost.bind(this))}
        >
          <Field
            component="input"
            name="title"
            type="text"
            placeholder="Title..."
            className="new-post-title"
          />
          <Field
            component="textarea"
            name="message"
            type="text"
            placeholder="Your message..."
            className="new-post-message"
          />
          <div>
            <button className="new-post-button" type="submit">Create Post</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { newData: state.form.newPostForm };
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title required';
  }
  if (!values.message) {
    errors.message = 'Message required';
  }
  
  return errors;
};

export default reduxForm({
  validate,
  form: 'newPostForm'
})(
  connect(
    mapStateToProps,
    { createPost }
  )(withRouter(NewPost))
);
