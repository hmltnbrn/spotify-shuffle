import {
  SET_TRACK,
  TOGGLE_PLAYING
} from './actions';

const initialState = {
  active: false,
  playing: false,
  track: {},
  trackIndex: 0,
  playlistIndex: 0
};

const playerReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_TRACK:
      return {
        ...state,
        active: true,
        playing: true,
        track: action.payload.track,
        trackIndex: action.payload.trackIndex,
        playlistIndex: action.payload.playlistIndex
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: action.payload
      };
    default:
      return state;
  }
};

export default playerReducer;
