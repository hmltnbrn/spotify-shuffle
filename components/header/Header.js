/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import {
  StyleSheet
} from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux';

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  title: string
};

class Header extends Component<Props> {
  render () {
    const { navigation, title } = this.props;
    return (
      <Toolbar
        leftElement="menu"
        centerElement={title}
        searchable={{
          autoFocus: true,
          placeholder: 'Search playlists',
        }}
        onLeftElementPress={ () => navigation.dispatch(DrawerActions.openDrawer()) }
        style={{
          container: styles.container
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.header.title
});

export default connect(mapStateToProps)(Header);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1db954'
  }
});
