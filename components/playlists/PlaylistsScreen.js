/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { getAllPlaylists, searchPlaylists } from './actions';

type Props = {
  playlists: Array<any>,
  getAllPlaylists: () => void,
  searchPlaylists: (text: string) => void
};

type State = {
  text: string,
  focus: boolean
};

class PlaylistsScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Playlists',
  };

  state = {
    text: '',
    focus: false
  };

	componentDidMount() {
    this.props.getAllPlaylists();
	}

  handleChange = (text) => {
    this.setState({ text: text }, this.handleSubmit);
  }

  handleSubmit = () => {
    this.props.searchPlaylists(this.state.text);
  }

	render() {
    const { playlists } = this.props;
    console.log(playlists)
    const newPlaylists = playlists.filter(playlist => playlist.images.length > 0);
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1db954"
        />
        <View style={styles.searchBarContainer}>
          <View style={[styles.searchBar, ... this.state.focus ? [styles.searchBarFocus] : []]}>
            <Icon name="search" size={25} color={this.state.focus ? "#ffffff" : "#000000"} />
            <TextInput
              style={[styles.searchText, ... this.state.focus ? [styles.searchTextFocus] : []]}
              onChangeText={text => this.handleChange(text)}
              placeholder="Search your playlists"
              placeholderTextColor={this.state.focus ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)"}
              value={this.state.text}
              selectionColor={"#000000"}
              onSubmitEditing={this.handleSubmit}
              onFocus={() => this.setState({ focus: true })}
              onBlur={() => this.setState({ focus: false })}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={{ paddingTop: 65 }}
          data={newPlaylists}
          renderItem={({item}) => {
            return (
              <View style={styles.playlistContainer}>
                <Image
                  style={styles.playlistImage}
                  source={{uri: item.images[0].url}}
                  resizeMode="contain"
                />
                <View style={styles.playlistImageOverlay}>
                  <Text style={styles.playlistText}>{item.name}</Text>
                  <Text style={{ color: 'white', margin: 6 }}>{`${item.tracks.total} ${item.tracks.total === 1 ? "Track" : "Tracks"}`}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
	}
}

const mapStateToProps = (state) => ({
  playlists: state.playlists.playlists
});

export default connect(mapStateToProps, { getAllPlaylists, searchPlaylists })(PlaylistsScreen);

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fafafa',
   position: 'relative'
  },
  searchBarContainer: {
    height: 50,
    backgroundColor: '#000000',
    elevation: 5,
    position: 'absolute',
    top: 10,
    right: 0,
    width: '92%',
    marginLeft: '4%',
    marginRight: '4%',
    borderRadius: 4,
    zIndex: 5,
    overflow: 'hidden'
  },
  searchBar: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  searchBarFocus: {
    backgroundColor: '#1db954',
  },
  searchText: {
    height: '100%',
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 2,
    color: '#000000'
  },
  searchTextFocus: {
    color: '#ffffff'
  },
  playlistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 3,
    width: 300,
    height: 300,
    backgroundColor: '#000000',
    borderRadius: 3,
    overflow: 'hidden'
  },
  playlistImage: {
    flex: 1,
    width: 300,
    height: 300,
    position: 'absolute'
  },
  playlistImageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignSelf: 'flex-end'
  },
  playlistText: {
    fontSize: 20,
    color: '#ffffff',
    margin: 6
  }
});
