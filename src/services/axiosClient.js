import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useNavigation } from '@react-navigation/native';

// // const navigation = useNavigation();

export const axiosClient = axios.create({
  baseURL: 'http://192.168.152.214:4000',
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      AsyncStorage.removeItem('userToken');
      // navigation.navigate('Login');
    }
    // if (error.response) {
    //   return Promise.reject(error);
    // }
    return Promise.reject(error);
  },
);

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const axiosClient = axios.create({
//   baseURL: 'http://192.168.238.214:4000',
// });

// axiosClient.interceptors.request.use(
//   async request => {
//     const token = await AsyncStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log('request=', request);
//     return request;
//   },
//   error => Promise.reject(error),
// );

// export const setupInterceptors = navigate => {
//   axiosClient.interceptors.response.use(
//     async response => {
//       const data = response.data;
//       if (data.status === 'ok') {
//         return data;
//       }
//       if (data.status === 'error' && data.message === 'jwt expired') {
//         await AsyncStorage.removeItem('accessToken');
//         navigate('Login');
//       }
//     },
//     async error => {
//       return Promise.reject(error);
//     },
//   );
// };
