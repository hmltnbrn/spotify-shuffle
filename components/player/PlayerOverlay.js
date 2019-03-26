/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import type { Node } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import PlayerScreen from './PlayerScreen';
import MiniPlayerScreen from './MiniPlayerScreen';

type Props = {
  children?: Node,
  active: boolean
};

type State = {
  miniView: boolean
};

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - StatusBar.currentHeight - 100
};

class PlayerOverlay extends Component<Props, State> {
  _deltaY: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      miniView: true
    };
    this._deltaY = new Animated.Value(Screen.height);
  }

  onDragEvent = (event) => {
    let snapId = event.nativeEvent.targetSnapPointId;
    if(snapId && snapId === 'bottom') {
      this.setState({ miniView: true });
    }
    else {
      this.setState({ miniView: false });
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.active ? (
          <View style={[styles.panelContainer, styles.firstContainer]} pointerEvents={'box-none'}>
            <Animated.View
              pointerEvents={'box-none'}
              style={[styles.panelContainer, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, Screen.height],
                outputRange: [0.5, 0],
                extrapolateRight: 'clamp'
              })
            }]} />
            <Interactable.View
              verticalOnly={true}
              snapPoints={[{y: 0, id: "top"}, {y: Screen.height, id: "bottom"}]}
              boundaries={{top: 0, bounce: 0, bottom: Screen.height}}
              initialPosition={{y: Screen.height}}
              animatedValueY={this._deltaY}
              onDrag={this.onDragEvent}
            >
              <View style={styles.panel}>
                {this.state.miniView ? (
                  <MiniPlayerScreen />
                ) : (
                  <PlayerScreen />
                )}
              </View>
            </Interactable.View>
          </View>
        ) : (
          <View></View>
        )}
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  active: state.player.active
});

export default connect(mapStateToProps, {})(PlayerOverlay);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  firstContainer: {
    zIndex: 5,
    elevation: 5
  },
  panel: {
    height: Screen.height + 300,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4
  }
});
