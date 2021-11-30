import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon, ImageStore } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import * as SecureStore from 'expo-secure-store';

import Firebase, { auth } from '../config/firebase';
import styles from '../styles/RecommenderViewStyles'
// import data from './SongsTestData'
import axios from 'axios';




const getTenSongs = async (userAccessToken) => {
  console.log('accessToken', userAccessToken)
  const response = await axios.get("http://10.0.2.2:3000/api/get-daily-recs", { params: { userAccessToken: userAccessToken } })
  console.log(response.data)
  let songs = response.data
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i]
    songs[i] = {
      id: song.id,
      artist: song.artists[0].name,
      artistID: song.artists[0].id,
      song_name: song.name,
      album_cover: song.album.images[0].url

    }
  }
  return songs
}

const getNewRecs = async (token) => {
  axios.get("http://10.0.2.2:3000/api/get-new-recs", { token })
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
    userID: userId,
    songID: song
  }
  axios.post("http://10.0.2.2:3000/api/swipe-song-left", body)
}

const addSwipedRight = async (userId, song) => {
  console.log(userId, song)
  const body = {
    userID: userId,
    songID: song
  }
  axios.post("http://10.0.2.2:3000/api/swipe-song-right", body)
}

var index = 0;
var swipedYes = [];
var swipedNo = [];
const swiperRef = React.createRef();


const SwipeView = ({ navigation }) => {
  const [doneSwiping, setDoneSwiping] = useState(false);
  const [finalRecs, setFinalRecs] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    async function fetchMyAPI() {
      const token = await SecureStore.getItemAsync('secure_token')
      const songs = await getTenSongs(token)
      setData(songs)
    }
    fetchMyAPI()

  }, [])
  const getFinalRecs = async () => {
    body = {
      artists: swipedYes.map(song => song.artistID).toString(),
      genres: swipedYes.map(song => song.genre).toString(),
      tracks: swipedYes.map(song => song.id).toString()
    }
    // TODO: implement here
    // const recs = await axios.get("http://10.0.2.2:3000/api/swipe-song-right", body)
    setFinalRecs([])
    setDoneSwiping(true);
  }
  const onSwiped = () => {
    if (index == data.length) {
      getFinalRecs();
      return
    }
    index = (index + 1) % data.length;
    console.log("index: ", index);
    console.log(data[index]);
    console.log("_______");
    setCount(prevCount => prevCount + 1);
  }

  const Card = () => {
    if (doneSwiping) {
      return (
        <View style={styles.card}>
          {/* TODO: card view of results. final recs are the list of final reommendations */}
        </View>
      );
    } else
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
          swipedNo.push(data[index - 1]);
          addSwipedLeft(auth.currentUser.uid, data[index - 1].id);
        }}
        onSwipedRight={() => {
          // temporary
          navigation.navigate("SongRecs");
          // swipedYes.push(data[index - 1]);
          // addSwipedRight(auth.currentUser.uid, data[index - 1].id);
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