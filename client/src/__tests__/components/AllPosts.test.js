import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';
import moxios from 'moxios';

import Root from 'Root';
import AllPosts from 'components/posts/AllPosts';



let wrapped;
let mockResponse;
const initialState = {
  posts: [
    {
      commentCount: 2,
      _id: '5b43b35d24209931ab957c83',
      board: 'cyb',
      title: 'Test Post #1',
      message: 'This is the first test post',
      _user: '5b4399d1e671ba2f8c264ae9',
      username: 'john',
      dateCreated: '2018-07-09T19:11:25.589Z',
      dateUpdated: '2018-07-09T19:11:25.589Z',
      __v: 0,
      comments: []
    },
    {
      commentCount: 4,
      _id: '5b439a4fe671ba2f8c264aec',
      board: 'cyb',
      title: 'Test Post #2',
      message: 'This is the second test post',
      _user: '5b4399d1e671ba2f8c264ae8',
      username: 'doe',
      dateCreated: '2018-07-09T17:24:31.938Z',
      dateUpdated: '2018-07-09T19:46:32.400Z',
      __v: 4,
      comments: []
    }
  ]
};
const match = {
  params: {
    board: 'cyb'
  }
};



describe('component has access to API', () => {
  
  beforeEach(() => {
    moxios.install();
    
    //! Fix for Async/Await support for Moxios
    mockResponse = () => {
      return new Promise((resolve, reject) => {
        moxios.requests.mostRecent().respondWith({
          status: 200,
          response: initialState.posts
        }).then(resolve);
      });
    }
    
    wrapped = mount(
      <Root>
        <MemoryRouter initialEntries={['/b/cyb']}>
          <AllPosts match={match} />
        </MemoryRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
    moxios.uninstall();
  });

  it('shows Boards and New Post buttons', () => {
    expect(wrapped.find('.create-post a').at(0).text()).toEqual('< Boards');
    expect(wrapped.find('.create-post a').at(1).text()).toEqual('Create Post');
  });

  it('displays the correct board name', () => {
    expect(wrapped.find('.board-title').text()).toEqual('/cyb/ - cyberpunk and cybersecurity');
  });

  it('recieves posts from the API and displays all their data', async () => {
    expect(wrapped.find('.data-container').length).toEqual(0);

    await mockResponse();
    wrapped.update();

    expect(wrapped.find('.data-container').length).toEqual(2);
    
    expect(wrapped.find('.post-owner').at(0).text()).toEqual('john');
    expect(wrapped.find('.post-date').at(0).text()).toContain('ago');
    expect(wrapped.find('.post-title').at(0).text()).toEqual('Test Post #1');
    expect(wrapped.find('.post-body').at(0).text()).toEqual('This is the first test post');

    expect(wrapped.find('.post-owner').at(1).text()).toEqual('doe');
    expect(wrapped.find('.post-date').at(1).text()).toContain('ago');
    expect(wrapped.find('.post-title').at(1).text()).toEqual('Test Post #2');
    expect(wrapped.find('.post-body').at(1).text()).toEqual('This is the second test post');
  });
});



describe('component does not have access to API', () => {

  beforeEach(() => {
    moxios.install();

    wrapped = mount(
      <Root>
        <MemoryRouter initialEntries={['/b/cyb']}>
          <AllPosts match={match} />
        </MemoryRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
    moxios.uninstall();
  });

  it('shows the loader', () => {
    expect(wrapped.find('.loading').length).toEqual(1);
  });

});