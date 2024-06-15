// AttendanceList.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import user from '../assets/images/user.jpg';
import { axiosClient } from '../services/axiosClient';
import { AuthContext } from '../context/AuthContext';

export default function AttendanceList({
  present,
  absent,
  handleToggleAttendance,
  reAttendance,
}) {
  const {height} = Dimensions.get('window');

  const handleSaveAndProceed = async () => {
    try {
      console.log(present, absent);
      if (present.length > 0 || absent.length > 0) {
        const res = await axiosClient.post(
          `/attendance/mark-attendance/${SectionId}`,
          {present, absent},
        );
        console.log('Attendance marked:', res.data);
      } else {
        console.log(`can't mark Attendance`);
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  
  const {SectionId} = useContext(AuthContext);

  return (
    <View style={{height: height - 90}}>
      <ScrollView>
        {absent.length > 0 && (
          <View className="flex mx-5 my-7">
            <Text className="text-black text-2xl">Absent's</Text>
            <View className="flex flex-col justify-between mt-5 py-2 bg-gray-50 rounded-3xl">
              {absent.map((st, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between py-3 border border-y-white border-x-transparent">
                  <View className="flex flex-row">
                    <Image
                      source={st.image || user}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                      }}
                    />
                    <Text className="text-black text-xl mx-2">
                      {st.firstname}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToggleAttendance(st, false)}
                    className="mr-3 bg-[#f6d2c9] h-9 px-2 rounded-2xl">
                    <Text className="text-xl text-[#f84914]">Mark Present</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        {present.length > 0 && (
          <View className="mx-5 my-7">
            <Text className="text-black text-2xl">Present's</Text>
            <View className="flex flex-col justify-between mt-5 py-2 bg-gray-50 rounded-3xl">
              {present.map((st, index) => (
                <View
                  key={index}
                  className="flex flex-row justify-between py-3 border border-y-white border-x-transparent">
                  <View className="flex flex-row">
                    <Image
                      source={st.image || user}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                      }}
                    />
                    <Text className="text-black text-xl mx-2">
                      {st.firstname}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToggleAttendance(st, true)}
                    className="mr-3 bg-[#cde9e8] h-9 px-2 rounded-2xl">
                    <Text className="text-xl text-[#41c3b8]">Mark Absent</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={reAttendance}
          className="flex justify-center items-center h-[50] mb-2 rounded-3xl mx-3 bg-[#4e2973]">
          <Text className="text-white text-lg font-medium">
            Re-evaluate Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSaveAndProceed}
          className="flex justify-center items-center h-[50] rounded-3xl mx-3 bg-[#4e2973]">
          <Text className="text-white text-lg font-medium">
            Save and proceed
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
