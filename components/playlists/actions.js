import Spotify from 'rn-spotify-sdk';

// Action Types
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const GET_PLAYLIST_TRACKS = 'GET_PLAYLIST_TRACKS';
export const SEARCH_PLAYLISTS = 'SEARCH_PLAYLISTS';

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

export const searchPlaylists = (query) => async dispatch => {
  try {
    dispatch({
      type: SEARCH_PLAYLISTS,
      payload: query
    });
  } catch(err) {
    console.error(err)
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
}
