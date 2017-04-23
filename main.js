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
            status: true,
            endCallStatus: true
        }
    } // end of constructor

    // this function toggles status and sets endCallStatus to false
    toggleStatus() {
        this.setState({
          status:!this.state.status, endCallStatus: false
        });
    }

    render() {

        // variables to store TouchableOpacity component
        let answerCall  = null;
        let declineCall = null;
        let endCall     = null;

        // checking the status, if true then take TouchableOpacity
        // and save it to the variable
        if(this.state.status) {
            answerCall =
            <TouchableOpacity style={styles.answerCall} onPress = { () => this.toggleStatus() } >
                <Text style={styles.text}>Answer</Text>
            </TouchableOpacity>;
            declineCall =
            <TouchableOpacity style={styles.declineCall} onPress={ () => this.toggleStatus() }>
                <Text style={styles.text}>Decline</Text>
            </TouchableOpacity>;
        }

        if(!this.state.endCallStatus) {
            endCall =
            <TouchableOpacity style={styles.endCall} onPress={ () => this.setState({endCallStatus:true}) }>
                <Text style={styles.text}>End</Text>
            </TouchableOpacity>;
        }

        return (
            <View style={styles.container}>
                {endCall}
                {answerCall}
                {declineCall}
            </View>
        );
    }
}
