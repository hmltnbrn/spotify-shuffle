import Spotify from 'rn-spotify-sdk';

// Action Types
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const setUserDetails = () => async dispatch => {
  try {
    let res = await Spotify.getMe();
    dispatch({
      type: SET_USER_DETAILS,
      payload: res.display_name
    });
  } catch(err) {
    console.error(err)
  }
}
