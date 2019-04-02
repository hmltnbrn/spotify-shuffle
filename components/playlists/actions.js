import Spotify from 'rn-spotify-sdk';

// Action Types
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const REQUEST_PLAYLIST_TRACKS = 'REQUEST_PLAYLIST_TRACKS';
export const GET_PLAYLIST_TRACKS = 'GET_PLAYLIST_TRACKS';
export const END_REQUEST_PLAYLIST_TRACKS = 'END_REQUEST_PLAYLIST_TRACKS';
export const SEARCH_PLAYLISTS = 'SEARCH_PLAYLISTS';
export const RESET_PLAYLISTS = 'RESET_PLAYLISTS';

export const getAllPlaylists = () => async dispatch => {
  try {
    let res = await Spotify.sendRequest("v1/me/playlists", "get", {}, false);
    dispatch({
      type: GET_PLAYLISTS,
      payload: res.items
    });
  } catch(err) {
    console.error(err)
    dispatch({
      type: SET_ERROR,
      payload: err
    });
  }
};

export const getPlaylistTracks = (id, totalTracks) => async dispatch => {
  var offset = 0;
  var limit = 100;
  try {
    dispatch({
      type: REQUEST_PLAYLIST_TRACKS,
      payload: totalTracks
    });
    while(totalTracks > 0) {
      let res = await Spotify.sendRequest(`v1/playlists/${id}/tracks`, "get", { offset }, false);
      offset += 100;
      totalTracks -= 100;
      dispatch({
        type: GET_PLAYLIST_TRACKS,
        payload: res.items
      });
    }
    dispatch({
      type: END_REQUEST_PLAYLIST_TRACKS
    });
  } catch(err) {
    console.error(err)
    dispatch({
      type: SET_ERROR,
      payload: err
    });
  }
};

export const searchPlaylists = (query) => async dispatch => {
  dispatch({
    type: SEARCH_PLAYLISTS,
    payload: query
  });
};

export const resetPlaylists = () => async dispatch => {
  dispatch({
    type: RESET_PLAYLISTS
  });
};
