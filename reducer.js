import { combineReducers } from 'redux';

import userDetailsReducer from './components/initial/reducer';
import playlistReducer from './components/playlists/reducer';

export default combineReducers({
  user: userDetailsReducer,
  playlists: playlistReducer
});
