/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/views/LoginScreen';
import BottomNavigator from './src/views/BottomNavigator';

const Stack = createStackNavigator();


const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" 
        screenOptions={{
          headerShown : false
        }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Networking Merkinsio'}}
          />
          <Stack.Screen
            name="Tabs"
            component={BottomNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
