/**
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  StatusBar
} from 'react-native';
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { setUserDetails } from './actions';

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  setUserDetails: () => void
};

class SignInScreen extends PureComponent<Props> {

  goToPlaylists() {
    this.props.navigation.navigate('Playlists');
  }

  spotifyLoginButtonWasPressed = () => {
    Spotify.login().then((loggedIn) => {
      if(loggedIn) {
        this.props.setUserDetails();
        this.goToPlaylists();
      }
    }).catch((error) => {
      Alert.alert("Error", error.message);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1db954"
        />
        <Image
          style={{width: 150, height: 150}}
          source={require('../../assets/images/Spotify_Icon_RGB_White.png')}
        />
        <Text style={styles.greeting}>
          Welcome to Shufflefy
        </Text>
        <Text style={[styles.greeting, styles.requirement]}>
          In order to use this app, you must have Spotify Premium
        </Text>
        <TouchableHighlight onPress={this.spotifyLoginButtonWasPressed} style={styles.spotifyLoginButton}>
          <Text style={styles.spotifyLoginButtonText}>Sign in to your Spotify account</Text>
        </TouchableHighlight>
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>This app is not affiliated with Spotify</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, { setUserDetails })(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1db954',
    padding: 20
  },
  spotifyLoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191414',
    overflow: 'hidden',
    width: 175,
    margin: 20,
    elevation: 3,
    padding: 10
  },
  spotifyLoginButtonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
  greeting: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    marginBottom: 25
  },
  requirement: {
    fontSize: 20
  },
  disclaimer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  disclaimerText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 15
  }
});
