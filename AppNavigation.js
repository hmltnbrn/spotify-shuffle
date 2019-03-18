/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
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
import PlaylistsScreen from './components/playlists/PlaylistsScreen.js';
import DrawerScreen from './components/drawer/DrawerScreen.js';

const MenuImage = ({navigation}) => {
  if(!navigation.state.isDrawerOpen) {
    return <Icon name="menu" size={25} color={"#ffffff"} />
  } else {
    return <Icon name="arrow-back" size={25} color={"#ffffff"} />
  }
};

const DrawerStack = createDrawerNavigator({
  Playlists: { screen: PlaylistsScreen },
},{
  initialRouteName: 'Playlists',
  contentComponent: DrawerScreen,
  drawerWidth: 300
});

const DrawerNavigation = createStackNavigator({
  drawerStack: { screen: DrawerStack }
},{
  defaultNavigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerMode: 'screen',
      headerTitle: routeName,
      headerLeft:
      <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.toggleDrawer()) } }>
        <MenuImage navigation={navigation}/>
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
  initialStack: { screen: InitialStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  title: 'Main',
  headerMode: 'none',
  initialRouteName: 'initialStack'
});

export default createAppContainer(PrimaryNav);
