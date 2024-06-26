import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import {AuthContext} from '@src/context/AuthContext';

export default function Splash() {
  const navigation = useNavigation();
  const {accessToken} = useContext(AuthContext);

  useEffect(() => {
    if (accessToken === null) {
      navigation.replace(ROUTE.AUTH);
    } else {
      navigation.replace(ROUTE.TAB);
    }
  }, []);

  return <></>;
}
