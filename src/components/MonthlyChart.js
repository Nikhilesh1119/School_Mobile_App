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
        {value: 50 - x, color: '#e7e5f2'},
      ],
      label: day % 5 === 1 ? day.toString() : '',
    };
  });

  return (
    <View className="items-start py-[30] ">
      <BarChart
        width={300}
        height={400}
        barWidth={13}
        spacing={5}
        dashGap={0}
        noOfSections={5}
        stepValue={5}
        // barBorderRadius={6}
        maxValue={50}
        stackData={monthlyData}
        yAxisTextStyle={{color: 'black'}}
        xAxisLabelTextStyle={{color: 'black'}}
        labelTextStyle={{color: '#00ff00', fontSize: 10}}
      />
    </View>
  );
};

export default MonthlyChart;
