import React, { Component } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { getAllPlaylists } from './playlists/actions';

class PlayerScreen extends Component {
	static navigationOptions = {
		title: 'Player',
	};

	constructor(props) {
		super(props);

		this.state = {
			spotifyUserName: null
		};

		this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
		this.spotifyRenewButtonWasPressed = this.spotifyRenewButtonWasPressed.bind(this);
	}

	componentDidMount() {
		// send api request to get user info
		// Spotify.getMe().then((result) => {
		// 	// update state with user info
		// 	this.setState({ spotifyUserName: result.display_name });
		// 	// play song
		// 	// return Spotify.playURI("spotify:track:2zk7TQx9Xa4yxYmsjgDCPp", 0, 0);
		// }).then(() => {
		// 	// success
		// }).catch((error) => {
		// 	// error
		// 	Alert.alert("Error", error.message);
		// });
	}

	goToInitialScreen() {
		this.props.navigation.navigate('initial');
	}

	spotifyLogoutButtonWasPressed() {
		Spotify.logout().finally(() => {
			this.goToInitialScreen();
		});
	}

  spotifyGetPlayList() {
    // Spotify.sendRequest("v1/me/playlists", "get", {}, false).then((result) => {
		// 	// update state with user info
		// 	// this.setState({ spotifyUserName: result.display_name });
		// 	// // play song
		// 	// return Spotify.playURI("spotify:track:2zk7TQx9Xa4yxYmsjgDCPp", 0, 0);
    //   console.log(result)
		// }).then(() => {
		// 	// success
		// }).catch((error) => {
		// 	// error
		// 	Alert.alert("Error", error.message);
		// });
    this.props.getAllPlaylists();
  }

	render() {
    const { playlists } = this.props;
    console.log(playlists);
		return (
			<View style={styles.container}>
				{ this.state.spotifyUserName!=null ? (
					<Text style={styles.greeting}>
						You are logged in as {this.state.spotifyUserName}
					</Text>
				) : (
					<Text style={styles.greeting}>
						Getting user info...
					</Text>
				)}
				<TouchableHighlight onPress={this.spotifyLogoutButtonWasPressed}>
					<Text>Logout</Text>
				</TouchableHighlight>
        <TouchableHighlight onPress={this.spotifyGetPlayList.bind(this)}>
					<Text>Playlist</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
  playlists: state.playlists.playlists
});

export default connect(mapStateToProps, { getAllPlaylists })(PlayerScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	greeting: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
});
