// Action Types
export const SET_TITLE = 'SET_TITLE';
export const TOGGLE_SEARCH = 'TOGGLE_SEARCH';

export const setTitle = (title) => async dispatch => {
  dispatch({
    type: SET_TITLE,
    payload: title
  });
};

export const toggleSearch = (search) => async dispatch => {
  dispatch({
    type: TOGGLE_SEARCH,
    payload: search
  });
};
