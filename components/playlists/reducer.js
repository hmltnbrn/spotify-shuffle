import {
  SET_LOADING,
  SET_ERROR,
  GET_PLAYLISTS,
  REQUEST_PLAYLIST_TRACKS,
  GET_PLAYLIST_TRACKS,
  END_REQUEST_PLAYLIST_TRACKS,
  SEARCH_PLAYLISTS
} from './actions';

const initialState = {
  playlists: [],
  lastRetrieved: [],
  tracks: [],
  requestingTracksTotal: 0,
  loading: false,
  loadingTracks: false,
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
        requestingTracksTotal: action.payload,
        loadingTracks: true,
        error: "",
        tracks: []
      };
    case GET_PLAYLIST_TRACKS:
      return {
        ...state,
        error: "",
        tracks: [...state.tracks, ...action.payload]
      };
    case END_REQUEST_PLAYLIST_TRACKS:
      return {
        ...state,
        loadingTracks: false
      };
    case SEARCH_PLAYLISTS:
      return {
        ...state,
        error: "",
        playlists: state.lastRetrieved.filter(playlist => playlist.name.toLowerCase().includes(action.payload.toLowerCase()))
      };
    default:
      return state;
  }
};

export default playlistReducer;
