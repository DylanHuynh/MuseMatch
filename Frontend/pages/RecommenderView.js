import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Firebase, { auth } from '../config/firebase';
import styles from '../styles/RecommenderViewStyles'
// import data from './SongsTestData'
import axios from 'axios';


const getTenSongs = async (userId) => {
  console.log(userId)
  axios.get("http://10.0.2.2:3000/api/get-daily-recs", { userId })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  return response.data;

}

const getNewRecs = async (userId) => {
  axios.get("http://10.0.2.2:3000/api/get-new-recs", { userId })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  return response.data;
}

const addSwipedLeft = async (userId, song) => {
  const body = {
    userId,
    song
  }
  axios.post("http://10.0.2.2:3000/api/swiped-left-music", body)
}

const addSwipedRight = async (userId, song) => {
  const body = {
    userId,
    song
  }
  axios.post("http://10.0.2.2:3000/api/swiped-right-music", body)
}

var index = 0;
const swiperRef = React.createRef();

const SwipeView = ({ navigation }, state) => {
  let data = [];
  useEffect(() => {
    data = getTenSongs(auth.currentUser.uid) | [];

  }, [])
  const [count, setCount] = useState(1);
  const onSwiped = () => {
    index = (index + 1) % data.length;
    console.log("index: ", index);
    console.log(data[index]);
    console.log("_______");
    setCount(prevCount => prevCount + 1);
  }

  const Card = () => {
    return (
      <>
        <View style={styles.card}>
          <Text style={styles.songCounter}>Song {index + 1} of {data.length}</Text>
          {data.length > 0 ?
            <View style={styles.songView}>
              <Image style={styles.albumCover} source={{ uri: data[index].album_cover }} />
              <Text style={styles.songName}>{data[index].song_name}</Text>
              <Text style={styles.artist}>{data[index].artist}</Text>
            </View> :
            <Text style={styles.songCounter}>No songs currently available</Text>
          }


          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.circleButton} onPress={() => swiperRef.current.swipeLeft()}>
              <Image style={styles.circleXImage} source={require('../assets/x-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton} onPress={() => { console.log(index) }}>
              <Image style={styles.circlePlayImage} source={require('../assets/play-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton} onPress={() => swiperRef.current.swipeRight()}>
              <Image style={styles.circleHeartImage} source={require('../assets/heart-icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
  return (
    <>

      <Swiper
        ref={swiperRef}
        cards={data}
        renderCard={(card, index) => {
          return (
            <Card />
          )
        }}
        onSwiped={() => onSwiped()}
        onSwipedLeft={() => {
          addSwipedLeft(auth.currentUser.uid, data[index - 1]);
        }}
        onSwipedRight={() => {
          addSwipedRight(auth.currentUser.uid, data[index - 1]);
        }}
        onSwipedAll={() => {
          console.log('Done Swiping!');
          songList = getNewRecs(auth.currentUser.uid);
          console.log("new song recs: ", songList);
          navigation.navigate("Homepage");
        }}
        cardIndex={0}
        backgroundColor={'#546DD3'}
        stackSize={3}
        cardHorizontalMargin={30}
        marginTop={0}>
      </Swiper>
      <ProgressBar style={styles.bar} progress={count / data.length} width={300} color={'rgba(228, 215, 255, 0.8)'} height={10} />
    </>
  )
}



export default SwipeView