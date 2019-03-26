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
  playing: boolean,
  onPressPause: () => void,
  onPressPlay: () => void,
  onBack: () => void,
  onForward: () => void,
  onRepeat: () => void,
  onShuffle: () => void
};

class Controls extends Component<Props> {
  render () {
    const { playing } = this.props || true;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.onRepeat()} >
          <Icon name="repeat" size={20} color={"#ffffff"} />
        </TouchableOpacity>
        <View style={{width: 40}} />
        <TouchableOpacity onPress={() => this.props.onBack()}>
          <Icon name="skip-previous" size={50} color={"#ffffff"} />
        </TouchableOpacity>
        <View style={{width: 20}} />
        {playing ?
          <TouchableOpacity onPress={() => this.props.onPressPause()}>
            <View style={styles.playButton}>
              <Icon name="pause-circle-filled" size={100} color={"#ffffff"} />
            </View>
          </TouchableOpacity> :
          <TouchableOpacity onPress={() => this.props.onPressPlay()}>
            <View style={styles.playButton}>
              <Icon name="play-circle-filled" size={100} color={"#ffffff"} />
            </View>
          </TouchableOpacity>
        }
        <View style={{width: 20}} />
        <TouchableOpacity onPress={() => this.props.onForward()} >
          <Icon name="skip-next" size={50} color={"#ffffff"} />
        </TouchableOpacity>
        <View style={{width: 40}} />
        <TouchableOpacity onPress={() => this.props.onShuffle()} >
          <Icon name="shuffle" size={20} color={"#ffffff"} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
