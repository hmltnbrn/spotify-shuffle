/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  StatusBar
} from 'react-native';
import { NavigationState, NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { getPlaylistTracks } from './actions';

type Props = {
  tracks: Array<any>,
  getPlaylistTracks: (id: string) => void,
  navigation: NavigationScreenProp<NavigationState>
};

class TracksScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('playlistName', 'Playlist Tracks'),
    };
  };

	componentDidMount() {
    this.props.getPlaylistTracks(this.props.navigation.getParam('playlistId'));
	}

	render() {
    const { tracks } = this.props;
    // console.log(tracks)
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          data={tracks}
          renderItem={({item}) => {
            // console.log(item["track"]["name"])
            // console.log(item["track"]["album"]["images"])
            // console.log(item.track.album.images.length)
            let imageView = item.track.album.images.length > 0 ? (
              <Image
                style={styles.playlistImage}
                source={{uri: item.track.album.images.pop().url}}
                resizeMode="contain"
              />
            ) : (
              <View style={[styles.playlistImage, styles.missingImage]}></View>
            );
            return (
              <View style={styles.playlistContainer}>
                {imageView}
                <View style={styles.playlistTextCard}>
                  <Text style={styles.playlistText} numberOfLines={1} ellipsizeMode="tail">{item.track.name}</Text>
                  <Text style={[styles.playlistText, styles.playlistTextArtists]} numberOfLines={1} ellipsizeMode="tail">{item.track.artists.map((artist) => { return artist.name; }).join(", ")}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => item.track.id}
        />
      </View>
    );
	}
}

const mapStateToProps = (state) => ({
  tracks: state.playlists.tracks
});

export default connect(mapStateToProps, { getPlaylistTracks })(TracksScreen);

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fafafa'
  },
  playlistContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginVertical: 3,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  playlistImage: {
    width: 64,
    height: 64
  },
  missingImage: {
    backgroundColor: '#1db954'
  },
  playlistTextCard: {
    marginLeft: 10
  },
  playlistText: {
    fontSize: 15,
    color: '#000000',
    maxWidth: 250
  },
  playlistTextArtists: {
    fontSize: 12
  }
});
