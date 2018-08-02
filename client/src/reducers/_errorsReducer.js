import { SHOW_ERROR } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return action.payload || false;
    default:
      return state;
  }
};