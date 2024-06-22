import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {axiosClient} from '../services/axiosClient';
import {AuthContext} from '../context/AuthContext';

const WeeklyChart = () => {
  const {SectionId} = useContext(AuthContext);
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(3);
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getWeeklyAttendance = async () => {
    const res = await axiosClient.get(`/attendance/weekly-status/${SectionId}`);
    // console.log(
    //   res.data.result.totalStudentCount,
    //   res.data.result.weeklyAttendance,
    // );
    const weeklyAttendance = res.data.result.weeklyAttendance;
    const weeklyData = weeklyAttendance.map((count, index) => {
      const dayOfWeek = daysOfWeek[index % 7];
      return {
        stacks: [{value: count, color: '#d91111'}],
        label: dayOfWeek,
      };
    });
    setWeeklyData(weeklyData);
    setTotalStudents(res.data.result.totalStudentCount);
  };

  useEffect(() => {
    getWeeklyAttendance();
  }, []);

  return (
    <View className="items-start py-[30] bg-purple-50 rounded-lg">
      <BarChart
        width={370}
        height={400}
        rotateLabel={true}
        rulesColor="#4c39a9"
        barWidth={38}
        spacing={10}
        stepValue={Math.ceil(totalStudents / 10)}
        maxValue={totalStudents}
        stackData={weeklyData}
        xAxisColor="#fff"
        yAxisColor="#fff"
        yAxisTextStyle={{color: 'black'}}
        xAxisLabelTextStyle={{color: 'black'}}
      />
    </View>
  );
};

export default WeeklyChart;
