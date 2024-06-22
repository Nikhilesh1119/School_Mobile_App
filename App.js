// /* eslint-disable prettier/prettier */
// import React, {useContext} from 'react';
// import Navigation from './src/navigation/Navigation';
// import DashboardScreen from './src/screens/DashboardScreen';
// import { AuthProvider } from './src/context/AuthContext';

// export default function App() {
//   return (
//     <AuthProvider>
//       <Navigation />
//     </AuthProvider>
//   );
//   // return <DashboardScreen />;
// }

// import React, { useEffect } from 'react';
// import { AuthProvider } from './src/context/AuthContext';
// import { NavigationProvider, useNavigationContext } from './src/context/NavigationContext';
// import Navigation from './src/navigation/Navigation';
// import { setupInterceptors } from './src/services/axiosClient';

// const AppContent = () => {
//   const { navigate } = useNavigationContext();

//   useEffect(() => {
//     setupInterceptors(navigate);
//   }, [navigate]);

//   return <Navigation />;
// };

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationProvider>
//         <AppContent />
//       </NavigationProvider>
//     </AuthProvider>
//   );
// }

import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import Navigation from './src/navigation/Navigation';
import {ToastProvider} from 'react-native-toast-notifications';
import {Text, View} from 'react-native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider
        renderType={{
          white: toast => (
            <View className="bg-black p-[15]">
              <Text className="text-white">{toast.message}</Text>
            </View>
          ),
        }}>
        <Navigation />
      </ToastProvider>
    </AuthProvider>
  );
}
