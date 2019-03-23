/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

type Props = {
  url: string
};

class AlbumArt extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: this.props.url}}
        />
      </View>
    );
  }
}

export default AlbumArt;

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24
  },
  image: {
    width: imageSize,
    height: imageSize
  }
});
