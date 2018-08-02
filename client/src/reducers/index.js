import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import fetchPostsReducer from './fetchPostsReducer';
import fetchCurrentPostReducer from './fetchCurrentPostReducer';
import fetchUserPostsReducer from './fetchUserPostsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  posts: fetchPostsReducer,
  currentPost: fetchCurrentPostReducer,
  userPosts: fetchUserPostsReducer
});