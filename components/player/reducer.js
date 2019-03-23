import {
  SET_TRACK,
  TOGGLE_PAUSE
} from './actions';

const initialState = {
  playing: false,
  paused: false,
  track: {},
  trackIndex: 0
};

const playerReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_TRACK:
      return {
        ...state,
        playing: true,
        paused: false,
        track: action.payload.track,
        trackIndex: action.payload.index
      };
    case TOGGLE_PAUSE:
      return {
        ...state,
        paused: !state.paused
      };
    default:
      return state;
  }
};

export default playerReducer;
