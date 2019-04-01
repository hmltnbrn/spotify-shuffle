// Action Types
export const SET_TITLE = 'SET_TITLE';

export const setTitle = (title) => async dispatch => {
  dispatch({
    type: SET_TITLE,
    payload: title
  });
}
