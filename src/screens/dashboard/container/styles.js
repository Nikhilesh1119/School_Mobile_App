import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Size, Colors, Fonts} from '@src/theme/fonts';

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: scale(10),
    backgroundColor: Colors.COLOR_6,
  },
  header: {
    paddingHorizontal: scale(20),
  },
  headerTitle: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: Colors.PURPLE,
  },
  headerDate: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: Colors.COLOR_9,
    marginBottom: scale(10),
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(20),
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
    borderWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.GRAYBACK,
    borderRadius: scale(14),
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: Colors.PURPLE,
  },
  searchInput: {
    height: scale(44),
    paddingHorizontal: scale(10),
    color: Colors.PURPLE,
    width: '100%',
    fontSize: Size.font_14,
    fontFamily: Fonts.MEDIUM,
  },
  studentsContainer: {
    paddingHorizontal: scale(10),
    marginVertical: scale(10),
    flex: 1,
  },
  studentsTitle: {
    fontSize: Size.font_24,
    fontFamily: Fonts.BOLD,
    color: Colors.COLOR_10,
  },
  studentsList: {
    marginTop: scale(20),
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.COLOR_11,
    height: scale(88),
    marginVertical: scale(5),
    padding: scale(10),
    borderRadius: scale(10),
  },
  studentImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
  },
  studentName: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  studentDetails: {
    fontSize: Size.font_14,
    fontFamily: Fonts.BOLD,
    color: Colors.GRAY,
  },
  attendanceStatus: {
    height: scale(36),
    paddingHorizontal: scale(10),
    borderRadius: scale(20),
    justifyContent: 'center',
  },
  attendanceText: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
  },
  statisticsHeader: {
    paddingHorizontal: scale(20),
  },
  statisticsTitle: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: Colors.COLOR_9,
  },
  className: {
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD,
    color: Colors.COLOR_10,
    paddingBottom: scale(10),
    borderBottomColor: Colors.GRAYBACK,
    borderBottomWidth: 1,
  },
  viewSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: scale(10),
    backgroundColor: Colors.GRAYBACK,
    borderRadius: scale(16),
    height: scale(50),
  },
  viewSelectorButton: {
    width: scale(100),
    height: scale(32),
    marginVertical: scale(8),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedView: {
    backgroundColor: Colors.COLOR_7,
  },
  unselectedView: {
    backgroundColor: Colors.GRAYBACK,
  },
  viewSelectorText: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  viewUnSelectorText: {
    color: Colors.COLOR_9,
    fontFamily: Fonts.BOLD,
  },
  chartContainer: {
    paddingHorizontal: scale(10),
  },
  chartTitle: {
    fontSize: Size.font_18,
    fontFamily: Fonts.BOLD,
    color: Colors.COLOR_9,
  },
});
