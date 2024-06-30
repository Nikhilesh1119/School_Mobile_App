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
} from 'react-native';
import DailyChart from '@src/screens/dashboard/components/charts/DailyChart';
import WeeklyChart from '@src/screens/dashboard/components/charts/WeeklyChart';
import MonthlyChart from '@src/screens/dashboard/components/charts/MonthlyChart';
import search from '@src/assets/images/search.png';
import {AuthContext} from '@src/context/AuthContext';
import {Colors} from '@src/theme/fonts';
import user from '@src/assets/images/user.jpg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {axiosClient} from '@src/services/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';

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

  const handleSearch = name => {
    setSearchQuery(name);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      if (name.length > 0) {
        try {
          const res = await axiosClient.get(`/student/search/${name}`);
          setStudentData(res.data.result.students);
          setIsPresent(res.data.result.isPresent);
          const a = await AsyncStorage.getItem('accessToken');
          console.log('a', a);
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
                placeholderTextColor={Colors.LIGHT_PURPLE}
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
                              {student.name}
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

export default AttendanceDashboard;
