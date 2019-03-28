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
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { playTrack } from './actions';

type Props = {
  tracks: Array<any>,
  playlistIndex: number,
  trackIndex: number,
  playTrack: (track: Object, trackIndex: number, playlistIndex: number, playingTracks?: Array<any>) => void,
  restartTrack: () => void
};

class TrackList extends Component<Props> {

  playTrack = (track, index) => {
    if(this.props.trackIndex === index) this.props.restartTrack();
    else this.props.playTrack(track, index, this.props.playlistIndex);
  }

  render () {
    const { tracks, trackIndex } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback>
            <FlatList
              contentContainerStyle={{ paddingVertical: 3 }}
              data={tracks}
              renderItem={({item, index}) => {
                let imageView = item.track.album.images.length > 0 ? (
                  <Image
                    style={styles.trackImage}
                    source={{uri: item.track.album.images[item.track.album.images.length - 1].url}}
                    resizeMode="contain"
                  /> ) : (
                  <View
                    style={[styles.trackImage, styles.missingImage]}
                  >
                    <Image
                      style={{width: 40, height: 40}}
                      source={require('../../assets/images/Spotify_Icon_RGB_White.png')}
                    />
                  </View>
                );
                let iconView = trackIndex === index ? (
                  <Icon name="music-note" size={20} color={"#1db954"} />
                ) : (
                  <Icon name="music-note" size={20} color={"#000000"} />
                );
                return (
                  <TouchableHighlight onPress={() => this.playTrack(item.track, index)} underlayColor="#fafafa">
                    <View style={styles.trackContainer}>
                      <View style={styles.leftView}>
                        {iconView}
                      </View>
                      {imageView}
                      <View style={styles.trackTextCard}>
                        <Text style={[styles.trackText, ... trackIndex === index ? [styles.playingText] : []]} numberOfLines={1} ellipsizeMode="tail">{item.track.name}</Text>
                        <Text style={[styles.trackText, styles.trackTextArtists, ... trackIndex === index ? [styles.playingText] : []]} numberOfLines={1} ellipsizeMode="tail">{item.track.artists.map((artist) => { return artist.name; }).join(", ")}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  trackIndex: state.player.trackIndex,
  playlistIndex: state.player.playlistIndex
});

export default connect(mapStateToProps, { playTrack })(TrackList);

const { width, height } = Dimensions.get('window');
const imageSize = width - 48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  trackContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginVertical: 3,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  leftView: {
    width: 20,
    justifyContent: 'center'
  },
  trackImage: {
    width: 64,
    height: 64
  },
  missingImage: {
    backgroundColor: '#1db954',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trackTextCard: {
    marginLeft: 10
  },
  trackText: {
    fontSize: 15,
    color: '#000000',
    maxWidth: 250
  },
  trackTextArtists: {
    fontSize: 12
  },
  playingText: {
    color: '#1db954',
    fontWeight: 'bold'
  }
});
