// import React, { createContext, useRef, useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';

// const NavigationContext = createContext();

// export const NavigationProvider = ({ children }) => {
//   const navigationRef = useRef();

//   const navigate = (name, params) => {
//     if (navigationRef.current?.isReady()) {
//       navigationRef.current.navigate(name, params);
//     }
//   };

//   return (
//     <NavigationContext.Provider value={{ navigate, navigationRef }}>
//       <NavigationContainer ref={navigationRef}>
//         {children}
//       </NavigationContainer>
//     </NavigationContext.Provider>
//   );
// };

// export const useNavigationContext = () => useContext(NavigationContext);
