import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../config/firebase';
import { GiftedChat } from 'react-native-gifted-chat';




const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace("Login");
        }).catch((error) => {
            // An error happened.
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={signOut}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation]);

    // useLayoutEffect(() => {
    //   const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc')
    //       }))
    //   ))
    //     });
    useEffect(() => {
        const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc')
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        //console.log(auth?.currentUser?.email)
        const { _id, createdAt, text, user,} = messages[0]
        db.collection('chats').add({ _id, createdAt,  text, user })
    }, []);
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    );
}
const styles = StyleSheet.create({
});
export default Chat;