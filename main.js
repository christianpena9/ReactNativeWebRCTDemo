import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia
} from 'react-native-webrtc';

/* CUSTOM IMPORT STYLES BELOW */
import { styles } from './styles/mainStyle';

export default class ReactNativeWebRCTDemo extends Component {

    constructor() {
        super();
        this.state = {
            videoURL : null,
            isFront : true,
            endHidden: true,
            declineHidden: false,
            answerHidden: false
        }
    } // end of constructor

  render() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={this.state.answerHidden ? styles.answerHidden : styles.answer} onPress = { () => {this.answerPhone()} }>
                <Text style={styles.text}>
                    Answer
                </Text>
            </TouchableOpacity>
        </View>
    );
  }
}
