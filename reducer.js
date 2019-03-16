import { combineReducers } from 'redux';

import playlistReducer from './components/playlists/reducer';

export default combineReducers({
  playlists: playlistReducer
});
