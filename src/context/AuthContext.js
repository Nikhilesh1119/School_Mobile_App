import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { ROUTE } from '../navigation/constant';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [SectionId, setSectionId] = useState(null);
  const [ClassId, setClassId] = useState(null);
  const [SectionName, setSectionName] = useState(null);
  const [ClassName, setClassName] = useState(null);

  const isLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        try {
          const decodedToken = jwtDecode(token);
          setTeacherId(decodedToken.teacherId);
          setSectionId(decodedToken.sectionId);


          setClassId(decodedToken.classId);
          setSectionName(decodedToken.sectionName);
          setClassName(decodedToken.className);
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      }
    } catch (e) {
      console.log('Login error', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLogin();
  }, []);

  const login = async (token, firstname) => {
    try {
      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('firstname', firstname);
      setAccessToken(token);
      try {
        // console.log(token);
        const decodedToken = jwtDecode(token);
        // console.log('dtl', decodedToken);
        setTeacherId(decodedToken.teacherId);
        setSectionId(decodedToken.sectionId);
        setClassId(decodedToken.classId);
        setSectionName(decodedToken.sectionName);
        setClassName(decodedToken.className);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } catch (e) {
      console.error('Login error', e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const navigation=useNavigation()
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('firstname');
      setAccessToken(null);
      setTeacherId(null);
      setSectionId(null);
      setClassId(null);
      setSectionName(null);
      setClassName(null);
      navigation.navigate(ROUTE.LOGIN)
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        accessToken,
        isLoading,
        teacherId,
        ClassId,
        SectionId,
        ClassName,
        SectionName,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
