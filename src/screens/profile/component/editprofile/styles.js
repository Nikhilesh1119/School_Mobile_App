import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';

import {scale} from 'react-native-size-matters';
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: scale(20),
    marginHorizontal: 'auto',
    width: '100%',
    backgroundColor: colors.OFF_WHITE,
    maxWidth: scale(480),
    borderRadius: scale(32),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    width: '100%',
  },
  section: {
    flexDirection: 'column',
    paddingHorizontal: scale(16),
    marginTop: scale(10),
    width: '100%',
    fontSize: scale(24),
    fontFamily: Fonts.BOLD,
    lineHeight: scale(28),
    color: colors.BLACK,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
    marginTop: scale(15),
  },
  backIcon: {
    width: scale(25),
    height: scale(25),
    marginRight: scale(10),
  },
  titleText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: Size.font_24,
    color: colors.BLACK,
    fontFamily: Fonts.BOLD,
  },
  sectionHeader: {
    marginTop: scale(32),
    marginBottom: scale(4),
    fontSize: Size.font_16,
    color: colors.BLACK,
    fontFamily: Fonts.MEDIUM,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    // paddingVertical: scale(4),
    marginTop: scale(5),
    fontSize: scale(16),
    lineHeight: scale(28),
    backgroundColor: colors.WHITE,
    borderRadius: scale(5),
    borderWidth: scale(0.25),
    borderOpacity: 0.5,
    opacity: 0.6,
  },
  inputText: {
    flex: 1,
    fontSize: Size.font_15,
    fontFamily: Fonts.MEDIUM,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    color: 'gray',
  },
  genderText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdownIcon: {
    aspectRatio: 0.85,
    width: scale(18),
  },
  flexGrow: {
    flex: 1,
    textAlign: 'center',
  },
  editIcon: {
    width: scale(24),
    aspectRatio: 1,
  },
  addIcon: {
    alignSelf: 'flex-end',
    marginRight: scale(40),
    aspectRatio: 0.85,
    width: scale(18),
  },
  updateButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingVertical: scale(10),
    marginTop: scale(40),
    backgroundColor: colors.PURPLE,
    borderRadius: scale(40),
    textAlign: 'center',
  },
  updateButtonText: {
    color: colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_20,
  },
});

export default styles;
