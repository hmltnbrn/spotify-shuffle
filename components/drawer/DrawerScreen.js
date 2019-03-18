/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { NavigationActions, DrawerActions, NavigationState, NavigationScreenProp } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  username: string
};

class DrawerScreen extends Component<Props> {

  navigateToScreen = (route: string) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }

  signOut() {
    Spotify.logout().finally(() => {
			this.props.navigation.navigate('Splash');
		});
  }

  render () {
    return (
      <View>
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <View>
              <View style={styles.menuItem}>
                <Text>
                  {this.props.username}
                </Text>
              </View>
              <View style={styles.menuItem}>
                <Text onPress={this.navigateToScreen('Playlists')}>
                  Playlists
                </Text>
              </View>
              <View style={styles.menuItem}>
                <Text onPress={this.signOut.bind(this)}>
                  Sign Out
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username
});

export default connect(mapStateToProps)(DrawerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  menuItem:{
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  }
});
