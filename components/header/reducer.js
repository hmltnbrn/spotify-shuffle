import { SET_TITLE, TOGGLE_SEARCH } from './actions';

const initialState = {
  title: "Playlists",
  searchActive: false
};

const headerReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case TOGGLE_SEARCH:
      return {
        ...state,
        searchActive: action.payload
      };
    default:
      return state;
  }
};

export default headerReducer;
