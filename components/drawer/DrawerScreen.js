/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  displayName: string,
  email: string
};

class DrawerScreen extends Component<Props> {

  navigateToScreen = (route: string) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  signOut() {
    Spotify.logout().finally(() => {
      this.props.navigation.navigate('Splash');
    });
  }

  render () {
    return (
      <View>
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
              <View style={styles.usernameContainer}>
                <Icon name="person" size={25} color={"#ffffff"} />
                <View>
                  <Text style={[styles.usernameText, styles.displayNameText]}>{this.props.displayName}</Text>
                  <Text style={styles.usernameText}>{this.props.email}</Text>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.menuItem}>
                <Icon name="playlist-play" size={25} color={"#1db954"} />
                <Text style={styles.menuText} onPress={this.navigateToScreen('Playlists')}>Playlists</Text>
              </View>
              <View style={styles.menuItem}>
                <CommIcon name="logout" size={25} color={"#1db954"} />
                <Text style={styles.menuText} onPress={this.signOut.bind(this)}>Sign Out</Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  displayName: state.user.displayName,
  email: state.user.email
});

export default connect(mapStateToProps)(DrawerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    minHeight: 100,
    backgroundColor: '#1db954',
    padding: 10,
    marginBottom: 10
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  usernameText: {
    color: '#ffffff',
    paddingLeft: 30
  },
  displayNameText: {
    fontWeight: 'bold'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#d6d7da'
  },
  menuText: {
    color: '#1db954',
    paddingLeft: 30,
    fontWeight: 'bold'
  }
});
