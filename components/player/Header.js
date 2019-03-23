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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  text: string
};

class Header extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <Icon name="arrow-drop-down" size={20} color={"#ffffff"} />
        <Text style={styles.message}>{this.props.text}</Text>
        <Icon name="arrow-drop-down" size={20} color={"#ffffff"} />
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
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontWeight: 'bold',
    fontSize: 10,
  },
  button: {
    opacity: 0.72
  }
});
