/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux';
import store from './store';

import AppNavigation from './AppNavigation';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNavigation />
        </View>
      </Provider>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
});
