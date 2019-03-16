/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider} from 'react-redux';
import store from './store';
import {
	createSwitchNavigator,
  createStackNavigator,
	createAppContainer
} from 'react-navigation';

import InitialScreen from './components/InitialScreen.js';
import PlayerScreen from './components/PlayerScreen.js';
import PlaylistsScreen from './components/playlists/PlaylistsScreen.js';

const AuthStack = createStackNavigator({ initial: InitialScreen });
const AppStack = createStackNavigator(
  {
    playlists: PlaylistsScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1db954'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

let RootSwitch = createSwitchNavigator(
  {
    initial: AuthStack,
    playlists: AppStack
  },
  {
    initialRouteName: 'initial'
  }
);

let Navigation = createAppContainer(RootSwitch);

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
