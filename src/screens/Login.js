import {Formik} from 'formik';
import {SafeAreaView, View, TextInput,Text, Button} from 'react-native';
import {object,string,email} from 'yup';

const Login = () => {
    const userSchemaValidation = object({
        email:string().email("Invalid email").required("Email is required"),
        password:string().min(4,"password must have atleast 4 characters").max(8,"password can have atmost 8 characters").required("password is required")
    })
  return (
    <SafeAreaView className="border-2 border-red-600 min-h-full">
      <Formik
        initialValues={{
            email: '',
            password:''
        }}
        validationSchema={userSchemaValidation}
        onSubmit={values => {
          console.log(values);
        }}>
        {({handleChange, handleBlur, handleSubmit, values,errors,touched}) => (
          <View className="px-2 py-5 flex-1 flex-col gap-4">
            <View className="flex-1 border-2  ">
                <View className="">
                    <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    values={values.email}
                    className="border-2"
                    />
                    {touched.email && errors.email && (
                        <Text className="text-red-600">{errors.email}</Text>
                    )}
                </View>
                <View>
                    <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    values={values.password}
                    className="border-2  "
                    secureTextEntry
                    />
                    {touched.password && errors.password && (
                        <Text className="text-red-600">{errors.password}</Text>
                    )                
                    }
                </View>
            </View>
            <View>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
