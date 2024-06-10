import * as React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity, // Import TouchableOpacity
  Alert // Import Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import India from '../assets/images/India.png';
import DatePicker from 'react-native-date-picker';


const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dob: Yup.string().required("Date of birth is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  university: Yup.string().required("University is required"),
  degree: Yup.string().required("Degree is required"),
});

export default function EditProfile() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}></View>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            dob: "",
            phoneNumber: "",
            bloodGroup: "AB+",
            gender: "Female",
            university: "",
            degree: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Show an alert when the form is submitted
            console.log(values);
            // Alert.alert("Profile Updated", "Your profile has been updated successfully.");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
            <View style={styles.content}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Edit profile</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full name</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last name</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
              </View>
              {/* <View style={styles.dateContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={handleChange("dob")}
                  onBlur={handleBlur("dob")}
                  value={values.dob}
                  placeholder="MM/DD/YYYY"
                />
                <Image
                  style={styles.dateIcon}
                  source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/23cf6cf8a47ace8810d44735506bd5b2f018d92ffc2ce49f594300a2dc207900?apiKey=5571847fc48447bbad48faecb3b890d9&" }}
                />
              </View> */}
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.inputText}>
                  <Text>{values.dob ? values.dob : "MM/DD/YYYY"}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  maximumDate={new Date()}
                  onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                    setFieldValue("dob", date.toLocaleDateString("en-US"));
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <Image
                  style={styles.dateIcon}
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/23cf6cf8a47ace8810d44735506bd5b2f018d92ffc2ce49f594300a2dc207900?apiKey=5571847fc48447bbad48faecb3b890d9&",
                  }}
                />
              </View>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.label}>Phone number</Text>
                <View style={styles.phoneInput}>
                  <Image
                    style={styles.phoneIcon}
                    source={India}
                  />
                  <TextInput
                    style={styles.inputText}
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                    className="w-[200]"
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.halfInputContainer}>
                  <Text style={styles.label}>Blood Group</Text>
                  <Picker
                    selectedValue={values.bloodGroup}
                    onValueChange={(itemValue) => setFieldValue("bloodGroup", itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="O-" value="O-" />
                  </Picker>
                </View>
                <View style={styles.halfInputContainer}>
                  <Text style={styles.label}>Gender</Text>
                  <Picker
                    selectedValue={values.gender}
                    onValueChange={(itemValue) => setFieldValue("gender", itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Prefer not to say" value="Prefer not to say" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>University</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={handleChange("university")}
                  onBlur={handleBlur("university")}
                  value={values.university}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Degree</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={handleChange("degree")}
                  onBlur={handleBlur("degree")}
                  value={values.degree}
                />
              </View>
              {/* Replace Text with TouchableOpacity */}
              <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
                <Text style={styles.updateButtonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.footer}>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
  },
  headerImage: {
    width: 46,
    height: 40,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 28,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  titleIcon: {
    width: 24,
    height: 24,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#4E2973',
    borderRadius: 8,
    padding: 8,
    marginTop: 15,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 12,
    color: '#1a1a1a',
  },
  inputText: {
    fontSize: 14,
    color: '#1a1a1a',
    marginTop: 5,
    height: 40,
    marginLeft: 10, // Adjust this height to ensure the TextInput is visible
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4E2973',
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
    backgroundColor: 'white',
  },
  dateIcon: {
    width: 24,
    height: 24,
  },
  phoneInputContainer: {
    borderWidth: 1,
    borderColor: '#4E2973',
    borderRadius: 8,
    padding: 8,
    marginTop: 15,
    backgroundColor: 'white',
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    width: 40,
    height: 24,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  halfInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4E2973',
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: 'white',
    marginRight: 4,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  updateButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E2973',
    borderRadius: 20,
    paddingVertical: 12,
    marginTop: 36,
  },
  updateButtonText: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 40,
    backgroundColor: '#f5f5f5',
  },
  footerLine: {
    height: 2,
    backgroundColor: '#1a1a1a',
    width: 108,
    borderRadius: 1,
  },
});


