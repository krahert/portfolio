import React from 'react';
import { mount } from 'enzyme';

//! Imi permite sa fac spoofing la url-ul din Browser, deoarece dau history ca
//! , argument catre ActionCreator ca apoi sa faca redirect.
import { MemoryRouter } from 'react-router-dom';

import Root from 'Root';
import Header from 'components/Header';



let wrapped;
const initialState = {
  auth: {
    _id: '123456789012345678901234',
    username: 'test'
  }
};


//! Logged In
describe('when user is authenticated', () => {
  beforeEach(() => {
    wrapped = mount(
      <Root initialState={initialState}>
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it('shows logo image', () => {
    expect(wrapped.find('img').length).toEqual(1);
  });

  it('shows board list', () => {
    expect(wrapped.find('li').length).toEqual(9);
  });

  it('shows username and logout button', () => {
    expect(wrapped.find('.user-name a').text()).toEqual('test');
    expect(wrapped.find('.button').length).toEqual(1);
  });
});


//! Not Logged In
describe('when user is not authenticated', () => {
  beforeEach(() => {
    wrapped = mount(
      <Root initialState={{ auth: false }}>
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it('shows logo image', () => {
    expect(wrapped.find('img').length).toEqual(1);
  });

  it('shows log in and oauth buttons', () => {
    expect(wrapped.find('.button a').at(0).text()).toEqual('Log In');
    expect(wrapped.find('.button a').at(1).text()).toEqual('Sign In With Google');
  });

});
