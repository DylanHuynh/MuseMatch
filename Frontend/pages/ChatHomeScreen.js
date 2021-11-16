import React, { useContext, useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Title, List, Divider  } from 'react-native-paper';
import FormButton from '../components/FormButton';
import { auth, db } from '../config/firebase';
import styles from '../styles/ChatScreenStyles.js';
import Loading from '../components/Loading';

export default function ChatHomeScreen({ navigation }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection('THREADS')
      .where('members', 'array-contains', auth.currentUser.uid)
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            latestMessage: {
              text: ''
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Room', { thread: item })}
          >
            <List.Item
              title={item.name}
              description='Item description'
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
              description={item.latestMessage.text}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}