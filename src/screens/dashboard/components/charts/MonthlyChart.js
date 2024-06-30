import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {axiosClient} from '@src/services/axiosClient';
import {AuthContext} from '@src/context/AuthContext';
import {Colors} from '@src/theme/fonts';

const MonthlyChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(3);
  const {SectionId} = useContext(AuthContext);

  const getMonthlyAttendance = async () => {
    try {
      const res = await axiosClient.get(
        `/attendance/monthly-status/${SectionId}`,
      );

      const studentPresentCounts = res.data.result.monthlyAttendance;
      const monthlyData = studentPresentCounts.map((count, index) => {
        const day = index + 1;
        return {
          stacks: [
            {value: count, color: '#d91111'},
            {value: totalStudents - count, color: 'rgba(154, 146, 210, 0.2)'},
          ],
          label: day % 5 === 1 ? day.toString() : '',
        };
      });
      setMonthlyData(monthlyData);
      setTotalStudents(res.data.result.totalStudentCount);
    } catch (err) {
      console.error('Error fetching monthly attendance:', err);
    }
  };

  useEffect(() => {
    getMonthlyAttendance();
  }, []);

  return (
    <View style={{alignItems: 'flex-start', paddingTop: 90}}>
      <BarChart
        width={360}
        height={270}
        barWidth={8}
        rulesColor={Colors.GRAYBORDER}
        dashGap={0}
        initialSpacing={0}
        spacing={4}
        noOfSections={5}
        stepValue={Math.ceil(totalStudents / 10)}
        maxValue={totalStudents}
        stackData={monthlyData}
        xAxisColor="#fff"
        yAxisColor="#fff"
        yAxisTextStyle={{color: 'black'}}
      />
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Text style={{color: 'black'}}>1</Text>
        <Text style={{color: 'black'}}>6</Text>
        <Text style={{color: 'black'}}>11</Text>
        <Text style={{color: 'black'}}>16</Text>
        <Text style={{color: 'black'}}>21</Text>
        <Text style={{color: 'black'}}>26</Text>
      </View>
    </View>
  );
};

export default MonthlyChart;
