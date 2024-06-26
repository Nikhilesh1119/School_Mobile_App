import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import colors from '@src/theme/colors';
import {scale} from 'react-native-size-matters';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {axiosClient} from '@src/services/axiosClient';
import {useNavigation} from '@react-navigation/native';
import update from '@src/assets/images/update.gif';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    // navigation.navigate('Home');
    // console.log(values);
    // const res=await axiosClient.post('teacher/auth-update',values)
    // console.log(res);
    setIsLogin(true);
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <View>
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
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>A</Text>
              </View>
              <Text style={styles.logoTitle}>LOGO</Text>
            </View>
            <Formik
              initialValues={{username: '', password: '', confirmPassword: ''}}
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(30),
  },
  logoContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: colors.PURPLE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },
  logoText: {
    color: colors.WHITE,
    fontSize: Size.font_24,
    fontFamily: Fonts.MEDIUM,
  },
  logoTitle: {
    color: colors.PURPLE,
    fontSize: Size.font_24,
    fontFamily: Fonts.BOLD,
  },
  formContainer: {
    marginTop: scale(60),
    width: '100%',
  },
  formTitle: {
    fontSize: Size.font_24,
    fontFamily: Fonts.MEDIUM,
    color: colors.BLACK,
    marginBottom: scale(40),
    marginTop: scale(20),
  },
  inputGroup: {
    marginBottom: scale(20),
  },
  label: {
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
    color: colors.BLACK,
    marginBottom: scale(16),
  },
  input: {
    borderColor: colors.COLOR_12,
    borderWidth: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    fontSize: Size.font_14,
    color: colors.PURPLE,
    fontFamily: Fonts.REGULAR,
  },
  inputWithIcon: {
    borderColor: colors.COLOR_12,
    borderWidth: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    fontSize: Size.font_14,
    color: colors.PURPLE,
    fontFamily: Fonts.REGULAR,
    flex: 1,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordVisibilityToggle: {
    position: 'absolute',
    right: scale(16),
  },
  button: {
    marginTop: scale(40),
    borderRadius: scale(40),
    backgroundColor: colors.PURPLE,
    alignItems: 'center',
    paddingVertical: scale(16),
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
  },
  view1: {
    backgroundColor: '#4e2973',
    display: 'flex',
    maxWidth: 480,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: '0 auto',
  },
  image1: {
    position: 'relative',
    marginTop: 89,
    width: '100%',
    aspectRatio: '1',
  },
  view2: {
    color: '#0F0616',
    fontVariantNumeric: 'lining-nums proportional-nums',
    fontFeatureSettings: "'dlig' on",
    letterSpacing: 0.24,
    alignSelf: 'center',
    marginTop: 4,
    font: '900 24px/83% Satoshi, sans-serif ',
  },
  div1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',
    minHeight: 100,
    padding: 20,
  },
  section1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',
    minHeight: 100,
    padding: 20,
    width: '100%',
    alignSelf: 'stretch',
    flexGrow: '1',
    boxSizing: 'border-box',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
