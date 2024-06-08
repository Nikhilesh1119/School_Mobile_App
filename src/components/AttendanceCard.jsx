import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';


export default function AttendanceCard({
  item,
  index,
  isfirst,
  swipe,
  onStartAttendance,
  startAttendance,
  ...rest
}) {
  const {height, width} = Dimensions.get('window');

  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const PresentOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const AbsentOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const attendanceSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            opacity: AbsentOpacity,
            transform: [{rotate: '30deg'}],
          }}>
          <AttendanceChoice type={'Absent'} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            opacity: PresentOpacity,
            transform: [{rotate: '-30deg'}],
          }}>
          <AttendanceChoice type={'Present'} />
        </Animated.View>
      </>
    );
  }, []);

  return (
    <Animated.View
      key={index}
      style={[
        {
          width: width ,
          height: height,
          alignSelf: 'center',
          position: 'absolute',
          // top: 20,
          // borderRadius: 30,
        },
        isfirst &&
          startAttendance && {
            transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
          },
      ]}
      {...rest}>
      <Image
        source={item.image}
        style={{width: '100%', height: '100%', borderRadius: 0}}
      />
      {startAttendance ? (
        <></>
      ) : (
        <>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 30,
              // backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: '50%',
                left: '40%',
                transform: [{translateX: -50}, {translateY: -50}],
                padding: 10,
                borderRadius: 40,
                gap: 10,
              }}
              onPress={onStartAttendance}
              className="bg-[#4E2973] px-5 py-2 h-[50] w-[205] ">
              <Text
                className="text-white text-lg "
                style={{ fontFamily: 'Satoshi-Regular' }}>
                Start Attendance
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View className="absolute top-1/2 left-2/5 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-[205px] h-[50px]">
      <Svg height="100%" width="100%" className="absolute rounded-full">
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%">
            <Stop offset="0%" stopColor="#4E2973" stopOpacity="1" />
            <Stop offset="100%" stopColor="#4E2973" stopOpacity="0.5" />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#000)"
          rx="40"
        />
      </Svg>
      <TouchableOpacity
        onPress={onStartAttendance}
        className="flex-1 justify-center items-center rounded-full">
        <Text className="text-white text-lg" style={{ fontFamily: 'Satoshi-Regular' }}>
          Start Attendance
        </Text>
      </TouchableOpacity>
    </View> */}
        </>
      )}
      <Text
        style={{
          position: 'absolute',
          bottom: 100,
          left: 20,
          color: '#fff',
          fontSize: 30,
          fontFamily: 'Satoshi-Regular',
        }}>
        {item.name}
        {', '}
        {item.bloodGroup}
      </Text>
      <Text
        style={{
          position: 'absolute',
          bottom: 60,
          left: 20,
          color: '#fff',
          fontSize: 20,
          fontFamily: 'Satoshi-Regular',
        }}>
        RollNumber: {item.rollNumber}
      </Text>
      <Text
        style={{
          position: 'absolute',
          bottom: 30,
          left: 20,
          color: '#fff',
          fontSize: 20,
        }}>
        PhoneNumber: {item.phoneNumber}
      </Text>
      {isfirst && startAttendance && attendanceSelection()}
    </Animated.View>
  );
}

const AttendanceChoice = ({type}) => {
  return (
    <View>
      <Text
        style={{
          color: type == 'Present' ? '#01FF84' : '#F6006B',
          fontSize: 40,
          borderWidth: 4,
          borderColor: type == 'Present' ? '#01FF84' : '#F6006B',
          paddingLeft: 10,
          paddingRight: 10,
          fontFamily: 'Satoshi-Regular',
        }}>
        {type}
      </Text>
    </View>
  );
};
