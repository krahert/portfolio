import React from 'react';
import { mount } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';

import Root from 'Root';
import Auth from 'components/localAuth/Auth';


/*
.auth-label x2
.auth-input x2
.auth-button x1

.auth-label x4
.auth-input x4
.auth-button x1

*/

describe('testing Log In tab', () => {
  let wrapped;

  beforeEach(() => {
    wrapped = mount(
      <Root>
        <MemoryRouter initialEntries={['/login']}>
          <Auth />
        </MemoryRouter>
      </Root>
    );
  });
  
  afterEach(() => {
    wrapped.unmount();
  });

  it('shows that Log In tab is selected', () => {
    expect(wrapped.find('.auth-switch-button-selected').text()).toEqual('Log In');
    expect(wrapped.find('.auth-switch-button').text()).toEqual('Sign Up');
  });

  it('when Log In tab is selected, shows 2 labels, 2 inputs and a Log In button', () => {
    expect(wrapped.find('.auth-switch-button-selected').text()).toEqual('Log In');
    expect(wrapped.find('.auth-label').length).toEqual(2);
    expect(wrapped.find('.auth-input').length).toEqual(2);
    expect(wrapped.find('.auth-button').length).toEqual(1);
    expect(wrapped.find('.auth-button').text()).toEqual('Log In');
  });
});

describe('testing Sign Up tab', () => {
  let wrapped;

  beforeEach(() => {
    wrapped = mount(
      <Root>
        <MemoryRouter initialEntries={['/login']}>
          <Auth />
        </MemoryRouter>
      </Root>
    );
  });
  
  afterEach(() => {
    wrapped.unmount();
  });

  it('shows that Sign Up tab can be selected', () => {
    expect(wrapped.find('.auth-switch-button-selected').text()).toEqual('Log In');
    expect(wrapped.find('.auth-switch-button').text()).toEqual('Sign Up');
    
    wrapped.find('.auth-switch-button').simulate('click');
    wrapped.update();
    
    expect(wrapped.find('.auth-switch-button-selected').text()).toEqual('Sign Up');
    expect(wrapped.find('.auth-switch-button').text()).toEqual('Log In');
  });

  it('when Log In tab is selected, shows 4 labels, 4 inputs and a Sign Up button', () => {
    wrapped.find('.auth-switch-button').simulate('click');
    wrapped.update();
    
    expect(wrapped.find('.auth-switch-button-selected').text()).toEqual('Sign Up');
    expect(wrapped.find('.auth-label').length).toEqual(4);
    expect(wrapped.find('.auth-input').length).toEqual(4);
    expect(wrapped.find('.auth-button').length).toEqual(1);
    expect(wrapped.find('.auth-button').text()).toEqual('Sign Up');
  });
});