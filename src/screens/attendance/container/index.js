import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AttendancePage from '@src/screens/attendance/components/attendancePage/index.js';
import AttendanceCompleted from '@src/screens/attendance/components/completed/index.js';
import {axiosClient} from '@src/services/axiosClient';
import {AuthContext} from '@src/context/AuthContext';

export default function AttendanceScreen({setAttendanceStarted}) {
  const [isTodayAttendance, setIsTodayAttendance] = useState();
  const {SectionId} = useContext(AuthContext);

  const getTodayAttendance = async () => {
    try {
      const res = await axiosClient.get(
        `attendance/check-attendance-marked/${SectionId}`,
      );
      // console.log(res.data);
      if (res.data.result) {
        setIsTodayAttendance(false);
      } else {
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
