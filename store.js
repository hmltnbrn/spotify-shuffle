import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage'
import { PlayerTransform } from './helpers/persist-transforms';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  whitelist: ['player'],
  transforms: [PlayerTransform]
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, initialState, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};
