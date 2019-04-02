/**
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import type { NavigationState } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from './components/header/Header';
import SplashScreen from './components/initial/SplashScreen.js';
import SignInScreen from './components/initial/SignInScreen.js';
import Drawer from './components/drawer/Drawer.js';
import PlaylistsScreen from './components/playlists/PlaylistsScreen.js';
import TracksScreen from './components/playlists/TracksScreen.js';
import PlayerScreen from './components/player/PlayerScreen.js';

const DrawerAvailableStack = createStackNavigator({
  Playlists: { screen: PlaylistsScreen },
  Tracks: { screen: TracksScreen }
  /* any other route where you want the drawer to remain available */
},{
  initialRouteName: 'Playlists',
  headerMode: "float",
  defaultNavigationOptions: ({ navigation }) => {
    return {
      header: navigation => <Header {...navigation} />
    };
  }
});

const DrawerNavigator = createDrawerNavigator({
  DrawerAvailable: DrawerAvailableStack
},{
  initialRouteName: 'DrawerAvailable',
  contentComponent: Drawer,
  drawerWidth: 300
});

const MainStack = createStackNavigator({
  DrawerScreens: DrawerNavigator
  /* add routes here where you want the drawer to be locked */
}, {
  defaultNavigationOptions: () => ({
    header: null
  })
});

const InitialStack = createStackNavigator({
  Splash: { screen: SplashScreen },
  SignIn: { screen: SignInScreen }
}, {
  initialRouteName: 'Splash',
  defaultNavigationOptions: () => ({
    header: null
  })
});

const PrimaryNav = createSwitchNavigator({
  InitialScreens: { screen: InitialStack },
  MainScreens: { screen: MainStack }
}, {
  initialRouteName: 'InitialScreens'
});

export default createAppContainer<NavigationState, Object>(PrimaryNav);
