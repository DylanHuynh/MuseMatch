import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import PagerView from 'react-native-pager-view';
import styles from '../styles/SwipeViewStyles'
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Firebase, { auth, db } from '../config/firebase';
import testData from './SwipeTestData';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const loadUser = async (uid) => {
  console.log("starting!!!")
  const user = await axios.get('http://10.0.2.2:3000/api/get-user', { params: { uid: uid } })
  return user.data
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



var index = 0;
var popupIndex = 0;
var swipedYes = [];
var swipedNo = [];
const swiperRef = React.createRef();
const onSwiped = () => {
  index = (index + 1) % data.length;
  console.log("index: ", index);
  console.log(data[index]);
  console.log("_______");
}
const onSwipedLeft = () => {
  swipedNo.push(data[index - 1]);

}
const onSwipedRight = () => {
  swipedYes.push(data[index - 1]);

}
const onSwipedAll = () => {
  console.log('Done Swiping!');
  console.log("swiped right: ", swipedYes);
  console.log("swiped left: ", swipedNo);
}

const SwipeView = ({ navigation }) => {
  const [data, setData] = useState([])
  const [showMatch, setShowMatch] = useState(false);

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const swipedRightOn = async (currentUserId, swipedUserId) => {
    console.log("swiping right")
    console.log(currentUserId, swipedUserId)
    const body = {
      swiperID: currentUserId,
      swipeeID: swipedUserId
    }
    const response = await axios.post("http://10.0.2.2:3000/api/swipe-profile-right", body)
    const match = response.data
    console.log({ match })
    if (match) {
      console.log('dyhuynh1')
      console.log(currentUserId, swipedUserId)
      const user1 = await loadUser(currentUserId)
      const user2 = await loadUser(swipedUserId)
      console.log({ user1 })
      db
        .collection('THREADS')
        .add({
          name: user1.username + " and " + user2.username,
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
        })
        .then(() => setShowMatch(true))
        .then(() => useForceUpdate());

      console.log("Match found!")
    }
  }

  const onSwiped = () => {
    if (index + 1 >= data.length) {
      navigation.navigate('Messaging')
      return
    }
    index = (index + 1) % data.length;
    popupIndex = index - 1;
    console.log("index: ", index);
    console.log(data[index]);
    console.log("_______");
  }
  const onSwipedLeft = () => {
    console.log("swiped left!")
    swipedNo.push(data[index - 1]);
    swipedLeftOn(auth.currentUser.uid, data[index - 1].id);
  }
  const onSwipedRight = () => {
    console.log("swiped right!")
    swipedYes.push(data[index - 1]);
    swipedRightOn(auth.currentUser.uid, data[index - 1].id);

  }
  const onSwipedAll = () => {
    console.log('Done Swiping!');
    console.log("swiped right: ", swipedYes);
    console.log("swiped left: ", swipedNo);
  }

  const Card = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
      <View style={styles.card}>
        {data.length > 0 ?
          <>
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

            <SegmentedControl
              values={['Top Songs', 'Top Artists', 'My Picks']}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
              style={{ marginHorizontal: 30, marginBottom: 20 }}
            />

            {selectedIndex == 0 &&

              <ScrollView style={{ height: 300 }}>
                <TouchableOpacity activeOpacity={1}>
                  {arr.map((number) => {
                    return (
                      <TopSongs number={number} song_index={number - 1} />
                    )
                  })}
                </TouchableOpacity>
              </ScrollView>

            }

            {selectedIndex == 1 &&

              <ScrollView style={{ height: 300 }}>
                <TouchableOpacity activeOpacity={1}>
                  {arr.map((number) => {
                    return (
                      <TopArtists number={number} artist_index={number - 1} />
                    )
                  })}
                </TouchableOpacity>
              </ScrollView>

            }

            {selectedIndex == 2 &&
              <AboutMe bio={data[index].bio} artist={data[index].favorite_artist} song={data[index].favorite_song} />
            }

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
          </> : <Text style={styles.nameHeader}>Loading...</Text>
        }
      </View>
    )
  }

  useEffect(() => {
    async function fetchMyAPI() {
      const userAccessToken = await SecureStore.getItemAsync('secure_token')
      const allUsersResponse = await axios.get("http://10.0.2.2:3000/api/get-all-users", { params: { userAccessToken: userAccessToken } })
      const allUsers = allUsersResponse.data.map(user => {
        console.log(user)
        return {
          id: user.uid,
          name: user.username,
          favorite_artist: user.favorite_artist,
          favorite_song: user.favorite_song,
          genres: user.spotify_profile.top_3_genres.toString().toUpperCase(),
          image: user.spotify_profile.top_10_artists[0].image,
          top_10_songs: user.spotify_profile.top_10_songs,
          top_10_artists: user.spotify_profile.top_10_artists,
          bio: user.bio
        }
      }).filter(user => user.id != auth.currentUser.uid)
      await setData(allUsers);

    }
    fetchMyAPI()
  }, [])

  const TopSongs = ({ number, song_index }) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 10 }}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.topSongsNumberHeader}>{number}</Text>
        <Image adjustsFontSizeToFit numberOfLines={1} style={styles.topSongsCellImage} source={{ uri: data[index].top_10_songs[song_index].image }} />
        <View style={{ marginLeft: 15, marginRight: 5, paddingRight: 5 }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.topSongsTitle}>{data[index].top_10_songs[song_index].name}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.topSongsArtist}>{data[index].top_10_songs[song_index].artist}</Text>
        </View>
      </View>
    )
  }

  const TopArtists = ({ number, artist_index }) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 10 }}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.topSongsNumberHeader}>{number}</Text>
        <Image adjustsFontSizeToFit numberOfLines={1} style={styles.topSongsCellImage} source={{ uri: data[index].top_10_artists[artist_index].image }} />
        <View style={{ marginLeft: 15, marginRight: 5, paddingRight: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.topArtists}>{data[index].top_10_artists[artist_index].name}</Text>
        </View>
      </View>
    )
  }

  const AboutMe = (props) => {
    return (
      <View>
        <View style={{ paddingBottom: 30 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, paddingLeft: 10 }}>Bio</Text>
          <Text style={{ paddingHorizontal: 10, paddingTop: 5, fontSize: 13 }}>{props.bio}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 22, paddingLeft: 10 }}>What I Have On Repeat</Text>
          <View style={{ paddingHorizontal: 10, paddingTop: 5, paddingBottom: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '700' }}>Artist: </Text>
              <Text>{props.artist}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '700' }}>Song: </Text>
              <Text>{props.song}</Text>
            </View>
          </View>
        </View>

      </View>
    )
  }

  return (
    <Swiper
      ref={swiperRef}
      cards={data}
      renderCard={(card, index) => {
        return (
          <Card />
        )
      }}
      onSwiped={onSwiped}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
      onSwipedAll={onSwipedAll}
      cardIndex={0}
      backgroundColor={'#546DD3'}
      showSecondCard={true}
      stackSize={3}
      stackSeparation={0}
      animateCardOpacity={true}
      cardHorizontalMargin={30}
      marginTop={0}
      verticalSwipe={false}
    >
    </Swiper>
  )
}





export default SwipeView
