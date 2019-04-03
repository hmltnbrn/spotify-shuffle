/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar
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
  playing: boolean,
  track: Object,
  trackIndex: number,
  queueName: string,
  queueTracks: Array<any>,
  repeatTrack: boolean,
  playTrack: (track: Object, trackIndex: number, queueName?: ?string, queueTracks?: ?Array<any>, position?: ?number, playState?: ?boolean) => void,
  togglePlaying: (playState: boolean) => void => void,
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
    if(nextProps.trackIndex !== this.props.trackIndex || nextProps.queueName !== this.props.queueName) {
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
    await Spotify.seek(time);
    this.setState({
      currentPosition: time,
      sliding: false
    }, this.songTicker);
    this.togglePlaying(true);
  }

  async restartTrack() {
    clearInterval(this.intervalId);
    await Spotify.seek(0);
    this.setState({
      currentPosition: 0
    }, this.songTicker);
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
      this.props.playTrack(this.props.queueTracks[this.props.trackIndex - 1].track, this.props.trackIndex - 1);
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
      this.props.playTrack(this.props.queueTracks[this.props.trackIndex].track, this.props.trackIndex);
      this.setState({
        currentPosition: 0,
        sliding: false
      }, this.songTicker);
    }
    else {
      if (this.props.trackIndex < this.props.queueTracks.length - 1) {
        clearInterval(this.intervalId);
        this.props.playTrack(this.props.queueTracks[this.props.trackIndex + 1].track, this.props.trackIndex + 1);
        this.setState({
          currentPosition: 0,
          sliding: false
        }, this.songTicker);
      }
      else {
        clearInterval(this.intervalId);
        this.props.playTrack(this.props.queueTracks[0].track, 0);
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
    this.setState({ toastVisible: true, toastMessage: "Queue Shuffled" }, () => { this.hideToast(); });
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
        duration: 500
      }),
      Animated.timing(this.state.fadeBack, {
        toValue: this.state.showTracks ? 0 : 1,
        duration: 500
      })
    ]).start();
    this.setState({ showTracks: !this.state.showTracks });
  }

  render () {
    const { track, playing, trackIndex, queueName, queueTracks, repeatTrack } = this.props;
    const totalTracks = queueTracks.length;
    const trackLength = track.duration_ms/1000;
    const artist = track.artists.map((artist) => { return artist.name; }).join(", ");
    return (
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
        <Toast
          visible={this.state.toastVisible}
          message={this.state.toastMessage}
        />
        <Header
          playlistName={queueName}
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
              tracks={queueTracks}
              restartTrack={this.restartTrack.bind(this)}
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
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  playing: state.player.playing,
  queueName: state.player.queueName,
  queueTracks: state.player.queueTracks,
  track: state.player.track,
  trackIndex: state.player.trackIndex,
  repeatTrack: state.player.repeat
});

export default connect(mapStateToProps, { playTrack, togglePlaying, shuffleTracks, setRepeat })(PlayerScreen);

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

const cardSize = Screen.width - 48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414'
  },
  contentWrapper: {
    justifyContent: 'space-around',
    height: Screen.height - 50
  },
  flipCard: {
    width: cardSize,
    height: cardSize,
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    left: 24
  }
});
