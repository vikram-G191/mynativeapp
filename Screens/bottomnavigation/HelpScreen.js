import React, { useCallback, useState } from "react";
import { SafeAreaView, Alert, View, TouchableOpacity, Linking, Text, Image, StyleSheet, ScrollView, ImageBackground, Keyboard, InputAccessoryView, StatusBar, BackHandler } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Svg } from 'react-native-svg';
import BackWhite from '../assets/BackWhite';
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import { getEmail, getName, getPhone, getTokenId, getUserId } from "../Utils/STorage";
import { help } from "../API/TBSapi/MyAccount/Help";


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name can't be longer than 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  terms: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters long")
    .max(250, "Message cannot be more than 250 characters")
    .required("Description is required"),
});


const HelpScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const inputAccessoryViewID = 'uniqueID';
  const [token, setToken] = useState('');
  // const [userId, setUserId] = useState()
  const [mobileNo, setMobileNo] = useState()
  const [formKey, setFormKey] = useState(0);

  

  useFocusEffect(
    useCallback(() => {
      setFormKey(prev => prev + 1);
  
      getName().then((name) => {
        setName(name);
      });
  
      getPhone().then((num) => {
        setMobileNo(num);
      });
  
      getEmail().then((mailid) => {
        setEmailAddress(mailid);
      });
  
      getTokenId().then((token) => {
        setToken(token);
      });
  
      // ✅ Force navigate to Profile screen on hardware back press
      const onBackPress = () => {
        navigation.navigate('ProfileScreen');
        return true; // prevent default back behavior
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
  
      return () => backHandler.remove();

    }, [navigation])
);


  const handlePhonePress = async () => {
    const phoneNumber = 'tel:+919566677702'; // Replace with your phone number

    const canOpen = await Linking.canOpenURL(phoneNumber);
    if (canOpen) {
      Linking.openURL(phoneNumber).catch(err =>
        Alert.alert('Error', 'Failed to open phone dialer: ' + err.message)
      );
    } else {
      Alert.alert('Error', 'Phone dialer is not available on this device.');
    }
  };

  const handleEmailPress = async () => {
    const email = 'mailto:support@thebusstand.com';
    const canOpen = await Linking.canOpenURL(email);
    if (canOpen) {
      Linking.openURL(email).catch(err => Alert.alert('Error', 'Failed to open email client: ' + err.message));
    } else {
      Alert.alert('Error', 'No email client is available on this device.');
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await help(values, token);
      console.log("Mail sent successfully:", response);
  
      // Reset only message and terms
      resetForm({
        values: {
          name: values.name, // Keep existing name
          email: values.email, // Keep existing email
          message: '',
          terms: false,
        }
      });
    } catch (err) {
      console.log("Error sending mail:", err);
    }
  };



  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="#1F487C"
      />
      <View style={styles.bgView}>
        <View style={styles.navigationView}>
          <ImageBackground
            source={require('../assets/HeadBg.png')}
            style={styles.topImageBg}
            imageStyle={{
              resizeMode: 'cover',
            }}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                  <BackWhite width="100%" height="100%" />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={styles.topTitle}>Help & Support</Text>
            </View>
          </ImageBackground>
        </View>
        <ImageBackground source={require('../assets/appBackgroundImage.png')} style={{ height: '100%', width: '100%' }} >
          <KeyboardAwareScrollView style={{ flex: 1 }}
            contentContainerStyle={styles.innerContainer}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}>

            <View style={styles.ScroView}>
              <View>
                <Text style={styles.firstText}>Get in Touch</Text>
              </View>

              <View>
                <Text style={styles.contentText}>If you have any inquiries get in touch with us. We’ll be happy to help you.</Text>
              </View>

              <TouchableOpacity style={styles.phoneView} onPress={handlePhonePress}>


                <Image source={require('../assets/phone.png')} style={{ width: 24, height: 25, marginHorizontal: 25 }} />
                <View style={styles.phoneTextView}>
                  <Text style={styles.phoneText}>+91 9566677702
  
                  </Text>
                </View>

              </TouchableOpacity>


              <TouchableOpacity style={styles.phoneView} onPress={handleEmailPress}>
                <Image source={require('../assets/mail.png')} style={{ width: 25, height: 20, marginHorizontal: 25 }} />

                <View style={styles.phoneTextView}>
                  <Text style={styles.phoneText}>support@thebusstand.com</Text>
                </View>
              </TouchableOpacity>


              <View>
                <Text style={styles.firstText}>Feel free to ask your query :)</Text>
              </View>
              <Formik
              enableReinitialize
              key={formKey}
      initialValues={{
        name: name || '',
        email: emailAddress || '',
        message: '',
        terms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <>
          <View style={styles.helpView}>
            <View>
              <Text style={styles.nameText}>Name*</Text>
              <TextInput
                style={styles.nameTexfield}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View>
              <Text style={styles.nameText}>Email*</Text>
              <TextInput
                style={styles.nameTexfield}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View>
              <Text style={styles.nameText}>Message*</Text>
              <TextInput
                style={[styles.nameTexfield, { minHeight: 86 }]}
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                maxLength={252}
                multiline
                inputAccessoryViewID={inputAccessoryViewID}
              />
              {touched.message && errors.message && <Text style={styles.errorText1}>{errors.message}</Text>}

              <InputAccessoryView nativeID={inputAccessoryViewID}>
                <View style={{
                  backgroundColor: '#ebecec',
                  padding: 3,
                  borderTopWidth: 1,
                  borderColor: '#D3D3D3',
                  alignItems: 'flex-end',
                }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#D3D3D3',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                    }}
                    onPress={() => Keyboard.dismiss()}
                  >
                    <Text style={{
                      color: 'black',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>Done</Text>
                  </TouchableOpacity>
                </View>
              </InputAccessoryView>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={() => setFieldValue('terms', !values.terms)}>
                <Image
                  source={
                    values.terms
                      ? require('../assets/selectTick.png')
                      : require('../assets/UnCheckBlockIcon.png')
                  }
                  style={{ width: 15, height: 15, marginRight: 8 }}
                />
              </TouchableOpacity>
              <Text style={{
                fontSize: 12,
                lineHeight: 15,
                fontWeight: '500',
                fontFamily: 'Inter',
                color: '#1F487C',
              }}>
                I accept the Terms & Conditions
              </Text>
            </View>
            {touched.terms && errors.terms && <Text style={styles.errorText2}>{errors.terms}</Text>}
          </View>

          <TouchableOpacity style={styles.submitView} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
            </View>

          </KeyboardAwareScrollView>
      
        </ImageBackground>
      </View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1F487C',
  },
  bgView: { flex: 1, backgroundColor: '#E5FFF1', marginTop: 40 },
  ScroView: {
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 15,
  },
  firstText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: 'Inter',
    color: '#1F487C',
    textAlign: 'center',
  },
  contentText: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'Inter',
    color: '#1F487C',
  },
  phoneView: {
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: '#1F487C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
  },
  phoneText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    fontFamily: 'Inter',
    color: '#1F487C',
    textAlign: 'left',
  },
  helpView: {
    borderWidth: 0.5,
    borderColor: '#1F487C',
    borderRadius: 15,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    display: 'flex',
    gap: 15
  },
  nameText: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 22,
    color: '#1F487C',
  },
  nameTexfield: {
    borderRadius: 10,
    fontFamily: 'Inter',
    padding: 14,
    backgroundColor: 'rgba(214, 235, 255, 0.5)',
    color: '#1F487C'
  },
  submitView: {
    backgroundColor: '#1F487C',
    borderRadius: 25,
    padding: 15,
    marginBottom: 40,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#FFFFFF',
    fontFamily: 'Inter',
    textAlign: 'center'
  }, navigationView: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#1F487C',
  },
  topImageBg: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 5,
    overflow: 'hidden',
    position: 'relative',
    bottom: 5,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  topViewTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginRight: 30,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
  },
errorText:{
  position: 'absolute',
  marginTop: 78,
  marginLeft: 10,
  fontSize: 12,
  color: '#B00020',
  fontFamily: 'Avenir-Medium',
},
errorText1:{
  position: 'absolute',
  marginTop: 110,
  marginLeft: 10,
  fontSize: 12,
  color: '#B00020',
  fontFamily: 'Avenir-Medium',
},
errorText2:{
  position: 'absolute',
  marginTop: 355,
  marginLeft: 30,
  fontSize: 12,
  color: '#B00020',
  fontFamily: 'Avenir-Medium',
}

})

export default HelpScreen