import {
  View,
  Text,
  TouchableOpacity,
  panHandlers,
  PanResponder,
  Animated,
  ScrollView,
  SafeAreaView,
  StyledView,
  Dimensions,
  Image,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import AttendanceCard from './AttendanceCard';

export default function Attendance() {
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [startAttendance, setStartAttendance] = useState(false);
  const {height} = Dimensions.get('window');
  const [data, setData] = useState([
    {
      image: require('../assets/images/s1.jpg'),
      rollNumber: 101,
      name: 'Nikhilesh',
      bloodGroup: 'O+',
      phoneNumber: '9999999999',
    },
    {
      image: require('../assets/images/s2.jpg'),
      rollNumber: 102,
      name: 'Kuldeep',
      bloodGroup: 'A+',
      phoneNumber: '9999988888',
    },
    {
      image: require('../assets/images/s3.jpg'),
      rollNumber: 103,
      name: 'Jainam',
      bloodGroup: 'B+',
      phoneNumber: '9999977777',
    },
    {
      image: require('../assets/images/s4.jpg'),
      rollNumber: 104,
      name: 'Ishika',
      bloodGroup: 'O-',
      phoneNumber: '9999966666',
    },
    {
      image: require('../assets/images/s1.jpg'),
      rollNumber: 106,
      name: 'Jaydeep',
      bloodGroup: 'AB+',
      phoneNumber: '9999944444',
    },
    {
      image: require('../assets/images/s2.jpg'),
      rollNumber: 107,
      name: 'Kunal',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s3.jpg'),
      rollNumber: 108,
      name: 'Mahendra',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s1.jpg'),
      rollNumber: 109,
      name: 'Himanshu',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s2.jpg'),
      rollNumber: 110,
      name: 'Jitu',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s3.jpg'),
      rollNumber: 111,
      name: 'Nitin',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s1.jpg'),
      rollNumber: 112,
      name: 'Narayan',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s1.jpg'),
      rollNumber: 113,
      name: 'Hariom',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s2.jpg'),
      rollNumber: 114,
      name: 'Gourav',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s3.jpg'),
      rollNumber: 115,
      name: 'Himesh',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
    {
      image: require('../assets/images/s5.jpg'),
      rollNumber: 116,
      name: 'Muskan',
      bloodGroup: 'AB-',
      phoneNumber: '9999955555',
    },
  ]);

  const swipe = useRef(new Animated.ValueXY()).current;

  const handleSwipeComplete = useCallback(
    direction => {
      const currentStudent = data[0];
      if (direction === 1) {
        setPresent(prev => [...prev, currentStudent]);
      } else {
        setAbsent(prev => [...prev, currentStudent]);
      }
      setData(prevState => prevState.slice(1));
      swipe.setValue({x: 0, y: 0});
    },
    [data, swipe],
  );

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => startAttendance,
    onPanResponderMove: (_, {dx, dy}) => {
      // console.log('dx:' + dx + ' dy:' + dy);
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      // console.log('released:' + 'dx:' + dx + ' dy:' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 100,
        }).start(() => handleSwipeComplete(direction));
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const handleStartAttendance = useCallback(value => {
    setStartAttendance(value);
  }, []);


  const handleToggleAttendance = (student, isPresent) => {
    if (isPresent) {
      setPresent(prev =>
        prev.filter(st => st.rollNumber !== student.rollNumber),
      );
      setAbsent(prev => [...prev, student]);
    } else {
      setAbsent(prev =>
        prev.filter(st => st.rollNumber !== student.rollNumber),
      );
      setPresent(prev => [...prev, student]);
    }
  };

  return (
    <View className="flex h-screen bg-white">
      <View className="flex">
        {data
          .map((item, index) => {
            let isfirst = index === 0;
            let dragHandlers = isfirst ? panResponser.panHandlers : {};
            return (
              <AttendanceCard
                item={item}
                isfirst={isfirst}
                key={index}
                swipe={swipe}
                startAttendance={startAttendance}
                onStartAttendance={handleStartAttendance}
                {...dragHandlers}
              />
            );
          })
          .reverse()}
      </View>
      {data.length === 0 && (
        <View style={{height: height - 90}}>
          <ScrollView>
            {absent.length > 0 && (
              <View className="flex mx-5 my-7">
                <Text className="text-black text-2xl">Absent's</Text>
                <View className="flex flex-col justify-between mt-5 py-2 bg-gray-50 rounded-3xl">
                  {absent.map((st, index) => {
                    return (
                      <View
                        key={index}
                        className="flex flex-row justify-between py-3 border border-y-white border-x-transparent">
                        <View className="flex flex-row">
                          <Image
                            source={st.image}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 30,
                            }}
                          />
                          <Text className="text-black text-xl mx-2">
                            {st.name}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleToggleAttendance(st, false)}
                          className="mr-3 bg-[#f6d2c9] h-9 px-2 rounded-2xl">
                          <Text className=" text-xl text-[#f84914]">
                            Mark Present
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            {present.length > 0 && (
              <View className=" mx-5 my-7">
                <Text className="text-black text-2xl">Present's</Text>
                <View className="flex flex-col justify-between mt-5 py-2 bg-gray-50 rounded-3xl">
                  {present.map((st, index) => {
                    return (
                      <View
                        key={index}
                        className="flex flex-row justify-between py-3 border border-y-white border-x-transparent">
                        <View className="flex flex-row">
                        <Image
                            source={st.image}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 30,
                            }}
                          />
                          <Text className="text-black text-xl mx-2">
                            {st.name}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleToggleAttendance(st, true)}
                          className="mr-3 bg-[#cde9e8] h-9 px-2 rounded-2xl">
                          <Text className=" text-xl text-[#41c3b8]">
                            Mark Absent
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            <TouchableOpacity className="flex justify-center items-center h-[50] rounded-3xl mx-3 bg-[#4e2973]">
              <Text className="text-white text-lg font-medium">
                Save and proceed
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
