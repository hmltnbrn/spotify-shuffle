import Spotify from 'rn-spotify-sdk';

// Action Types
export const SET_TRACK = 'SET_TRACK';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
export const SHUFFLE_TRACKS = 'SHUFFLE_TRACKS';
export const SET_REPEAT = 'SET_REPEAT';

export const playTrack = (track, trackIndex, playlistIndex, playingTracks) => async dispatch => {
  try {
    await Spotify.playURI(track.uri, 0, 0);
    dispatch({
      type: SET_TRACK,
      payload: { track, trackIndex, playlistIndex, playingTracks }
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: SET_ERROR,
    //   payload: err
    // });
  }
};

export const togglePlaying = (playing) => async dispatch => {
  try {
    await Spotify.setPlaying(playing);
    dispatch({
      type: TOGGLE_PLAYING,
      payload: playing
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
