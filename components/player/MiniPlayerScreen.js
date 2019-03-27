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
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { playTrack, togglePlaying } from './actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  playing: boolean,
  playingTracks: Array<any>,
  tracks: Array<any>,
  track: Object,
  trackIndex: number,
  playlistIndex: number,
  repeatTrack: boolean,
  playTrack: (track: Object, trackIndex: number, playlistIndex: number, playingTracks?: Array<any>) => void,
  togglePlaying: (playing: boolean) => void => void
};

type State = {
  currentPosition: number
};

class MiniPlayerScreen extends Component<Props, State> {
  intervalId: IntervalID;

  state = {
    currentPosition: 0
  };

  async componentDidMount() {
    const currentlyPlaying = await Spotify.getPlaybackStateAsync();
    if(currentlyPlaying && this.props.playing) {
      this.setState({ currentPosition: Math.floor(currentlyPlaying.position) }, this.songTicker);
    }
    else if(currentlyPlaying && !this.props.playing) {
      this.setState({ currentPosition: Math.floor(currentlyPlaying.position) });
    }
  }

  async componentWillReceiveProps(nextProps: Props) {
    if(nextProps.trackIndex !== this.props.trackIndex || nextProps.playlistIndex !== this.props.playlistIndex) {
      clearInterval(this.intervalId);
      const currentlyPlaying = await Spotify.getPlaybackStateAsync();
      if(currentlyPlaying && this.props.playing) {
        this.setState({ currentPosition: Math.floor(currentlyPlaying.position) }, this.songTicker);
      }
      else if(currentlyPlaying && !this.props.playing) {
        this.setState({ currentPosition: Math.floor(currentlyPlaying.position) });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  songTicker() {
    this.intervalId = setInterval(
      () => this.onProgress(), 1000
    );
  }

  onProgress() {
    if(this.state.currentPosition + 1 >= this.props.track.duration_ms/1000) {
      this.onForward();
    }
    else {
      this.setState(prevState => {
        return { currentPosition: prevState.currentPosition + 1 }
      });
    }
  }

  togglePlaying(playState) {
    clearInterval(this.intervalId);
    this.props.togglePlaying(playState);
    if(playState) {
      this.songTicker();
    }
  }

  onForward() {
    if(this.props.repeatTrack) {
      clearInterval(this.intervalId);
      this.props.playTrack(this.props.playingTracks[this.props.trackIndex].track, this.props.trackIndex, this.props.playlistIndex);
      this.setState({
        currentPosition: 0
      }, this.songTicker);
    }
    else {
      if (this.props.trackIndex < this.props.tracks.length - 1) {
        clearInterval(this.intervalId);
        this.props.playTrack(this.props.playingTracks[this.props.trackIndex + 1].track, this.props.trackIndex + 1, this.props.playlistIndex);
        this.setState({
          currentPosition: 0
        }, this.songTicker);
      }
      else {
        clearInterval(this.intervalId);
        this.props.playTrack(this.props.playingTracks[0].track, 0, this.props.playlistIndex);
        this.setState({
          currentPosition: 0
        }, this.songTicker);
      }
    }
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
  playingTracks: state.player.playingTracks,
  tracks: state.playlists.tracks,
  track: state.player.track,
  trackIndex: state.player.trackIndex,
  playlistIndex: state.player.playlistIndex,
  repeatTrack: state.player.repeat
});

export default connect(mapStateToProps, { playTrack, togglePlaying })(MiniPlayerScreen);

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
