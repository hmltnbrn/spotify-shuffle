/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { playTrack, togglePlaying, shuffleTracks, setRepeat } from './actions';

import Toast from '../local/Toast';

import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackList from './TrackList';
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
  playingTracks: Array<any>,
  repeatTrack: boolean,
  playTrack: (track: Object, trackIndex: number, playlistIndex: number, playingTracks?: Array<any>) => void,
  togglePlaying: (playing: boolean) => void => void,
  shuffleTracks: () => void,
  setRepeat: (repeat: boolean) => void
};

type State = {
  currentPosition: number,
  sliding: boolean,
  toastVisible: boolean,
  toastMessage: string,
  fadeFront: any,
  fadeBack: any,
  showTracks: boolean
};

class PlayerScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Player'
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPosition: 0,
      sliding: false,
      toastVisible: false,
      toastMessage: "",
      fadeFront: new Animated.Value(1),
      fadeBack: new Animated.Value(0),
      showTracks: false
    };
  }

  intervalId: IntervalID;

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

  onForward(trackFinished) {
    if(trackFinished && this.props.repeatTrack) {
      clearInterval(this.intervalId);
      this.props.playTrack(this.props.playingTracks[this.props.trackIndex].track, this.props.trackIndex, this.props.playlistIndex);
      this.setState({
        currentPosition: 0,
        sliding: false
      }, this.songTicker);
    }
    else {
      if (this.props.trackIndex < this.props.tracks.length - 1) {
        clearInterval(this.intervalId);
        this.props.playTrack(this.props.playingTracks[this.props.trackIndex + 1].track, this.props.trackIndex + 1, this.props.playlistIndex);
        this.setState({
          currentPosition: 0,
          sliding: false
        }, this.songTicker);
      }
      else {
        clearInterval(this.intervalId);
        this.props.playTrack(this.props.playingTracks[0].track, 0, this.props.playlistIndex);
        this.setState({
          currentPosition: 0,
          sliding: false
        }, this.songTicker);
      }
    }
  }

  onRepeat() {
    this.props.setRepeat(!this.props.repeatTrack);
  }

  onShuffle() {
    this.props.shuffleTracks();
    this.setState({ toastVisible: true, toastMessage: "Playlist Shuffled" }, () => { this.hideToast(); });
  }

  hideToast = () => {
    this.setState({
      toastVisible: false,
    });
  };

  changeTrackCard() {
    Animated.stagger(100, [
      Animated.timing(this.state.fadeFront, {
        toValue: this.state.showTracks ? 1 : 0,
        duration: 1000
      }),
      Animated.timing(this.state.fadeBack, {
        toValue: this.state.showTracks ? 0 : 1,
        duration: 1000
      })
    ]).start();
    this.setState({ showTracks: !this.state.showTracks });
  }

  render () {
    const { track, playing, tracks, trackIndex, playlists, playlistIndex, playingTracks, repeatTrack } = this.props;
    const totalTracks = tracks.length;
    const trackLength = track.duration_ms/1000;
    const artist = track.artists.map((artist) => { return artist.name; }).join(", ");
    const playlistName = playlists[playlistIndex].name;
    return (
      <View style={styles.container}>
        <Toast visible={this.state.toastVisible} message={this.state.toastMessage} />
        <Header
          playlistName={playlistName}
          totalTracks={totalTracks}
          currentTrack={trackIndex + 1}
          showTracks={this.state.showTracks}
          changeTrackCard={this.changeTrackCard.bind(this)}
        />
        <View>
          <Animated.View style={[styles.flipCard, { opacity: this.state.fadeFront }]}>
            <AlbumArt
              url={track.album.images[0].url}
            />
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, { opacity: this.state.fadeBack }]}>
            <TrackList
              tracks={playingTracks}
            />
          </Animated.View>
        </View>
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
          repeatTrack={repeatTrack}
          onPressPause={() => this.togglePlaying(false)}
          onPressPlay={() => this.togglePlaying(true)}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          onRepeat={this.onRepeat.bind(this)}
          onShuffle={this.onShuffle.bind(this)}
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
  playlistIndex: state.player.playlistIndex,
  playingTracks: state.player.playingTracks,
  repeatTrack: state.player.repeat
});

export default connect(mapStateToProps, { playTrack, togglePlaying, shuffleTracks, setRepeat })(PlayerScreen);

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    justifyContent: 'space-around',
    paddingBottom: 225
  },
  flipCard: {
    width: imageSize,
    height: imageSize,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    left: 24
  },
});
