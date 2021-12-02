import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native'
import PagerView from 'react-native-pager-view';
import styles from '../styles/SongRecsStyles.js'
import data from './SongsTestData'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Firebase, { auth, db } from '../config/firebase';
import testData from './SwipeTestData';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';



const SongRecsView = ({ navigation }) => {
  const [isHeart, setIsHeart] = useState(false);
  // const [data, setData] = useState(testData);
  const arr = Array(data.length);
  for (let i = 0; i < data.length; i++) {
    arr[i] = i;
  }
  // const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(data[0].song_name);

  
// const heartPress = (props) => {
//   console.log("heart #" + props.number + " pressed")
//   setIsHeart(!isHeart)
// }

  return (
    <View style = {styles.card}>
      <Text style = {styles.title}>Explore Your Curated Recs</Text>

      <View style = {{height: 300}}>
        <ScrollView style = {styles.scrollView}>
            <TouchableOpacity activeOpacity={1}>
                {arr.map((number) => {
                    return (
                      <View>
                        <View style = {styles.row}>
                          <Image style = {styles.topSongsCellImage} source={{ uri: data[number].album_cover }}/>
                          <View style = {{marginLeft: 10}}>
                            <Text style = {styles.topSongsTitle}>{data[number].song_name}</Text>
                            <Text style = {styles.topSongsArtist}>{data[number].artist}</Text>
                          </View>
                        </View>
                        <View style = {{flexDirection: 'column', paddingRight: 40, position: 'absolute', left: 240, top: 20}}>
                          <TouchableOpacity onPress={() => console.log("heart #" + number + " pressed")}>
                            <View style={{alignItems: 'flex-end', marginLeft: 40}}>
                              <Image style={[{tintColor: isHeart ? 'red' : 'black'}, styles.circleHeartImage]} source={require('../assets/heart-icon.png')} />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>                      
                    )
                })}
            </TouchableOpacity>
        </ScrollView>
      </View>
      <Text style = {styles.linkText}>Your favorites will be linked to Spotify</Text>
    </View>
  )
}




export default SongRecsView