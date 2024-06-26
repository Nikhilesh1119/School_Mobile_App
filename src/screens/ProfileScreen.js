import React, {useContext, useEffect, useState} from 'react';
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
import FeatherIcon from 'react-native-vector-icons/Feather';

import profileback from '../assets/images/profileback.png';
import contact from '../assets/images/contact.png';
import editprofile from '../assets/images/editprofile.png';
import laguage from '../assets/images/laguage.png';
import mode from '../assets/images/mode.png';
import help from '../assets/images/help.png';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  const {logout, ClassName, SectionName} = useContext(AuthContext);
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
    language: 'English',
  });

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [firstname, setFirstName] = useState('');
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const handleLanguageSelect = language => {
    setForm({...form, language});
    setLanguageModalVisible(false);
  };
  const teacherFirstName = async () => {
    setFirstName(await AsyncStorage.getItem('firstname'));
  };
  useEffect(() => {
    teacherFirstName();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <ImageBackground
        source={profileback}
        resizeMode="stretch"
        style={styles.image}>
        <View style={styles.overlay} />
        <View style={styles.header}>
          <Text
            className="font-bold text-xl mb-2 mt-5 text-white text-center justify-center"
            style={{fontFamily: 'Satoshi'}}>
            Coordinator Profile
          </Text>
        </View>
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>{firstname}</Text>
          <Text style={styles.profileClass}>
            Class Coordinator- {ClassName}-{SectionName}
          </Text>
        </View>
      </ImageBackground>
      {/* <ImageBackground
        source={profileback}
        resizeMode="stretch"
        style={styles.image}>
        <View style={styles.header}>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => setStudentModalVisible(true)}
              style={styles.pickerTouchable}>
              <Text style={styles.selectedStudent}>{firstname}</Text>
              <Image source={downarrow} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>Class Name and Section</Text>
        </View>
      </ImageBackground> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
                style={styles.row}>
                <View style={[styles.rowIcon]}>
                  <Image source={editprofile} style={{width: 22, height: 22}} />
                </View>
                <Text style={styles.rowLabel}>Edit profile</Text>
                <View style={styles.rowSpacer} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setLanguageModalVisible(true)}
                style={styles.row}>
                <View style={[styles.rowIcon, {}]}>
                  <Image source={laguage} style={{width: 22, height: 22}} />
                </View>
                <Text style={styles.rowLabel}>Language</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{form.language}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <View style={[styles.rowIcon]}>
                  <Image source={mode} style={{width: 22, height: 22}} />
                </View>
                <Text style={styles.rowLabel}>Dark Mode</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  onValueChange={darkMode => setForm({...form, darkMode})}
                  value={form.darkMode}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section} className="py-3">
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity style={styles.row}>
                <View style={[styles.rowIcon]}>
                  <Image source={help} style={{width: 22, height: 22}} />
                </View>
                <Text style={styles.rowLabel}>Help & Support</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity style={styles.row}>
                <View style={[styles.rowIcon]}>
                  <Image source={contact} style={{width: 22, height: 22}} />
                </View>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity onPress={() => logout()} style={styles.row}>
                <View style={[styles.rowIcon]}>
                  <Image source={contact} style={{width: 22, height: 22}} />
                </View>
                <Text style={styles.rowLabel}>Logout</Text>
                <View style={styles.rowSpacer} />
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
              keyExtractor={item => item}
              renderItem={({item}) => (
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
    flexGrow: 1,
    flexShrink: 1,
  },
  image: {
    width: '100%',
    height: 'auto',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
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
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  profileAvatar: {
    width: 110,
    height: 110,
    borderRadius: 9999,
    position: 'absolute',
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
    fontFamily: 'Satoshi',
  },
  profileClass: {
    marginTop: 65,
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    position: 'absolute',
    top: 85,
    zIndex: 2,
    fontFamily: 'Satoshi',
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
    fontFamily: 'Satoshi',
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
    shadowOffset: {width: 0, height: 2},
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
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    fontFamily: 'Satoshi',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B8B8B',
    marginRight: 4,
    fontFamily: 'Satoshi',
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
    fontFamily: 'Satoshi',
  },
  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  languageText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Satoshi',
  },
});
