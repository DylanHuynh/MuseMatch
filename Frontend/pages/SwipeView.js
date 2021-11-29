import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-deck-swiper'
import Firebase, { auth, db } from '../config/firebase';
import styles from '../styles/SwipeViewStyles';
import testData from './SwipeTestData';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const loadUser = async (uid) => {
  console.log("starting!!!")
  const user = await axios.get('http://10.0.2.2:3000/api/get-user', { params: { uid: uid } })
  console.log(user.data)
  if (user.data.uid != -1) {
    navigation.navigate('Home')
    return
  }
  console.log("new user")
  return user.data
}

const isMatch = async (currentUserId, swipedUserId) => {
  const body = {
    currentUserId,
    swipedUserId
  }
  axios.get("http://10.0.2.2:3000/api/get-is-match", body)
    .then(response => {
      console.log(response)
      if (response.data.isMatch == true) {
        db
          .collection('THREADS')
          .add({
            name: loadUser(currentUserId).username + " " + loadUser(swipedUserId).username,
            latestMessage: {
              text: `You have joined the room.`,
              createdAt: new Date().getTime()
            },
            members: [currentUserId, swipedUserId]
          })
          .then(docRef => {
            docRef.collection('MESSAGES').add({
              text: `You have joined the room.`,
              createdAt: new Date().getTime(),
              system: true
            });
            navigation.navigate('Chat Home');
          });
      }
    })
    .catch(error => {
      console.log(error)
    })
  return response.data;
}

const swipedLeftOn = async (currentUserId, swipedUserId) => {
  const body = {
    swiperID: currentUserId,
    swipeeID: swipedUserId
  }
  axios.post("http://10.0.2.2:3000/api/swipe-profile-left", body)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

const swipedRightOn = async (currentUserId, swipedUserId) => {
  const body = {
    swiperID: currentUserId,
    swipeeID: swipedUserId
  }
  axios.post("http://10.0.2.2:3000/api/swipe-profile-right", body)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

var index = 0;
var popupIndex = 0;
var swipedYes = [];
var swipedNo = [];
const swiperRef = React.createRef();
//const auth = Firebase.auth();





const SwipeView = ({ navigation }) => {
  const [data, setData] = useState(testData)
  const [showMatch, setShowMatch] = useState(false);

  const onSwiped = () => {
    if (index + 1>= data.length) {
      return
    }
    index = (index + 1) % data.length;
    popupIndex = index - 1;
    console.log("index: ", index);
    console.log(data[index]);
    console.log("_______");
  }
  const onSwipedLeft = () => {
    if (index + 1>= data.length) {
      return
    }
    swipedNo.push(data[index - 1]);
    swipedLeftOn(auth.currentUser.uid, data[index - 1].id);
  }
  const onSwipedRight = () => {
    if (index + 1>= data.length) {
      return
    }
    swipedYes.push(data[index - 1]);
    swipedRightOn(auth.currentUser.uid, data[index - 1].id);
    if (isMatch(auth.currentUser.uid, data[index - 1].id)) {
      setShowMatch(true);
      console.log("Match found!")
    }
  }
  const onSwipedAll = () => {
    console.log('Done Swiping!');
    console.log("swiped right: ", swipedYes);
    console.log("swiped left: ", swipedNo);
  }
  useEffect(() => {
    async function fetchMyAPI() {
      const userAccessToken = await SecureStore.getItemAsync('secure_token')
      const allUsersResponse = await axios.get("http://10.0.2.2:3000/api/get-all-users", { params: { userAccessToken: userAccessToken } })
      const allUsers = allUsersResponse.data.map(user => {
        return {
          id: user.uid,
          name: user.username,
          genres: user.spotify_profile.top_3_genres.toString().toUpperCase(),
          image: user.spotify_profile.favorite_artist_data.image
        }
      })
      console.log({allUsers})
      setData(allUsers);

    }
    fetchMyAPI()
  }, [])
  return (
    <Swiper
      ref={swiperRef}
      cards={data}
      renderCard={(card, index) => {
        return (
          <Card data={data} />
        )
      }}
      onSwiped={onSwiped}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
      onSwipedAll={onSwipedAll}
      cardIndex={0}
      backgroundColor={'#546DD3'}
      stackSize={3}
      cardHorizontalMargin={30}
      marginTop={0}>
    </Swiper>
  )
}

const Card = ({ data }) => {
  return (
    <View style={styles.card}>
      <View style={styles.profileView}>
        <Image style={styles.profilePicture} source={{ uri: data[index].image }} />
        <Text style={styles.nameHeader}>{data[index].name}</Text>
        <Text style={styles.genres}>Genres: {data[index].genres}</Text>
      </View>
      <Modal onRequestClose={() => setShowMatch(false)} visible={showMatch} transparent={true} >
        <View style={styles.popupOutside}>
          <View style={styles.popupBox}>
            <Text style={styles.popupHeader}>You've Been Matched!</Text>
            <Text style={styles.popupText}>User: {data[popupIndex].name}</Text>
            <Text style={styles.popupText}>Genre: {data[popupIndex].genres}</Text>
            <TouchableOpacity style={styles.popupButton} onPress={() => navigation.navigate('Messaging')}>
              <Text style={styles.popupText}>Start a conversation!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.circleButton} onPress={() => swiperRef.current.swipeLeft()}>
          <Image style={styles.circleXImage} source={require('../assets/x-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={() => { console.log('play is pressed') }}>
          <Image style={styles.circlePlayImage} source={require('../assets/play-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={() => swiperRef.current.swipeRight()}>
          <Image style={styles.circleHeartImage} source={require('../assets/heart-icon.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SwipeView
