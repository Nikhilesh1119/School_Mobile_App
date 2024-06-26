import {Fonts, Size, Weight, Colors} from '@src/theme/fonts.js';
import metrics from '@src/theme/metrics';
import {scale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    display: 'flex-1',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: scale(50),
    borderTopRightRadius: scale(50),
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: scale(40),
    width: scale(40),
  },
  logoText: {
    color: Colors.COLOR_7,
    fontSize: Size.font_24,
    marginLeft: scale(8),
    fontFamily: Fonts.BOLD,
  },
  infocontainer: {
    height: '70%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  welcomeContainer: {
    flexDirection: 'row',
    maxHeight: scale(48),
    display: 'flex-1',
  },
  welcomeTextPrimary: {
    fontSize: Size.font_24,
    color: Colors.COLOR_7,
    fontFamily: Fonts.BOLD,
  },
  welcomeTextSecondary: {
    fontSize: Size.font_24,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
  },
  description: {
    color: Colors.COLOR_8,
    fontFamily: Fonts.REGULAR,
    fontSize: Size.font_14,
    lineHeight: scale(20),
  },
  inputLabel: {
    fontSize: Size.font_14,
    color: Colors.COLOR_8,
    fontFamily: Fonts.BOLD,
  },
  input: {
    borderColor: Colors.GRAY,
    borderWidth: 1,
    height: scale(50),
    borderRadius: 14,
    fontSize: Size.font_14,
    marginTop: scale(8),
    paddingHorizontal: scale(16),
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
  },
  errorText: {
    color: Colors.RED,
    fontFamily: Fonts.REGULAR,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.GRAY,
    height: scale(50),
    marginTop: scale(8),
    borderRadius: scale(14),
  },
  passwordInput: {
    flex: 5 / 6,
    paddingHorizontal: scale(16),
    color: Colors.BLACK,
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
  },
  passwordVisibilityToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 / 6,
  },
  forgotPasswordText: {
    color: Colors.BLACK,
    fontSize: Size.font_14,
    textAlign: 'right',
    fontFamily: Fonts.BOLD,
  },
  loginButton: {
    backgroundColor: Colors.COLOR_7,
    paddingVertical: scale(10),
    borderRadius: scale(24),
  },
  loginButtonText: {
    color: Colors.WHITE,
    fontSize: Size.font_18,
    textAlign: 'center',
    fontFamily: Fonts.BOLD,
  },
});
