import {
  SET_TRACK,
  TOGGLE_PLAYING,
  SHUFFLE_TRACKS,
  SET_REPEAT,
  RESET_PLAYER
} from './actions';
import shuffle from '../../helpers/shuffle';
import * as storage from '../../helpers/storage';

const initialState = {
  active: false,
  playing: false,
  repeat: false,
  currentPosition: 0,
  queueName: "",
  queueTracks: [],
  track: {},
  trackIndex: 0
};

const playerReducer = function(state = initialState, action) {
  switch(action.type) {
    case SET_TRACK:
      return {
        ...state,
        active: true,
        playing: action.payload.playState === false ? false : true,
        currentPosition: action.payload.position || 0,
        queueName: action.payload.queueName || state.queueName,
        queueTracks: action.payload.queueTracks || state.queueTracks,
        track: action.payload.track,
        trackIndex: action.payload.trackIndex
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: action.payload
      };
    case SHUFFLE_TRACKS:
      let newTracks = state.queueTracks.slice();
      let removedTrack = newTracks.splice(state.trackIndex, 1);
      return {
        ...state,
        trackIndex: 0,
        queueTracks: [...removedTrack, ...shuffle(newTracks)]
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat: action.payload
      };
    case RESET_PLAYER:
      return {
        ...state,
        active: false,
        playing: false,
        repeat: false,
        currentPosition: 0,
        queueName: "",
        queueTracks: [],
        track: {},
        trackIndex: 0
      };
    default:
      return state;
  }
};

export default playerReducer;
