import authReducer from 'reducers/authReducer';
import fetchCurrentPost from 'reducers/fetchCurrentPostReducer';
import fetchPosts from 'reducers/fetchPostsReducer';
import fetchUserPosts from 'reducers/fetchUserPostsReducer';

import {
  FETCH_USER,
  FETCH_POSTS,
  FETCH_CURRENT_POST,
  FETCH_USER_POSTS
} from 'actions/types';

describe('testing authReducer', () => {
  it('handles actions of type FETCH_USER', () => {
    const action = {
      type: FETCH_USER,
      payload: 'test data'
    };
    const newState = authReducer(null, action);
    expect(newState).toEqual('test data');
  });
  
  it('handles alternative actions of type FETCH_USER', () => {
    const action = {
      type: FETCH_USER,
      payload: ''
    };
    const newState = authReducer(null, action);
    expect(newState).toEqual(false);
  });

  it('handles action with unknown type', () => {
    const action = {
      type: 'other',
      payload: 'other'
    };
    const newState = authReducer(null, action);
    expect(newState).toEqual(null);
  });
});

describe('testing fetchCurrentPostReducer', () => {
  it('handles actions of type FETCH_CURRENT_POST', () => {
    const action = {
      type: FETCH_CURRENT_POST,
      payload: 'test data'
    };
    const newState = fetchCurrentPost(null, action);
    expect(newState).toEqual('test data');
  });

  it('handles action with unknown type', () => {
    const action = {
      type: 'other',
      payload: 'other'
    };
    const newState = fetchCurrentPost(null, action);
    expect(newState).toEqual(null);
  });
});

describe('testing fetchPostsReducer', () => {
  it('handles actions of type FETCH_POSTS', () => {
    const action = {
      type: FETCH_POSTS,
      payload: 'test data'
    };
    const newState = fetchPosts(null, action);
    expect(newState).toEqual('test data');
  });

  it('handles action with unknown type', () => {
    const action = {
      type: 'other',
      payload: 'other'
    };
    const newState = fetchPosts(null, action);
    expect(newState).toEqual(null);
  });
});

describe('testing fetchUserPostsReducer', () => {
  it('handles actions of type FETCH_POSTS', () => {
    const action = {
      type: FETCH_USER_POSTS,
      payload: 'test data'
    };
    const newState = fetchUserPosts(null, action);
    expect(newState).toEqual('test data');
  });

  it('handles action with unknown type', () => {
    const action = {
      type: 'other',
      payload: 'other'
    };
    const newState = fetchUserPosts(null, action);
    expect(newState).toEqual(null);
  });
});