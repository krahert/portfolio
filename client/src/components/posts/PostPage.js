import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchPostById } from '../../actions';
import elapsedTime from '../../utils/elapsedTime';

import NewComment from '../posts/NewComment';

class PostPage extends Component {
  componentWillMount() {
    return this.props.fetchPostById({ postId: this.props.match.params.postId });
  }

  goBack() {
    window.history.back();
  }

  renderPostComments() {
    if (this.props.currentPost.comments.length > 0) {
      const sortedByDate = _.sortBy(this.props.currentPost.comments, [
        function(o) {
          return o.dateCreated;
        }
      ]);

      return sortedByDate.reverse().map(comment => {
        return (
          <div className="comment-box" key={comment._id}>
            <div className="comment-info">
              <Link to={`/user/${comment.userId}`}>
                <span className="comment-owner-name">{comment.user}</span>
              </Link>
              <p className="comment-date">
                {' • ' + elapsedTime(comment.dateCreated)}
              </p>
            </div>
            <p className="comment-message">{comment.message}</p>
          </div>
        );
      });
    } else {
      return <p className="no-comments">No comments yet...</p>;
    }
  }

  renderPost() {
    // lodash.has() verifica daca obiectul din arg1, contine proprietatea din arg2
    if (!this.props.currentPost) {
      return (
        <div className="current-post-container">
          <Link className="back-link inline" to="/">
            Go back to posts
          </Link>
          <h2 className="no-comments">The current post does not exist</h2>
        </div>
      );
    } else if (_.has(this.props.currentPost, 'err')) {
      return (
        <div className="current-post-container">
          <Link className="back-link inline" to="/">
            Go back to posts
          </Link>
          <h2 className="no-comments">{this.props.currentPost.err}</h2>
        </div>
      );
    }

    if (this.props.currentPost) {
      return (
        <div className="current-post-container">
          <div className="back-container">
            <button className="back-link" onClick={this.goBack}>
              &lt; Back
            </button>
          </div>

          <div
            className="data-container current"
            key={this.props.currentPost._id}
          >
            <div className="post-container">
              <div className="post-info">
                <Link to={`/user/${this.props.currentPost._user}`}>
                  <span className="post-owner situational">
                    {this.props.currentPost.username}
                  </span>
                </Link>
                <p className="post-date">
                  {' • ' + elapsedTime(this.props.currentPost.dateCreated)}
                </p>
              </div>
              <p className="current-post-title">
                {this.props.currentPost.title}
              </p>
              <p className="post-body">{this.props.currentPost.message}</p>
            </div>
            <div className="counts-box">
              <div className="count-comments count-comments-disable">
                {this.props.currentPost.commentCount} comments
              </div>
              <div className="post-date">
                {elapsedTime(this.props.currentPost.dateUpdated)}
              </div>
            </div>
          </div>
          <div className="add-comment-container">
            <NewComment currentPostId={this.props.currentPost._id} />
          </div>
          <div className="comment-container">{this.renderPostComments()}</div>
        </div>
      );
    }
  }

  render() {
    return <div className="post-layout">{this.renderPost()}</div>;
  }
}

function mapStateToProps({ currentPost }) {
  return { currentPost };
}

export default connect(
  mapStateToProps,
  { fetchPostById }
)(PostPage);
