/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import type { Node } from 'react';
import {
  View,
  StyleSheet,
  ProgressBarAndroid,
  Text
} from 'react-native';
import { connect } from 'react-redux';

type Props = {
  children?: Node,
  loading: boolean,
  tracks: Array<any>,
  totalTracks: number
};

class LoadingTracks extends Component<Props> {
  render () {
    const { loading, tracks, totalTracks } = this.props;
    const progress = tracks.length/totalTracks;
    return (
      <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}>
        {loading ? (
          <View style={styles.loadingContainer} pointerEvents="none">
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress}
              color="#1db954"
              style={styles.progressBar}
            />
            <Text>Loading your songs...</Text>
          </View> ) : (
          <View></View>
        )}
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.playlists.loadingTracks,
  tracks: state.playlists.tracks,
  totalTracks: state.playlists.requestingTracksTotal
});

export default connect(mapStateToProps)(LoadingTracks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fafafa'
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    elevation: 5
  },
  progressBar: {
    width: '80%'
  }
});
