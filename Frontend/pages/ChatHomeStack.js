import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatHomeScreen from './ChatHomeScreen';
import AddRoomScreen from './AddRoomScreen';
import { IconButton } from 'react-native-paper';
import Chat from './Chat';

const ChatAppStack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();

function ChatApp() {
  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6646ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },

      }
    }
    >
      <ChatAppStack.Screen
        name='Chat Home'
        component={ChatHomeScreen}
        options={({ navigation }) => ({

        })}
      />
      <ChatAppStack.Screen
        name='Room'
        component={Chat}
        options={({ route }) => ({
          title: route.params.thread.name
        })}
      />
    </ChatAppStack.Navigator>
  );
}
export default function HomeStack() {
  return (
    <ModalStack.Navigator mode='modal' headerMode='none' screenOptions={{ headerShown: false }}>
      <ModalStack.Screen name='ChatApp' component={ChatApp} />
      <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
}