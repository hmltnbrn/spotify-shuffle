import { combineReducers } from 'redux';

import headerReducer from './components/header/reducer';
import userDetailsReducer from './components/initial/reducer';
import playlistReducer from './components/playlists/reducer';
import playerReducer from './components/player/reducer';

export default combineReducers({
  header: headerReducer,
  user: userDetailsReducer,
  playlists: playlistReducer,
  player: playerReducer
});
