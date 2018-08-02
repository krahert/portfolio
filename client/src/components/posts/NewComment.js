import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { postComment } from '../../actions';

class NewComment extends Component {
  callActionCreator() {
    this.props
      .postComment({
        postId: this.props.currentPostId,
        message: this.props.commentData.values.message
      })
      .then(() => {
        this.props.reset('commentForm');
      });
  }

  render() {
    return (
      <form
        key={this.props.postId}
        className="new-comment-container"
        onSubmit={this.props.handleSubmit(this.callActionCreator.bind(this))}
      >
        <div className="submit-comment-form">
          <Field
            name="message"
            component="textarea"
            type="text"
            className="comment-textarea"
            placeholder="Add a public comment"
          />

          <button className="comment-submit-button" type="submit">
            Comment
          </button>
        </div>
        <p className="comment-warning">
          {this.props.commentData.syncErrors &&
          this.props.commentData.anyTouched
            ? this.props.commentData.syncErrors.message
            : ''}
        </p>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { commentData: state.form.commentForm };
};

const validate = values => {
  const errors = {};
  if (!values.message) {
    errors.message = 'You must add a comment';
  }
  return errors;
};

export default reduxForm({
  validate,
  form: 'commentForm'
})(
  connect(
    mapStateToProps,
    { postComment }
  )(withRouter(NewComment))
);
