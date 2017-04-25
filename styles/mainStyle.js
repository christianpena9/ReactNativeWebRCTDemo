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
        width: window.width,
        height: window.height,
    },
    videoSmall : {
      position:'absolute',
      height:200,
      width: 200,
      left: window.width-164,
      top: 0,
    },
    text: {
        fontSize: 35,
        color: 'white'
    }
});
