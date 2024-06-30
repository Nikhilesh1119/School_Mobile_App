import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {axiosClient} from '@src/services/axiosClient';
import {AuthContext} from '@src/context/AuthContext';
import {Colors} from '@src/theme/fonts';

const WeeklyChart = () => {
  const {SectionId} = useContext(AuthContext);
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(3);
  const [selectedBar, setSelectedBar] = useState(null);
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getWeeklyAttendance = async () => {
    try {
      const res = await axiosClient.get(
        `/attendance/weekly-status/${SectionId}`,
      );
      const weeklyAttendance = res.data.result.weeklyAttendance;
      const totalStudentCount = res.data.result.totalStudentCount;

      const weeklyData = weeklyAttendance.map((count, index) => {
        const dayOfWeek = daysOfWeek[index % 7];
        return {
          stacks: [
            {value: count[1], color: '#d91111'}, // Absent
            {value: count[0], color: Colors.COLOR_7}, // Present
          ],
          label: dayOfWeek,
          topLabelComponent: () =>
            selectedBar === index && (
              <View style={{alignItems: 'center', marginBottom: 10}}>
                {count[0] + count[1] > 0 && (
                  <View
                    style={{
                      height: 35,
                      borderRadius: 13,
                      alignItems: 'center',
                      backgroundColor: 'black',
                      width: 120,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1,
                      top: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                        {count[1]} Absent
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          height: 16,
                          width: 16,
                          borderRadius: 10,
                          backgroundColor: '#4c39a9',
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      />
                      <Text style={{color: '#fff', fontFamily: 'Satoshi'}}>
                        {count[0]} Present
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ),
        };
      });

      setWeeklyData(weeklyData);
      setTotalStudents(totalStudentCount);
    } catch (error) {
      console.error(error);
      // handle error appropriately
    }
  };

  useEffect(() => {
    getWeeklyAttendance();
  }, []);

  return (
    <View style={{alignItems: 'flex-start', paddingTop: 90}}>
      <BarChart
        width={340}
        height={270}
        rulesColor={Colors.GRAYBORDER}
        dashGap={0}
        initialSpacing={0}
        showVerticalLines={true}
        verticalLinesShift={24}
        barWidth={25}
        spacing={25}
        stepValue={Math.ceil(totalStudents / 10)}
        maxValue={totalStudents}
        stackData={weeklyData.map((item, index) => ({
          ...item,
          topLabelComponent: item.topLabelComponent(),
        }))}
        xAxisColor="#fff"
        yAxisColor="#fff"
        yAxisTextStyle={{color: 'black'}}
        xAxisLabelTextStyle={{color: 'black'}}
        onPressBar={index => setSelectedBar(index)}
      />
    </View>
  );
};

export default WeeklyChart;
