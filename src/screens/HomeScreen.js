/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';

import DashboardScreen from './DashboardScreen';
import AttendanceScreen from './AttendanceScreen';
import ProfileScreen from './ProfileScreen';
import EditProfile from '@src/components/EditProfile';
import ProfileStackNavigator from '@src/navigation/ProfileStackNavigator';
import { TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Colors } from '@src/theme/fonts';

const dashboard = 'Dashboard';
const attendance = 'Attendance';
const profile = 'ProfileScreen';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const [attendanceStarted, setAttendanceStarted] = useState(false);

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName={attendance}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === dashboard) {
            iconName = focused ? 'bars' : 'bars';
          } else if (rn === attendance) {
            iconName = focused ? 'book' : 'book';
          } else if (rn === profile) {
            iconName = focused ? 'user' : 'user';
          }
          return (
            <Icon
              name={iconName}
              size={30}
              color={focused ? Colors.COLOR_7 : color}
            />
          );
        },
        tabBarActiveTintColor: Colors.COLOR_7,
        tabBarInactiveTintColor: Colors.DARKGRAY,
        tabBarLabelStyle: {
          paddingBottom: scale(10),
          fontSize: scale(10),
        },
        tabBarStyle: {
          padding: scale(10),
          height: scale(70),
        },
        tabBarButton: props =>
          attendanceStarted && route.name !== attendance ? null : (
            <TouchableOpacity {...props} />
          ),
        headerShown: false,
      })}>
      <Tab.Screen name={dashboard} component={DashboardScreen} />
      <Tab.Screen name={attendance}>
        {() => <AttendanceScreen setAttendanceStarted={setAttendanceStarted} />}
      </Tab.Screen>
      <Tab.Screen name={profile} component={ProfileStackNavigator} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
