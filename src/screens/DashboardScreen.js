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
import DailyChart from '../components/DailyChart';
import WeeklyChart from '../components/WeeklyChart';
import MonthlyChart from '../components/MonthlyChart';
import search from '../assets/images/search.png';
import {AuthContext} from '../context/AuthContext';
import BottomSheet from '@gorhom/bottom-sheet';
import StudentInfo from '../components/StudentInfo';

import user from '../assets/images/user.jpg';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {axiosClient} from '../services/axiosClient';

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
    <GestureHandlerRootView style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setSearchInput(false);
        }}>
        <ScrollView>
          <View className="flex-1 py-5 bg-white">
            <View className="flex px-5 flex-row justify-between items-center">
              <Text
                className="text-2xl font-black mb-5 text-[#33005B]"
                style={{fontFamily: 'Satoshi'}}>
                Attendance
              </Text>
              <Text
                className="text-xl mb-5 font-black text-[#a491b7]"
                style={{fontFamily: 'Satoshi'}}>
                {day} {month} {year}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center mx-5 px-2 mb-5 border border-gray-300 bg-gray-100 rounded-xl">
              {/* <View className="flex flex-row justify-center items-center"> */}
              <Image source={search} className="h-[30] w-[30] text-gray-300" />
              <TextInput
                onPress={() => setSearchInput(true)}
                className="h-[50] px-2.5 text-black w-full text-sm font-medium"
                placeholder="Search student here"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={handleSearch}
                style={{fontFamily: 'Satoshi'}}
              />
              {/* </View> */}
              {/* <TouchableOpacity
                onPress={handleSearch}
                className="bg-white px-2.5 h-10 w-20 flex justify-center items-center border border-gray-300 rounded-lg">
                <Text className="text-black">Done</Text>
              </TouchableOpacity> */}
            </View>
            {searchQuery ? (
              <View className="px-3 my-3 h-full">
                <Text className="text-[#33005B] text-2xl font-bold">
                  Students
                </Text>
                <View className="my-6">
                  {StudentData.map((student, index) => {
                    return (
                      <View key={index}>
                        <View
                          onPress={() => handleOpenPress(student)}
                          className="flex flex-row justify-around items-center bg-slate-50 h-[88] my-2">
                          <Image
                            // source={user}
                            source={student.image || user}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 30,
                            }}
                          />
                          <View>
                            <Text className="text-black text-xl">
                              {student.firstname}
                            </Text>
                            <Text className="text-gray-400 text-sm">
                              {student.rollNumber}
                            </Text>
                            <Text className="text-gray-400 text-sm">
                              {student.phone}
                            </Text>
                          </View>
                          <View
                            className={`bg-[${
                              isPresent[index] ? '#cde9e8' : '#f6d2c9'
                            }] h-9 px-3 rounded-2xl`}>
                            <Text
                              className={`text-xl ${
                                isPresent[index]
                                  ? 'text-[#41c3b8]'
                                  : 'text-[#f84914]'
                              }`}>
                              {isPresent[index] ? 'Present' : 'Absent'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
                {/* <BottomSheet
                  ref={bottomSheetRef}
                  index={0}
                  snapPoints={snapPoints}
                  enablePanDownToClose={true}
                  backgroundStyle={{borderRadius: 50}}>
                  <View>
                    <StudentInfo />
                  </View>
                </BottomSheet> */}
              </View>
            ) : (
              <>
                <View className="flex flex-row  justify-between mb-3 mx-5 py-2">
                  <Text className="text-xl font-bold mb-1.5 text-[#a491b7]" style={{fontFamily:'Satoshi'}}>
                    Statistics
                  </Text>
                  <Text className="text-2xl font-bold mb-1.5 text-[#33005B]" style={{fontFamily:'Satoshi'}}>
                    {ClassName}-{SectionName}
                  </Text>
                </View>

                <View className="flex-row justify-around mb-6 mx-5 bg-gray-100 rounded-xl py-2.5">
                  <TouchableOpacity
                    className={`py-3 flex justify-center items-center w-[110] rounded-xl ${
                      selectedView === 'Daily' ? 'bg-purple-700' : 'bg-gray-400'
                    }`}
                    onPress={() => handleViewChange('Daily')}>
                    <Text className="text-white" style={{fontFamily:'Satoshi'}}>Daily</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`py-3 w-[110] flex justify-center items-center  rounded-xl ${
                      selectedView === 'Weekly'
                        ? 'bg-purple-700'
                        : 'bg-gray-400'
                    }`}
                    onPress={() => handleViewChange('Weekly')}>
                    <Text className="text-white" style={{fontFamily:'Satoshi'}}>Weekly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`py-3 w-[110] flex justify-center items-center  rounded-xl ${
                      selectedView === 'Monthly'
                        ? 'bg-purple-700'
                        : 'bg-gray-400'
                    }`}
                    onPress={() => handleViewChange('Monthly')}>
                    <Text className="text-white" style={{fontFamily:'Satoshi'}}>Monthly</Text>
                  </TouchableOpacity>
                </View>
                <View className="mx-2">
                  <Text className="text-xl mx-5 font-bold mb-2 text-[#a491b7]" style={{fontFamily:'Satoshi'}}>
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
