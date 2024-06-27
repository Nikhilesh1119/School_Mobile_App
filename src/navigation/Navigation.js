import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import Splash from '@src/navigation/splash';
import AuthStackNavigator from '@src/navigation/AuthStackNavigator';
import TabStackNavigator from '@src/navigation/TabNavigator';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTE.SPLASH}>
        <Stack.Screen
          name={ROUTE.SPLASH}
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name={ROUTE.AUTH}
          options={{headerShown: false}}
          component={AuthStackNavigator}
        />
        <Stack.Screen
          name={ROUTE.TAB}
          options={{headerShown: false}}
          component={TabStackNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
