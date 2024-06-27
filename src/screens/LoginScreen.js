import React, {useMemo, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import bgvideo from '../assets/videos/loginBG.mp4';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import LoginForm from '../components/LoginForm';
import {Size, Weight, Colors, Fonts} from '../theme/fonts';
import {scale} from 'react-native-size-matters';

function LoginScreen() {
  const styles = useStyles();
  const snapPoints = useMemo(() => ['100%'], []);
  const bottomSheetRef = useRef(null);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  const handleOpenPress = () => {
    console.log('Button Pressed'); // Debug log
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Video
          resizeMode="cover"
          muted={true}
          repeat
          source={bgvideo}
          style={styles.backgroundVideo}
        />
        <View style={styles.header}>
          <Text style={styles.logoText}>Logo</Text>
          <Text style={styles.headerText}>Monitor Attendance</Text>
          <Text style={styles.subHeaderText}>Anytime!</Text>
        </View>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.swipeContainer}
            onPress={handleOpenPress}>
            <Text style={styles.swipeText}>Click to Login</Text>
          </TouchableOpacity>
          <BottomSheet
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            index={-1}
            ref={bottomSheetRef}>
            <View style={styles.contentContainer}>
              <LoginForm />
            </View>
          </BottomSheet>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default LoginScreen;

function useStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundVideo: {
      position: 'absolute',
      top: scale(0),
      left: scale(0),
      bottom: scale(0),
      right: scale(0),
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: scale(50),
    },
    swipeContainer: {
      alignItems: 'center',
      marginBottom: scale(20),
      padding: scale(10),
      borderRadius: scale(5),
    },
    swipeText: {
      alignSelf: 'center',
      color: Colors.WHITE,
      fontSize: scale(20),
      fontFamily: Fonts.MEDIUM,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: scale(20),
    },
    header: {
      position: 'absolute',
      top: scale(50),
      width: '100%',
      alignItems: 'center',
    },
    logoText: {
      color: Colors.WHITE,
      fontSize: Size.font_40,
      top: scale(10),
      fontFamily: Fonts.BOLD,
    },
    headerText: {
      color: Colors.WHITE,
      fontSize: Size.font_24,
      top: scale(10),
      fontFamily: Fonts.MEDIUM,
      marginTop: scale(20),
    },
    subHeaderText: {
      color: Colors.WHITE,
      fontSize: Size.font_24,
      top: scale(8),
      fontFamily: Fonts.MEDIUM,
    },
  });
}
