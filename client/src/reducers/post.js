import { FETCH_POST } from '../actions';

// redux-promise-middleware returns a new action with "_FULFillED"
// tacked on to the original action type when the promise for a
// payload is fulfilled.
const FETCH_POST_FULFILLED = `${FETCH_POST}_FULFILLED`;

function post(state = {}, action) {
  switch (action.type) {
    case FETCH_POST_FULFILLED:
      return action.payload;
    default:
      return state;
  }
}

export default post;
