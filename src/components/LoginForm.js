/* eslint-disable prettier/prettier */
import {useContext, useState} from 'react';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import logo from '../assets/images/logo.png';
import {
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Button,
  ToastAndroid,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
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
    // phone: string()
    //   .matches(/^\d{10}$/, 'phone must be exactly 10 digits')
    //   .required('phoneno is required'),
    password: string()
      .min(8, 'password must have at least 8 characters')
      .required('password is required'),
  });

  const handlePasswordVisibility = e => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Formik
        initialValues={{
          user: '',
          password: '',
        }}
        validationSchema={userSchemaValidation}
        onSubmit={async values => {
          try {
            console.log(values);
            const res = await axiosClient.post('/teacher/login', {
              user: values.user,
              password: values.password,
            });
            console.log(res);
            if (res.data.result) {
              ToastAndroid.show('Login Successful', ToastAndroid.LONG);
              setTimeout(() => {
                console.log(res.data.result);
                login(res.data.result.accessToken, res.data.result.firstname);
                navigation.navigate('Home');
              }, 2000);
            } else {
              ToastAndroid.show(
                res.data.message,
                ToastAndroid.LONG,
                ToastAndroid.TOP,
              );
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
            <View style={styles.formContainer}>
              <View style={styles.logoContainer}>
                <Image source={logo} alt="" style={styles.logo} />
                <Text style={styles.logoText}>Logo</Text>
              </View>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTextPrimary}>Welcome, </Text>
                <Text style={styles.welcomeTextSecondary}>Login Here</Text>
              </View>
              <Text style={styles.description}>
                Enter your credentials to get access to your account.
              </Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone, email or username</Text>
                <TextInput
                  onChangeText={handleChange('user')}
                  onBlur={handleBlur('user')}
                  value={values.user}
                  style={styles.input}
                  placeholder="Email / Phone / Username"
                  placeholderTextColor={'black'}
                />
                {touched.user && errors.user && (
                  <Text style={styles.errorText}>{errors.user}</Text>
                )}
              </View>
              <View>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    style={styles.passwordInput}
                    placeholder="Enter Your Password"
                    placeholderTextColor={'black'}
                    secureTextEntry={!isPasswordVisible}
                  />
                  <TouchableOpacity
                    style={styles.passwordVisibilityToggle}
                    onPress={handlePasswordVisibility}>
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
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex-1',
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  formContainer: {
    padding: 16,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 40,
  },
  logoText: {
    color: '#4E2973',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'Satoshi',
  },
  welcomeContainer: {
    flexDirection: 'row',
    maxHeight: 48,
    display: 'flex-1',
  },
  welcomeTextPrimary: {
    fontSize: 24,
    fontWeight: '500',
    color: '#4E2973',
    fontFamily: 'Satoshi',
  },
  welcomeTextSecondary: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Satoshi',
  },
  description: {
    color: '#0F0616',
    fontFamily: 'Satoshi',
    fontSize: 14,
    fontWeight: '400',
    width:'80%',
    lineHeight:20
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F0616',
    fontFamily: 'Satoshi',
  },
  input: {
    borderColor: '#e5e7e6',
    borderWidth: 1,
    height: 50,
    borderRadius: 14,
    fontSize: 14,
    fontWeight: '300',
    marginTop: 14,
    paddingHorizontal: 16,
    color: 'black',
    fontFamily: 'Satoshi',
  },
  errorText: {
    color: 'red',
    fontWeight: '300',
    fontFamily: 'Satoshi',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e7e6',
    borderRadius: 8,
    height: 50,
    marginTop: 14,
    borderRadius: 14,
  },
  passwordInput: {
    flex: 5 / 6,
    paddingHorizontal: 16,
    color: 'black',
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'Satoshi',
  },
  passwordVisibilityToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 6,
  },
  forgotPasswordText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Satoshi',
  },
  loginButton: {
    backgroundColor: '#4E2973',
    paddingVertical: 12,
    borderRadius: 24,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Satoshi',
  },
});

export default LoginForm;
