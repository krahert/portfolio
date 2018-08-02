import axios from 'axios';
import { FETCH_USER, FETCH_POSTS, FETCH_CURRENT_POST, FETCH_USER_POSTS } from './types';


export const loginUser = (values, history) => async dispatch => {
  history.push('/');
  const res = await axios.post('/api/signin', values);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const registerUser = ({ username, email, password }, history) => async dispatch => {
  history.push('/');
  const res = await axios.post('/api/signup', { username, email, password });

  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  
  dispatch({ type: FETCH_USER, payload: res.data });
};

//------------------------------------------------------------------------------

export const fetchAllPosts = ({ board }) => async dispatch => {
  const res = await axios.get(`/api/get_posts/${board}`);
  
  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const fetchPostById = (values) => async dispatch => {
  const res = await axios.post('/api/post', values);

  dispatch({ type: FETCH_CURRENT_POST, payload: res.data });
};

export const fetchPostsByUser = (values) => async dispatch => {
  const res = await axios.post('/api/user_posts', values);

  dispatch({ type: FETCH_USER_POSTS, payload: res.data });
};

//------------------------------------------------------------------------------

export const postComment = (values) => async dispatch => {
  const res = await axios.post('/api/add_comment', values);

  dispatch({ type: FETCH_CURRENT_POST, payload: res.data });
};

export const createPost = (values, history, board) => async dispatch => {
  const res = await axios.post('/api/create_post', {
    title: values.title,
    message: values.message,
    board
  });
  history.push(`/b/${board}`);

  dispatch({ type: FETCH_POSTS, payload: res.data });
};