// /* eslint-disable prettier/prettier */
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../screens/HomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { View, ActivityIndicator } from 'react-native';

// const Stack = createNativeStackNavigator();

// export default function Navigation() {
//   const { userToken, isLoading } = useContext(AuthContext);

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {userToken === null ? (
//           <Stack.Screen
//             name="Login"
//             options={{ headerShown: false }}
//             component={LoginScreen}
//           />
//         ) : (
//           <Stack.Screen
//             name="HomeScreen"
//             options={{ headerShown: false }}
//             component={HomeScreen}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {AuthContext} from '../context/AuthContext';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const {accessToken, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {accessToken === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
