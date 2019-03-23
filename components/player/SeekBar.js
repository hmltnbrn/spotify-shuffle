/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';

type Props = {
  currentPosition: number,
  trackLength: number,
  onSlidingStart: () => void,
  onSeek: (time: number) => void
};

class SeekBar extends Component<Props> {
  render () {
    const pad = (n, width, z=0) => {
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    const minutesAndSeconds = (position) => ([
      pad(Math.floor(position / 60), 2),
      pad(position % 60, 2),
    ]);
    const elapsed = minutesAndSeconds(this.props.currentPosition);
    const remaining = minutesAndSeconds(Math.floor(this.props.trackLength) - this.props.currentPosition);
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            {elapsed[0] + ":" + elapsed[1]}
          </Text>
          <View style={{flex: 1}} />
          <Text style={[styles.text, {width: 40}]}>
            {this.props.trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
          </Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={Math.max(this.props.trackLength, 1, this.props.currentPosition + 1)}
          value={this.props.currentPosition}
          onValueChange={() => this.props.onSlidingStart()}
          onSlidingComplete={(time) => this.props.onSeek(time)}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="rgba(255, 255, 255, 0.14)"
          thumbTintColor="#ffffff"
        />
      </View>
    );
  }
}

export default SeekBar;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign:'center',
  }
});
