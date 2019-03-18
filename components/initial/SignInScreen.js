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
import Spotify from 'rn-spotify-sdk';

export default class SignInScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

  goToPlaylists() {
		this.props.navigation.navigate('Playlists');
	}

  spotifyLoginButtonWasPressed = () => {
		Spotify.login().then((loggedIn) => {
			if(loggedIn) {
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
