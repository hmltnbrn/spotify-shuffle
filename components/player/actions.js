import Spotify from 'rn-spotify-sdk';
import * as storage from '../../helpers/storage';

// Action Types
export const SET_TRACK = 'SET_TRACK';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
export const SHUFFLE_TRACKS = 'SHUFFLE_TRACKS';
export const SET_REPEAT = 'SET_REPEAT';
export const RESET_PLAYER = 'RESET_PLAYER';

export const playTrack = (track, trackIndex, queueName, queueTracks, position, playState) => async dispatch => {
  try {
    await Spotify.playURI(track.uri, 0, position || 0);
    if(playState === false) {
      await Spotify.setPlaying(false);
    }
    dispatch({
      type: SET_TRACK,
      payload: { track, trackIndex, queueName, queueTracks, position, playState }
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: SET_ERROR,
    //   payload: err
    // });
  }
};

export const togglePlaying = (playState) => async dispatch => {
  try {
    await Spotify.setPlaying(playState);
    dispatch({
      type: TOGGLE_PLAYING,
      payload: playState
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: SET_ERROR,
    //   payload: err
    // });
  }
};

export const shuffleTracks = () => async dispatch => {
  dispatch({
    type: SHUFFLE_TRACKS
  });
};

export const setRepeat = (repeat) => async dispatch => {
  dispatch({
    type: SET_REPEAT,
    payload: repeat
  });
};

export const resetPlayer = () => async dispatch => {
  dispatch({
    type: RESET_PLAYER
  });
};
