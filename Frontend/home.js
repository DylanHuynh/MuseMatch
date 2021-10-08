import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import styles from './homeStyle'

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
    stackSize= {3}>
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
        <View style = {styles.profileView}>
            <Image style = {styles.profilePicture} source= {require('./assets/ed.jpg')}/>
            <Text style = {styles.nameHeader}> Johnny Smith </Text>
            <Text style = {styles.genres}>Genres: Pop, Melodic Rap, Pop Rock</Text>
        </View>
    </View>
  )

}

export default home