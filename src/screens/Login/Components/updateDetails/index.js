import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Fonts} from '@src/theme/fonts';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {axiosClient} from '@src/services/axiosClient';
import {useNavigation} from '@react-navigation/native';
import update from '@src/assets/images/update.gif';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ROUTE} from '@src/navigation/constant';
import { styles } from './styles';

export default function UpdatePassword() {
  const [isLogin, setIsLogin] = React.useState(false);
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    React.useState(false);

  const handlePasswordVisibility = field => {
    if (field === 'password') {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (field === 'confirmPassword') {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async values => {
    console.log(values);
    const res = await axiosClient.put('teacher/auth-update', values);
    console.log(res.result);
    setIsLogin(true);
    setTimeout(() => {
      navigation.navigate(ROUTE.TAB);
    }, 2000);
  };

  return (
    <>
      {isLogin ? (
        <View
          style={{
            backgroundColor: '#4e2973',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={update} style={{height: 300, width: 300}} />
          <Text style={{fontSize: 24, fontFamily: Fonts.BOLD, color: 'white'}}>
            Password Updated!
          </Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoText}>A</Text>
                </View>
                <Text style={styles.logoTitle}>LOGO</Text>
              </View>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>
                      Please update your details
                    </Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Create Username</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                      />
                      {touched.username && errors.username && (
                        <Text style={styles.errorText}>{errors.username}</Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>New Password</Text>
                      <View style={styles.passwordInputContainer}>
                        <TextInput
                          style={styles.inputWithIcon}
                          placeholder="Enter your new password"
                          secureTextEntry={!isPasswordVisible}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                        />
                        <TouchableOpacity
                          style={styles.passwordVisibilityToggle}
                          onPress={() => handlePasswordVisibility('password')}>
                          {isPasswordVisible ? (
                            <Icon name="eye" size={22} color="black" />
                          ) : (
                            <Icon name="eye-slash" size={22} color="black" />
                          )}
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Confirm Password</Text>
                      <View style={styles.passwordInputContainer}>
                        <TextInput
                          style={styles.inputWithIcon}
                          placeholder="Confirm your new password"
                          secureTextEntry={!isConfirmPasswordVisible}
                          onChangeText={handleChange('confirmPassword')}
                          onBlur={handleBlur('confirmPassword')}
                          value={values.confirmPassword}
                        />
                        <TouchableOpacity
                          style={styles.passwordVisibilityToggle}
                          onPress={() =>
                            handlePasswordVisibility('confirmPassword')
                          }>
                          {isConfirmPasswordVisible ? (
                            <Icon name="eye" size={22} color="black" />
                          ) : (
                            <Icon name="eye-slash" size={22} color="black" />
                          )}
                        </TouchableOpacity>
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}>
                      <Text style={styles.buttonText}>Update Password</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
}
