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
import {object, string} from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../context/AuthContext';
import {axiosClient} from '../services/axiosClient';

const LoginForm = () => {
  const {login} = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const userSchemaValidation = object({
    phone: string()
      .matches(/^\d{10}$/, 'phone must be exactly 10 digits')
      .required('phoneno is required'),
    password: string()
      .min(8, 'password must have atleast 8 characters')
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
            phone: '',
            password: '',
          }}
          validationSchema={userSchemaValidation}
          onSubmit={async values => {
            try {
              console.log(values);
              const res = await axiosClient.post('/teacher/login', values);
              if (res.data.result) {
                ToastAndroid.show('Login Successful', ToastAndroid.LONG);
                setTimeout(() => {
                  console.log(res.data.result);
                  login(res.data.result.accessToken, res.data.result.firstname);
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
                  <Text
                    className="text-2xl font-medium  text-orange-600"
                    style={{fontFamily: 'Satoshi'}}>
                    Welcome,{' '}
                  </Text>
                  <Text
                    className="text-2xl font-medium text-black"
                    style={{fontFamily: 'Satoshi'}}>
                    Login Here
                  </Text>
                </View>
                <View className="">
                  <View className="">
                    <Text
                      className="text-sm font-medium text-black"
                      style={{fontFamily: 'Satoshi'}}>
                      Phone No
                    </Text>
                    <TextInput
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      values={values.phone}
                      className="border text-black border-[#e5e7e6] rounded-lg mt-3 px-4 text-md "
                      placeholder="Enter phoneNo"
                    />
                    {touched.phone && errors.phone && (
                      <Text
                        className="text-red-600 font-thin"
                        style={{fontFamily: 'Satoshi'}}>
                        {errors.phone}
                      </Text>
                    )}
                  </View>
                  <View className=" mt-3">
                    <View className="">
                      <Text
                        className="text-sm font-medium text-black"
                        style={{fontFamily: 'Satoshi'}}>
                        Password
                      </Text>
                      <View className="border rounded-lg border-[#e5e7e6] mt-3 h-12 flex-row">
                        <TextInput
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          values={values.password}
                          className=" rounded-lg w-5/6 px-4 text-black text-md"
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
                      <Text
                        className="text-red-600"
                        style={{fontFamily: 'Satoshi'}}>
                        {errors.password}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity className="mt-2">
                    <Text
                      className="text-black font-medium text-sm text-right"
                      style={{fontFamily: 'Satoshi'}}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity className="mt-12" onPress={handleSubmit}>
                  <Text
                    className=" text-white bg-purple-700 py-3 font-black text-lg text-center rounded-full"
                    style={{fontFamily: 'Satoshi'}}>
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
