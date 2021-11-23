import React, { useState } from 'react';
import { View, Text } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { auth, db } from '../config/firebase';
import styles from '../styles/AddRoomScreenStyles.js';
import { IconButton, Title } from 'react-native-paper';



export default function AddRoomScreen({ navigation }) {
  
  const [roomName, setRoomName] = useState('');
  
  function handleButtonPress() {
    if (roomName.length > 0) {
      db
        .collection('THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime()
          },
          members: [auth?.currentUser?.uid, "d1tpyoSYZfVCkEOg8jerRM759oA2"]
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('Chat Home');
        });
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <FormInput
          labelName='Room Name'
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <FormButton
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}
function handleButtonPress() {
  db
      .collection('THREADS')
      .add({
        name: roomName,
        latestMessage: {
          text: `You have joined the room.`,
          createdAt: new Date().getTime()
        },
        members: [auth?.currentUser?.uid, "d1tpyoSYZfVCkEOg8jerRM759oA2"]
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