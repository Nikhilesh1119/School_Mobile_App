import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import search from '../assets/images/search.png';

const AttendanceDashboard = () => {
  const [selectedView, setSelectedView] = useState('Daily');
  const [totalStudents, setTotalStudents] = useState(50);
  const [presentStudents, setPresentStudents] = useState(40);

  const pieData = [
    {
      value: 50,
      color: '#4c39a9',
      focused: true,
      gradientCenterColor: '#4e2973',
    },
    {value: 10, color: '#d91111', gradientCenterColor: '#ffffff'},
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const handleViewChange = view => {
    setSelectedView(view);
  };

  const data = [
    {
      name: 'Present',
      population: presentStudents,
      color: '#663399',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Absent',
      population: totalStudents - presentStudents,
      color: 'red',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
  ];

  const screenWidth = Dimensions.get('window').width;

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}>
            {renderDot('#4c39a9')}
            <Text style={{color: 'black'}}>{presentStudents} Present</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#d91111')}
            <Text style={{color: 'black'}}>
              {totalStudents - presentStudents} Absent
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView>
      <View className="flex-1 p-5 bg-white">
        <Text className="text-2xl font-bold mb-2.5 text-[#33005B]">
          Attendance
        </Text>
        <Text className="text-xl mb-5 font-bold text-[#a491b7]">
          31 May, 2024
        </Text>
        <View className="flex flex-row items-center px-2 mb-5 border border-gray-300 bg-gray-100 rounded-xl">
          <Image source={search} className="h-[30] w-[30] text-gray-300" />
          <TextInput
            className="h-[50] px-2.5 text-black w-full"
            placeholder="Search student here"
            placeholderTextColor="#999"
          />
        </View>

        <View className="mb-6">
          <Text className="text-xl font-bold mb-1.5 text-[#a491b7]">
            Statistics
          </Text>
          <Text className="text-2xl font-bold mb-1.5 text-[#33005B]">
            8th - A
          </Text>
        </View>

        <View className="flex-row justify-around mb-6 bg-gray-100 rounded-xl py-2.5">
          <TouchableOpacity
            className={` py-3 flex justify-center items-center w-[110] rounded-xl ${
              selectedView === 'Daily' ? 'bg-purple-700' : 'bg-gray-400'
            }`}
            onPress={() => handleViewChange('Daily')}>
            <Text className="text-white">Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={` py-3 w-[110] flex justify-center items-center  rounded-xl ${
              selectedView === 'Weekly' ? 'bg-purple-700' : 'bg-gray-400'
            }`}
            onPress={() => handleViewChange('Weekly')}>
            <Text className="text-white">Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={` py-3 w-[110] flex justify-center items-center  rounded-xl ${
              selectedView === 'Monthly' ? 'bg-purple-700' : 'bg-gray-400'
            }`}
            onPress={() => handleViewChange('Monthly')}>
            <Text className="text-white">Monthly</Text>
          </TouchableOpacity>
        </View>

        <View className=" ml-2.5">
          <Text className="text-xl font-bold mb-2 text-[#a491b7]">
            Wed, 31 May 2024
          </Text>
          <View style={{padding: 20, alignItems: 'center'}}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={150}
              innerRadius={110}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text className="text-[#a491b7] text-lg font-bold">
                      Total Students
                    </Text>
                    <Text className="mt-2 text-black text-5xl font-bold">
                      {totalStudents}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {renderLegendComponent()}
        </View>
      </View>
    </ScrollView>
  );
};

export default AttendanceDashboard;
