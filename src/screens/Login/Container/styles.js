import {StyleSheet} from 'react-native';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: scale(0),
    left: scale(0),
    bottom: scale(0),
    right: scale(0),
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: scale(50),
  },
  swipeContainer: {
    alignItems: 'center',
    marginBottom: scale(20),
    padding: scale(10),
    borderRadius: scale(5),
  },
  swipeText: {
    alignSelf: 'center',
    color: Colors.WHITE,
    fontSize: scale(20),
    fontFamily: Fonts.MEDIUM,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  header: {
    position: 'absolute',
    top: scale(50),
    width: '100%',
    alignItems: 'center',
  },
  logoText2: {
    color: Colors.WHITE,
    fontSize: Size.font_40,
    top: scale(10),
    fontFamily: Fonts.BOLD,
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: Size.font_24,
    top: scale(10),
    fontFamily: Fonts.MEDIUM,
    marginTop: scale(10),
  },
  subHeaderText: {
    color: Colors.WHITE,
    fontSize: Size.font_24,
    top: scale(8),
    fontFamily: Fonts.MEDIUM,
  },
});
