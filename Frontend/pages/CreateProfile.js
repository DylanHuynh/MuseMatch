import React, { useState, useMemo } from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View, TextInput, Button, Alert } from 'react-native';

import { useForm, Controller } from "react-hook-form";
import AppButton from '../components/AppButton.js';
import styles from '../styles/FormStyles.js';
import SearchableDropdown from 'react-native-searchable-dropdown';


// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

var items = [
    {
        id: 1,
        name: 'JavaScript',
    },
    {
        id: 2,
        name: 'Java',
    },
    {
        id: 3,
        name: 'Ruby',
    },
    {
        id: 4,
        name: 'React Native',
    },
    {
        id: 5,
        name: 'PHP',
    },
    {
        id: 6,
        name: 'Python',
    },
    {
        id: 7,
        name: 'Go',
    },
    {
        id: 8,
        name: 'Swift',
    },
];

export default function CreateAccount({ navigation }) {
    const [song, setSong] = useState({
        id: -1,
        name: 'Choose a song'
    });
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            song: '',
            artist: '',
            genre: '',
        }
    });

    const onChange = arg => {
        return {
            value: arg.nativeEvent.text,
        };
    };
    const onHandleCreateProfile = () => {
        console.log("here")
    }

    console.log('errors', errors);

    return (
        <View style={styles.container}>
            <SafeAreaView>
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
                    items={items}
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
                            onTextChange: text => alert(text)
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                />


                {/* <Text style={styles.createAccountLabel}>Create Account</Text>
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
                <Text style={styles.label}>Current Top Song</Text>
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
                    name="song"
                    rules={{ required: true }}
                />
                <Text style={styles.label}>Current Top Artist</Text>
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
                    name="artist"
                    rules={{ required: true }}
                />
                <Text style={styles.label}>Current Top Genre</Text>
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
                    name="genre"
                    rules={{ required: true }}
                /> */}

                <Text style={styles.label}>Bio</Text>
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
                    name="bio"
                    rules={{ required: true }}
                />

                <View style={styles.buttonContainer}>
                    <AppButton
                        title="Create Profile"
                        onPress={onHandleCreateProfile}
                        type="primary"
                    />
                </View>



            </SafeAreaView>

        </View>
    );
};

