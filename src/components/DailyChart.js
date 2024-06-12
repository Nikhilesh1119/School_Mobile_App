import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const DailyChart = () => {

  const [totalStudents, setTotalStudents] = useState(50);
  const [presentStudents, setPresentStudents] = useState(40);

  const dailyData = [
    {
      value: (presentStudents / totalStudents) * 100,
      color: '#4c39a9',
      focused: true,
      gradientCenterColor: '#4e2973',
    },
    {
      value: ((totalStudents - presentStudents) / totalStudents) * 100,
      color: '#d91111',
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
          <Text style={{ color: 'black' }}>{presentStudents} Present</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
          {renderDot('#d91111')}
          <Text style={{ color: 'black' }}>
            {totalStudents - presentStudents} Absent
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={{ padding: 20, alignItems: 'center',paddingTop:30,paddingBottom:30 }}>
      <PieChart
        data={dailyData}
        donut
        showGradient
        sectionAutoFocus
        radius={150}
        innerRadius={110}
        centerLabelComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#a491b7', fontSize: 18, fontWeight: 'bold' }}>
              Total Students
            </Text>
            <Text style={{ marginTop: 8, color: 'black', fontSize: 40, fontWeight: 'bold' }}>
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
