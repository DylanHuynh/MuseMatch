'use strict'
import { StyleSheet } from "react-native"
import { useFonts } from "expo-font";
import { GothamBold } from '../App.js'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E2E2FC"
      },
      card: {
        top: 25,
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: "#F3F3FF",
      },
      text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
      },
      done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
      },
      songCounter: {
        textAlign: 'center',
        fontFamily: "GothamBold",
        fontSize: 20,
        color: "#404040",
      },
      songView: {
        paddingTop: 100,
      },
      songName: {
          position: "relative",
          textAlign: 'left',
          fontFamily: "GothamBold",
          fontSize: 25,
          color: "#404040",
          paddingTop: 10,
          paddingLeft: 45,
      },
      artist: {
          position: "relative",
          textAlign: 'left',
          fontFamily: "GothamBold",
          fontSize: 10,
          color: "#404040",
          paddingLeft: 45,
      },
      albumCover: {
          position: "relative",
          width: 254,
          height: 254,
          marginRight: 'auto',
          marginLeft: 'auto',
          borderColor: "black",
          overflow: "hidden",

          // shadowOffset: { width: 10, height: 10 },
          // shadowColor: '#000',
          // shadowOpacity: 1,
          // elevation: 10,

      },
      // SWIPE BUTTON STYLES
      circleButton: {
          alignItems:'center',
          justifyContent:'center',
          width:50,
          height:50,
          backgroundColor:'#526ED5',
          borderRadius:50,
      },
      circleXImage: {
          alignItems:'center',
          justifyContent:'center',
          width:36,
          height:36,
          borderRadius:50,
          tintColor: "#0B2070"
      },
      circlePlayImage: {
        alignItems:'center',
        justifyContent:'center',
        width:25,
        height:25,
        left:2.5,
        tintColor:"#F2F2F2",
      },
      circleHeartImage: {
        alignItems:'center',
        justifyContent:'center',
        width:30,
        height:30,
        borderRadius:50,
        tintColor:"#F35A5A"
    },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 50,
      },
      bar: {
        marginTop: 700,
        marginLeft: 45,
      }
});