import React, {useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Login from '../screens/LoginScreen';

export default function BottomModal() {
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const bottomSheetRef = useRef(null);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Button title="open" onPress={handleOpenPress} />
        <Button title="close" onPress={handleClosePress} />
        <Button title="collapse" onPress={handleCollapsePress} />

        <BottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
          <View style={styles.contentContainer}>
            <Text>This is Modal</Text>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
