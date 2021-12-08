import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
import Homepage from './pages/Homepage.js';
import SwipeView from './pages/SwipeView.js';
import Chat from './pages/Chat.js';
import CreateProfile from './pages/CreateProfile.js';
import SongRecs from './pages/SongRecsView.js';
import Home from './pages/Home'
import RecommenderIntro from './pages/RecommenderIntro'


const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "GothamBold": require('./assets/fonts/GothamBold.ttf'),
    "Nunito": require('./assets/fonts/Nunito-Bold.ttf')
  });

  if (!loaded) {
    console.log('not loaded');
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Landing">
        <Stack.Screen name="Landing" component={Landing} options = {{
          headerShown: false
        }}/>
        <Stack.Screen name="Login" component={Login} options = {{
          headerShown: false
        }} />
        <Stack.Screen name="Create Account" component={CreateAccount} options = {{
          headerShown: false
        }}
          />
        <Stack.Screen name="Home" component = {Home} options = {{
          headerShown: false
        }}/>
        <Stack.Screen name="CreateProfile" component = {CreateProfile} options = {{
          headerShown: false
        }}/>
        <Stack.Screen name="RecommenderIntro" component = {RecommenderIntro} options = {{
          headerShown: false
        }}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}
