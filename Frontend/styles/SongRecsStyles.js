'use strict'
import { StyleSheet } from "react-native"
import { useFonts } from "expo-font";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
      },
      card: {
        height: '100%',
        // borderRadius: 25,
        backgroundColor: "#e0e5f7",
      },
      title: {
        textAlign: 'center',
        fontFamily: "GothamBold",
        lineHeight: 50,
        fontSize: 36,
        color: 'black',
        paddingTop: 170,
        paddingBottom: 40,
      },
      text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent',
        fontFamily: "GothamBold",
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
        marginLeft: 20,
      },
      topSongsTitle: {
        fontSize: 20,
        fontFamily: "Nunito",
        paddingTop: 2,
        paddingLeft: 5,
      },
      topSongsArtist: {
        fontSize: 12,
        fontFamily: "Nunito",
        marginTop: -3,
        paddingLeft: 5,
        // paddingRight: 110,
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
        // alignItems:'center',
        justifyContent:'flex-end',
        width:20,
        height:20,
        borderRadius:50,
        opacity:0.7,
        // alignItems: "flex-end",
        // paddingRight: -60,
      },
      scrollView: {
        flex: 1,
        height: 20,
        width: 400,
        paddingLeft: 40,
      },
      row: {
        flexDirection: 'row',
        marginTop: 7,
        marginBottom: 7,
        alignItems: "center",
      },
      linkText: {
        fontSize: 12,
        fontFamily: "Nunito",
        paddingTop: 40,
        textAlign: 'center',
        marginLeft: 85
      }
});