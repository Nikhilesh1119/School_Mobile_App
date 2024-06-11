import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const WeeklyChart = () => {
  const [focusedIndex, setFocusedIndex] = useState(null);

  const weeklyData = [
    {
      stacks: [
        {value: 25, color: '#d91111'},
        {value: 25, color: '#4c39a9'},
      ],
      label: 'Mon',
    },
    {
      stacks: [
        {value: 10, color: '#d91111'},
        {value: 40, color: '#4c39a9'},
      ],
      label: 'Tue',
    },
    {
      stacks: [
        {value: 15, color: '#d91111'},
        {value: 35, color: '#4c39a9'},
      ],
      label: 'Wed',
    },
    {
      stacks: [
        {value: 10, color: '#d91111'},
        {value: 40, color: '#4c39a9'},
      ],
      label: 'Thu',
    },
    {
      stacks: [
        {value: 20, color: '#d91111'},
        {value: 30, color: '#4c39a9'},
      ],
      label: 'Fri',
    },
    {
      stacks: [
        {value: 5, color: '#d91111'},
        {value: 45, color: '#4c39a9'},
      ],
      label: 'Sat',
    },
  ];

  const handleBarPress = index => {
    setFocusedIndex(index);
  };

  return (
    <View className="items-start py-[30]">
      <BarChart
        width={300}
        height={400}
        rotateLabel={true}
        dashGap={0}
        barWidth={25}
        spacing={20}
        stepValue={5}
        maxValue={50}
        stackData={weeklyData}
        yAxisTextStyle={{color: 'black'}}
        xAxisLabelTextStyle={{color: 'black'}}
        barBorderRadius={10}
        focusBarOnPress={true}
        onPressBar={index => handleBarPress(index)}
      />
    </View>
  );
};

export default WeeklyChart;
