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

type Props = {
  title: string,
  artist: string
};

class TrackDetails extends Component<Props> {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.detailsWrapper}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{this.props.title}</Text>
          <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">{this.props.artist}</Text>
        </View>
      </View>
    );
  }
}

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  artist: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 18,
    marginTop: 4
  }
});
