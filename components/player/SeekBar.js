/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Slider from '@react-native-community/slider';

type Props = {
  currentPosition: number,
  trackLength: number,
  onSlidingStart: () => void,
  onSeek: (time: number) => void,
  onForward: (trackFinished?: boolean) => void
};

const pad = (n, width) => {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}
const minutesAndSeconds = (position) => ([
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
]);

class SeekBar extends Component<Props> {

  componentWillReceiveProps(nextProps: Props) {
    if(nextProps.currentPosition >= Math.round(nextProps.trackLength)) {
      this.props.onForward(true);
    }
  }

  render () {
    const { trackLength, currentPosition } = this.props;
    const elapsed = minutesAndSeconds(currentPosition);
    const remaining = minutesAndSeconds(trackLength - currentPosition);
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            {elapsed[0] + ":" + elapsed[1]}
          </Text>
          <View style={{flex: 1}} />
          <Text style={[styles.text, {width: 40}]}>
            {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
          </Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
          step={1}
          value={currentPosition}
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
    paddingTop: 16
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign:'center'
  }
});
