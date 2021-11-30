import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Icon, ImageStore } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Firebase, { auth } from '../config/firebase';
import styles from '../styles/RecommenderViewStyles'
import AppButton from '../components/AppButton.js';
import RecommenderView from './RecommenderView';

// import data from './SongsTestData'
import axios from 'axios';

const ModalStack = createNativeStackNavigator();

function RecommenderIntro({ navigation }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchMyAPI() {
          const token = await SecureStore.getItemAsync('secure_token')
          const songs = await getSongs(token)
          setData(songs)
        }
        fetchMyAPI()
      }, [])
    const [items, setItems] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c', src: "https://miro.medium.com/max/681/1*EBOL4lka5QjcYoxj6AHp-g.png",},
        { name: 'EMERALD', code: '#2ecc71', src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjyA_nLHQB8tctRq-t8J85nXUeA3xtQCCEgrkIMi0ehOpMlk1I9fkyRFfEjV_exmUMX_U&usqp=CAU",},
        { name: 'PETER RIVER', code: '#3498db', src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvwVcbNLpnIocKn5noAuoxFyZAEOVjIRFGQQ&usqp=CAU",},
        { name: 'AMETHYST', code: '#9b59b6', src: "https://cannabisnow.com/wp-content/uploads/2017/12/currents@2x.jpg", },
        //{ name: 'AMETHYST', code: '#9b59b6', image: data[3].album_cover, },
      ]);
    const getSongs = async (userAccessToken) => {
        console.log('accessToken', userAccessToken)
        const response = await axios.get("http://10.0.2.2:3000/api/get-daily-recs", { params: { userAccessToken: userAccessToken } })
        console.log(response.data)
        let songs = response.data
        for (let i = 0; i < songs.length; i++) {
        const song = songs[i]
        songs[i] = {
            id: song.id,
            // artist: song.artists[0].name,
            // artistID: song.artists[0].id,
            // song_name: song.name,
            album_cover: song.album.images[0].url
        }
        }
        return songs
    }

    return (
        <LinearGradient
            colors={['#724ECE', '#1F71E7']}
            style={styles.linearGradient}
        >
                <Text style={styles.introTitle}>Your Daily Recommender</Text>
                <Text style={styles.subtitle}>Based on your interests in...</Text> 
                <FlatGrid
                    itemDimension={130}
                    data={items}
                    style={styles.gridView}
                    scrollEnabled={false}
                    spacing={10}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                margin: 1
                            }}>    

                            <Image style={styles.itemContainer} source={{uri: item.src}}/>
                        </View>
                    )}
                /> 
                
                <AppButton
                    title="Take a look at my recommendations >"
                    onPress={() => navigation.navigate("RecommenderView")}
                    type="transparent"
                />
        </LinearGradient>
        )

}

export default function RecommenderStack() {
    return (
      <ModalStack.Navigator mode='modal' initialRouteName="RecommenderIntro" headerMode='none' screenOptions={{ headerShown: false }}>
        <ModalStack.Screen name='RecommenderIntro' component={RecommenderIntro} />
        <ModalStack.Screen name='RecommenderView' component={RecommenderView} />
      </ModalStack.Navigator>
    );
  }