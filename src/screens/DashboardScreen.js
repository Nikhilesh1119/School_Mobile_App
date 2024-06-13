import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import DailyChart from '../components/DailyChart';
import WeeklyChart from '../components/WeeklyChart';
import MonthlyChart from '../components/MonthlyChart';
import search from '../assets/images/search.png';
import {AuthContext} from '../context/AuthContext';

const AttendanceDashboard = () => {
  const {ClassName, SectionName} = useContext(AuthContext);

  const [selectedView, setSelectedView] = useState('Daily');
  const handleViewChange = view => {
    setSelectedView(view);
  };

  const renderChart = () => {
    if (selectedView === 'Daily') {
      return <DailyChart />;
    } else if (selectedView === 'Weekly') {
      return <WeeklyChart />;
    } else if (selectedView === 'Monthly') {
      return <MonthlyChart />;
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 py-5 bg-white">
        <View className="flex px-5 flex-row justify-between items-center">
          <Text className="text-2xl font-bold mb-5 text-[#33005B]">
            Attendance
          </Text>
          <Text className="text-xl mb-5 font-bold text-[#a491b7]">
            31 May, 2024
          </Text>
        </View>
        <View className="flex flex-row items-center mx-5 px-2 mb-5 border border-gray-300 bg-gray-100 rounded-xl">
          <Image source={search} className="h-[30] w-[30] text-gray-300" />
          <TextInput
            className="h-[50] px-2.5 text-black w-full"
            placeholder="Search student here"
            placeholderTextColor="#999"
          />
        </View>

        <View className="flex flex-row  justify-between mb-3 mx-5 py-2">
          <Text className="text-xl font-bold mb-1.5 text-[#a491b7]">
            Statistics
          </Text>
          <Text className="text-2xl font-bold mb-1.5 text-[#33005B]">
            {/* 8th - A */}
            {ClassName}-{SectionName}
          </Text>
        </View>

        <View className="flex-row justify-around mb-6 mx-5 bg-gray-100 rounded-xl py-2.5">
          <TouchableOpacity
            className={`py-3 flex justify-center items-center w-[110] rounded-xl ${
              selectedView === 'Daily' ? 'bg-purple-700' : 'bg-gray-400'
            }`}
            onPress={() => handleViewChange('Daily')}>
            <Text className="text-white">Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-3 w-[110] flex justify-center items-center  rounded-xl ${
              selectedView === 'Weekly' ? 'bg-purple-700' : 'bg-gray-400'
            }`}
            onPress={() => handleViewChange('Weekly')}>
            <Text className="text-white">Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-3 w-[110] flex justify-center items-center  rounded-xl ${
              selectedView === 'Monthly' ? 'bg-purple-700' : 'bg-gray-400'
            }`}
            onPress={() => handleViewChange('Monthly')}>
            <Text className="text-white">Monthly</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-2">
          <Text className="text-xl mx-5 font-bold mb-2 text-[#a491b7]">
            {selectedView}, 31 May 2024
          </Text>
          {renderChart()}
        </View>
      </View>
    </ScrollView>
  );
};

export default AttendanceDashboard;
