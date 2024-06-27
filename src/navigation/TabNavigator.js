/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import DashboardScreen from '@src/screens/DashboardScreen';
import AttendanceScreen from '@src/screens//AttendanceScreen';
import ProfileStackNavigator from '@src/navigation/ProfileStackNavigator';
import {Image, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Colors} from '@src/theme/fonts';
import {ROUTE} from './constant';
import user1 from '@src/assets/images/user1.png';
import home from '@src/assets/images/home.png';
import book from '@src/assets/images/book.png';

const Tab = createBottomTabNavigator();

export default function TabStackNavigator() {
  const [attendanceStarted, setAttendanceStarted] = useState(false);
  const [initialRoute, setInitialRoute] = useState(ROUTE.ATTENDANCE);

  // const getTodayAttendance = async () => {
  //   try {
  //     const res = await axiosClient.get(
  //       `attendance/check-attendance-marked/${SectionId}`,
  //     );
  //     if (res.data.result) {
  //       setInitialRoute(ROUTE.DASHBOARD);
  //     } else {
  //       setInitialRoute(ROUTE.ATTENDANCE);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   getTodayAttendance();
  // });

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === ROUTE.DASHBOARD) {
            iconName = home;
          } else if (rn === ROUTE.ATTENDANCE) {
            iconName = book;
          } else if (rn === ROUTE.PROFILESCREEN) {
            iconName = user1;
          }
          return (
            <Image
              source={iconName}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'purple' : 'gray',
              }}
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
          attendanceStarted && route.name !== ROUTE.ATTENDANCE ? null : (
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
