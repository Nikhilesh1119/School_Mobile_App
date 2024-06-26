import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {axiosClient} from '../services/axiosClient';
import {AuthContext} from '../context/AuthContext';
import {Fonts} from '../theme/fonts';

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

  const renderDot = color => (
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

  const renderLegendComponent = () => (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
          }}>
          {renderDot('#4c39a9')}
          <Text style={{color: 'black', fontFamily: 'Satoshi'}}>
            {presentStudents} Present
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#d91111')}
          <Text style={{color: 'black', fontFamily: 'Satoshi'}}>
            {absentStudents} Absent
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={{padding: 20, alignItems: 'center'}}>
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
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Satoshi',
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
      {renderLegendComponent()}
    </View>
  );
};

export default DailyChart;
