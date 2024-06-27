import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {axiosClient} from '../services/axiosClient';
import {AuthContext} from '../context/AuthContext';
import {Fonts, Size} from '../theme/fonts';

const DailyChart = () => {
  const {SectionId} = useContext(AuthContext);

  const [totalStudents, setTotalStudents] = useState();
  const [presentStudents, setPresentStudents] = useState();
  const [absentStudents, setAbsentStudents] = useState();

  const dailyData = [
    {
      value: (presentStudents / totalStudents) * 100,
      color: presentStudents === 0 && absentStudents === 0 ? 'gray' : '#4c39a9',
      focused: true,
      gradientCenterColor: '#4e2973',
    },
    {
      value: ((totalStudents - presentStudents) / totalStudents) * 100,
      color: presentStudents === 0 && absentStudents === 0 ? 'gray' : '#d91111',
      gradientCenterColor: '#ffffff',
    },
  ];

  const getDailyAttendance = async () => {
    const res = await axiosClient.get(`/attendance/daily-status/${SectionId}`);
    // console.log(res.data);
    setTotalStudents(res.data.result.totalStudentCount);
    setPresentStudents(res.data.result.presentStudentCount);
    setAbsentStudents(res.data.result.absentStudentCount);
  };

  useEffect(() => {
    getDailyAttendance();
  }, []);

  return (
    <View style={{paddingTop: 38,paddingBottom: 24,  alignItems: 'center'}}>
      <View
        style={{
          height: 35,
          width: 97,
          borderRadius: 13,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'black',
          width: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
          right: 20,
          top: 10,
        }}>
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 10,
            backgroundColor: '#D91111',
            marginRight: 10,
          }}
        />
        <Text style={{color: '#fff', fontFamily: 'Satoshi'}}>
          {absentStudents} Absent
        </Text>
      </View>
      <PieChart
        data={dailyData}
        donut
        showGradient
        sectionAutoFocus
        radius={150}
        innerRadius={110}
        centerLabelComponent={() => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#a491b7',
                fontSize: Size.font_18,
                fontWeight: 'bold',
                fontFamily: Fonts.BOLD,
              }}>
              Total Students
            </Text>
            <Text
              style={{
                marginTop: 8,
                color: 'black',
                fontSize: 40,
                fontFamily: Fonts.BOLD,
              }}>
              {totalStudents}
            </Text>
          </View>
        )}
      />
      <View
        style={{
          height: 35,
          width: 97,
          borderRadius: 13,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'black',
          width: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
          left: 20,
          bottom: 0,
        }}>
        <View
          style={{
            height: 16,
            width: 16,
            borderRadius: 10,
            backgroundColor: '#4c39a9',
            marginRight: 10,
          }}
        />
        <Text style={{color: '#fff', fontFamily: 'Satoshi'}}>
          {presentStudents} Present
        </Text>
      </View>
    </View>
  );
};

export default DailyChart;
