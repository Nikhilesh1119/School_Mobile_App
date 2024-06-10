import {
    View,
    Text,
    Image,
    Dimensions,
    Animated,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';
  import React, {useCallback, useState} from 'react';
  
  export default function AttendanceCard({
    item,
    index,
    isfirst,
    swipe,
    onStartAttendance,
    startAttendance,
    ...rest
  }){
    const {height, width} = Dimensions.get('window');
  
    const rotate = swipe.x.interpolate({
      inputRange: [-200, 0, 200],
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
  
    const overlayColor = swipe.x.interpolate({
      inputRange: [-300, 0, 300],
      outputRange: [
        'rgba(255, 0, 0, 0.3)',
        'rgba(0, 0, 0, 0)',
        'rgba(0, 255, 0, 0.3)',
      ],
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
            width: width - 20,
            height: height - 200,
            alignSelf: 'center',
            position: 'absolute',
            top: 80,
            borderRadius: 30,
            overflow: 'hidden',
          },
          isfirst &&
            startAttendance && {
              transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
            },
        ]}
        {...rest}>
        <Image
          source={item.image}
          style={{width: '100%', height: '100%', borderRadius: 30}}
        />
        {isfirst && startAttendance && (
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: overlayColor,
            }}
          />
        )}
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
                backgroundColor: 'rgba(255,255,255,0.6)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '40%',
                  transform: [{translateX: -55}, {translateY: -50}],
                  padding: 10,
                  borderRadius: 40,
                  gap: 10,
                }}
                onPress={onStartAttendance}
                className="bg-[#4E2973] px-5 py-2 h-[50] ">
                <Text
                  className="text-white text-lg "
                  style={{fontFamily: 'Satoshi-Regular'}}>
                  Start Attendance
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <Text
          style={{
            position: 'absolute',
            bottom: 100,
            left: 20,
            color: '#fff',
            fontSize: 28,
            fontWeight: 700,
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
            fontSize: 18,
            fontFamily: 'Satoshi-Regular',
            fontWeight: 400,
          }}>
          RollNumber: {item.rollNumber}
        </Text>
        <Text
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            color: '#fff',
            fontSize: 18,
            fontWeight: 400,
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
