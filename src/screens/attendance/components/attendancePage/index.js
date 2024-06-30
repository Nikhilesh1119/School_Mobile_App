import {View, PanResponder, Animated, Dimensions} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AttendanceCard from '@src/screens/attendance/components/card/index';
import AttendanceList from '@src/screens/attendance/components/list/index';
import {axiosClient} from '@src/services/axiosClient';
import {AuthContext} from '@src/context/AuthContext';

export default function AttendancePage({setAttendanceStarted}) {
  const {SectionId} = useContext(AuthContext);
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [startAttendance, setStartAttendance] = useState(false);
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
      } else {
        setAbsent(prev => [...prev, attendanceRecord]);
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
  };

  const getStudent = async () => {
    try {
      console.log(SectionId);
      const res = await axiosClient.get(
        `/student/section-students/${SectionId}`,
      );
      // console.log('student', res.data);
      setStudent(res.data.result.studentList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <View style={{display: 'flex', height: '100%'}}>
      <View style={{display: 'flex'}}>
        {student
          .map((item, index) => {
            // item.rollNo = index + 1;
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
          setStartAttendance={setStartAttendance}
          setAttendanceStarted={setAttendanceStarted}
        />
      )}
    </View>
  );
}
