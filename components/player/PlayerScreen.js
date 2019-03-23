/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { NavigationActions, DrawerActions, NavigationState, NavigationScreenProp } from 'react-navigation';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { playTrack, togglePause } from './actions';

import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import Controls from './Controls';
import SeekBar from './SeekBar';

type Props = {
  playlists: Array<any>,
  tracks: Array<any>,
  playing: boolean,
  paused: boolean,
  track: Object,
  trackIndex: number,
  playTrack: (track: Object, index: number) => void,
  togglePause: (paused: boolean) => void => void
};

type State = {
  currentPosition: number,
  sliding: boolean
};

class PlayerScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Player'
  };

  state = {
    currentPosition: 0,
    sliding: false
  }

  intervalId: IntervalID;

  async componentDidMount() {
    const currentlyPlaying = await Spotify.getPlaybackStateAsync();
    if(currentlyPlaying && !this.props.paused) {
      this.setState({ currentPosition: Math.floor(currentlyPlaying.position) }, this.songTicker);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  async seek(time) {
    time = Math.round(time);
    const seeking = await Spotify.seek(time);
    this.setState({
      currentPosition: time,
      sliding: false
    }, this.songTicker);
    this.togglePause(true);
  }

  onSliding() {
    if(!this.state.sliding) {
      clearInterval(this.intervalId);
      this.togglePause(false);
    }
    this.setState({
      sliding: true
    });
  }

  songTicker() {
    this.intervalId = setInterval(
      () => this.onProgress(), 1000
    );
  }

  onProgress() {
    this.setState(prevState => {
      return { currentPosition: prevState.currentPosition + 1 }
    });
  }

  togglePause(pauseState) {
    clearInterval(this.intervalId);
    this.props.togglePause(pauseState);
    if(pauseState) {
      this.songTicker();
    }
  }

  async onBack() {
    if (this.state.currentPosition < 10 && this.props.trackIndex > 0) {
      this.props.playTrack(this.props.tracks[this.props.trackIndex - 1].track, this.props.trackIndex - 1)
      this.setState({
        currentPosition: 0,
        sliding: false
      }, this.songTicker);
    }
    else if(this.props.trackIndex > 0) {
      await Spotify.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.props.trackIndex < this.props.tracks.length - 1) {
      this.props.playTrack(this.props.tracks[this.props.trackIndex + 1].track, this.props.trackIndex + 1);
      this.setState({
        currentPosition: 0,
        sliding: false
      }, this.songTicker);
    }
  }

  render () {
    const track = this.props.track;
    const totalLength = this.props.track.duration_ms/1000;
    return (
      <View style={styles.container}>
        <Header text={"Header Text"}/>
        <AlbumArt
          url={track.album.images[0].url}
        />
        <TrackDetails
          title={track.title}
          artist={track.artist}
        />
        <SeekBar
          currentPosition={this.state.currentPosition}
          trackLength={totalLength}
          onSeek={this.seek.bind(this)}
          onSlidingStart={this.onSliding.bind(this)}
        />
        <Controls
          paused={this.props.paused}
          onPressPause={() => this.togglePause(false)}
          onPressPlay={() => this.togglePause(true)}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  playlists: state.playlists.playlists,
  tracks: state.playlists.tracks,
  playing: state.player.playing,
  paused: state.player.paused,
  track: state.player.track,
  trackIndex: state.player.trackIndex
});

export default connect(mapStateToProps, { playTrack, togglePause })(PlayerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414'
  }
});
