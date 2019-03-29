import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PlayerTransform } from './helpers/persist-transforms';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['player'],
  transforms: [PlayerTransform]
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, initialState, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};
