/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { NavigationActions, DrawerActions, NavigationState, NavigationScreenProp } from 'react-navigation';
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
  username: string
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
                <Text style={styles.usernameText}>{this.props.username}</Text>
              </View>
            </View>
            <View>
              <View style={styles.menuItem}>
                <Icon name="playlist-play" size={25} color={"#1db954"} />
                <Text style={styles.menuText} onPress={this.navigateToScreen('Playlists')}>Playlists</Text>
              </View>
              <View style={styles.menuItem}>
                <Icon name="music-note" size={25} color={"#1db954"} />
                <Text style={styles.menuText} onPress={this.navigateToScreen('Player')}>Player</Text>
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
  username: state.user.username
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
