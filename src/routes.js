import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import LocationPage from './pages/locationPage'
import MainPage from './pages/mainPage'
import ByCityNamePage from './pages/byCityNamePage'

const Stack = createStackNavigator()

export default function routes() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name = 'MainPage'
            component = {MainPage}
            options = {{
                headerShown: false
            }}
        />
        <Stack.Screen
            name = 'LocationPage'
            component = {LocationPage}
            options = {{
                headerShown: false
            }}
        />
        <Stack.Screen
            name = 'ByCityNamePage'
            component = {ByCityNamePage}
            options = {{
                headerShown: false
            }}
        />
    </Stack.Navigator>
  );
}
