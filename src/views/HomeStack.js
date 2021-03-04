import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import OpportunityFormScreen from './OpportunityFormScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Inicio'}}
          />
          <Stack.Screen
            name="CreateOportunity"
            component={OpportunityFormScreen}
            options={{title: 'Crear oportunidad'}}
          />
        </Stack.Navigator>
    )
}
