// AttendanceList.js
import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
  Dimensions,
  StyleSheet,
} from 'react-native';
import user from '@src/assets/images/user.jpg';
import {axiosClient} from '@src/services/axiosClient';
import {AuthContext} from '@src/context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {ROUTE} from '@src/navigation/constant';
import { styles } from './styles';

export default function AttendanceList({
  present,
  absent,
  handleToggleAttendance,
  reAttendance,
  setStartAttendance,
  setAttendanceStarted,
}) {
  const {height} = Dimensions.get('window');
  const navigation = useNavigation();
  const {SectionId} = useContext(AuthContext);

  // Log SectionId to check its type and value
  console.log('SectionId:', SectionId);

  const handleSaveAndProceed = async () => {
    try {
      setStartAttendance(false);
      setAttendanceStarted(false);
      if (present.length > 0 || absent.length > 0) {
        const res = await axiosClient.post(
          `/attendance/mark-attendance/${SectionId}`,
          {present, absent},
        );
        navigation.navigate(ROUTE.DASHBOARD);
      } else {
        console.log("can't mark Attendance");
      }
    } catch (error) {
      // console.error('Response error data:', error.response.data);
      // console.error('Response error status:', error.response.status);
      // console.error('Response error headers:', error.response.headers);
    }
  };

  return (
    <View style={{height: height - 90}}>
      <ScrollView>
        {absent.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Absent's</Text>
            <View style={styles.attendanceList}>
              {absent.map((st, index) => (
                <View key={index} style={styles.attendanceItem}>
                  <View style={styles.attendanceInfo}>
                    <Image source={st.image || user} style={styles.userImage} />
                    <Text style={styles.attendanceText}>{st.firstname}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToggleAttendance(st, false)}
                    style={styles.markPresentButton}>
                    <Text style={styles.markPresentButtonText}>
                      Mark Present
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        {present.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Present's</Text>
            <View style={styles.attendanceList}>
              {present.map((st, index) => (
                <View key={index} style={styles.attendanceItem}>
                  <View style={styles.attendanceInfo}>
                    <Image source={st.image || user} style={styles.userImage} />
                    <Text style={styles.attendanceText}>{st.firstname}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleToggleAttendance(st, true)}
                    style={styles.markAbsentButton}>
                    <Text style={styles.markAbsentButtonText}>Mark Absent</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={reAttendance}
          style={styles.reEvaluateButton}>
          <Text style={styles.reEvaluateButtonText}>
            Re-evaluate Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSaveAndProceed}
          style={styles.saveAndProceedButton}>
          <Text style={styles.saveAndProceedButtonText}>Save and proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


