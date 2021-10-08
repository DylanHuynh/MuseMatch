import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import styles from '../styles/homeStyle'

const home = ({ navigation }) => {
  return (
    <Swiper
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
        stackSize= {3}
    >
    <Button
        onPress={() => {console.log('oulala')}}
        title="Press me">
        You can press me
    </Button>
    </Swiper>
  )
}


const Card = (name) => {

  return (
    <View style = {styles.card}>

      <Text style = {nameHeader}> {name} </Text>


    </View>
  )

}

export default home