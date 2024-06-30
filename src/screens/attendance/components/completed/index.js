import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function AttendanceCompleted() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>AttendanceCompleted</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  message: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Satoshi'
  },
});
