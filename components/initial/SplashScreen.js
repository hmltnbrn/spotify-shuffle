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
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { setUserDetails } from './actions';
import { playTrack } from '../player/actions';

type Props = {
  queueName: string,
  queueTracks: Array<any>,
  trackIndex: number,
  currentPosition: number,
  navigation: NavigationScreenProp<NavigationState>,
  setUserDetails: () => void,
  playTrack: (track: Object, trackIndex: number, queueName?: ?string, queueTracks?: ?Array<any>, position?: ?number, playState?: ?boolean) => void
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
        "scopes": Config.SCOPES.split("|"),
        "tokenSwapURL": Config.TOKEN_SWAP_URL,
        "tokenRefreshURL": Config.TOKEN_REFRESH_URL
      };
      const loggedIn = await Spotify.initialize(spotifyOptions);
      this.setState({
        spotifyInitialized: true
      });
      if(loggedIn) {
        this.props.setUserDetails();
        this.startTrack();
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
        this.startTrack();
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

  startTrack() {
    if(this.props.queueTracks.length > 0) {
      this.props.playTrack(this.props.queueTracks[this.props.trackIndex].track, this.props.trackIndex, null, null, this.props.currentPosition, false);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadMessage}>
          Shufflefy
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  queueName: state.player.queueName,
  queueTracks: state.player.queueTracks,
  trackIndex: state.player.trackIndex,
  currentPosition: state.player.currentPosition
});

export default connect(mapStateToProps, { setUserDetails, playTrack })(SplashScreen);

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
