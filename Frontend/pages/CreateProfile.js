import React, { useState, useMemo, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View, TextInput, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useForm, Controller } from "react-hook-form";
import AppLoading from 'expo-app-loading';

import AppButton from '../components/AppButton.js';
import styles from '../styles/FormStyles.js';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axios from 'axios';
import { auth } from '../config/firebase';

export default function CreateProfile({ navigation }) {
    const [bio, setBio] = useState("")
    const [username, setUsername] = useState("")
    const [song, setSong] = useState({
        id: -1,
        name: 'Choose a song'
    });
    const [artist, setArtist] = useState({
        id: -1,
        name: 'Choose an artist'
    });
    const [artistList, setArtistList] = useState([]);
    const [songList, setSongList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getArtists = async (searchStr) => {
        const response = await axios.get('http://10.0.2.2:3000/api/search-by-artist', { params: { search: searchStr } });

        let artists = response.data.artists.items.map(item => ({
            id: item.id,
            name: item.name,
        }))
        return artists.slice(0, 10);
    }

    const getSongs = async (searchStr) => {
        // USE THIS BELOW LINE TO GRAB A TOKEN IF NECESSARY
        // const token = await SecureStore.getItemAsync('secure_token');
        const response = await axios.get('http://10.0.2.2:3000/api/search-by-song', { params: { search: searchStr } });
        let songs = response.data.tracks.items.map(item => ({
            id: item.id,
            name: item.name,
        }))
        return songs.slice(0, 10);
    }


    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            username,
            song,
            artist,
        }
    });
    const onHandleCreateProfile = async () => {
        const userAccessToken = await SecureStore.getItemAsync('secure_token')
        const userResponse = await axios.get("http://10.0.2.2:3000/api/get-user-profile", { params: { userAccessToken: userAccessToken } })
        console.log(userResponse.data)
        const resp = {
            username: username,
            artist: artist.name,
            artist_id: artist.id,
            song: song.name,
            song_id: song.id,
            bio: bio,
            uid: auth.currentUser.uid,
            spotify_profile: userResponse.data
        }
        axios.post('http://10.0.2.2:3000/api/create-account', resp)
        navigation.navigate('Home')
    }
    const loadUser = async (uid) => {
        console.log("starting!!!")
        const user = await axios.get('http://10.0.2.2:3000/api/get-user', { params: { uid: uid } })
        console.log(user.data)
        if (user.data.uid != -1) {
            navigation.navigate('Home')
            return
        }
        console.log("new user")
    }

    if (!loaded) {
        return (
            <AppLoading
                startAsync={() => loadUser(auth.currentUser.uid)}
                onFinish={() => setLoaded(true)}
                onError={console.warn}
            />
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style = {styles.container}>
                <Text style={styles.createAccountLabel}>Create Profile</Text>
                <Text style={styles.label}>Username</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => setUsername(value)}
                            value={username}
                        />
                    )}
                    name="username"
                    rules={{ required: true }}
                />

                <Text style={styles.label}>Bio</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={value => setBio(value)}
                            value={bio}
                        />
                    )}
                    name="bio"
                    rules={{ required: true }}
                />

                <Text style={styles.label}>Current Top Artist</Text>
                <View>
                    <SearchableDropdown
                        onItemSelect={(item) => {
                            setArtist(item);
                        }}
                        containerStyle={{ padding: 5 }}

                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#ddd',
                            borderColor: '#bbb',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={artistList}
                        defaultIndex={2}
                        resetValue={false}
                        textInputProps={
                            {
                                placeholder: artist.name,
                                underlineColorAndroid: "transparent",
                                style: {
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                },
                                onTextChange: text => {
                                    if (text) {
                                        console.log(text)
                                        // setSearch(text)
                                        getArtists(text).then((artists) => {
                                            setArtistList(artists)
                                        });
                                    }

                                }
                            }
                        }
                        listProps={
                            {
                                nestedScrollEnabled: true,
                            }
                        }
                    />

                    <Text style={styles.label}>Current Top Song</Text>
                    <SearchableDropdown
                        onItemSelect={(item) => {
                            setSong(item);
                        }}
                        containerStyle={{ padding: 5 }}

                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#ddd',
                            borderColor: '#bbb',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{ color: '#222' }}
                        itemsContainerStyle={{ maxHeight: 140 }}
                        items={songList}
                        defaultIndex={2}
                        resetValue={false}
                        textInputProps={
                            {
                                placeholder: song.name,
                                underlineColorAndroid: "transparent",
                                style: {
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                },
                                onTextChange: text => {
                                    if (text) {
                                        getSongs(text).then((songList) => {
                                            setSongList(songList)
                                        });
                                    }

                                }
                            }
                        }
                        listProps={
                            {
                                nestedScrollEnabled: true,
                            }
                        }
                />

                <View style={styles.buttonContainer}>
                    <AppButton
                        title="Create Profile"
                        onPress={() => onHandleCreateProfile()}
                        type="primary"
                    />



                </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

