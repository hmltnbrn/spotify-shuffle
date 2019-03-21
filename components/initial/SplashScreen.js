/**
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationState, NavigationScreenProp } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { setUserDetails } from './actions';

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  setUserDetails: () => void
};

type State = {
  spotifyInitialized: boolean
};

class SplashScreen extends PureComponent<Props, State> {
  state = {
    spotifyInitialized: false
  };

  goToPlaylists() {
    this.props.navigation.navigate('Playlists');
  }

  goToSignIn() {
    this.props.navigation.navigate('SignIn');
  }

  async initializeIfNeeded() {
    if(!await Spotify.isInitializedAsync()) {
      const spotifyOptions = {
        "clientID": Config.CLIENT_ID,
        "sessionUserDefaultsKey": Config.SESSION_KEY,
        "redirectURL": Config.REDIRECT_URL,
        "scopes": Config.SCOPES.split("|")
      };
      const loggedIn = await Spotify.initialize(spotifyOptions);
      this.setState({
        spotifyInitialized: true
      });
      if(loggedIn) {
        this.props.setUserDetails();
        this.goToPlaylists();
      }
      else {
        this.goToSignIn();
      }
    }
    else {
      this.setState({
        spotifyInitialized: true
      });
      if(await Spotify.isLoggedInAsync()) {
        this.props.setUserDetails();
        this.goToPlaylists();
      }
      else {
        this.goToSignIn();
      }
    }
  }

  componentDidMount() {
    this.initializeIfNeeded().catch((error) => {
      Alert.alert("Error", error.message);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadMessage}>
          Not Real Spotify
        </Text>
      </View>
    );
  }
}

export default connect(null, { setUserDetails })(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1db954',
  },
    loadMessage: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  }
});
