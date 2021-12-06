import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { encode as btoa } from 'base-64';
import { useForm, Controller } from "react-hook-form";
import * as SecureStore from 'expo-secure-store';

import AppButton from '../components/AppButton.js';
import styles from '../styles/FormStyles.js';
import * as AuthSession from 'expo-auth-session'
import LoginErrorMessage from '../components/LoginErrorMessage.js';
import { auth } from '../config/firebase';

import axios from 'axios'


//const auth = Firebase.auth()

//Spotify
export const spotifyCredentials = {
  clientId: 'a2ecb5b0a2154d4f9fb99f632ecdd889',
  clientSecret: 'bc26c22208f142b1b5933db834fb686f',
  redirectUri: 'https://auth.expo.io/@anonymous/MuseMatch-bb351e1f-4527-4cf6-849e-46bafb82c4a0'
}




const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
  'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
  'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  let result;
  try {

    const credentials = spotifyCredentials//we wrote this function above

    const redirectUrl = AuthSession.getRedirectUrl('redirect'); //this will be something like https://auth.expo.io/@your-username/your-app-slug

    result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        credentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl),
    })
  } catch (err) {
    console.error(err)
  }
  console.log(result)
  return result.params.code
}

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode() //we wrote this function above
    const credentials = spotifyCredentials; //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const body = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri
    }`
    const response = await axios.post('https://accounts.spotify.com/api/token', body, {
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const responseJson = await response.data;
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    const token_data = {
      accessToken,
      refreshToken,
      expiresIn
    }
    return accessToken;
  } catch (err) {
    console.error(err);
  }
  return
}

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onLogin = async () => {

    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
        const token = await getTokens();
        await SecureStore.setItemAsync('secure_token', token);
        navigation.navigate("CreateProfile");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.createAccountLabel}>Sign In</Text>
      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <TextInput
            placeholder='Enter email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            style={styles.input}
            onBlur={onBlur}
            onChangeText={text => setEmail(text)}
            value={email}
          />

        )}
        name="username"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        render={({ field: { onBlur, value } }) => (
          <TextInput
            placeholder='Enter password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            style={styles.input}
            onBlur={onBlur}
            value={password}
            onChangeText={text => setPassword(text)}
            handlePasswordVisibility={handlePasswordVisibility}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
      {loginError ? <LoginErrorMessage error={loginError} visible={true} /> : null}

      <View style={styles.buttonContainer}>
        <AppButton
          title="Log In"
          onPress={onLogin}
          type="primary"
        />
      </View>
    </SafeAreaView>
  );
};

