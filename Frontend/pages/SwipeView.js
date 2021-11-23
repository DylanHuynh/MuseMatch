import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import PagerView from 'react-native-pager-view';
import styles from '../styles/SwipeViewStyles'
import data from './SwipeTestData'
import SegmentedControl from '@react-native-segmented-control/segmented-control';


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
      marginTop={0}
      verticalSwipe={false}
      >
    </Swiper>
  )
}


const Card = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const arr = ["1.", "2.", "3.", "4.", "5.", "6.", "1.", "2.", "3.", "4.", "5.", "6."]

  return (
    <View style = {styles.card}>
        <View style = {styles.profileView}>
            <Image style = {styles.profilePicture} source={{uri: data[index].image}}/>
            <Text style = {styles.nameHeader}>{data[index].name}</Text>
            <Text style = {styles.genres}>Genres: {data[index].genres}</Text>
        </View>

        <SegmentedControl
          values={['Top Songs', 'Top Artists', 'My Picks']}
          selectedIndex={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />

        {selectedIndex == 0 && 

          <ScrollView style = {{height: 300}}>
            <TouchableOpacity activeOpacity={1}>
              {arr.map((number) => {
                return (
                    <TopSongs number={number}/>
                )
              })}
              </TouchableOpacity>
          </ScrollView>

        }

        {selectedIndex == 1 && 
          
          <ScrollView style = {{flexDirection: 'row'}}>
            <Text>Selected 2</Text>
          </ScrollView>

        }

        {selectedIndex == 2 && 
          
          <ScrollView style = {{flexDirection: 'row'}}>
            <Text>Selected 3</Text>
          </ScrollView>

        }

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

const TopSongs = (props) => {
  return (
    <View style = {{flexDirection: 'row', marginTop: 7, marginBottom: 10}}>
      <Text style = {styles.topSongsNumberHeader}>{props.number}</Text>
      <Image style = {styles.topSongsCellImage} source= {require('../assets/ed.jpg')}/>
      <View style = {{marginLeft: 15}}>
        <Text style = {styles.topSongsTitle}>Mood</Text>
        <Text style = {styles.topSongsArtist}>Iann Dior</Text>
      </View>
    </View>
  )
}

export default SwipeView