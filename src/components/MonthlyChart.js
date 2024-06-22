import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {axiosClient} from '../services/axiosClient';
import {AuthContext} from '../context/AuthContext';

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
          stacks: [{value: count, color: '#d91111'}],
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
    <View className="items-start py-[30] bg-purple-50 rounded-lg">
      <BarChart
        width={370}
        height={400}
        barWidth={8}
        rulesColor="#4c39a9"
        spacing={4}
        noOfSections={5}
        stepValue={Math.ceil(totalStudents / 10)}
        maxValue={totalStudents}
        stackData={monthlyData}
        xAxisColor="#fff"
        yAxisColor="#fff"
        yAxisTextStyle={{color: 'black'}}
        xAxisLabelTextStyle={{color: 'black'}}
        labelWidth={10}
        renderTooltip={({item, index}) => (
          <Text style={styles.label}>{item.label}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: 20,
    textAlign: 'center',
  },
});

export default MonthlyChart;
