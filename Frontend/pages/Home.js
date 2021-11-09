import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Homepage from '../pages/Homepage';
import SwipeView from '../pages/SwipeView';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const H = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Homepage') {
                            iconName = 'home-outline'

                        } else if (route.name === 'SwipeView') {
                            iconName = 'person-add-outline'
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="SwipeView" component={SwipeView} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default H