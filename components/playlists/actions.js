import Spotify from 'rn-spotify-sdk';

// Action Types
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const GET_PLAYLIST_TRACKS = 'GET_PLAYLIST_TRACKS';
export const SEARCH_PLAYLISTS = 'SEARCH_PLAYLISTS';
export const SHUFFLE_TRACKS = 'SHUFFLE_TRACKS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const getAllPlaylists = () => async dispatch => {
  try {
    let res = await Spotify.sendRequest("v1/me/playlists", "get", {}, false);
    dispatch({
      type: GET_PLAYLISTS,
      payload: res.items
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
}

export const getPlaylistTracks = (id) => async dispatch => {
  try {
    let res = await Spotify.sendRequest(`v1/playlists/${id}/tracks`, "get", {}, false);
    dispatch({
      type: GET_PLAYLIST_TRACKS,
      payload: res.items
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
}

export const searchPlaylists = (query) => async dispatch => {
  dispatch({
    type: SEARCH_PLAYLISTS,
    payload: query
  });
}

export const shuffleTracks = () => async dispatch => {
  dispatch({
    type: SHUFFLE_TRACKS
  });
}
