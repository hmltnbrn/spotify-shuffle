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
import { NavigationState, NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { getPlaylistTracks, shuffleTracks } from './actions';
import { playTrack } from '../player/actions';

type Props = {
  tracks: Array<any>,
  getPlaylistTracks: (id: string, totalTracks: string) => void,
  shuffleTracks: () => void,
  playTrack: (track: Object, trackIndex: number, playlistIndex: number, playingTracks?: Array<any>) => void,
  navigation: NavigationScreenProp<NavigationState>
};

type State = {
  playlistIndex: number
};

class TracksScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('playlistName', 'Playlist Tracks'),
    };
  };

  state = {
    playlistIndex: 0
  };

  componentDidMount() {
    this.props.getPlaylistTracks(this.props.navigation.getParam('playlistId'), this.props.navigation.getParam('playlistTracksTotal'));
    this.setState({ playlistIndex: this.props.navigation.getParam('playlistIndex') });
  }

  playTrack = (track, index) => {
    console.log(track)
    this.props.playTrack(track, index, this.state.playlistIndex, this.props.tracks);
  }

  render() {
    const { tracks } = this.props;
    // console.log(tracks)
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.buttonContainer}>
            <Text>{`${tracks.length} ${tracks.length === 1 ? "track" : "tracks"}`}</Text>
            <TouchableHighlight onPress={() => this.props.shuffleTracks()} underlayColor="#fafafa">
              <Icon name="shuffle" size={25} color={"#000000"} />
            </TouchableHighlight>
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
          keyExtractor={(item, index) => {
            return item.track.id == "null" || !item.track.id ? index.toString() : item.track.id
          }}
        />
        </View>
      );
    }
  }

const mapStateToProps = (state) => ({
  tracks: state.playlists.tracks
});

export default connect(mapStateToProps, { getPlaylistTracks, shuffleTracks, playTrack })(TracksScreen);

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
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10
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
