import {
  SET_LOADING,
  SET_ERROR,
  GET_PLAYLISTS,
  REQUEST_PLAYLIST_TRACKS,
  GET_PLAYLIST_TRACKS,
  SEARCH_PLAYLISTS,
  SHUFFLE_TRACKS
} from './actions';

const initialState = {
  playlists: [],
  lastRetrieved: [],
  tracks: [],
  loading: false,
  error: ""
};

const playlistReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case GET_PLAYLISTS:
      return {
        ...state,
        error: "",
        playlists: action.payload,
        lastRetrieved: action.payload
      };
    case REQUEST_PLAYLIST_TRACKS:
      return {
        ...state,
        loading: true,
        error: "",
        tracks: []
      };
    case GET_PLAYLIST_TRACKS:
      return {
        ...state,
        error: "",
        tracks: [...state.tracks, ...action.payload]
      };
    case SEARCH_PLAYLISTS:
      return {
        ...state,
        error: "",
        playlists: state.lastRetrieved.filter(playlist => playlist.name.toLowerCase().includes(action.payload.toLowerCase()))
      };
    case SHUFFLE_TRACKS:
      return {
        ...state,
        error: "",
        tracks: shuffle(state.tracks.slice())
      };
    default:
      return state;
  }
};

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export default playlistReducer;
