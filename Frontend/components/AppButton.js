import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "../styles/AppButtonStyles.js";
const AppButton = ({ onPress, title, type }) => {
    // types: primary, secondary, transparent
    // TODO: will be another property called height and width
    if (type == 'primary') {
        return(
        <TouchableOpacity onPress={onPress} style={styles.primaryAppButtonContainer}>
            <Text style={styles.primaryAppButtonText}>{title}</Text>
        </TouchableOpacity>
        )
    }
    else if (type == 'secondary') {
        return(
            <TouchableOpacity onPress={onPress} style={styles.secondaryAppButtonContainer}>
                <Text style={styles.secondaryAppButtonText}>{title}</Text>
            </TouchableOpacity>
            )
    } else {
        return(
            <TouchableOpacity onPress={onPress} style={styles.transparentAppButtonContainer}>
                <Text style={styles.transparentAppButtonText}>{title}</Text>
            </TouchableOpacity>
            )
    }

}


  export default AppButton;