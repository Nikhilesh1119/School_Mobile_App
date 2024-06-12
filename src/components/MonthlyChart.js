import React from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const MonthlyChart = () => {
  const monthlyData = Array.from({length: 30}, (_, index) => {
    const day = index + 1;
    const x = Math.floor(Math.random() * 50);
    return {
      stacks: [
        {value: x, color: '#d91111'},
        {value: 50 - x, color: '#fff'},
      ],
      label: day % 5 === 1 ? day.toString() : '',
    };
  });

  return (
    <View className="items-start py-[30] ">
      <BarChart
        width={370}
        height={400}
        barWidth={8}
        spacing={4}
        dashGap={0}
        noOfSections={5}
        stepValue={5}
        maxValue={50}
        stackData={monthlyData}
        xAxisColor="#fff"
        yAxisColor="#fff"
        yAxisTextStyle={{color: 'black'}}
        xAxisLabelTextStyle={{color: 'black'}}
        labelWidth={10}
      />
    </View>
  );
};

export default MonthlyChart;
