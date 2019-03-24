/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { playTrack, togglePlaying } from './actions';

import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import Controls from './Controls';
import SeekBar from './SeekBar';

type Props = {
  playlists: Array<any>,
  tracks: Array<any>,
  playing: boolean,
  track: Object,
  trackIndex: number,
  playlistIndex: number,
  playTrack: (track: Object, trackIndex: number, playlistIndex: number) => void,
  togglePlaying: (playing: boolean) => void => void
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
  };

  intervalId: IntervalID;

  async componentDidMount() {
    const currentlyPlaying = await Spotify.getPlaybackStateAsync();
    if(currentlyPlaying && this.props.playing) {
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
    this.togglePlaying(true);
  }

  onSliding() {
    if(!this.state.sliding) {
      clearInterval(this.intervalId);
      this.togglePlaying(false);
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

  togglePlaying(playState) {
    clearInterval(this.intervalId);
    this.props.togglePlaying(playState);
    if(playState) {
      this.songTicker();
    }
  }

  async onBack() {
    if (this.state.currentPosition < 10 && this.props.trackIndex > 0) {
      clearInterval(this.intervalId);
      this.props.playTrack(this.props.tracks[this.props.trackIndex - 1].track, this.props.trackIndex - 1, this.props.playlistIndex);
      this.setState({
        currentPosition: 0,
        sliding: false
      }, this.songTicker);
    }
    else if(this.props.trackIndex > 0) {
      clearInterval(this.intervalId);
      await Spotify.seek(0);
      this.setState({
        currentPosition: 0,
      }, this.songTicker);
    }
  }

  onForward() {
    if (this.props.trackIndex < this.props.tracks.length - 1) {
      clearInterval(this.intervalId);
      this.props.playTrack(this.props.tracks[this.props.trackIndex + 1].track, this.props.trackIndex + 1, this.props.playlistIndex);
      this.setState({
        currentPosition: 0,
        sliding: false
      }, this.songTicker);
    }
    else {
      clearInterval(this.intervalId);
      this.props.playTrack(this.props.tracks[0].track, 0, this.props.playlistIndex);
      this.setState({
        currentPosition: 0,
        sliding: false
      }, this.songTicker);
    }
  }

  render () {
    const { track, playing, tracks, trackIndex, playlists, playlistIndex } = this.props;
    const totalTracks = tracks.length;
    const trackLength = track.duration_ms/1000;
    const artist = track.artists.map((artist) => { return artist.name; }).join(", ");
    const playlistName = playlists[playlistIndex].name;
    return (
      <View style={styles.container}>
        <Header
          playlistName={playlistName}
          totalTracks={totalTracks}
          currentTrack={trackIndex + 1}
        />
        <AlbumArt
          url={track.album.images[0].url}
        />
        <TrackDetails
          title={track.name}
          artist={artist}
        />
        <SeekBar
          currentPosition={this.state.currentPosition}
          trackLength={Math.floor(trackLength)}
          onSeek={this.seek.bind(this)}
          onSlidingStart={this.onSliding.bind(this)}
          onForward={this.onForward.bind(this)}
        />
        <Controls
          playing={playing}
          onPressPause={() => this.togglePlaying(false)}
          onPressPlay={() => this.togglePlaying(true)}
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
  track: state.player.track,
  trackIndex: state.player.trackIndex,
  playlistIndex: state.player.playlistIndex
});

export default connect(mapStateToProps, { playTrack, togglePlaying })(PlayerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414'
  }
});
