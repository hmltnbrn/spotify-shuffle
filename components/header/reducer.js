import { SET_TITLE } from './actions';

const initialState = {
  title: "Playlists"
};

const headerReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    default:
      return state;
  }
};

export default headerReducer;
