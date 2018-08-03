import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';
import moxios from 'moxios';

import Root from 'Root';
import UserPosts from 'components/posts/UserPosts';



let wrapped;
let mockResponse;
const initialState = {
  userPosts: [
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
      board: 'tech',
      title: 'Test Post #2',
      message: 'This is the second test post',
      _user: '5b4399d1e671ba2f8c264ae9',
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
    userId: '5b4399d1e671ba2f8c264ae9'
  }
};

describe('component gets data and displays all elements', () => {
  
  beforeEach(() => {
    moxios.install();
    
    mockResponse = () => {
      return new Promise((resolve, reject) => {
        moxios.requests.mostRecent().respondWith({
          status: 200,
          response: initialState.userPosts
        }).then(resolve);
      });
    }
    
    wrapped = mount(
      <Root>
        <MemoryRouter initialEntries={['user/5b4399d1e671ba2f8c264ae9']}>
          <UserPosts match={match} />
        </MemoryRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
    moxios.uninstall();
  });

  it('shows the Back button', () => {
    expect(wrapped.find('.back-link button').text()).toEqual('< Back');
  });

  it('recieves and shows the correct number of posts', async () => {
    
    expect(wrapped.find('.data-container').length).toEqual(0);
    
    await mockResponse();
    wrapped.update();
    
    expect(wrapped.find('.data-container').length).toEqual(2);
    
    expect(wrapped.find('.post-owner').at(0).text()).toEqual('john');
    expect(wrapped.find('.post-owner').at(1).text()).toEqual('doe');
    
    expect(wrapped.find('.post-date').at(0).text()).toContain('ago');
    expect(wrapped.find('.post-date').at(1).text()).toContain('ago');
    
    expect(wrapped.find('.menu-link a').at(0).text()).toEqual('/cyb/');
    expect(wrapped.find('.menu-link a').at(1).text()).toEqual('/tech/');
    
    expect(wrapped.find('.current-post-title p').at(0).text()).toEqual('Test Post #1');
    expect(wrapped.find('.current-post-title p').at(1).text()).toEqual('Test Post #2');
    
    expect(wrapped.find('.post-body p').at(0).text()).toEqual('This is the first test post');
    expect(wrapped.find('.post-body p').at(1).text()).toEqual('This is the second test post');
    
    expect(wrapped.find('.count-comments').at(0).text()).toEqual('2 comments');
    expect(wrapped.find('.count-comments').at(1).text()).toEqual('4 comments');
    
    expect(wrapped.find('.post-date div').at(0).text()).toContain('last:');
    expect(wrapped.find('.post-date div').at(1).text()).toContain('last:');
  });

});