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
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AttendanceCard from '../components/AttendanceCard';
import {axiosClient} from '../services/axiosClient';
import {AuthContext} from '../context/AuthContext';
import user from '../assets/images/user.jpg';
import AttendanceList from '../components/AttendanceList';

export default function AttendanceScreen({setAttendanceStarted}) {
  const {SectionId} = useContext(AuthContext);
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [startAttendance, setStartAttendance] = useState(false);
  const {height} = Dimensions.get('window');
  const [student, setStudent] = useState([]);

  const swipe = useRef(new Animated.ValueXY()).current;

  const handleSwipeComplete = useCallback(
    direction => {
      const currentStudent = student[0];
      const attendanceRecord = {
        firstname: currentStudent.firstname,
        _id: currentStudent._id,
        isPresent: direction === 1,
      };

      if (direction === 1) {
        setPresent(prev => [...prev, attendanceRecord]);
        // console.log(present);
      } else {
        setAbsent(prev => [...prev, attendanceRecord]);
        // console.log(absent);
      }

      setStudent(prev => prev.slice(1));
      swipe.setValue({x: 0, y: 0});
    },
    [student, swipe],
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
      let isActionActive = Math.abs(dx) > 120;
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

  const handleStartAttendance = useCallback(() => {
    setStartAttendance(true);
    setAttendanceStarted(true);
  }, [setAttendanceStarted]);

  const handleToggleAttendance = (student, isPresent) => {
    if (isPresent) {
      setPresent(prev => prev.filter(s => s._id !== student._id));
      setAbsent(prev => [...prev, student]);
    } else {
      setAbsent(prev => prev.filter(s => s._id !== student._id));
      setPresent(prev => [...prev, student]);
    }
  };

  const reAttendance = () => {
    setStartAttendance(false);
    setAttendanceStarted(false);
    setPresent([]);
    setAbsent([]);
    getStudent();
    // setData([
    //   {
    //     image: require('../assets/images/s1.jpg'),
    //     rollNumber: 101,
    //     name: 'Nikhilesh',
    //     bloodGroup: 'O+',
    //     phoneNumber: '9999999999',
    //   },
    //   {
    //     image: require('../assets/images/s2.jpg'),
    //     rollNumber: 102,
    //     name: 'Kuldeep',
    //     bloodGroup: 'A+',
    //     phoneNumber: '9999988888',
    //   },
    //   {
    //     image: require('../assets/images/s3.jpg'),
    //     rollNumber: 103,
    //     name: 'Jainam',
    //     bloodGroup: 'B+',
    //     phoneNumber: '9999977777',
    //   },
    //   {
    //     image: require('../assets/images/s4.jpg'),
    //     rollNumber: 104,
    //     name: 'Ishika',
    //     bloodGroup: 'O-',
    //     phoneNumber: '9999966666',
    //   },
    //   {
    //     image: require('../assets/images/s1.jpg'),
    //     rollNumber: 106,
    //     name: 'Jaydeep',
    //     bloodGroup: 'AB+',
    //     phoneNumber: '9999944444',
    //   },
    //   {
    //     image: require('../assets/images/s2.jpg'),
    //     rollNumber: 107,
    //     name: 'Kunal',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s3.jpg'),
    //     rollNumber: 108,
    //     name: 'Mahendra',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s1.jpg'),
    //     rollNumber: 109,
    //     name: 'Himanshu',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s2.jpg'),
    //     rollNumber: 110,
    //     name: 'Jitu',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s3.jpg'),
    //     rollNumber: 111,
    //     name: 'Nitin',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s1.jpg'),
    //     rollNumber: 112,
    //     name: 'Narayan',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s1.jpg'),
    //     rollNumber: 113,
    //     name: 'Hariom',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s2.jpg'),
    //     rollNumber: 114,
    //     name: 'Gourav',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s3.jpg'),
    //     rollNumber: 115,
    //     name: 'Himesh',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    //   {
    //     image: require('../assets/images/s5.jpg'),
    //     rollNumber: 116,
    //     name: 'Muskan',
    //     bloodGroup: 'AB-',
    //     phoneNumber: '9999955555',
    //   },
    // ]);
  };


  const getStudent = async () => {
    try {
      const res = await axiosClient.get(`/student/student-list/${SectionId}`);
      // console.log(res.data.result.studentList);
      setStudent(res.data.result.studentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <View className="flex h-screen bg-white">
      <View className="flex">
        {student
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
                onCancleAttendance={reAttendance}
                {...dragHandlers}
              />
            );
          })
          .reverse()}
      </View>
      {student.length === 0 && (
        <AttendanceList
          present={present}
          absent={absent}
          handleToggleAttendance={handleToggleAttendance}
          reAttendance={reAttendance}
        />
      )}
    </View>
  );
}
