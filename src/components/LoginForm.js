/* eslint-disable prettier/prettier */
import {useContext, useState} from 'react';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Button,
  ToastAndroid,
} from 'react-native';
import {object, string, email} from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';
import {axiosClient} from '../services/axiosClient';

const LoginForm = () => {
  const {login} = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const userSchemaValidation = object({
    email: string().email('Invalid email').required('Email is required'),
    // username: string().required('Username is required'),
    password: string()
      .min(4, 'password must have atleast 4 characters')
      .max(8, 'password can have atmost 8 characters')
      .required('password is required'),
  });

  const handlePasswordVisibility = e => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeAreaView className="min-h-full">
      <View
        className="px-4  bg-white  "
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <Formik
          initialValues={{
            email: '',
            // username: '',
            password: '',
          }}
          validationSchema={userSchemaValidation}
          onSubmit={async values => {
            try {
              // console.log(values);
              const res = await axiosClient.post('/teacher/login', values);
              if (res.data.result) {
                ToastAndroid.show('Login Successful', ToastAndroid.LONG);
                setTimeout(() => {
                  // console.log(res.data.result);
                  login(res.data.result.accessToken, res.data.result.username);
                  navigation.navigate('Home');
                }, 2000);
              } else {
                ToastAndroid.show(res.data.message, ToastAndroid.LONG);
              }
            } catch (error) {}
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => {
            return (
              <View className=" px-3  h-full">
                <View className="flex-1 flex-row  max-h-12">
                  <Text className="text-2xl text-orange-600">Welcome, </Text>
                  <Text className="text-2xl text-black">Login Here</Text>
                </View>
                <View className="">
                  <View className="">
                    {/* <Text className="text-lg text-[#7b7c7b]">Email</Text> */}
                    <Text className="text-lg text-[#7b7c7b]">Email</Text>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      values={values.email}
                      // onChangeText={handleChange('username')}
                      // onBlur={handleBlur('username')}
                      // values={values.username}
                      className="border text-black border-[#e5e7e6] rounded-lg  px-4 text-md "
                      placeholder="abc@gmail.com"
                    />
                    {touched.email && errors.email && (
                      <Text className="text-red-600">{errors.email}</Text>
                    )}
                    {/* {touched.username && errors.username && (
                      <Text className="text-red-600">{errors.username}</Text>
                    )} */}
                  </View>
                  <View className=" mt-3">
                    <View className="">
                      <Text className="text-lg text-[#7b7c7b]">Password</Text>
                      <View className="border rounded-lg border-[#e5e7e6] h-12 flex-row">
                        <TextInput
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          values={values.password}
                          className=" rounded-lg w-5/6 px-4 text-black  text-md"
                          placeholder="Enter Your Password "
                          secureTextEntry={isPasswordVisible ? false : true}
                        />
                        <TouchableOpacity
                          className="h-12  w-1/6 flex-1 justify-center items-center"
                          onPress={handlePasswordVisibility}>
                          {isPasswordVisible ? (
                            <Icon name="eye" size={22} color="black" />
                          ) : (
                            <Icon name="eye-slash" size={22} color="black" />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                    {touched.password && errors.password && (
                      <Text className="text-red-600">{errors.password}</Text>
                    )}
                  </View>
                  <TouchableOpacity className="mt-2">
                    <Text className="text-gray-900 text-right">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className="mt-12" onPress={handleSubmit}>
                  <Text className="text-xl text-white font-semibold bg-purple-700 py-3 text-center rounded-full">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
