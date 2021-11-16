import React, { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { View, ActivityIndicator } from 'react-native';
import styles from '../styles/ChatScreenStyles.js';
import { auth, db } from '../config/firebase';


export default function Chat({ route }) {
    const { thread } = route.params;

    const [messages, setMessages] = useState([
        /**
         * Mock message data
         */
        // example of system message
        {
        _id: 0,
        text: 'New room created.',
        createdAt: new Date().getTime(),
        system: true
        },
        // example of chat message
        {
        _id: 1,
        text: 'Henlo!',
        createdAt: new Date().getTime(),
        user: {
            _id: 2,
            name: 'Test User'
        }
        }
    ]);
    function renderLoading() {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee' />
        </View>
        );
    }

    function renderSend(props) {
        return (
        <Send {...props}>
            <View style={styles.sendingContainer}>
            <IconButton icon='send-circle' size={32} color='#6646ee' />
            </View>
        </Send>
        );
    }
    function scrollToBottomComponent() { //doesnt
        return (
        <View style={styles.bottomComponentContainer}>
            <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
        </View>
        );
    }
    async function handleSend(messages) {
        const text = messages[0].text;
    
        db
        .collection('THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .add({
            text,
            createdAt: new Date().getTime(),
            user: {
            _id: auth?.currentUser?.uid,
            email: auth?.currentUser?.email
            }
        });
        await db
        .collection('THREADS')
        .doc(thread._id)
        .set(
        {
            latestMessage: {
            text,
            createdAt: new Date().getTime()
            }
        },
        { merge: true }
        );
    }
    useEffect(() => {
        const messagesListener = db
          .collection('THREADS')
          .doc(thread._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data();
    
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              };
    
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                  name: firebaseData.user.email
                };
              }
    
              return data;
            });
    
            setMessages(messages);
          });
    
        return () => messagesListener();
      }, []);
    return (
        <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: auth?.currentUser?.uid }}        
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        placeholder='Type your message here...'
        renderLoading={renderLoading}
        />
    );
}