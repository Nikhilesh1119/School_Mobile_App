import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

export default function Attendance() {

  const [data, setData] = useState([
    {image: require('../assets/hulk.webp'), rollNumber: 1, name: 'Hulk',bloodGroup:'O+'},
  ]);


  return (
    <SafeAreaView>
      <View>
        <Text>attendance</Text>
      </View>
    </SafeAreaView>
  );
}
