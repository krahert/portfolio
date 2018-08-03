import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';

import Root from 'Root';
import NewPost from 'components/posts/NewPost';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <MemoryRouter initialEntries={['/b/cyb/new_post']}>
        <NewPost />
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('shows Back button and title', () => {
  expect(wrapped.find('.back-link').at(0).text()).toEqual('< Back');
  expect(wrapped.find('.new-post-h2').text()).toEqual('Create Post');
});

it('shows one input, one textarea and create post button', () => {
  expect(wrapped.find('.new-post-title input').length).toEqual(1);
  expect(wrapped.find('.new-post-message textarea').length).toEqual(1);
  expect(wrapped.find('.new-post-button button').length).toEqual(1);
});