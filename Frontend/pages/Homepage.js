import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../config/firebase';
import styles from '../styles/LandingStyles.js';
import AppButton from '../components/AppButton.js';

//const auth = Firebase.auth();

export default function Homepage({navigation}) {

    return (
        <View style={styles.container}>
                    <Text>Test: {auth.currentUser.uid}</Text>
        </View>
    )
}