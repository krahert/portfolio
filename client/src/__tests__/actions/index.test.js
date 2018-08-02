import nock from 'nock';
import { fetchUser } from 'actions';
import { FETCH_USER } from 'actions/types';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';

//! TO DO
describe('fetchUser', () => {
  // beforeEach(() => {
    
  // });

  // afterEach(() => {
  
  // });

  it.skip('has the correct type of FETCH_USER', () => {
    
    // Redux-Mock-Store Config
    const mockStore = configureStore([reduxThunk]);
    const store = mockStore({});

    nock('/api/current_user', {}).get('/api/current_user').reply(200, {username: 'test'});

    const expectedActions = [fetchUser()];

    const dispatchedStore = store.dispatch(fetchUser());
    
    return dispatchedStore.then(() => {
      console.log(store.getActions());
    });

    });
  });

  // it('has the correct payload', () => {
  //   const action = fetchUser();
  //   expect(action.payload.username).toEqual('eddie');
  // });
