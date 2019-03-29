/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  FlatList,
  TextInput,
  StatusBar
} from 'react-native';
import type { NavigationState, NavigationScreenProp } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spotify from 'rn-spotify-sdk';
import { connect } from 'react-redux';
import { getAllPlaylists, searchPlaylists } from './actions';

type Props = {
  playlists: Array<any>,
  getAllPlaylists: () => void,
  searchPlaylists: (text: string) => void,
  navigation: NavigationScreenProp<NavigationState>
};

type State = {
  text: string,
  focus: boolean
};

class PlaylistsScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Playlists'
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

  goToTracks = (playlist, index) => {
    this.props.navigation.navigate('Tracks', {
      playlistIndex: index,
      playlistId: playlist.id,
      playlistName: playlist.name,
      playlistTracksTotal: playlist.tracks.total
    });
  }

  render() {
    const { playlists } = this.props;
    console.log(playlists)
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
          contentContainerStyle={{ paddingTop: 65, paddingBottom: 100 }}
          columnWrapperStyle={{ justifyContent: 'space-around'}}
          data={playlists}
          horizontal={false}
          numColumns={2}
          renderItem={({item, index}) => {
            let imageView = item.images.length > 0 ? (
              <Image
                style={styles.playlistImage}
                source={{uri: item.images[0].url}}
                resizeMode="contain"
              /> ) : (
              <View style={[styles.playlistImage, styles.missingImage]}>
                <Image
                  style={{width: 75, height: 75}}
                  source={require('../../assets/images/Spotify_Icon_RGB_White.png')}
                />
              </View>
            );
            return (
              <TouchableHighlight onPress={() => this.goToTracks(item, index)} underlayColor="#fafafa">
                <View style={styles.playlistContainer}>
                  {imageView}
                  <View style={styles.playlistImageCard}>
                    <Text style={styles.playlistText}>{item.name}</Text>
                    <Text style={[styles.playlistText, styles.playlistTextTracks]}>{`${item.tracks.total} ${item.tracks.total === 1 ? "track" : "tracks"}`}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
    elevation: 3,
    width: 150,
    backgroundColor: '#000000',
    borderRadius: 3,
    overflow: 'hidden'
  },
  playlistImage: {
    width: 150,
    height: 150,
  },
  playlistImageCard: {
    backgroundColor: '#ffffff',
    width: 150
  },
  missingImage: {
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center'
  },
  playlistText: {
    fontSize: 17,
    color: '#000000',
    margin: 6
  },
  playlistTextTracks: {
    fontSize: 14
  }
});
