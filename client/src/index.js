import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import App from './components/App';

// <Root/> wraps <App/> and give it access to Store and Provider
ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
);
