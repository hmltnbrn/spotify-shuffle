import axios from 'axios';
import Spotify from 'rn-spotify-sdk';

// Action Types
export const REQUEST_AUTHORIZATION = 'REQUEST_AUTHORIZATION';

export const requestAuthorization = () => async dispatch => {
  try {
    dispatch({
      type: REQUEST_AUTHORIZATION,
      payload: ""
    });
  } catch(err) {
    console.log('in hereh')
    console.error(err)
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
}
