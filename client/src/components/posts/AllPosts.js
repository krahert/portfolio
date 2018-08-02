import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../../actions';
import _ from 'lodash';
import elapsedTime from '../../utils/elapsedTime';

class AllPosts extends Component {
  
  componentWillMount() {
    return this.props.fetchAllPosts({ board: this.props.match.params.board });
  }

  componentDidUpdate(newProps) {
    if (this.props.match.params.board !== newProps.match.params.board) {
      this.props.fetchAllPosts({ board: this.props.match.params.board });
    }
  }

  renderPosts() {
    if (this.props.posts !== null) {
      
      const sortedByDate = _.sortBy(this.props.posts, [ function(o) {
        return o.dateCreated;
      }]);
      
      return sortedByDate.reverse().map(post => {
        return (
          <div className="data-container" key={post._id}>
            <div className="post-container">
              <div className="post-info">
                <Link to={`/user/${post._user}`}>
                  <span className="post-owner situational">{post.username}</span>
                </Link>
                <p className="post-date">
                  {' • ' + elapsedTime(post.dateCreated)}
                </p>
              </div>
              <p className="post-title">
                <Link to={`/post/${post._id}`}>{
                  post.title.length > 40
                    ? post.title.substring(0, 40) + '...'
                    : post.title
                }</Link>
              </p>
              <p className="post-body">{
                post.message.length > 400
                  ? post.message.substring(0, 400) + '...'
                  : post.message
              }</p>
            </div>
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
      return <div className="loading"></div>;
    }
  }

  getTitle() {
    switch (this.props.match.params.board) {
      case 'cyb':
        return '/cyb/ - cyberpunk and cybersecurity';
      case 'tech':
        return '/tech/ - science and technology';
      case 'code':
        return '/code/ - programming';
      case 'diy':
        return '/diy/ - do it yourself and projects';
      case 'inter':
        return '/inter/ - games and interactive media';
      case 'cult':
        return '/cult/ - culture';
      case 'feels':
        return '/feels/ - personal experiences';
      case 'hum':
        return '/hum/ - humanity';
      case 'r':
        return '/r/ - random';
      default:
        return '';
    }
  }

  render() {
    return (
      
      <div className="post-layout">
        <h2 className="board-title">{this.getTitle()}</h2>
        <Link to="/" className="create-post alteration">&lt; Boards</Link>
        <Link className="create-post" to={`/b/${this.props.match.params.board}/new_post`}>
          Create Post
        </Link>
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(
  mapStateToProps,
  { fetchAllPosts }
)(AllPosts);
