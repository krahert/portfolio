import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchPostsByUser } from '../../actions';
import elapsedTime from '../../utils/elapsedTime';

class UserPosts extends Component {
  componentWillMount() {
    return this.props.fetchPostsByUser({
      userId: this.props.match.params.userId
    });
  }

  renderPosts() {
    if (!this.props.userPosts) {
      return <div className="loading"></div>;
    } else if (_.has(this.props.userPosts, 'err')) {
      return (
        <div className="current-post-container">
          <h2 className="no-comments">{this.props.userPosts.err}</h2>
        </div>
      );
    }

    if (this.props.userPosts.length > 0) {
      const sortedByDate = _.sortBy(this.props.userPosts, [
        function(o) {
          return o.dateCreated;
        }
      ]);

      return sortedByDate.reverse().map(post => {
        return (
          <div className="data-container" key={post._id}>
            <div className="post-info">
              <Link to={`/user/${post._user}`}>
                <span className="post-owner situational">{post.username}</span>
              </Link>
              <p className="post-date">
                {' • ' + elapsedTime(post.dateCreated)}
                <Link className="menu-link" to={`/b/${post.board}`}>{`/${post.board}/`}</Link>
              </p>
            </div>
            <Link to={`/post/${post._id}`}>
              <p className="current-post-title situational">{post.title}</p>
            </Link>
            <p className="post-body">{post.message}</p>
            <div className="counts-box">
              <Link to={`/post/${post._id}`}>
                <div className="count-comments">{post.commentCount} comments</div>
              </Link>
              <div className="post-date">last: {elapsedTime(post.dateUpdated)}</div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <h2 className="no-comments">
          The current user has no posts at this time...
        </h2>
      );
    }
  }

  goBack() {
    window.history.back();
  }

  render() {
    return (
      <div className="current-post-container">
        <div className="post-layout">
          <button className="back-link back-arrange" onClick={this.goBack}>&lt; Back</button>
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ userPosts }) {
  return { userPosts };
}

export default connect(
  mapStateToProps,
  { fetchPostsByUser }
)(UserPosts);
