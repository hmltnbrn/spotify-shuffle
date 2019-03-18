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
        <Text style={styles.greeting}>
          Hey! You! Log into your spotify
        </Text>
        <TouchableHighlight onPress={this.spotifyLoginButtonWasPressed} style={styles.spotifyLoginButton}>
          <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
        </TouchableHighlight>
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
		backgroundColor: '#F5FCFF',
	},
	spotifyLoginButton: {
		justifyContent: 'center',
		borderRadius: 18,
		backgroundColor: 'green',
		overflow: 'hidden',
		width: 200,
		height: 40,
		margin: 20,
	},
	spotifyLoginButtonText: {
		fontSize: 20,
		textAlign: 'center',
		color: 'white',
	},
	greeting: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});
