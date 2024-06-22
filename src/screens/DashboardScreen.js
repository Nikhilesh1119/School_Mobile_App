// import React, {useContext, useMemo, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import DailyChart from '../components/DailyChart';
// import WeeklyChart from '../components/WeeklyChart';
// import MonthlyChart from '../components/MonthlyChart';
// import search from '../assets/images/search.png';
// import {AuthContext} from '../context/AuthContext';
// import BottomSheet from '@gorhom/bottom-sheet';
// import StudentInfo from '../components/StudentInfo';

// import user from '../assets/images/user.jpg';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {axiosClient} from '../services/axiosClient';

// const AttendanceDashboard = () => {
//   const {ClassName, SectionName, SectionId} = useContext(AuthContext);

//   const bottomSheetRef = useRef(null);
//   const snapPoints = useMemo(() => ['80%'], []);

//   const handleOpenPress = student => {
//     setStudentInfo(student);
//     bottomSheetRef.current?.expand();
//   };

//   const [searchInput, setSearchInput] = useState(false);
//   const [selectedView, setSelectedView] = useState('Daily');
//   const [StudentData, setStudentData] = useState([]);
//   const [isPresent, setIsPresent] = useState([]);

//   const debounceTimeoutRef = useRef(null);

//   const [searchQuery, setSearchQuery] = useState('');
//   const handleViewChange = view => {
//     setSelectedView(view);
//   };

//   const currentDate = new Date();
//   const day = currentDate.getDate();
//   const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//   const month = monthNames[currentDate.getMonth()];
//   const year = currentDate.getFullYear();

//   const renderChart = () => {
//     if (selectedView === 'Daily') {
//       return <DailyChart />;
//     } else if (selectedView === 'Weekly') {
//       return <WeeklyChart />;
//     } else if (selectedView === 'Monthly') {
//       return <MonthlyChart />;
//     }
//   };

//   const handleSearch = firstname => {
//     setSearchQuery(firstname);
//     if (debounceTimeoutRef.current) {
//       clearTimeout(debounceTimeoutRef.current);
//     }
//     debounceTimeoutRef.current = setTimeout(async () => {
//       if (firstname.length > 0) {
//         try {
//           const res = await axiosClient.get(
//             `/student/search-student/${SectionId}/${firstname}`,
//           );
//           setStudentData(res.data.result.students);
//           setIsPresent(res.data.result.isPresent);
//         } catch (error) {
//           console.error('Error fetching search results:', error);
//         }
//       } else {
//         setStudentData([]);
//         setIsPresent([]);
//       }
//     }, 1000);
//   };

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <TouchableWithoutFeedback
//         onPress={() => {
//           Keyboard.dismiss();
//           setSearchInput(false);
//         }}>
//         <ScrollView>
//           <View className="flex-1 py-5 bg-white">
//             <View className="flex px-5 flex-row justify-between items-center">
//               <Text
//                 className="text-2xl font-black mb-5 text-[#33005B]"
//                 style={{fontFamily: 'Satoshi'}}>
//                 Attendance
//               </Text>
//               <Text
//                 className="text-xl mb-5 font-black text-[#a491b7]"
//                 style={{fontFamily: 'Satoshi'}}>
//                 {day} {month} {year}
//               </Text>
//             </View>
//             <View className="flex flex-row justify-between items-center mx-5 px-2 mb-5 border border-gray-300 bg-gray-100 rounded-xl">
//               {/* <View className="flex flex-row justify-center items-center"> */}
//               <Image source={search} className="h-[30] w-[30] text-gray-300" />
//               <TextInput
//                 onPress={() => setSearchInput(true)}
//                 className="h-[50] px-2.5 text-black w-full text-sm font-medium"
//                 placeholder="Search student here"
//                 placeholderTextColor="#999"
//                 value={searchQuery}
//                 onChangeText={handleSearch}
//                 style={{fontFamily: 'Satoshi'}}
//               />
//               {/* </View> */}
//               {/* <TouchableOpacity
//                 onPress={handleSearch}
//                 className="bg-white px-2.5 h-10 w-20 flex justify-center items-center border border-gray-300 rounded-lg">
//                 <Text className="text-black">Done</Text>
//               </TouchableOpacity> */}
//             </View>
//             {searchQuery ? (
//               <View className="px-3 my-3 h-full">
//                 <Text className="text-[#33005B] text-2xl font-bold">
//                   Students
//                 </Text>
//                 <View className="my-6">
//                   {StudentData.map((student, index) => {
//                     return (
//                       <View key={index}>
//                         <View
//                           onPress={() => handleOpenPress(student)}
//                           className="flex flex-row justify-around items-center bg-slate-50 h-[88] my-2">
//                           <Image
//                             // source={user}
//                             source={student.image || user}
//                             style={{
//                               width: 40,
//                               height: 40,
//                               borderRadius: 30,
//                             }}
//                           />
//                           <View>
//                             <Text className="text-black text-xl">
//                               {student.firstname}
//                             </Text>
//                             <Text className="text-gray-400 text-sm">
//                               {student.rollNumber}
//                             </Text>
//                             <Text className="text-gray-400 text-sm">
//                               {student.phone}
//                             </Text>
//                           </View>
//                           <View
//                             className={`bg-[${
//                               isPresent[index] ? '#cde9e8' : '#f6d2c9'
//                             }] h-9 px-3 rounded-2xl`}>
//                             <Text
//                               className={`text-xl ${
//                                 isPresent[index]
//                                   ? 'text-[#41c3b8]'
//                                   : 'text-[#f84914]'
//                               }`}>
//                               {isPresent[index] ? 'Present' : 'Absent'}
//                             </Text>
//                           </View>
//                         </View>
//                       </View>
//                     );
//                   })}
//                 </View>
//                 {/* <BottomSheet
//                   ref={bottomSheetRef}
//                   index={0}
//                   snapPoints={snapPoints}
//                   enablePanDownToClose={true}
//                   backgroundStyle={{borderRadius: 50}}>
//                   <View>
//                     <StudentInfo />
//                   </View>
//                 </BottomSheet> */}
//               </View>
//             ) : (
//               <>
//                 <View className="flex flex-row  justify-between mb-3 mx-5 py-2">
//                   <Text className="text-xl font-bold mb-1.5 text-[#a491b7]" style={{fontFamily:'Satoshi'}}>
//                     Statistics
//                   </Text>
//                   <Text className="text-2xl font-bold mb-1.5 text-[#33005B]" style={{fontFamily:'Satoshi'}}>
//                     {ClassName}-{SectionName}
//                   </Text>
//                 </View>

//                 <View className="flex-row justify-around mb-6 mx-5 bg-gray-100 rounded-xl py-2.5">
//                   <TouchableOpacity
//                     className={`py-3 flex justify-center items-center w-[110] rounded-xl ${
//                       selectedView === 'Daily' ? 'bg-purple-700' : 'bg-gray-400'
//                     }`}
//                     onPress={() => handleViewChange('Daily')}>
//                     <Text className="text-white" style={{fontFamily:'Satoshi'}}>Daily</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     className={`py-3 w-[110] flex justify-center items-center  rounded-xl ${
//                       selectedView === 'Weekly'
//                         ? 'bg-purple-700'
//                         : 'bg-gray-400'
//                     }`}
//                     onPress={() => handleViewChange('Weekly')}>
//                     <Text className="text-white" style={{fontFamily:'Satoshi'}}>Weekly</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     className={`py-3 w-[110] flex justify-center items-center  rounded-xl ${
//                       selectedView === 'Monthly'
//                         ? 'bg-purple-700'
//                         : 'bg-gray-400'
//                     }`}
//                     onPress={() => handleViewChange('Monthly')}>
//                     <Text className="text-white" style={{fontFamily:'Satoshi'}}>Monthly</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View className="mx-2">
//                   <Text className="text-xl mx-5 font-bold mb-2 text-[#a491b7]" style={{fontFamily:'Satoshi'}}>
//                     {selectedView}, {day} {month} {year}
//                   </Text>
//                   {renderChart()}
//                 </View>
//               </>
//             )}
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </GestureHandlerRootView>
//   );
// };

// export default AttendanceDashboard;

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
                {day} {month} {year}
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
                    <Text style={styles.viewSelectorText}>Daily</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.viewSelectorButton,
                      selectedView === 'Weekly'
                        ? styles.selectedView
                        : styles.unselectedView,
                    ]}
                    onPress={() => handleViewChange('Weekly')}>
                    <Text style={styles.viewSelectorText}>Weekly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.viewSelectorButton,
                      selectedView === 'Monthly'
                        ? styles.selectedView
                        : styles.unselectedView,
                    ]}
                    onPress={() => handleViewChange('Monthly')}>
                    <Text style={styles.viewSelectorText}>Monthly</Text>
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
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Satoshi',
    fontWeight: '900',
    color: '#33005B',
    marginBottom: 20,
  },
  headerDate: {
    fontSize: 20,
    fontFamily: 'Satoshi',
    color: '#a491b7',
    marginBottom: 20,
    fontWeight: '900',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  searchIcon: {
    width: 30,
    height: 30,
    tintColor: '#ccc',
  },
  searchInput: {
    height: 50,
    paddingHorizontal: 10,
    color: 'black',
    width: '100%',
    fontSize: 14,
    fontFamily: 'Satoshi',
  },
  studentsContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },
  studentsTitle: {
    fontSize: 24,
    fontFamily: 'Satoshi',
    color: '#33005B',
    fontWeight: 'bold',
  },
  studentsList: {
    marginTop: 20,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    height: 88,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  studentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  studentName: {
    fontSize: 20,
    fontFamily: 'Satoshi',
    color: 'black',
  },
  studentDetails: {
    fontSize: 14,
    fontFamily: 'Satoshi',
    color: 'gray',
  },
  attendanceStatus: {
    height: 36,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  attendanceText: {
    fontSize: 20,
    fontFamily: 'Satoshi',
  },
  statisticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statisticsTitle: {
    fontSize: 20,
    fontFamily: 'Satoshi',
    color: '#a491b7',
    fontWeight: '900',
  },
  className: {
    fontSize: 22,
    fontFamily: 'Satoshi',
    color: '#33005B',
    fontWeight: '900',
  },
  viewSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    height:60,
  },
  viewSelectorButton: {
    width: 120,
    height: 40,
    marginVertical: 10,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedView: {
    backgroundColor: '#4e2973',
  },
  unselectedView: {
    backgroundColor: '#ccc',
  },
  viewSelectorText: {
    color: 'white',
    fontFamily: 'Satoshi',
  },
  chartContainer: {
    paddingHorizontal: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Satoshi',
    color: '#a491b7',
    marginBottom: 10,
    fontWeight: '900',
  },
});

export default AttendanceDashboard;
