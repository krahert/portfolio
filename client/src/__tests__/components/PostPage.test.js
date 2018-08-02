import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';
import moxios from 'moxios';

import Root from 'Root';
import PostPage from 'components/posts/PostPage';

let wrapped;
let mockResponse;
const initialState = {
  currentPost: {
    commentCount: 2,
    _id: '5b451ca2208c2d1cf45c88dd',
    board: 'cyb',
    title: 'Current Test Post',
    message: 'This is the current test post',
    _user: '123456789012345678901234',
    username: 'eddie',
    dateCreated: '2018-07-10T20:52:50.025Z',
    dateUpdated: '2018-07-12T17:27:46.191Z',
    comments: [
      {
        _id: '5b4782208dee52408cc2c16f',
        user: 'john',
        userId: '123456789012345678901235',
        message: 'Comment #1',
        dateCreated: '2018-07-12T16:30:24.204Z'
      },
      {
        _id: '5b478f9251dfd44332dbec41',
        user: 'doe',
        userId: '123456789012345678901236',
        message: 'Comment #2',
        dateCreated: '2018-07-12T17:27:46.129Z'
      }
    ]
  }
};

const match = {
  params: {
    postId: '5b451ca2208c2d1cf45c88dd'
  }
};

beforeEach(() => {
  moxios.install();

  mockResponse = (newResponse = initialState.currentPost) => {
    return new Promise((resolve, reject) => {
      moxios.requests.mostRecent().respondWith({
        status: 200,
        response: newResponse
      }).then(resolve);
    });
  }

  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={['/post/5b451ca2208c2d1cf45c88dd']}>
        <PostPage match={match} />
      </MemoryRouter>
    </Root>
  );
});

describe('display of elements', () => {

  afterEach(() => {
    wrapped.unmount();
    moxios.uninstall();
  });

  it('displays the not found message and has a return link', () => {
    expect(wrapped.find('.no-comments h2').text()).toEqual('The current post does not exist');
    expect(wrapped.find('.back-link a').text()).toEqual('Go back to posts');
  });

  it('shows Back button', async () => {
    await mockResponse();
    wrapped.update();
    expect(wrapped.find('.back-link').text()).toEqual('< Back');
  });

  it('recieves and correctly displays the post and its comments', async () => {
    expect(wrapped.find('.post-container').length).toEqual(0);
    expect(wrapped.find('.comment-box').length).toEqual(0);

    await mockResponse();
    wrapped.update();

    expect(wrapped.find('.post-container').length).toEqual(1);
    expect(wrapped.find('.comment-box').length).toEqual(2);

    expect(wrapped.find('.post-owner').text()).toEqual('eddie');
    expect(wrapped.find('.post-date p').text()).toContain('ago');
    expect(wrapped.find('.current-post-title').text()).toEqual('Current Test Post');
    expect(wrapped.find('.post-body').text()).toEqual('This is the current test post');
    expect(wrapped.find('.count-comments').text()).toEqual('2 comments');
    expect(wrapped.find('.post-date div').text()).toContain('ago');

    expect(wrapped.find('.comment-owner-name').at(0).text()).toEqual('doe');
    expect(wrapped.find('.comment-date').at(0).text()).toContain('ago');
    expect(wrapped.find('.comment-message').at(0).text()).toEqual('Comment #2');

    expect(wrapped.find('.comment-owner-name').at(1).text()).toEqual('john');
    expect(wrapped.find('.comment-date').at(1).text()).toContain('ago');
    expect(wrapped.find('.comment-message').at(1).text()).toEqual('Comment #1');
  });

  it('shows textarea and comment button', async () => {
    await mockResponse();
    wrapped.update();
    expect(wrapped.find('.comment-textarea textarea').length).toEqual(1);
    expect(wrapped.find('.comment-submit-button button').length).toEqual(1);
  });

});




describe('interaction', () => {
  
  const updatedState = initialState.currentPost;
  it('simulates adding a new comment, displays it and clears textarea', () => {
    moxios.install();

    moxios.requests.mostRecent().respondWith({
      status: 200,
      response: updatedState
    });

    wrapped = mount(
      <Root initialState={initialState}>
        <MemoryRouter initialEntries={['/post/5b451ca2208c2d1cf45c88dd']}>
          <PostPage match={match} />
        </MemoryRouter>
      </Root>
    );

    const element = wrapped.find('textarea');
    element.getNode.value = 'New test comment';
    element.simulate('change', element);

    // console.log(wrapped.find('textarea').getNode.value);

    updatedState.comments.push({
      _id: '5b4782208dee52408cc2c165',
      user: 'jane',
      userId: '123456789012345678901235',
      message: wrapped.find('textarea').getNode.value,
      dateCreated: '2018-07-12T16:30:24.204Z'
    });
    
    // moxios.stubRequest('/api/add_comment', {
    //   status: 200,
    //   response: updatedState
    // });

    //! ?????????
    wrapped.find('.comment-submit-button').simulate('click');
    wrapped.update();

    // console.log(wrapped.find('.comment-message').length);
    
    wrapped.unmount();
    moxios.uninstall();
  });
});