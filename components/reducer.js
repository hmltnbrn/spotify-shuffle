import { REQUEST_AUTHORIZATION } from './actions';

import { combineReducers } from 'redux';

const initialState = {
  spotifyInitialized: false
};

const authReducer = function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_AUTHORIZATION:
      return {
        ...state,
        spotifyInitialized: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer
});
