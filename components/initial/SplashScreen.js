/**
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
	ActivityIndicator,
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
  Linking
} from 'react-native';
import { NavigationState, NavigationScreenProp } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import Config from 'react-native-config';

type Props = {
  navigation: NavigationScreenProp<NavigationState>
};

type State = {
  spotifyInitialized: boolean
};

export default class SplashScreen extends PureComponent<Props, State> {
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
        <ActivityIndicator animating={true} style={styles.loadIndicator}>
        </ActivityIndicator>
        <Text style={styles.loadMessage}>
          Loading...
        </Text>
      </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
  loadIndicator: {},
	loadMessage: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	}
});
