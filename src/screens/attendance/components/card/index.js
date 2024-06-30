import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import user from '@src/assets/images/user.jpg';
import {styles} from './styles';

export default function AttendanceCard({
  item,
  index,
  isfirst,
  swipe,
  onStartAttendance,
  startAttendance,
  onCancleAttendance,
  ...rest
}) {
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
          style={[
            styles.attendanceChoiceContainer,
            {
              opacity: AbsentOpacity,
              transform: [{rotate: '30deg'}],
              right: 20,
            },
          ]}>
          <AttendanceChoice type={'Absent'} />
        </Animated.View>
        <Animated.View
          style={[
            styles.attendanceChoiceContainer,
            {
              opacity: PresentOpacity,
              transform: [{rotate: '-30deg'}],
              left: 20,
            },
          ]}>
          <AttendanceChoice type={'Present'} />
        </Animated.View>
      </>
    );
  }, []);

  return (
    <View>
      {isfirst && startAttendance && (
        <TouchableOpacity
          onPress={onCancleAttendance}
          style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Attendance</Text>
        </TouchableOpacity>
      )}

      <Animated.View
        key={index}
        style={[
          styles.card,
          {
            width: width - 20,
            height: height - 200,
          },
          isfirst &&
            startAttendance && {
              transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
            },
        ]}
        {...rest}>
        <Image source={item.image || user} style={styles.image} />
        {isfirst && startAttendance && (
          <Animated.View
            style={[styles.overlay, {backgroundColor: overlayColor}]}
          />
        )}
        {startAttendance ? (
          <></>
        ) : (
          <View style={styles.startAttendanceContainer}>
            <TouchableOpacity
              style={styles.startAttendanceButton}
              onPress={onStartAttendance}>
              <Text style={styles.startAttendanceButtonText}>
                Start Attendance
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.nameText}>
          {item.firstname}, {item.bloodGroup}
        </Text>
        <Text style={styles.detailText1}>RollNumber: {0}</Text>
        <Text style={styles.detailText2}>PhoneNumber: {item.parent.phone}</Text>
        {isfirst && startAttendance && attendanceSelection()}
      </Animated.View>
    </View>
  );
}

const AttendanceChoice = ({type}) => {
  return (
    <View>
      <Text
        style={[
          styles.attendanceChoiceText,
          {
            color: type == 'Present' ? '#01FF84' : '#F6006B',
            borderColor: type == 'Present' ? '#01FF84' : '#F6006B',
          },
        ]}>
        {type}
      </Text>
    </View>
  );
};
