import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
  FlatList,
  ImageBackground,
} from 'react-native';
import profileback from '../assets/images/profileback.png';
import background from '../assets/images/background.png';
import FeatherIcon from 'react-native-vector-icons/Feather';
import cotact from '../assets/images/cotact.png';
import editprofile from '../assets/images/editprofile.png';
import laguage from '../assets/images/laguage.png';
import mode from '../assets/images/mode.png';
import help from '../assets/images/help.png';

export default function Profile() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    language: 'English',
  });

  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const handleLanguageSelect = (language) => {
    setForm({ ...form, language });
    setLanguageModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <ImageBackground source={profileback} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay} />
        <View style={styles.header}>
          <Text style={styles.title}>Coordinator Profile</Text>
        </View>
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>Class Name and Section</Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  
                }}
                style={styles.row}>
                <View style={[styles.rowIcon, { }]}>
                  <Image
                    source={editprofile}
                    style={{ width: 22, height: 22,  }}
                  />
                </View>
                <Text style={styles.rowLabel}>Edit profile</Text>
                <View style={styles.rowSpacer} />
                
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setLanguageModalVisible(true)}
                style={styles.row}>
                <View style={[styles.rowIcon, {  }]}>
                <Image
                    source={laguage}
                    style={{ width: 22, height: 22 }}
                  />
                </View>
                <Text style={styles.rowLabel}>Language</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{form.language}</Text>
               
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <View style={[styles.rowIcon]}>
                <Image
                    source={mode}
                    style={{ width: 22, height: 22,  }}
                  />
                </View>
                <Text style={styles.rowLabel}>Dark Mode</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  onValueChange={(darkMode) => setForm({ ...form, darkMode })}
                  value={form.darkMode}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <View style={[styles.rowIcon]}>
                <Image
                    source={help}
                    style={{ width: 22, height: 22,  }}
                  />
                </View>
                <Text style={styles.rowLabel}>Help & Support</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <View style={[styles.rowIcon,]}>
                <Image
                    source={cotact}
                    style={{ width: 22, height: 22,  }}
                  />
                </View>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Language</Text>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleLanguageSelect(item)}
                  style={styles.languageOption}>
                  <Text style={styles.languageText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  image: {
    width: '100%',
    height: 'auto',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity by changing the alpha value
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
    marginTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 6,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
  profile: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    height: 80,
    borderTopLeftRadius: 60, // Adjust this value to make the curve more or less pronounced
    borderTopRightRadius: 60, // Adjust this value to make the curve more or less pronounced
  },
  profileAvatar: {
    width: 110,
    height: 110,
    borderRadius: 9999,
    position: 'absolute',
    top: 5, // Adjust the position to move the avatar up
    zIndex: 2,
  },
  profileName: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    borderRadius: 8,
    padding: 5,
    position: 'absolute',
    top: 60,
    zIndex: 2,
  },
  profileEmail: {
    marginTop: 55,
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    position: 'absolute',
    top: 85,
    zIndex: 2,
  },
  scrollViewContent: {
    paddingTop: 100,
  },
  section: {
    paddingTop: 15,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: 'purple',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#8B8B8B',
    marginRight: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
});

// import React, { useState } from 'react';
// import { StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Switch, Image, Modal, FlatList, ImageBackground } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import profileback from '../assets/images/profileback.png';
// import background from '../assets/images/background.png';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import cotact from '../assets/images/cotact.png';
// import editprofile from '../assets/images/editprofile.png';
// import laguage from '../assets/images/laguage.png';
// import mode from '../assets/images/mode.png';
// import help from '../assets/images/help.png';

// // Define EditProfile component
// function EditProfile() {
//   // Your EditProfile component logic here
//   return (
//     <View>
//       <Text>Edit Profile Page</Text>
//     </View>
//   );
// }

// // Stack Navigator for navigation between screens
// const Stack = createStackNavigator();

// // Profile component
// export default function Profile() {
//   const navigation = useNavigation();

//   const [form, setForm] = useState({
//     darkMode: false,
//     emailNotifications: true,
//     pushNotifications: false,
//     language: 'English',
//   });

//   const [languageModalVisible, setLanguageModalVisible] = useState(false);

//   const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

//   const handleLanguageSelect = (language) => {
//     setForm({ ...form, language });
//     setLanguageModalVisible(false);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
//       <ImageBackground source={profileback} resizeMode="cover" style={styles.image}>
//         <View style={styles.overlay} />
//         <View style={styles.header}>
//           <Text style={styles.title}>Coordinator Profile</Text>
//         </View>
//         <View style={styles.profile}>
//           <Image
//             alt=""
//             source={{
//               uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
//             }}
//             style={styles.profileAvatar}
//           />
//           <Text style={styles.profileName}>John Doe</Text>
//           <Text style={styles.profileEmail}>Class Name and Section</Text>
//         </View>
//       </ImageBackground>

//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Preferences</Text>
//           <View style={styles.sectionBody}>
//             <View style={[styles.rowWrapper, styles.rowFirst]}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('EditProfile')} // Navigate to EditProfile screen
//                 style={styles.row}>
//                 <View style={[styles.rowIcon, { }]}>
//                   <Image
//                     source={editprofile}
//                     style={{ width: 22, height: 22,  }}
//                   />
//                 </View>
//                 <Text style={styles.rowLabel}>Edit profile</Text>
//                 <View style={styles.rowSpacer} />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => setLanguageModalVisible(true)}
//                 style={styles.row}>
//                 <View style={[styles.rowIcon, {  }]}>
//                   <Image
//                     source={laguage}
//                     style={{ width: 22, height: 22 }}
//                   />
//                 </View>
//                 <Text style={styles.rowLabel}>Language</Text>
//                 <View style={styles.rowSpacer} />
//                 <Text style={styles.rowValue}>{form.language}</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.rowWrapper}>
//               <View style={styles.row}>
//                 <View style={[styles.rowIcon]}>
//                   <Image
//                     source={mode}
//                     style={{ width: 22, height: 22,  }}
//                   />
//                 </View>
//                 <Text style={styles.rowLabel}>Dark Mode</Text>
//                 <View style={styles.rowSpacer} />
//                 <Switch
//                   onValueChange={(darkMode) => setForm({ ...form, darkMode })}
//                   value={form.darkMode}
//                 />
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Notifications</Text>
//           <View style={styles.sectionBody}>
//             <View style={[styles.rowWrapper, styles.rowFirst]}>
//               <TouchableOpacity
//                 onPress={() => {
//                   // handle onPress
//                 }}
//                 style={styles.row}>
//                 <View style={[styles.rowIcon]}>
//                   <Image
//                     source={help}
//                     style={{ width: 22, height: 22,  }}
//                   />
//                 </View>
//                 <Text style={styles.rowLabel}>Help & Support</Text>
//                 <View style={styles.rowSpacer} />
//                 <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.rowWrapper}>
//               <TouchableOpacity
//                 onPress={() => {
//                   // handle onPress
//                 }}
//                 style={styles.row}>
//                 <View style={[styles.rowIcon,]}>
//                   <Image
//                     source={cotact}
//                     style={{ width: 22, height: 22,  }}
//                   />
//                 </View>
//                 <Text style={styles.rowLabel}>Contact Us</Text>
//                 <View style={styles.rowSpacer} />
//                 <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <Modal
//         visible={languageModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setLanguageModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Choose Language</Text>
//             <FlatList
//               data={languages}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => handleLanguageSelect(item)}
//                   style={styles.languageOption}>
//                   <Text style={styles.languageText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         </View>
//       </Modal>

//       {/* Navigation for the EditProfile screen */}
//       <Stack.Navigator>
//         <Stack.Screen name="EditProfile" component={EditProfile} />
//       </Stack.Navigator>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   // Your styles here
//   container: {
//         paddingVertical: 0,
//         paddingHorizontal: 0,
//         flexGrow: 1,
//         flexShrink: 1,
//         flexBasis: 0,
//       },
//       image: {
//         width: '100%',
//         height: 'auto',
//         position: 'relative',
//       },
//       overlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity by changing the alpha value
//       },
//       header: {
//         paddingLeft: 24,
//         paddingRight: 24,
//         marginBottom: 12,
//         marginTop: 0,
//       },
//       title: {
//         fontSize: 32,
//         fontWeight: '700',
//         color: 'white',
//         marginBottom: 6,
//         textAlign: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//       },
//       subtitle: {
//         fontSize: 15,
//         fontWeight: '500',
//         color: 'white',
//         textAlign: 'center',
//         justifyContent: 'center',
//       },
//       profile: {
//         padding: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderTopWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: 'black',
//         height: 80,
//         borderTopLeftRadius: 60, // Adjust this value to make the curve more or less pronounced
//         borderTopRightRadius: 60, // Adjust this value to make the curve more or less pronounced
//       },
//       profileAvatar: {
//         width: 110,
//         height: 110,
//         borderRadius: 9999,
//         position: 'absolute',
//         top: 5, // Adjust the position to move the avatar up
//         zIndex: 2,
//       },
//       profileName: {
//         marginTop: 50,
//         fontSize: 20,
//         fontWeight: '600',
//         color: 'black',
//         borderRadius: 8,
//         padding: 5,
//         position: 'absolute',
//         top: 60,
//         zIndex: 2,
//       },
//       profileEmail: {
//         marginTop: 55,
//         fontSize: 16,
//         fontWeight: '400',
//         color: 'black',
//         position: 'absolute',
//         top: 85,
//         zIndex: 2,
//       },
//       scrollViewContent: {
//         paddingTop: 100,
//       },
//       section: {
//         paddingTop: 15,
//       },
//       sectionTitle: {
//         marginVertical: 8,
//         marginHorizontal: 24,
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#a7a7a7',
//         textTransform: 'uppercase',
//         letterSpacing: 1.2,
//       },
//       sectionBody: {
//         paddingLeft: 24,
//         backgroundColor: '#fff',
//         borderTopWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: '#e3e3e3',
//         borderRadius: 20,
//         marginLeft: 15,
//         marginRight: 15,
//         shadowColor: 'purple',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 3,
//         elevation: 5,
//       },
//       row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         paddingRight: 16,
//         height: 50,
//       },
//       rowWrapper: {
//         borderTopWidth: 1,
//         borderColor: '#e3e3e3',
//       },
//       rowFirst: {
//         borderTopWidth: 0,
//       },
//       rowIcon: {
//         width: 30,
//         height: 30,
//         borderRadius: 4,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: 12,
//       },
//       rowLabel: {
//         fontSize: 17,
//         fontWeight: '500',
//         color: '#000',
//       },
//       rowSpacer: {
//         flexGrow: 1,
//         flexShrink: 1,
//         flexBasis: 0,
//       },
//       rowValue: {
//         fontSize: 17,
//         fontWeight: '500',
//         color: '#8B8B8B',
//         marginRight: 4,
//       },
//       modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       },
//       modalContent: {
//         width: 300,
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         elevation: 5,
//       },
//       modalTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginBottom: 10,
//         textAlign: 'center',
//       },
//       languageOption: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//       },
//       languageText: {
//         fontSize: 16,
//         color: '#333',
//       },
// });
