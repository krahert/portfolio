import { fetchUser } from 'actions';
import { FETCH_USER } from 'actions/types';
import moxios from 'moxios';

describe('fetchUser', () => {
  
  // let mockResponse;
  // let request;

  beforeEach(() => {
    moxios.install();

    
    // mockResponse = () => {
    //   return new Promise((resolve, reject) => {
    //     moxios.requests.mostRecent().respondWith({
    //       status: 200,
    //       response: { username: 'eddie' }
    //     }).then(resolve);
    //   });
    // };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('has the correct type of FETCH_USER', (done) => {
    
    // await mockResponse();
    moxios.wait(() => {
      
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { username: 'eddie' }
      });

      const action = fetchUser();
      expect(action.type).toEqual('asdasdas');
      console.log(action.type);
      done();
    });
  });

  // it('has the correct payload', () => {
  //   const action = fetchUser();
  //   expect(action.payload.username).toEqual('eddie');
  // });
});
