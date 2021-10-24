import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { encode as btoa } from 'base-64';
import { useForm, Controller } from "react-hook-form";

import AppButton from '../components/AppButton.js';
import styles from '../styles/FormStyles.js';
import * as AuthSession from 'expo-auth-session'
import * as Linking from 'expo-linking';

import axios from 'axios'


export const spotifyCredentials = {
  clientId: 'a2ecb5b0a2154d4f9fb99f632ecdd889',
  clientSecret: 'bc26c22208f142b1b5933db834fb686f',
  redirectUri: 'https://auth.expo.io/@anonymous/MuseMatch-bb351e1f-4527-4cf6-849e-46bafb82c4a0'
}


const getSpotifyCredentials = async () => {
  const res = await axios.get('http://10.0.2.2:3000/api/spotify-credentials')
  const spotifyCredentials = res.data
  return spotifyCredentials
}


const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
  'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
  'playlist-modify-private', 'user-read-recently-played', 'user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
  let result;
  try {

    const credentials = await getSpotifyCredentials() //we wrote this function above

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
  debugger;
  return result.params.code
}

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode() //we wrote this function above
    const credentials = await getSpotifyCredentials() //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        credentials.redirectUri
      }`,
    });
    const responseJson = await response.json();
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
    console.log({responseJson});
    return accessToken;
  } catch (err) {
    console.error(err);
  }
  return
}

export default function Login({ navigation }) {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });
  const onSubmit = data => {
    const token = await getTokens();
    console.log(tokens)

    navigation.navigate("Homepage", {
      authToken: token
    })
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createAccountLabel}>Sign In</Text>

      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="username"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
      />

      <View style={styles.buttonContainer}>
        <AppButton
          title="Log In"
          onPress={handleSubmit(onSubmit)}
          type="primary"
        />
      </View>
    </View>
  );
};

