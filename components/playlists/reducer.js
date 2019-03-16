import { GET_PLAYLISTS, SEARCH_PLAYLISTS } from './actions';

const initialState = {
  playlists: [],
  lastRetrieved: []
};

const playlistReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
        lastRetrieved: action.payload
      };
    case SEARCH_PLAYLISTS:
      return {
        ...state,
        playlists: state.lastRetrieved.filter(playlist => playlist.name.toLowerCase().includes(action.payload.toLowerCase()))
      };
    default:
      return state;
  }
};

export default playlistReducer;
