import Spotify from 'rn-spotify-sdk';

// Action Types
export const SET_TRACK = 'SET_TRACK';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';

export const playTrack = (track, index) => async dispatch => {
  try {
    await Spotify.playURI(track.uri, 0, 0);
    dispatch({
      type: SET_TRACK,
      payload: { track, index }
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: SET_ERROR,
    //   payload: err
    // });
  }
}

export const togglePause = (pause) => async dispatch => {
  try {
    await Spotify.setPlaying(pause);
    dispatch({
      type: TOGGLE_PAUSE
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: SET_ERROR,
    //   payload: err
    // });
  }
}
