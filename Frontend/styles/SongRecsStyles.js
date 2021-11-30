'use strict'
import { StyleSheet } from "react-native"
import { useFonts } from "expo-font";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
      },
      title: {
        textAlign: 'center',
        fontFamily: "GothamBold",
        fontSize: 40,
        color: "#404040",
      },
      text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
      },
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
        fontWeight: 'bold'
      },
      topSongsArtist: {
        fontSize: 15,
        fontWeight: 'bold'
      },
      circleButton: {
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#526ED5',
        borderRadius:50,
      },
      circleHeartImage: {
          alignItems:'center',
          justifyContent:'center',
          width:30,
          height:30,
          borderRadius:50,
          tintColor:"#F35A5A"
        },
      
});