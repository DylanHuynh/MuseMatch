import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import styles from './homeStyle'

const home = ({ navigation }) => {
  return (
    <Swiper
      ref={swiperRef}
      cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
      renderCard={(card) => {
          return (
              <Card/>
          )
      }}
      onSwiped={(cardIndex) => {console.log(cardIndex)}}
      onSwipedAll={() => {console.log('onSwipedAll')}}
      cardIndex={0}
      backgroundColor={'#4FD0E9'}
      stackSize= {3}>
      <Button
          onPress={() => {console.log('oulala')}}
          title="Press me">
          You can press me
      </Button>
    </Swiper>
  )
}

const swiperRef = React.createRef();

const Card = (name) => {
  return (
    <View style = {styles.card}>
        <View style = {styles.profileView}>
            <Image style = {styles.profilePicture} source= {require('./assets/ed.jpg')}/>
            <Text style = {styles.nameHeader}> Johnny Smith </Text>
            <Text style = {styles.genres}>Genres: Pop, Melodic Rap, Pop Rock</Text>
        </View>

        <View style = {styles.buttonContainer}>
          <TouchableOpacity style = {styles.circleButton} onPress={() => swiperRef.current.swipeLeft()}>
            <Image style = {styles.circleImage} source= {require('./assets/x-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.circleButton} onPress={() => {console.log('play is pressed')}}>
            <Image style = {styles.circlePlayImage} source= {require('./assets/play-icon.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.circleButton} onPress={() => swiperRef.current.swipeRight()}>
            <Image style = {styles.circleImage} source= {require('./assets/heart-icon.png')}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default home