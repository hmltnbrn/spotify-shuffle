/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import type { Node } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { toggleSearch } from './actions';
import { resetPlaylists } from '../playlists/actions';
import NavigationService from '../../services/NavigationService';

type Props = {
  children?: Node,
  active: boolean,
  playlists: Array<any>,
  toggleSearch: (search: boolean) => void,
  resetPlaylists: () => void
};

class SearchOverlay extends Component<Props> {

  goToTracks = (playlist, index) => {
    this.props.toggleSearch(false);
    this.props.resetPlaylists();
    NavigationService.navigate('Tracks', {
      playlistIndex: index,
      playlistId: playlist.id,
      playlistName: playlist.name,
      playlistTracksTotal: playlist.tracks.total
    });
  }

  render () {
    const { active, playlists } = this.props;
    return (
      <View style={styles.container}>
        {active ? (
          <View style={styles.loadingContainer}>
            <FlatList
              contentContainerStyle={{ paddingTop: 3, paddingBottom: 100, paddingHorizontal: 20 }}
              keyboardShouldPersistTaps={'handled'}
              data={playlists}
              renderItem={({item, index}) => {
                let imageView = item.images.length > 0 ? (
                  <Image
                    style={styles.playlistImage}
                    source={{uri: item.images[0].url}}
                    resizeMode="contain"
                  /> ) : (
                  <View
                    style={[styles.playlistImage, styles.missingImage]}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../../assets/images/Spotify_Icon_RGB_White.png')}
                    />
                  </View>
                );
                return (
                  <TouchableHighlight onPress={() => this.goToTracks(item, index)} underlayColor="#fafafa">
                    <View style={styles.playlistContainer}>
                      {imageView}
                      <View style={styles.playlistTextCard}>
                        <Text style={styles.playlistText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                        <Text style={[styles.playlistText, styles.playlistTextTracks]} numberOfLines={1} ellipsizeMode="tail">{`${item.tracks.total} ${item.tracks.total === 1 ? "track" : "tracks"}`}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View> ) : (
          <View></View>
        )}
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  active: state.header.searchActive,
  playlists: state.playlists.playlists
});

export default connect(mapStateToProps, { toggleSearch, resetPlaylists })(SearchOverlay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fafafa'
  },
  loadingContainer: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    elevation: 5
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
    backgroundColor: '#191414',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playlistTextCard: {
    marginLeft: 10
  },
  playlistText: {
    fontSize: 15,
    color: '#000000',
    maxWidth: 250
  },
  playlistTextTracks: {
    fontSize: 12
  }
});
