import React from 'react';
import ProgressBar from 'react-native-progress/Bar';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import styles from '../styles/RecommenderViewStyles'
import data from './SongsTestData'




var index = 0;
var swipedYes = [];
var swipedNo = [];
var progress = 0;
const swiperRef = React.createRef();
const onSwiped = () => {
  index = (index + 1) % data.length;
  console.log("index: ", index);
  console.log(data[index]);
  console.log("_______");
  progress = index / data.length;
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

const progressBar = () => {

}

const SwipeView = ({ navigation }) => {
  return (
    <>
      
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
      {/* right now the progress bar is only inputting the value for progress once (i think), but we want it to change and update every time we swipe. */}
      <ProgressBar style={styles.bar} progress={progress} width={300} color={'rgba(228, 215, 255, 0.8)'} height={10}/>
    </>
  )
}

const Card = () => {
  return (
    <>
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
            <TouchableOpacity style = {styles.circleButton} onPress={() => {console.log(index)}}>
              <Image style = {styles.circlePlayImage} source= {require('../assets/play-icon.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.circleButton} onPress={() => swiperRef.current.swipeRight()}>
              <Image style = {styles.circleHeartImage} source= {require('../assets/heart-icon.png')}/>
            </TouchableOpacity>
          </View>
      </View>
    </>
  )
}

export default SwipeView