import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BusTypeDetails from '../HomeSearch/BusTypeDetails';
import HomeScreen from '../HomeScreen';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }} // You can customize header options here
            />
            <Stack.Screen
                name="BusTypeDetails"
                component={BusTypeDetails}
                options={{ headerShown: false }} // Custom title for this screen
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
