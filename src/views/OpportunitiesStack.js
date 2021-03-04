import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import OpportunitiesTab from './OpportunitiesTab'

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Opportunities">
          <Stack.Screen
            name="Opportunities"
            component={OpportunitiesTab}
            options={{title: 'Oportunidades'}}
          />
        </Stack.Navigator>
    )
}