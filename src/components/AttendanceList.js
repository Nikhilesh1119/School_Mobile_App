// AttendanceList.js
import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import user from '../assets/images/user.jpg';
import {axiosClient} from '../services/axiosClient';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import Navigation from '../navigation/Navigation';

export default function AttendanceList({
  present,
  absent,
  handleToggleAttendance,
  reAttendance,
  setStartAttendance,
  setAttendanceStarted,
}) {
  const {height} = Dimensions.get('window');
  const navigation = useNavigation();
  const handleSaveAndProceed = async () => {
    try {
      setStartAttendance(false);
      setAttendanceStarted(false);
      if (present.length > 0 || absent.length > 0) {
        const res = await axiosClient.post(
          `/attendance/mark-attendance/${SectionId}`,
          {present, absent},
        );
        ToastAndroid.show(res.data.result, ToastAndroid.LONG);
        // console.log('Attendance marked:', res.data);
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
            <Text
              className="text-black text-2xl"
              style={{
                fontFamily: 'Satoshi',
              }}>
              Absent's
            </Text>
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
                    <Text
                      className="text-black text-xl mx-2"
                      style={{
                        fontFamily: 'Satoshi',
                      }}>
                      {st.firstname}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToggleAttendance(st, false)}
                    className="mr-3 bg-[#f6d2c9] h-9 px-2 rounded-2xl">
                    <Text
                      className="text-xl text-[#f84914]"
                      style={{
                        fontFamily: 'Satoshi',
                      }}>
                      Mark Present
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        {present.length > 0 && (
          <View className="mx-5 my-7">
            <Text
              className="text-black text-2xl"
              style={{
                fontFamily: 'Satoshi',
              }}>
              Present's
            </Text>
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
                    <Text
                      className="text-black text-xl mx-2"
                      style={{
                        fontFamily: 'Satoshi',
                      }}>
                      {st.firstname}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToggleAttendance(st, true)}
                    className="mr-3 bg-[#cde9e8] h-9 px-2 rounded-2xl">
                    <Text
                      className="text-xl text-[#41c3b8]"
                      style={{
                        fontFamily: 'Satoshi',
                      }}>
                      Mark Absent
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={reAttendance}
          className="flex justify-center items-center h-[50] mb-2 rounded-3xl mx-3 bg-[#4e2973]">
          <Text
            className="text-white text-lg font-medium"
            style={{
              fontFamily: 'Satoshi',
            }}>
            Re-evaluate Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSaveAndProceed}
          className="flex justify-center items-center h-[50] rounded-3xl mx-3 bg-[#4e2973]">
          <Text
            className="text-white text-lg font-medium"
            style={{
              fontFamily: 'Satoshi',
            }}>
            Save and proceed
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
