import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import DailyChart from '@src/components/DailyChart';
import WeeklyChart from '@src/components/WeeklyChart';
import MonthlyChart from '@src/components/MonthlyChart';
import search from '@src/assets/images/search.png';
import {AuthContext} from '@src/context/AuthContext';
import BottomSheet from '@gorhom/bottom-sheet';
import StudentInfo from '@src/components/StudentInfo';
import {scale} from 'react-native-size-matters';
import {Size, Weight, Colors, Fonts} from '../theme/fonts';
import user from '@src/assets/images/user.jpg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {axiosClient} from '@src/services/axiosClient';

const AttendanceDashboard = () => {
  const {ClassName, SectionName, SectionId} = useContext(AuthContext);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['80%'], []);

  const handleOpenPress = student => {
    setStudentInfo(student);
    bottomSheetRef.current?.expand();
  };

  const [searchInput, setSearchInput] = useState(false);
  const [selectedView, setSelectedView] = useState('Daily');
  const [StudentData, setStudentData] = useState([]);
  const [isPresent, setIsPresent] = useState([]);

  const debounceTimeoutRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const handleViewChange = view => {
    setSelectedView(view);
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const renderChart = () => {
    if (selectedView === 'Daily') {
      return <DailyChart />;
    } else if (selectedView === 'Weekly') {
      return <WeeklyChart />;
    } else if (selectedView === 'Monthly') {
      return <MonthlyChart />;
    }
  };

  const handleSearch = firstname => {
    setSearchQuery(firstname);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      if (firstname.length > 0) {
        try {
          const res = await axiosClient.get(
            `/student/search-student/${SectionId}/${firstname}`,
          );
          setStudentData(res.data.result.students);
          setIsPresent(res.data.result.isPresent);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setStudentData([]);
        setIsPresent([]);
      }
    }, 1000);
  };

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setSearchInput(false);
        }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Attendance</Text>
              <Text style={styles.headerDate}>
                {day} {month}, {year}
              </Text>
            </View>
            <View style={styles.searchContainer}>
              <Image source={search} style={styles.searchIcon} />
              <TextInput
                onPress={() => setSearchInput(true)}
                style={styles.searchInput}
                placeholder="Search student here"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            {searchQuery ? (
              <View style={styles.studentsContainer}>
                <Text style={styles.studentsTitle}>Students</Text>
                <View style={styles.studentsList}>
                  {StudentData.map((student, index) => {
                    return (
                      <View key={index}>
                        <View
                          onPress={() => handleOpenPress(student)}
                          style={styles.studentItem}>
                          <Image
                            source={student.image || user}
                            style={styles.studentImage}
                          />
                          <View>
                            <Text style={styles.studentName}>
                              {student.firstname}
                            </Text>
                            <Text style={styles.studentDetails}>
                              {student.rollNumber}
                            </Text>
                            <Text style={styles.studentDetails}>
                              {student.phone}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.attendanceStatus,
                              {
                                backgroundColor: isPresent[index]
                                  ? '#cde9e8'
                                  : '#f6d2c9',
                              },
                            ]}>
                            <Text
                              style={[
                                styles.attendanceText,
                                {
                                  color: isPresent[index]
                                    ? '#41c3b8'
                                    : '#f84914',
                                },
                              ]}>
                              {isPresent[index] ? 'Present' : 'Absent'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : (
              <>
                <View style={styles.statisticsHeader}>
                  <Text style={styles.statisticsTitle}>Statistics</Text>
                  <Text style={styles.className}>
                    {ClassName}-{SectionName}
                  </Text>
                </View>

                <View style={styles.viewSelectorContainer}>
                  <TouchableOpacity
                    style={[
                      styles.viewSelectorButton,
                      selectedView === 'Daily'
                        ? styles.selectedView
                        : styles.unselectedView,
                    ]}
                    onPress={() => handleViewChange('Daily')}>
                    <Text
                      style={
                        selectedView === 'Daily'
                          ? styles.viewSelectorText
                          : styles.viewUnSelectorText
                      }>
                      Daily
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.viewSelectorButton,
                      selectedView === 'Weekly'
                        ? styles.selectedView
                        : styles.unselectedView,
                    ]}
                    onPress={() => handleViewChange('Weekly')}>
                    <Text
                      style={
                        selectedView === 'Weekly'
                          ? styles.viewSelectorText
                          : styles.viewUnSelectorText
                      }>
                      Weekly
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.viewSelectorButton,
                      selectedView === 'Monthly'
                        ? styles.selectedView
                        : styles.unselectedView,
                    ]}
                    onPress={() => handleViewChange('Monthly')}>
                    <Text
                      style={
                        selectedView === 'Monthly'
                          ? styles.viewSelectorText
                          : styles.viewUnSelectorText
                      }>
                      Monthly
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.chartContainer}>
                  <Text style={styles.chartTitle}>
                    {selectedView}, {day} {month} {year}
                  </Text>
                  {renderChart()}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: scale(20),
    backgroundColor: Colors.WHITE,
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
    marginBottom: scale(20),
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(20),
    paddingHorizontal: scale(10),
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.GRAYBACK,
    borderRadius: scale(20),
  },
  searchIcon: {
    width: scale(30),
    height: scale(30),
    tintColor: Colors.BORDER,
  },
  searchInput: {
    height: scale(44),
    paddingHorizontal: scale(10),
    color: Colors.BLACK,
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
    marginBottom: scale(20),
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
    borderBottomColor: Colors.PURPLE,
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
    marginBottom: scale(10),
  },
});

export default AttendanceDashboard;
