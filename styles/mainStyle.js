import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth : 1,
        backgroundColor: 'rgb(30,30,30)',
        borderColor : 'rgb(0,0,0)',
    },
    answer: {
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
        top: 0,
        left: 0,
    },
    text: {
        fontSize: 35,
        color: 'white'
    }
});
