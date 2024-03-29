/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import type { Node } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

type Props = {
  children?: Node
};

class LoadingOverlay extends Component<Props> {
  render () {
    const loading = false;
    return (
      <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}>
        {loading ? (
          <View style={styles.loadingContainer} pointerEvents="none">
            <ActivityIndicator size={100} color="#1db954"/>
          </View> ) : (
          <View></View>
        )}
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(LoadingOverlay);

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
  }
});
