import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OpportunitiesStack from './OpportunitiesStack';
import HomeStack from './HomeStack';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

export function BottomNavigator() {
    return (
            <Tab.Navigator 
            tabBarOptions={{
              activeBackgroundColor: "#002884",
              labelStyle: {
                fontSize: 15
              },
            }}>
              <Tab.Screen name="Inicio" component={HomeStack} options={{
                tabBarIcon: () => <Icon name='home' size={23} />
              }} />
              <Tab.Screen name="Oportunidades" component={OpportunitiesStack}
              options={{
                tabBarIcon: () => <Icon name='flag' size={23} />
              }}
               />
            </Tab.Navigator>
    )
}

export default BottomNavigator
