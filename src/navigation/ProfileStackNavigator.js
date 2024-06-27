import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '@src/screens/ProfileScreen';
import EditProfile from '@src/components/EditProfile';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
    </Stack.Navigator>
  )
}