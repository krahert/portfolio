import React from 'react';
import { shallow } from 'enzyme';

import Landing from 'components/Landing';

it('shows all 9 boards', () => {
  let wrapped = shallow(<Landing />);
  expect(wrapped.find('li').length).toEqual(9);
  wrapped.unmount();
});