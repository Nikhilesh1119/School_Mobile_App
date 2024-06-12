import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const WeeklyChart = () => {
  const [focusedIndex, setFocusedIndex] = useState(null);

  const weeklyData = [
    {
      stacks: [
        {value: 25, color: '#d91111'},
      ],
      label: 'Mon',
    },
    {
      stacks: [
        {value: 10, color: '#d91111'},
      ],
      label: 'Tue',
    },
    {
      stacks: [
        {value: 15, color: '#d91111'},
      ],
      label: 'Wed',
    },
    {
      stacks: [
        {value: 10, color: '#d91111'},
      ],
      label: 'Thu',
    },
    {
      stacks: [
        {value: 20, color: '#d91111'},
      ],
      label: 'Fri',
    },
    {
      stacks: [
        {value: 5, color: '#d91111'},
      ],
      label: 'Sat',
    },
  ];

  const handleBarPress = index => {
    setFocusedIndex(index);
  };

  return (
    <View className="items-start py-[30] bg-purple-50 rounded-lg">
      <BarChart
        width={300}
        height={400}
        rotateLabel={true}
        // dashGap={0}
        rulesColor="#4c39a9"
        barWidth={37}
        spacing={11}
        stepValue={10}
        maxValue={50}
        stackData={weeklyData}
        xAxisColor="#fff"
        yAxisColor="#fff"
        yAxisTextStyle={{color: 'black'}}
        xAxisLabelTextStyle={{color: 'black'}}
        focusBarOnPress={true}
        onPressBar={index => handleBarPress(index)}
      />
    </View>
  );
};

export default WeeklyChart;
