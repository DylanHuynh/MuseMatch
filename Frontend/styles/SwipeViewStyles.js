'use strict'
import { StyleSheet } from "react-native"
import { useFonts } from "expo-font";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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
      nameHeader: {
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 25,
          color: "#404040",
          paddingTop: 10,
      },
      genres: {
          position: "relative",
          textAlign: 'center',
          fontSize: 15,
          color: "#404040",
          paddingTop: 5,
          paddingBottom: 20
      },
      profilePicture: {
          position: "relative",
          width: 82,
          height: 82,
          left: 130,
          borderRadius: 50,
          borderColor: "black",
          overflow: "hidden",

          // shadowOffset: { width: 10, height: 10 },
          // shadowColor: '#000',
          // shadowOpacity: 1,
          // elevation: 10,

      },
      profileView: {
        paddingTop: 30
      },
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
      paddingVertical: 10
    },

    // Top Songs Cell

    topSongsNumberHeader: {
      fontWeight: 'bold',
      fontSize: 24,
      marginLeft: 20,
      width: 25,
    },
    topSongsCellImage: {
      height: 45,
      width: 45,
      marginLeft: 30
    },
    topSongsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      flexShrink: 1,
    },
    topSongsArtist: {
      fontSize: 10,
    },
    topSongsArtist: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    topArtists: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlignVertical: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      paddingBottom: 18,
      paddingTop: 8,
      justifyContent: "space-evenly",
    },
    popupHeader: {
      fontFamily: 'GothamBold',
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 35,
    },
    popupText: {
      margin: 5, 
      fontFamily: 'GothamBold',
      fontSize: 20,
      textAlign: 'center',
    },
    popupBox: {
      width: 294,
      height: 294,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
    },
    popupOutside: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000030'
    },
    popupButton: {
      marginTop: 25, 
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      fontFamily: 'GothamBold',
      fontSize: 20,
      textAlign: 'center',
      backgroundColor: '#AD7BFF',
      borderRadius: 20,
    },
});