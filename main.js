'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
  Switch,
  Platform,
  TextInput,
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
import "./UserAgent";
import { StackNavigator } from 'react-navigation';
/* CUSTOM IMPORT SCREENS BELOW */
import ReceiverScreen from './screens/ReceiverScreen';
import ClientScreen from './screens/ClientScreen';

/* CUSTOM IMPORT STYLES BELOW */
import { styles } from './styles/mainStyle';

const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

var videoStream = {};

export default class HomeScreen extends Component {

    constructor() {
        super();

        const socket = io.connect('http://192.168.1.9:3000', {jsonp: false});
        this.state = {
          isSwitchOn: false,
          text: "enter color",
          incomingText: null,
          backColor: "rgb(245,245,245)",
          callPage: false,
          homePage: true,
          videoURL : null,
          status: true,
          endCallStatus: true
        }

        //INCOMING DATA

      socket.on('isSwitchOn-server', (data) => {
        console.log(data);
        this.setState({ isSwitchOn: data });
      });

      socket.on("calling-server", (data)=> {
          console.log(data);
          this.setState({ homePage: data });
      });


      // OUTGOING DATA
      socket.emit('isSwitchOn-client', this.state.isSwitchOn);


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


    //FUNCTIONS
    handleChange(event) {
        this.setState({
            text: event.nativeEvent.text
        },this.sendMe);
    }

    checkSwitch() {
      this.socket.emit("switch-stat", this.state.isSwitchOn)
    }

    // updateSwitch = (value) => {
    //     this.setState({isSwitchOn: value});
    //     this.socket.emit('isSwitchOn-client', value);
    // }

    sendMe() {
        this.socket.emit("client-send", this.state.text);
    }

    hangUp() {
      this.setState({videoURL:null});
      this.setState({status:true});
      this.setState({endCallStatus:true});
      // console.log(videoStream);
      // videoStream.active = false;
      // console.log(videoStream);
    }

    render() {
      const { navigate } = this.props.navigation;
      let available;

      // variables to store TouchableOpacity component
        let answerCall  = null;
        let declineCall = null;
        let endCall     = null;

        // checking the status, if true then take TouchableOpacity
      // and save it to the variable
      if(this.state.status) {
          answerCall =
            <TouchableOpacity style={styles.answerCall} onPress = { () => this.toggleStatus() } >
                <Text style={styles.butText}>Answer</Text>
            </TouchableOpacity>;
          declineCall =
            <TouchableOpacity style={styles.declineCall} onPress={ () => this.setState({homePage: true}) }>
                <Text style={styles.butText}>Decline</Text>
            </TouchableOpacity>;
      }

      if(!this.state.endCallStatus) {
          endCall =
          <TouchableOpacity style={styles.endCall} onPress={ () => this.hangUp() }>
              <Text style={styles.butText}>End</Text>
          </TouchableOpacity>;
      }


        // Updates messaging for Receiver
        (this.state.isSwitchOn) ? available = 'ARE' : available = 'NOT';

        if (this.state.homePage) {
          var homePage =
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',
            backgroundColor: this.state.backColor}}>

            <Text style={styles.text}>
              YOU { available } AVALIABLE
            </Text>

            <Switch
              onValueChange={this.updateSwitch}
              value={this.state.isSwitchOn}
             />


            <TouchableOpacity
                onPress = {() => navigate('ClientScreen', { isSwitchOn: this.state.isSwitchOn })}
                style = {styles.touch}>
                <Text style={styles.sendText}>Client</Text>
            </TouchableOpacity>

          </View>
        } else {
          homePage =
          <View style={styles.container}>
            <RTCView streamURL={this.state.videoURL} style={styles.videoSmall}/>
            <RTCView streamURL={this.state.videoURL} style={styles.videoLarge}/>
            {endCall}
            {answerCall}
            {declineCall}
          </View>
        }

        if (this.state.callPage) {
          callPage =
          <View style={styles.container}>
            <RTCView streamURL={this.state.videoURL} style={styles.videoSmall}/>
            <RTCView streamURL={this.state.videoURL} style={styles.videoLarge}/>
            {endCall}
            {answerCall}
            {declineCall}
          </View>

        }
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.backColor}}>

            {homePage}
          </View>
        );
    }
}

/* CUSTOM ROUTE BELOW */
const ReactNativeWebRCTDemo = StackNavigator({
    Home: {
        screen: HomeScreen
    },
    ClientScreen: {
        screen: ClientScreen
    },
    ReceiverScreen: {
        screen: ReceiverScreen
    }
});
