import { FETCH_CURRENT_POST } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_CURRENT_POST:
      return action.payload;
    default:
      return state;
  }
};