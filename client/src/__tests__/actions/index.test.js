import moxios from 'moxios';
import * as actions from 'actions';
import * as types from 'actions/types';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// const promisifyMiddleware = ({ dispatch, getState }) => next => action => {
//   return new Promise( resolve => resolve(next(action)) );
// };

// Redux-Mock-Store Config
const mockStore = configureStore([thunk]);
const store = mockStore({});

let mockResponse;

beforeEach(() => {
  moxios.install();

  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: { data: 'test data' }
    });
  });
});

afterEach(() => {
  moxios.uninstall();
  store.clearActions();
});

describe('testing fetchUser action creator', () => {
  it('has the correct type of FETCH_USER', () => {
    return store.dispatch(actions.fetchUser()).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_USER);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.fetchUser()).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});


describe('testing registerUser action creator', () => {
  it('has the correct type of FETCH_USER', () => {
    return store.dispatch(actions.registerUser(
      {
        username: 'username',
        email: 'email',
        password: 'password'
      },
      []
    )).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_USER);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.registerUser({
      username: 'username',
      email: 'email',
      password: 'password'
    }, [])).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});


describe('testing loginUser action creator', () => {
  it('has the correct type of FETCH_USER', () => {
    return store.dispatch(actions.loginUser(
      {
        email: 'email',
        password: 'password'
      },
      []
    )).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_USER);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.loginUser({
      email: 'email',
      password: 'password'
    }, [])).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});


describe('testing fetchAllPosts action creator', () => {
  it('has the correct type of FETCH_POSTS', () => {
    return store.dispatch(actions.fetchAllPosts({ board: 'cyb' })).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_POSTS);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.fetchAllPosts({ board: 'cyb' })).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});


describe('testing fetchPostById action creator', () => {
  it('has the correct type of FETCH_CURRENT_POST', () => {
    return store.dispatch(actions.fetchPostById('test post id value')).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_CURRENT_POST);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.fetchPostById('test post id value')).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});


describe('testing fetchPostsByUser action creator', () => {
  it('has the correct type of FETCH_USER_POSTS', () => {
    return store.dispatch(actions.fetchPostsByUser('test user id value')).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_USER_POSTS);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.fetchPostsByUser('test user id value')).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});


describe('testing postComment action creator', () => {
  it('has the correct type of FETCH_CURRENT_POST', () => {
    return store.dispatch(actions.postComment('test comment message')).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_CURRENT_POST);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.postComment('test comment message')).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});


describe('testing createPost action creator', () => {
  it('has the correct type of FETCH_POSTS', () => {
    return store.dispatch(actions.createPost(
      {
        title: 'title',
        message: 'message'
      },
      [],
      'cyb'
    )).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(types.FETCH_POSTS);
    });
  });

  it('has the correct payload', () => {
    return store.dispatch(actions.createPost(
      {
        title: 'title',
        message: 'message'
      },
      [],
      'cyb'
    )).then(() => {
      const action = store.getActions();
      expect(action[0].payload.data).toEqual('test data');
    });
  });
});