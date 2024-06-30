import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '@src/screens/profile/container/index';
import EditProfile from '@src/screens/profile/component/editprofile/index';
import {ROUTE} from './constant';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTE.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ROUTE.EDITPROFILE} component={EditProfile} />
    </Stack.Navigator>
  );
}
