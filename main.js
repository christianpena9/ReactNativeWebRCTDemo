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
            answerCallHidden: false
        }
    } // end of constructor

    answerPhone(){
        this.setState({endHidden: false});
        this.setState({declineHidden: true});
        this.setState({answerHidden: true});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={this.state.answerCallHidden ? styles.answerCallHidden : styles.answerCall} onPress = { () => {this.answerPhone()} } >
                    <Text style={styles.text}>Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.endCallHidden ? styles.endCallHidden : styles.endCall} onPress={()=>{this.endCall()}}>
                    <Text style={styles.text}>End</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
