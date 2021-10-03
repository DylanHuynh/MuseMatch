import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "../styles/AppButton.js";
const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);


  export default AppButton;