import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native'
import PagerView from 'react-native-pager-view';
import styles from '../styles/SongRecsStyles.js'
import data from './SwipeTestData'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Firebase, { auth, db } from '../config/firebase';
import testData from './SwipeTestData';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';



const SongRecsView = ({ navigation }) => {
  const [data, setData] = useState(testData)

    const arr = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8", "9", "10"]
  
    return (
      <View style = {styles.card}>
        <Text style={styles.title}>Explore Your Curated Recs</Text>

        <ScrollView style = {{height: 300, width: 500}}>
            <TouchableOpacity activeOpacity={1}>
                {arr.map((number) => {
                    return (
                        <TopSongs number={number}/>
                        
                    )
                })}
            </TouchableOpacity>
        </ScrollView>
      </View>
    )
}



const TopSongs = (props) => {
  return (
    <View style = {{flexDirection: 'row', marginTop: 7, marginBottom: 10}}>
      <Text style = {styles.topSongsNumberHeader}>{props.number}</Text>
      <Image style = {styles.topSongsCellImage} source= {require('../assets/ed.jpg')}/>
      <View style = {{marginLeft: 15}}>
        <Text style = {styles.topSongsTitle}>Mood</Text>
        <Text style = {styles.topSongsArtist}>Iann Dior</Text>
      </View>
      <TouchableOpacity onPress={() => console.log("heart #" + props.number + " pressed")}>
        <Image style={styles.circleHeartImage} source={require('../assets/heart-icon.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default SongRecsView