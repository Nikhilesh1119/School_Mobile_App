// /* eslint-disable prettier/prettier */
// import React, {useState} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {NavigationContainer} from '@react-navigation/native';
// import user1 from '@src/assets/images/user1.png';
// import home from '@src/assets/images/home.png';
// import book from '@src/assets/images/book.png';
// import DashboardScreen from './DashboardScreen';
// import AttendanceScreen from './AttendanceScreen';
// import ProfileScreen from './ProfileScreen';
// import EditProfile from '@src/components/EditProfile';
// import ProfileStackNavigator from '@src/navigation/ProfileStackNavigator';
// import {Image, TouchableOpacity} from 'react-native';
// import {scale} from 'react-native-size-matters';
// import {Colors} from '@src/theme/fonts';
// import styles from '../theme/styles';

// const dashboard = 'Dashboard';
// const attendance = 'Attendance';
// const profile = 'ProfileScreen';

// const Tab = createBottomTabNavigator();

// export default function HomeScreen() {
//   const [attendanceStarted, setAttendanceStarted] = useState(false);

//   return (
//     // <NavigationContainer>
//     <Tab.Navigator
//       initialRouteName={attendance}
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;
//           let rn = route.name;

//           if (rn === dashboard) {
//             iconName = home;
//           } else if (rn === attendance) {
//             iconName = book;
//           } else if (rn === profile) {
//             iconName = user1;
//           }
//           return (
//             <Image
//               source={iconName}
//               style={{
//                 width: 25,
//                 height: 25,
//                 tintColor: focused ? 'purple' : 'gray',
//               }}
//             />
//           );
//         },
//         tabBarActiveTintColor: Colors.COLOR_7,
//         tabBarInactiveTintColor: Colors.DARKGRAY,
//         tabBarLabelStyle: {
//           paddingBottom: scale(10),
//           fontSize: scale(10),
//         },
//         tabBarStyle: {
//           padding: scale(10),
//           height: scale(70),
//         },
//         tabBarButton: props =>
//           attendanceStarted && route.name !== attendance ? null : (
//             <TouchableOpacity {...props} />
//           ),
//         headerShown: false,
//       })}>
//       <Tab.Screen name={dashboard} component={DashboardScreen} />
//       <Tab.Screen name={attendance}>
//         {() => <AttendanceScreen setAttendanceStarted={setAttendanceStarted} />}
//       </Tab.Screen>
//       <Tab.Screen name={profile} component={ProfileStackNavigator} />
//     </Tab.Navigator>
//     // </NavigationContainer>
//   );
// }
