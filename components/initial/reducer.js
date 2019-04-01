import { SET_USER_DETAILS } from './actions';

const initialState = {
  displayName: "",
  email: ""
};

const userDetailsReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        displayName: action.payload.display_name,
        email: action.payload.email
      };
    default:
      return state;
  }
};

export default userDetailsReducer;
