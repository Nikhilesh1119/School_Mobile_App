import React, {useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import bgvideo from '@src/assets/videos/loginBG.mp4';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import LoginForm from '@src/screens/Login/Components/LoginForm/index';
import {styles} from './styles';

export default function LoginScreen() {
  const snapPoints = useMemo(() => ['100%'], []);
  const bottomSheetRef = useRef(null);

  const handleOpenPress = () => {
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
          <Text style={styles.logoText2}>Logo</Text>
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
