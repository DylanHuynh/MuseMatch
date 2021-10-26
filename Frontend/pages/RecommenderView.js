import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import styles from '../styles/RecommenderViewStyles'
import data from './SongsTestData'


var index = 0;
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
  swipedNo.push(data[index-1]);

}
const onSwipedRight = () => {
  swipedYes.push(data[index-1]);

}
const onSwipedAll = () => {
  console.log('Done Swiping!');
  console.log("swiped right: ", swipedYes);
  console.log("swiped left: ", swipedNo);
}

const SwipeView = ({ navigation }) => {
  return (
    <Swiper
      ref={swiperRef}
      cards={data}
      renderCard={(card, index) => {
          return (
              <Card/>
          )
      }}
      onSwiped={onSwiped}
      onSwipedLeft={onSwipedLeft}
      onSwipedRight={onSwipedRight}
      onSwipedAll={onSwipedAll}
      cardIndex={0}
      backgroundColor={'#546DD3'}
      stackSize= {3}
      cardHorizontalMargin={30}
      marginTop={0}>
    </Swiper>
  )
}

const Card = () => {
  return (
    <View style = {styles.card}>
        <Text style = {styles.songCounter}>Song {index} of {data.length}</Text>
        <View style = {styles.songView}>
            <Image style = {styles.albumCover} source={{uri: data[index].album_cover}}/>
            <Text style = {styles.songName}>{data[index].song_name}</Text>
            <Text style = {styles.artist}>{data[index].artist}</Text>
        </View>
        <View style = {styles.buttonContainer}>
          <TouchableOpacity style = {styles.circleButton} onPress={() => swiperRef.current.swipeLeft()}>
            <Image style = {styles.circleXImage} source= {require('../assets/x-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.circleButton} onPress={() => {console.log('play is pressed')}}>
            <Image style = {styles.circlePlayImage} source= {require('../assets/play-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.circleButton} onPress={() => swiperRef.current.swipeRight()}>
            <Image style = {styles.circleHeartImage} source= {require('../assets/heart-icon.png')}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default SwipeView