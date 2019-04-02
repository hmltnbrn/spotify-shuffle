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
import SearchOverlay from './components/header/SearchOverlay.js';

import AppNavigation from './AppNavigation';

import NavigationService from './services/NavigationService';

const { store, persistor } = configureStore();

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoadingOverlay>
            <PlayerOverlay>
              <SearchOverlay>
                <AppNavigation
                  ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
                />
              </SearchOverlay>
            </PlayerOverlay>
          </LoadingOverlay>
        </PersistGate>
      </Provider>
    )
  }
};
