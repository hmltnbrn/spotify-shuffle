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
  FlatList,
  TextInput,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { getAllPlaylists, searchPlaylists } from './actions';

type Props = {
  playlists: Array<any>,
  getAllPlaylists: () => void,
  searchPlaylists: (text: string) => void,
  navigation: NavigationScreenProp<NavigationState>
};

const { width, height } = Dimensions.get('window');
const imageSize = width;

class PlaylistsScreen extends Component<Props> {
  static navigationOptions = {
    headerTitle: 'Playlists'
  };

  componentDidMount() {
    this.props.getAllPlaylists();
  }

  goToTracks = (playlist, index) => {
    this.props.navigation.navigate('Tracks', {
      playlistIndex: index,
      playlistId: playlist.id,
      playlistName: playlist.name,
      playlistTracksTotal: playlist.tracks.total
    });
  }

  render() {
    const { playlists } = this.props;
    console.log(playlists)
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1db954"
        />
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={playlists}
          renderItem={({item, index}) => {
            let imageView = item.images.length > 0 ? (
              <Image
                style={styles.playlistImage}
                source={{uri: item.images[0].url}}
                resizeMode="contain"
              /> ) : (
              <View style={[styles.playlistImage, styles.missingImage]}>
                <Image
                  style={{width: imageSize/1.5, height: imageSize/1.5}}
                  source={require('../../assets/images/Spotify_Icon_RGB_White.png')}
                />
              </View>
            );
            return (
              <TouchableHighlight onPress={() => this.goToTracks(item, index)} underlayColor="#fafafa">
                <View style={styles.playlistContainer}>
                  {imageView}
                  <View style={styles.playlistDescriptionCard}>
                    <Text style={styles.playlistText}>{item.name}</Text>
                    <Text style={[styles.playlistText, styles.playlistTextTracks]}>{`${item.tracks.total} ${item.tracks.total === 1 ? "track" : "tracks"}`}</Text>
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
  playlists: state.playlists.playlists
});

export default connect(mapStateToProps, { getAllPlaylists, searchPlaylists })(PlaylistsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  playlistContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 3,
    width: imageSize,
    backgroundColor: '#000000',
    overflow: 'hidden'
  },
  playlistImage: {
    width: imageSize,
    height: imageSize,
  },
  playlistDescriptionCard: {
    backgroundColor: '#ffffff',
    width: imageSize
  },
  missingImage: {
    backgroundColor: '#191414',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playlistText: {
    fontSize: 20,
    color: '#000000',
    margin: 6
  },
  playlistTextTracks: {
    fontSize: 17
  }
});
