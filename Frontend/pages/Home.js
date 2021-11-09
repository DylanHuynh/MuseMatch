import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homepage from '../pages/Homepage';
import SwipeView from '../pages/SwipeView';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const H = () => {
    return (
        <NavigationContainer independent = {true}>
            <Tab.Navigator>
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="SwipeView" component={SwipeView}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default H