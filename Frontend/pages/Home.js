import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Homepage from '../pages/Homepage';
import SwipeView from '../pages/SwipeView';
import ChatHomeStack from '../pages/ChatHomeStack';
import AddRoomScreen from '../pages/AddRoomScreen';
import RecommenderView from '../pages/RecommenderView';


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

                        if (route.name === 'Discover') {
                            iconName = 'home-outline'

                        } else if (route.name === 'Make a Match') {
                            iconName = 'person-add-outline'
                        } else if (route.name === 'Recommender') {
                            iconName = 'musical-notes-outline'
                        } else if (route.name === 'Messaging') {
                            iconName = 'chatbubble-ellipses-outline'
                        } else if (route.name === 'Settings') {
                            iconName = 'settings-outline'
                        }


                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Stack.Screen name="Discover" component={Homepage} />
                <Stack.Screen name="Make a Match" component={SwipeView} />
                <Stack.Screen name="Recommender" component={RecommenderView} />
                <Stack.Screen name="Messaging" component={Homepage} />
                <Stack.Screen name="Settings" component={Homepage} />
                <Stack.Screen name="Chat" component={ChatHomeStack}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default H