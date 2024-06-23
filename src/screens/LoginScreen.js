/* eslint-disable prettier/prettier */
import React, { useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import bgvideo from '../assets/videos/loginBG.mp4';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import LoginForm from '@src/components/LoginForm';
import { Colors, Fonts, Size } from '../theme/fonts';

import { useTranslation } from 'react-i18next';

function LoginScreen() {
  const snapPoints = useMemo(() => ['100%'], []);
  const bottomSheetRef = useRef(null);
  const {t} = useTranslation()
  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Video
          resizeMode="cover"
          muted={true}
          repeat
          source={bgvideo}
          style={styles.backgroundVideo}
        />
        <View style={styles.overlay}>
          <TouchableOpacity
            className={styles.swipeContainer}
            onPress={handleOpenPress}>
            <Text style={styles.swipeText}>{t('login.clickToLogin')}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  swipeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  swipeText: {
    alignSelf: 'center',
    color: Colors.WHITE,
    fontSize: Size.font_20,
    fontFamily: Fonts.BOLD
  },
  icon: {
    alignSelf: 'center',
  },
});

export default LoginScreen;
