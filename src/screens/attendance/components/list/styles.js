import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sectionContainer: {
      marginHorizontal: 20,
      marginVertical: 20,
    },
    sectionTitle: {
      color: 'black',
      fontSize: 21,
      fontWeight: '600',
      fontFamily: 'Satoshi',
    },
    attendanceList: {
      marginTop: 20,
      paddingVertical: 10,
      backgroundColor: '#f8f8f8',
      borderRadius: 20,
    },
    attendanceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
    },
    attendanceInfo: {
      flexDirection: 'row',
    },
    userImage: {
      width: 40,
      height: 40,
      borderRadius: 30,
    },
    attendanceText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '500',
      marginHorizontal: 10,
      fontFamily: 'Satoshi',
    },
    markPresentButton: {
      marginRight: 20,
      backgroundColor: '#f6d2c9',
      height: '30',
      width: '80',
      paddingHorizontal: 10,
      borderRadius: 20,
      justifyContent: 'center',
    },
    markPresentButtonText: {
      color: '#f84914',
      fontSize: 16,
      fontFamily: 'Satoshi',
    },
    markAbsentButton: {
      marginRight: 20,
      backgroundColor: '#cde9e8',
      height: '30',
      width: '80',
      paddingHorizontal: 10,
      borderRadius: 20,
      justifyContent: 'center',
    },
    markAbsentButtonText: {
      color: '#41c3b8',
      fontSize: 16,
      fontFamily: 'Satoshi',
    },
    reEvaluateButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      marginBottom: 10,
      borderRadius: 20,
      marginHorizontal: 20,
      backgroundColor: '#4e2973',
    },
    reEvaluateButtonText: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Satoshi',
    },
    saveAndProceedButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      borderRadius: 20,
      marginHorizontal: 20,
      backgroundColor: '#4e2973',
    },
    saveAndProceedButtonText: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Satoshi',
    },
  });