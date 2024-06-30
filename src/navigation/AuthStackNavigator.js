import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@src/screens/Login/Container/index';
import AttendanceScreen from '@src/screens/attendance/container/index';
import UpdateDetails from '@src/screens/Login/Components/updateDetails/index';
import ForgotPassword from '@src/screens/Login/Components/Forgot/index';
import {ROUTE} from '@src/navigation/constant';

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTE.LOGIN}>
      <Stack.Screen
        name={ROUTE.LOGIN}
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name={ROUTE.FORGOTPASSWORD}
        options={{headerShown: false}}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={ROUTE.UPDATEDETAILS}
        options={{headerShown: false}}
        component={UpdateDetails}
      />
      <Stack.Screen
        name={ROUTE.ATTENDANCE}
        options={{headerShown: false}}
        component={AttendanceScreen}
      />
    </Stack.Navigator>
  );
}
