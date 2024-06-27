import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import {AuthContext} from '@src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const navigation = useNavigation();
  const {accessToken} = useContext(AuthContext);
  console.log(accessToken);
  // const getaccessToken = async () => {
  //   const a = await AsyncStorage.getItem('accessToken');
  //   console.log('a', a);
  // };

  useEffect(() => {
    if (accessToken === null) {
      navigation.replace(ROUTE.AUTH);
    } else {
      navigation.replace(ROUTE.TAB);
    }
  }, []);

  return <></>;
}
