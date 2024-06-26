/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';

import DashboardScreen from '@src/screens/DashboardScreen';
import AttendanceScreen from '@src/screens//AttendanceScreen';
import ProfileScreen from '@src/screens//ProfileScreen';
import EditProfile from '@src/components/EditProfile';
import ProfileStackNavigator from '@src/navigation/ProfileStackNavigator';
import {TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Colors} from '@src/theme/fonts';
import {ROUTE} from './constant';

const Tab = createBottomTabNavigator();

export default function TabStackNavigator() {
  const [attendanceStarted, setAttendanceStarted] = useState(false);

  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName={ROUTE.ATTENDANCE}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === ROUTE.DASHBOARD) {
            iconName = focused ? 'bars' : 'bars';
          } else if (rn === ROUTE.ATTENDANCE) {
            iconName = focused ? 'book' : 'book';
          } else if (rn === ROUTE.PROFILESCREEN) {
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
      <Tab.Screen name={ROUTE.DASHBOARD} component={DashboardScreen} />
      <Tab.Screen name={ROUTE.ATTENDANCE}>
        {() => <AttendanceScreen setAttendanceStarted={setAttendanceStarted} />}
      </Tab.Screen>
      <Tab.Screen
        name={ROUTE.PROFILESCREEN}
        component={ProfileStackNavigator}
      />
    </Tab.Navigator>
  );
}
