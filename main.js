'use strict';

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

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

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

    componentDidMount() {
        const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
        const pc = new RTCPeerConnection(configuration);
        const { isFront } = this.state;
        MediaStreamTrack.getSources(sourceInfos => {
            console.log('MediaStreamTrack.getSources', sourceInfos);
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if(sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
                    videoSourceId = sourceInfo.id;
                }
            }
            getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        width: window.width, // Provide your own width, height and frame rate here
                        height: window.height,
                        minFrameRate: 30
                    },
                    facingMode: (isFront ? 'user' : 'environment'),
                    optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
                }
            }, (stream) => {
                console.log('Streaming ok = ', stream);
                this.setState({
                    videoURL : stream.toURL()
                });
                pc.addStream(stream);
            }, error => {
                console.log("Oooops we got an error!", error.message);
                throw error;
            });
        });
        pc.createOffer((desc) => {
            pc.setLocalDescription(desc, () => {
                // Send pc.localDescription to peer
                console.log('pc.setLocalDescription');
            }, (e) => { throw e; });
        }, (e) => { throw e; });

        pc.onicecandidate = (event) => {
            console.log('onicecandidate', event);
        };
    } // end of componentDidMount

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
            <TouchableOpacity style={styles.declineCall} onPress={ () => this.setState({status:false}) }>
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
                <RTCView streamURL={this.state.videoURL} style={styles.videoSmall}/>
                <RTCView streamURL={this.state.videoURL} style={styles.videoLarge}/>
                {endCall}
                {answerCall}
                {declineCall}
            </View>
        );
    }
}
