import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native'
import styles from '../styles/SongRecsStyles.js'
import data from './SongsTestData'




const SongRecsView = ({ navigation }) => {

  const arr = Array(data.length);
  for (let i = 0; i < data.length; i++) {
    arr[i] = i;
  }
  console.log(data[0].song_name);




  return (
    <View style = {styles.card}>
      <Text style = {styles.title}>Explore Your Curated Recs</Text>


      <View style = {{height: 300}}>
        <ScrollView style = {styles.scrollView}>
            <TouchableOpacity activeOpacity={1}>
                {arr.map((number) => {
                    return (
                      <RowView number={number}/>
                    )
                })}
            </TouchableOpacity>
        </ScrollView>
      </View>
      <Text style = {styles.linkText}>Your favorites will be linked to Spotify</Text>
    </View>
  )
}

const RowView = (props) => {
  const [isHeart, setIsHeart] = useState(false);
  const heartPress = () => {
    console.log("heart #" + props.number + " pressed")
    setIsHeart(!isHeart)
  }
  return (
    <View>
      <View style = {styles.row}>
        <Image style = {styles.topSongsCellImage} source={{ uri: data[props.number].album_cover }}/>
        <View style = {{marginLeft: 10}}>
          <Text style = {styles.topSongsTitle}>{data[props.number].song_name}</Text>
          <Text style = {styles.topSongsArtist}>{data[props.number].artist}</Text>
        </View>
      </View>
      <View style = {{flexDirection: 'column', paddingRight: 40, position: 'absolute', left: 240, top: 20}}>
        <TouchableOpacity onPress={() => heartPress() }>
          <View style={{alignItems: 'flex-end', marginLeft: 40}}>
            <Image id={props.number} style={[{tintColor: isHeart ? 'red' : 'black'}, styles.circleHeartImage]} source={require('../assets/heart-icon.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default SongRecsView