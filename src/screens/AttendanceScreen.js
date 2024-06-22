import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AttendancePage from '../components/AttendancePage';
import AttendanceCompleted from '../components/AttendanceCompleted';
import {axiosClient} from '../services/axiosClient';
import {AuthContext} from '../context/AuthContext';

export default function AttendanceScreen({setAttendanceStarted}) {
  const [isTodayAttendance, setIsTodayAttendance] = useState();
  const {SectionId} = useContext(AuthContext);

  const getTodayAttendance = async () => {
    try {
      const res = await axiosClient.get(
        `attendance/check-attendance-marked/${SectionId}`,
      );
      if (res.data.result) {
        // console.log(res.data.result);
        setIsTodayAttendance(false);
      } else {
        // console.log(res.data.message);
        setIsTodayAttendance(true);
      }
    } catch (error) {
      //   console.log(error);
    }
  };

  useEffect(() => {
    getTodayAttendance();
  });

  return (
    <View>
      {isTodayAttendance ? (
        <AttendanceCompleted />
      ) : (
        <AttendancePage setAttendanceStarted={setAttendanceStarted} />
      )}
    </View>
  );
}
