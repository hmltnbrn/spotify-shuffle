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
  createAppContainer,
  DrawerActions
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SplashScreen from './components/initial/SplashScreen.js';
import SignInScreen from './components/initial/SignInScreen.js';
import DrawerScreen from './components/drawer/DrawerScreen.js';
import PlaylistsScreen from './components/playlists/PlaylistsScreen.js';
import TracksScreen from './components/playlists/TracksScreen.js';
import PlayerScreen from './components/player/PlayerScreen.js';

const DrawerAvailableStack = createStackNavigator({
  Playlists: { screen: PlaylistsScreen },
  Tracks: { screen: TracksScreen },
  Player: { screen: PlayerScreen }
  /* any other route where you want the drawer to remain available */
},{
  initialRouteName: 'Playlists',
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerMode: 'screen',
      headerTitle: 'Drawer',
      headerLeft:
      <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) } }>
        <Icon name="menu" size={25} color={"#ffffff"} style={{paddingLeft: 15}}/>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#1db954',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'normal',
      }
    };
  }
});

const DrawerNavigator = createDrawerNavigator({
  DrawerAvailable: DrawerAvailableStack
},{
  initialRouteName: 'DrawerAvailable',
  contentComponent: DrawerScreen,
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
  title: 'Main',
  headerMode: 'none',
  initialRouteName: 'InitialScreens'
});

export default createAppContainer(PrimaryNav);
