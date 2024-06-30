import {StyleSheet} from 'react-native';
import colors from '@src/theme/colors';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    flex: 0.5,
  },
  header: {
    marginVertical: scale(20),
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerName: {
    color: colors.WHITE,
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
  },
  profile: {
    alignItems: 'center',
    marginTop: scale(50),
    position: 'absolute',
    width: '100%',
    top: '25%',
    zIndex: 2,
  },
  profileClass: {
    fontSize: 14,
    color: 'black',
    position: 'absolute',
    top: 200,
    zIndex: 2,
    fontFamily: 'Satoshi',
  },
  profileAvatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(100),
  },
  profileName: {
    marginTop: scale(8),
    fontSize: Size.font_24,
    fontWeight: Weight.full,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
    borderRadius: scale(8),
  },
  scrollViewContent: {
    position: 'absolute',
    top: scale(80),
    width: '100%',
  },
  section: {
    paddingTop: scale(10),
  },
  sectionBody: {
    paddingLeft: scale(20),
    backgroundColor: colors.WHITE,
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: colors.WHITE,
    borderRadius: scale(20),
    marginLeft: scale(15),
    marginRight: scale(15),
    shadowOffset: {width: 0, height: scale(2)},
    shadowOpacity: 0.8,
    shadowRadius: scale(3),
    elevation: 5,
    marginBottom: scale(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: scale(16),
    height: scale(40),
  },
  rowWrapper: {
    borderTopWidth: scale(1),
    borderColor: colors.WHITE,
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  rowLabel: {
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
    color: colors.BLACK,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
    color: colors.PURPLE,
    marginRight: scale(4),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align items to the bottom
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    padding: scale(20),
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    elevation: 5,
  },
  modalTitle: {
    fontSize: scale(20),
    fontWeight: '600',
    marginBottom: scale(10),
    textAlign: 'center',
    color: colors.BLACK,
  },
  languageOption: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
  },
  languageText: {
    fontSize: Size.font_16,
    color: colors.PURPLE,
    fontFamily: Fonts.BOLD,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: scale(18),
    paddingVertical: scale(8),
    paddingHorizontal: scale(10),
    borderWidth: scale(1),
    borderColor: colors.LIGHT_GRAY,
    borderRadius: scale(4),
    color: colors.WHITE,
    paddingRight: scale(30), // Ensure the text is never behind the icon
    width: scale(200), // Adjust the width of the picker
  },
  inputAndroid: {
    fontSize: scale(18),
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderWidth: scale(0.5),
    borderRadius: scale(8),
    color: colors.WHITE,
    paddingRight: scale(15), // Ensure the text is never behind the icon
    width: scale(150), // Adjust the width of the picker
  },
  iconContainer: {
    top: scale(12),
    right: scale(12),
  },
});

export default styles;
