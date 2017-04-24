import {StyleSheet} from 'react-native';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth : 1,
        backgroundColor: 'rgb(30,30,30)',
        borderColor : 'rgb(0,0,0)',
    },
    answerCall: {
        flex:1,
        height:128,
        width: 128,
        borderWidth: 3,
        borderRadius: 64,
        borderColor: 'white',
        backgroundColor: 'rgb(0,165,0)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: window.height-155,
        left: 0,
    },
    declineCall: {
        position: 'absolute',
        top: window.height-155,
        left: window.width-130,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: 'rgb(255,25,50)',
        height:128,
        width: 128,
        borderRadius: 64,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    endCall: {
        position: 'absolute',
        top: window.height-155,
        left: 0,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: 'rgb(255,25,50)',
        height:128,
        width: window.width-1,
        borderRadius: 64,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoLarge : {
        flex: 1,
        borderWidth: 1
    },
    videoSmall : {
      position:'absolute',
      borderWidth: 1,
      alignSelf: "center",
      height:100,
      width: 100,
      left: 540,
      top: 71,
      borderColor: 'green',
      borderWidth: 5
      // zIndex: 1
    },
    text: {
        fontSize: 35,
        color: 'white'
    }
});
