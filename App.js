/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import LoadingOverlay from './components/local/LoadingOverlay.js';
import PlayerOverlay from './components/player/PlayerOverlay.js';

import AppNavigation from './AppNavigation';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <LoadingOverlay>
          <PlayerOverlay>
            <AppNavigation />
          </PlayerOverlay>
        </LoadingOverlay>
      </Provider>
    )
  }
};
