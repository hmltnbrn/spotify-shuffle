/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingOverlay from './components/local/LoadingOverlay.js';
import PlayerOverlay from './components/player/PlayerOverlay.js';

import AppNavigation from './AppNavigation';

const { store, persistor } = configureStore();

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoadingOverlay>
            <PlayerOverlay>
              <AppNavigation />
            </PlayerOverlay>
          </LoadingOverlay>
        </PersistGate>
      </Provider>
    )
  }
};
