import {
  SET_TRACK,
  TOGGLE_PLAYING,
  SHUFFLE_TRACKS,
  SET_REPEAT
} from './actions';
import shuffle from '../../helpers/shuffle';

const initialState = {
  active: false,
  playing: false,
  track: {},
  trackIndex: 0,
  playlistIndex: 0,
  playingTracks: [],
  repeat: false
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
        playlistIndex: action.payload.playlistIndex,
        playingTracks: action.payload.playingTracks || state.playingTracks
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: action.payload
      };
    case SHUFFLE_TRACKS:
      let newTracks = state.playingTracks.slice();
      let removedTrack = newTracks.splice(state.trackIndex, 1);
      return {
        ...state,
        trackIndex: 0,
        playingTracks: [...removedTrack, ...shuffle(newTracks)]
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat: action.payload
      };
    default:
      return state;
  }
};

export default playerReducer;
