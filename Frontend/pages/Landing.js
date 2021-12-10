import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView, Image } from 'react-native';

import { useForm, Controller } from "react-hook-form";
import AppButton from '../components/AppButton.js';
import styles from '../styles/LandingStyles.js';
import { LinearGradient } from 'expo-linear-gradient';

export default function Landing({ navigation }) {
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });
    const onSubmit = data => {
        console.log(data);
    };



    console.log('errors', errors);

    return (
        <LinearGradient
            colors={['#724ECE', '#1F71E7']}
            style={styles.linearGradient}
        >
            <SafeAreaView style={styles.container}>
            <View style={styles.bodyContainer}>
                {/* <Image style={styles.image} source={require('../assets/musematch.png')} /> */}
                <Text style={styles.label}>Make Genuine Connections.</Text>
                <Text style={styles.label}>Just Through Music.</Text>
            </View>
            <View styles={styles.footer}>
                <AppButton
                    title="Sign up"
                    onPress={() => navigation.navigate("Create Account")}
                    type="primary"

                />
                <AppButton
                    title="I already have an account"
                    type="secondary"
                    onPress={() => navigation.navigate("Login")}
                />
            </View>

            </SafeAreaView>
        </LinearGradient>



    );
};

