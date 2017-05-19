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
import io from 'socket.io-client/dist/socket.io';

/* CUSTOM IMPORT STYLES BELOW */
import { styles } from './styles/mainStyle';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const socket = io.connect('http://192.168.1.9:3000', {jsonp: false});

var videoStream = {};

export default class ReactNativeWebRCTDemo extends Component {

    constructor() {
        super();
        this.state = {
            videoURL : null,
            status: true,
            endCallStatus: true
        }
    } // end of constructor


    componentWillUpdate(){
      console.log("component did update!");
    }
    // this function toggles status and sets endCallStatus to false
    // toggleStatus() {
    //     this.startCall();
    // }

    startCall() {
        //const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
        //const pc1 = new RTCPeerConnection(configuration);
        //const pc2 = new RTCPeerConnection(configuration);
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    width: 0,
                    height: 0,
                    minFrameRate: 30
                }
            }
        };

        var successCallback = (stream) => {
          if (videoStream.run === undefined) {
            this.setState({
              videoURL : stream.toURL(),
              status:!this.state.status,
              endCallStatus: false
            });
            videoStream = stream;
            videoStream.run = true;

            console.log("1st if stat/ new URL is = ", this.state.videoURL);
            console.log(stream.toURL);
            console.log(stream.run);
          } else{
            this.setState({
              videoURL : videoStream.toURL(),
              status:!this.state.status,
              endCallStatus: false
            });
            console.log("else stat/ new URL is = ", this.state.videoURL);
            console.log(videoStream.toURL);
            console.log(videoStream.run);
          }


        }



        var errorCallback = (error) => {
            console.log("Oooops we got an error!", error.message);
            throw error;
        }

        getUserMedia(constraints, successCallback, errorCallback);
    } // end of startCall

    hangUp() {
      this.setState({videoURL:null});
      this.setState({status:true});
      this.setState({endCallStatus:true});
      // console.log(videoStream);
      // videoStream.active = false;
      // console.log(videoStream);
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
              <TouchableOpacity style={styles.answerCall} onPress = { () => this.startCall() } >
                  <Text style={styles.text}>Answer</Text>
              </TouchableOpacity>;
            declineCall =
              <TouchableOpacity style={styles.declineCall} onPress={ () => this.setState({status:false}) }>
                  <Text style={styles.text}>Decline</Text>
              </TouchableOpacity>;
        }

        if(!this.state.endCallStatus) {
            endCall =
            <TouchableOpacity style={styles.endCall} onPress={ () => this.hangUp() }>
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
