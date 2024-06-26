// import * as React from 'react';
// import {useState, useEffect, useContext} from 'react';
// import {
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   TextInput,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   Alert,
//   ToastAndroid,
// } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import India from '../assets/images/India.png';
// import DatePicker from 'react-native-date-picker';
// import {AuthContext} from '../context/AuthContext';
// import {axiosClient} from '../services/axiosClient';
// import {useNavigation} from '@react-navigation/native';
// // import {useToast} from 'react-native-toast-notifications';

// const validationSchema = Yup.object().shape({
//   firstname: Yup.string().required('First name is required'),
//   lastname: Yup.string().required('Last name is required'),
//   dob: Yup.string().required('Date of birth is required'),
//   phone: Yup.string().required('Phone number is required'),
//   university: Yup.string().required('University is required'),
//   degree: Yup.string().required('Degree is required'),
// });

// export default function EditProfile() {
//   const navigation = useNavigation();
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const {teacherId} = useContext(AuthContext);
//   const [initialValues, setInitialValues] = useState({
//     firstname: '',
//     lastname: '',
//     dob: '',
//     phone: '',
//     bloodGroup: '',
//     gender: '',
//     university: '',
//     degree: '',
//   });

//   const getTeacher = async () => {
//     try {
//       const res = await axiosClient.get(`/teacher/get/${teacherId}`);
//       const teacher = res.data.result;
//       setInitialValues({
//         firstname: teacher.firstname || '',
//         lastname: teacher.lastname || '',
//         dob: teacher.dob || '',
//         phone: teacher.phone || '',
//         bloodGroup: teacher.bloodGroup || '',
//         gender: teacher.gender || '',
//         university: teacher.university || '',
//         degree: teacher.degree || '',
//       });
//     } catch (error) {
//       console.error('Failed to fetch teacher data:', error);
//     }
//   };

//   useEffect(() => {
//     getTeacher();
//   }, []);

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.header}></View>
//         <Formik
//           initialValues={initialValues}
//           enableReinitialize={true}
//           validationSchema={validationSchema}
//           onSubmit={async values => {
//             try {
//               console.log(values);
//               const res = await axiosClient.put(
//                 `teacher/profile-update`,
//                 values,
//               );
//               console.log(res);
//               // ToastAndroid.show(res.data.result, ToastAndroid.LONG);
//               // toast.show(res.data.result, {
//               //   type:'default',
//               //   placement: 'bottom',
//               //   duration: 1000,
//               //   offset: 50,
//               //   animationType: ' zoom-in',
//               // });
//               // setTimeout(() => {
//               //   navigation.navigate('Profile');
//               // }, 1000);
//             } catch (error) {
//               ToastAndroid.show(`can't update profile`, ToastAndroid.LONG);
//             }
//           }}>
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             values,
//             setFieldValue,
//           }) => (
//             <View style={styles.content}>
//               <View style={styles.titleContainer}>
//                 <Text style={styles.titleText}>Edit profile</Text>
//               </View>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>First name</Text>
//                 <TextInput
//                   style={styles.inputText}
//                   onChangeText={handleChange('firstname')}
//                   onBlur={handleBlur('firstname')}
//                   value={values.firstname}
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Last name</Text>
//                 <TextInput
//                   style={styles.inputText}
//                   onChangeText={handleChange('lastname')}
//                   onBlur={handleBlur('lastname')}
//                   value={values.lastname}
//                 />
//               </View>
//               <View style={styles.dateContainer}>
//                 <Text style={styles.label}>Date of Birth</Text>
//                 <TouchableOpacity
//                   onPress={() => setOpen(true)}
//                   style={styles.inputText}>
//                   <Text
//                     className="text-black text-sm "
//                     style={{fontFamily: 'Satoshi'}}>
//                     {values.dob ? values.dob : 'MM/DD/YYYY'}
//                   </Text>
//                 </TouchableOpacity>
//                 <DatePicker
//                   modal
//                   open={open}
//                   date={date}
//                   mode="date"
//                   maximumDate={new Date()}
//                   onConfirm={date => {
//                     setOpen(false);
//                     setDate(date);
//                     setFieldValue('dob', date.toLocaleDateString('en-US'));
//                   }}
//                   onCancel={() => {
//                     setOpen(false);
//                   }}
//                 />
//                 <Image
//                   style={styles.dateIcon}
//                   source={{
//                     uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/23cf6cf8a47ace8810d44735506bd5b2f018d92ffc2ce49f594300a2dc207900?apiKey=5571847fc48447bbad48faecb3b890d9&',
//                   }}
//                 />
//               </View>
//               <View style={styles.phoneInputContainer}>
//                 <Text style={styles.label}>Phone number</Text>
//                 <View style={styles.phoneInput}>
//                   <Image style={styles.phoneIcon} source={India} />
//                   <TextInput
//                     style={styles.inputText}
//                     onChangeText={handleChange('phone')}
//                     onBlur={handleBlur('phone')}
//                     value={values.phone}
//                     keyboardType="phone-pad"
//                     className="w-[200]"
//                   />
//                 </View>
//               </View>
//               <View style={styles.row}>
//                 <View style={styles.halfInputContainer}>
//                   <Text style={styles.label}>Blood Group</Text>
//                   <Picker
//                     selectedValue={values.bloodGroup}
//                     onValueChange={itemValue =>
//                       setFieldValue('bloodGroup', itemValue)
//                     }
//                     style={styles.picker}>
//                     <Picker.Item label="A+" value="A+" />
//                     <Picker.Item label="A-" value="A-" />
//                     <Picker.Item label="B+" value="B+" />
//                     <Picker.Item label="B-" value="B-" />
//                     <Picker.Item label="AB+" value="AB+" />
//                     <Picker.Item label="AB-" value="AB-" />
//                     <Picker.Item label="O+" value="O+" />
//                     <Picker.Item label="O-" value="O-" />
//                   </Picker>
//                 </View>
//                 <View style={styles.halfInputContainer}>
//                   <Text style={styles.label}>Gender</Text>
//                   <Picker
//                     selectedValue={values.gender}
//                     onValueChange={itemValue =>
//                       setFieldValue('gender', itemValue)
//                     }
//                     style={styles.picker}>
//                     <Picker.Item label="Female" value="Female" />
//                     <Picker.Item label="Male" value="Male" />
//                     <Picker.Item label="Other" value="Other" />
//                     <Picker.Item
//                       label="Prefer not to say"
//                       value="Prefer not to say"
//                     />
//                   </Picker>
//                 </View>
//               </View>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>University</Text>
//                 <TextInput
//                   style={styles.inputText}
//                   onChangeText={handleChange('university')}
//                   onBlur={handleBlur('university')}
//                   value={values.university}
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Degree</Text>
//                 <TextInput
//                   style={styles.inputText}
//                   onChangeText={handleChange('degree')}
//                   onBlur={handleBlur('degree')}
//                   value={values.degree}
//                 />
//               </View>
//               <TouchableOpacity
//                 style={styles.updateButton}
//                 onPress={handleSubmit}>
//                 <Text style={styles.updateButtonText}>Update Profile</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </Formik>
//         <View style={styles.footer}>
//           <View style={styles.footerLine} />
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'space-between',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     width: '100%',
//   },
//   headerImage: {
//     width: 46,
//     height: 40,
//   },
//   content: {
//     paddingHorizontal: 20,
//     marginTop: 28,
//     width: '100%',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 28,
//   },
//   titleIcon: {
//     width: 24,
//     height: 24,
//   },
//   titleText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#000',
//     marginLeft: 5,
//     fontFamily: 'Satoshi',
//   },
//   inputContainer: {
//     borderWidth: 1,
//     borderColor: '#4E2973',
//     borderRadius: 8,
//     padding: 8,
//     marginTop: 15,
//     backgroundColor: 'white',
//   },
//   label: {
//     fontSize: 10,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   inputText: {
//     fontSize: 14,
//     color: 'black',
//     marginTop: 5,
//     height: 40,
//     marginLeft: 10,
//     fontFamily: 'Satoshi',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#4E2973',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 24,
//     backgroundColor: 'white',
//   },
//   dateIcon: {
//     width: 24,
//     height: 24,
//   },
//   phoneInputContainer: {
//     borderWidth: 1,
//     borderColor: '#4E2973',
//     borderRadius: 8,
//     padding: 8,
//     marginTop: 15,
//     backgroundColor: 'white',
//   },
//   phoneInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   phoneIcon: {
//     width: 40,
//     height: 24,
//     marginLeft: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 24,
//   },
//   halfInputContainer: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#4E2973',
//     borderRadius: 8,
//     paddingVertical: 8,
//     backgroundColor: 'white',
//     marginRight: 4,
//   },
//   picker: {
//     height: 40,
//     width: '100%',
//     color: 'black',
//     fontFamily: 'Satoshi',
//   },
//   updateButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4E2973',
//     borderRadius: 20,
//     paddingVertical: 12,
//     marginTop: 36,
//   },
//   updateButtonText: {
//     color: '#f5f5f5',
//     fontSize: 18,
//     fontWeight: 'bold',
//     fontFamily: 'Satoshi',
//   },
//   footer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 12,
//     marginTop: 40,
//     backgroundColor: '#f5f5f5',
//   },
//   footerLine: {
//     height: 2,
//     backgroundColor: '#1a1a1a',
//     width: 108,
//     borderRadius: 1,
//   },
// });

import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Image,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import {scale} from 'react-native-size-matters';
import Backbutton from '@src/assets/images/Backbutton.png';
import {Size, Weight, Colors, Fonts} from '@src/theme/fonts';
import {useNavigation} from '@react-navigation/native';

function EditProfile() {
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{
        name: '',
        rollNumber: '',
        classSection: '',
        dob: '',
        gender: '',
        email: '',
        phoneNumber: '',
        bloodGroup: '',
        address: '',
      }}
      onSubmit={values => {
        console.log(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.section}>
              <View style={styles.titleContainer}>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                  <Image source={Backbutton} style={styles.backIcon} />
                </Pressable>

                <View style={styles.titleText}>
                  <Text style={styles.headerText}>Edit profile</Text>
                </View>
              </View>
              <View>
                <Text style={styles.sectionHeader}>Name</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter Name"
                  placeholderTextColor='black'
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
              </View>
              {/* <View>
                <Text style={styles.sectionHeader}>Roll Number</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Roll Number"
                  value={values.rollNumber}
                  onChangeText={handleChange('rollNumber')}
                  onBlur={handleBlur('rollNumber')}
                />
              </View> */}
              <View>
                <Text style={styles.sectionHeader}>Class and Section</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="8th- A"
                  value={values.classSection}
                  onChangeText={handleChange('classSection')}
                  onBlur={handleBlur('classSection')}
                />
              </View>
              <View>
                <Text style={styles.sectionHeader}>Date of Birth</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="DD/MM/YYYY"
                  value={values.dob}
                  onChangeText={handleChange('dob')}
                  onBlur={handleBlur('dob')}
                />
              </View>
              <View>
                <Text style={styles.sectionHeader}>Gender</Text>
              </View>
              <View style={styles.genderContainer}>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={itemValue =>
                    setFieldValue('gender', itemValue)
                  }
                  style={styles.picker}>
                  <Picker.Item label="Select Gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.sectionHeader}>Email</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="mahisharma@gmail.com"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
              </View>
              <View>
                <Text style={styles.sectionHeader}>Phone Number</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="+91 7489795305"
                  placeholderTextColor='black'
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                />
              </View>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.sectionHeader}>Blood Group</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="AB+"
                  value={values.bloodGroup}
                  onChangeText={handleChange('bloodGroup')}
                  onBlur={handleBlur('bloodGroup')}
                />
              </View>
              <View>
                <Text style={styles.sectionHeader}>Address</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Rajendra Nagar, Indore"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                />
              </View>
              <Pressable
                style={styles.updateButton}
                onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.updateButtonText}>Update Profile</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: scale(20),
    marginHorizontal: 'auto',
    width: '100%',
    backgroundColor: Colors.GRAYBACK,
    maxWidth: scale(480),
    borderRadius: scale(32),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    width: '100%',
  },
  section: {
    flexDirection: 'column',
    paddingHorizontal: scale(16),
    marginTop: scale(10),
    width: '100%',
    fontSize: scale(24),
    fontFamily: Fonts.BOLD,
    lineHeight: scale(28),
    color: Colors.BLACK,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
    marginTop: scale(10),
  },
  backIcon: {
    width: scale(25),
    height: scale(25),
    marginRight: scale(10),
  },
  titleText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: Size.font_24,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
  },
  sectionHeader: {
    marginTop: scale(24),
    fontSize: Size.font_20,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    paddingVertical: scale(5),
    marginTop: scale(10),
    fontSize: scale(16),
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    borderWidth: scale(0.25),
  },
  inputText: {
    flex: 1,
    fontSize: Size.font_16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(5),
    marginTop: scale(10),
    fontSize: scale(14),
    // lineHeight: scale(20),
    borderRadius: scale(12),
    borderWidth: scale(0.25),
    borderOpacity: 0.5,
    opacity: 0.6,
  },
  picker: {
    flex: 1,
  },
  genderText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdownIcon: {
    aspectRatio: 0.85,
    width: scale(18),
  },
  flexGrow: {
    flex: 1,
    textAlign: 'center',
  },
  editIcon: {
    width: scale(24),
    aspectRatio: 1,
  },
  addIcon: {
    alignSelf: 'flex-end',
    marginRight: scale(40),
    aspectRatio: 0.85,
    width: scale(18),
  },
  updateButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingVertical: scale(10),
    marginTop: scale(40),
    backgroundColor: Colors.PURPLE,
    borderRadius: scale(40),
    textAlign: 'center',
  },
  updateButtonText: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
    fontSize: Size.font_20,
  },
});

export default EditProfile;
