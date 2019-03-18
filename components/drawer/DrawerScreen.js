import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { DrawerActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
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
          <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View>
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

export default DrawerScreen;
