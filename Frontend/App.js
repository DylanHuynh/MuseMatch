import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useForm, Controller } from "react-hook-form";
import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import CreateAccount from './pages/CreateAccount.js';
import Homepage from './pages/Homepage.js';


const Stack = createNativeStackNavigator();

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen name="Homepage" component={Homepage} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
