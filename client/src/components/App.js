import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Auth from './localAuth/Auth';
import Landing from './Landing';
import AllPosts from './posts/AllPosts';
import PostPage from './posts/PostPage';
import UserPosts from './posts/UserPosts';
import NewPost from './posts/NewPost';

class App extends Component {
  
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/b/:board" component={AllPosts} />
            <Route path="/login" component={Auth} />
            <Route path="/post/:postId" component={PostPage} />
            <Route path="/user/:userId" component={UserPosts} />
            <Route path="/b/:board/new_post" component={NewPost} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}



export default connect(null, { fetchUser })(App);
