/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import {
  StyleSheet,
  View
} from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux';
import { toggleSearch } from './actions';
import { searchPlaylists } from '../playlists/actions';

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  active: boolean,
  title: string,
  toggleSearch: (search: boolean) => void,
  searchPlaylists: (text: string) => void
};

class Header extends Component<Props> {
  render () {
    const { navigation, title, active } = this.props;
    return (
      <Toolbar
        isSearchActive={active}
        leftElement="menu"
        centerElement={title}
        searchable={{
          autoFocus: true,
          placeholder: 'Search playlists',
          onSearchPressed: () => this.props.toggleSearch(true),
          onSearchClosed: () => this.props.toggleSearch(false),
          onChangeText: (text) => this.props.searchPlaylists(text)
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
  active: state.header.searchActive,
  title: state.header.title
});

export default connect(mapStateToProps, { toggleSearch, searchPlaylists })(Header);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1db954'
  }
});
