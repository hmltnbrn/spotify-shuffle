import { combineReducers } from 'redux';

import userDetailsReducer from './components/initial/reducer';
import playlistReducer from './components/playlists/reducer';
import playerReducer from './components/player/reducer';

export default combineReducers({
  user: userDetailsReducer,
  playlists: playlistReducer,
  player: playerReducer
});
