/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { togglePlaying } from './actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  playing: boolean,
  track: Object,
  togglePlaying: (playing: boolean) => void => void
};

class MiniPlayerScreen extends Component<Props> {
  togglePlaying(playState) {
    this.props.togglePlaying(playState);
  }

  render () {
    const { track, playing } = this.props;
    const artist = track.artists.map((artist) => { return artist.name; }).join(", ");
    const imageView = track.album.images.length > 0 ? (
      <Image
        style={styles.trackImage}
        source={{uri: track.album.images[track.album.images.length - 1].url}}
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
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.detailsWrapper}>
            {imageView}
            <View style={styles.textWrapper}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{track.name}</Text>
              <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">{artist}</Text>
            </View>
          </View>
          <View style={styles.detailsWrapper}>
            {playing ?
              <TouchableOpacity onPress={() => this.togglePlaying(false)}>
                <View>
                  <Icon name="pause-circle-filled" size={60} color={"#ffffff"} />
                </View>
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => this.togglePlaying(true)}>
                <View>
                  <Icon name="play-circle-filled" size={60} color={"#ffffff"} />
                </View>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  playing: state.player.playing,
  track: state.player.track
});

export default connect(mapStateToProps, { togglePlaying })(MiniPlayerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    justifyContent: 'flex-start',
  },
  contentWrapper: {
    flexDirection: 'row',
    backgroundColor: '#191414',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 100
  },
  detailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textWrapper: {
    maxWidth: 200,
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left'
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 14,
    marginTop: 2
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
});
