/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  playlistName: string,
  totalTracks: number,
  currentTrack: number,
  showTracks: boolean,
  changeTrackCard: () => void
};

class Header extends Component<Props> {
  render () {
    const { playlistName, totalTracks, currentTrack, showTracks } = this.props;
    return (
      <View style={styles.container}>
        <Icon name="arrow-drop-down" size={20} color={"#ffffff"} />
        <View>
          <Text style={[styles.message, styles.playlistName]} numberOfLines={1} ellipsizeMode="tail">{playlistName}</Text>
          <Text style={styles.message}>{currentTrack} / {totalTracks}</Text>
        </View>
        <TouchableOpacity onPress={() => this.props.changeTrackCard()} >
          <Icon name="queue-music" size={25} color={showTracks ? "#1db954" : "#ffffff"} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  message: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 13
  },
  playlistName: {
    fontSize: 16,
    maxWidth: 250
  }
});
