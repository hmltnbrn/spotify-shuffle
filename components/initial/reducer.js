import { SET_USER_DETAILS } from './actions';

const initialState = {
  username: ""
};

const userDetailsReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
