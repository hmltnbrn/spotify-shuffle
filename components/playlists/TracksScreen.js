/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  FlatList
} from 'react-native';
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { getPlaylistTracks } from './actions';
import { playTrack } from '../player/actions';

type Props = {
  tracks: Array<any>,
  getPlaylistTracks: (id: ?string, totalTracks: ?string) => void,
  playTrack: (track: Object, trackIndex: number, queueName?: ?string, queueTracks?: ?Array<any>, position?: ?number, playState?: ?boolean) => void,
  navigation: NavigationScreenProp<NavigationState>
};

type State = {
  playlistIndex: number,
  playlistName: string
};

class TracksScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('playlistName', 'Playlist Tracks'),
    };
  };

  state = {
    playlistIndex: 0,
    playlistName: ""
  };

  componentDidMount() {
    this.props.getPlaylistTracks(this.props.navigation.getParam('playlistId'), this.props.navigation.getParam('playlistTracksTotal'));
    this.setState({
      playlistIndex: this.props.navigation.getParam('playlistIndex'),
      playlistName: this.props.navigation.getParam('playlistName')
    });
  }

  playTrack = (track, index) => {
    console.log(track)
    this.props.playTrack(track, index, this.state.playlistName, this.props.tracks);
  }

  render() {
    const { tracks } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.buttonContainer}>
            <Text>{`${tracks.length} ${tracks.length === 1 ? "track" : "tracks"}`}</Text>
            <View style={styles.bigPlayButton}>
              <View style={styles.innerPlayButton}>
                <TouchableHighlight onPress={() => this.playTrack(tracks[0].track, 0)} underlayColor="#fafafa">
                  <Icon name="play-circle-filled" size={50} color={"#1db954"} />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={tracks}
          renderItem={({item, index}) => {
            let imageView = item.track.album.images.length > 0 ? (
              <Image
                style={styles.trackImage}
                source={{uri: item.track.album.images[item.track.album.images.length - 1].url}}
                resizeMode="contain"
              /> ) : (
              <View
                style={[styles.trackImage, styles.missingImage]}
              >
                <Image
                  style={{width: 40, height: 40}}
                  source={require('../../assets/images/Spotify_Icon_RGB_White.png')}
                />
              </View>
            );
            return (
              <TouchableHighlight onPress={() => this.playTrack(item.track, index)} underlayColor="#fafafa">
                <View style={styles.trackContainer}>
                  {imageView}
                  <View style={styles.trackTextCard}>
                    <Text style={styles.trackText} numberOfLines={1} ellipsizeMode="tail">{item.track.name}</Text>
                    <Text style={[styles.trackText, styles.trackTextArtists]} numberOfLines={1} ellipsizeMode="tail">{item.track.artists.map((artist) => { return artist.name; }).join(", ")}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  tracks: state.playlists.tracks
});

export default connect(mapStateToProps, { getPlaylistTracks, playTrack })(TracksScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  topContainer: {
    elevation: 3,
    zIndex: 3,
    backgroundColor: '#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 60
  },
  bigPlayButton: {
    position: 'absolute',
    top: 10,
    left: '100%',
    elevation: 3,
    backgroundColor: '#000000',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden'
  },
  innerPlayButton: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  trackContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginVertical: 3,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  trackImage: {
    width: 64,
    height: 64
  },
  missingImage: {
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trackTextCard: {
    marginLeft: 10
  },
  trackText: {
    fontSize: 15,
    color: '#000000',
    maxWidth: 250
  },
  trackTextArtists: {
    fontSize: 12
  }
});
