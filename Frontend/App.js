import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
import Homepage from './pages/Homepage.js';
import SwipeView from './pages/SwipeView.js';
import RecommenderView from './pages/RecommenderView.js'


const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "GothamBold": require('./assets/fonts/GothamBold.ttf'),
  });

  if (!loaded) {
    console.log('not loaded');
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="SwipeView" component={SwipeView}/>
        <Stack.Screen name="RecommenderView" component={RecommenderView}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}
