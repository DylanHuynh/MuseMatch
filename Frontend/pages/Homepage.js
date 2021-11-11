import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function Homepage({navigation}) {
    return (
        <Text>Test: {Firebase.auth().currentUser.uid}</Text>
    )
}