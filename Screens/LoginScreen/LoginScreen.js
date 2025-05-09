import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  StatusBar,
  BackHandler,
  Alert,
} from 'react-native';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import Svg from 'react-native-svg';
import DropDownicone from '../assets/DropDownicone';
import {ErrorMessage, Field, Formik} from 'formik';
import * as Yup from 'yup';
import {
  decryptData,
  decryptOpenSSL,
  encryptData,
} from '../component/EncryptDecrypt/Encrypt-Decrypt';
import {GetMobileByMail, SendMessage} from '../API/TBSapi/Login/Login';
import {storeName, storeUserId} from '../Utils/STorage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [toggleButton, setToggleButton] = useState(1); // 1 for phone, 2 for email

  const values = {
    phone: '',
    email: '',
  };
  // storeUserId("2323232323")
  const validationSchemaPhone = Yup.object({
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits') // Only numbers, exactly 10 digits
      .matches(/^[6789]/, 'Phone number must start with 6, 7, 8, or 9') // Starts with 6, 7, 8, or 9
      .required('Phone number is required'),
  });

  const validationSchemaEmail = Yup.object({
    email: Yup.string()
      .email('Invalid email format') // Checks if the email is in a valid format
      .required('Email is required'), // Ensures the email field is not empty
  });

  const getValidationSchema = () => {
    return toggleButton === 1 ? validationSchemaPhone : validationSchemaEmail;
  };
  useFocusEffect(
    React.useCallback(() => {
      // const onBackPress = () => {
      //   if (navigation.canGoBack()) {
      //     navigation.goBack();
      //   } else {
      //     Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      //       {
      //         text: 'Cancel',
      //         onPress: () => null,
      //         style: 'cancel',
      //       },
      //       {text: 'YES', onPress: () => BackHandler.exitApp()},
      //     ]);
      //   }
      //   return true;
      // };
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, [navigation]),
  );

  const handleSubmit = async values => {
    // console.log(decryptData("U2FsdGVkX18JzoYdListMzXgz1LrZrHoullWB6Clf79IIYTM3ALMEGPSjuImW4ca") ,23454,"encrypteddata");
    console.log(values, 'allvalues');
    console.log(values, 'numbermail');
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const random = generateOTP();

    try {
      storeName('vikram');
      // Handle OTP generation and navigation
      // const response = await SendMessage(values?.phone, random);
      // setOTPValid(random);
      // if (response.data.success === true) {
      // navigation.navigate('OTPScreen', { otp: random, phone: values.phone })
      // } else {
      //   setErrors({ phone: 'Please enter a valid 10-digit phone number' });
      // }

      if (toggleButton === 1) {
        const encData = encryptData(values.phone);
        console.log(encryptData(values.phone), 'encrypted datatata');
        // console.log(decryptData(encData), "decrypted datatatat");
        const response = await SendMessage(values.phone, random);
        // setOTPValid(random);
        const decRes = decryptData(response?.data);
        const parsedRes = JSON?.parse(decRes);
        console.log(parsedRes, parsedRes.success, 'response data');
        if (parsedRes?.success === true) {
          navigation.navigate('OTPScreen', {
            otp: random,
            phone: values.phone,
            response: parsedRes,
            toggleButton: toggleButton,
          });
        } else {
          setErrors({phone: 'Please enter a valid 10-digit phone number'});
        }
      } else {
        const encData = encryptData(values.email);
        const response = await GetMobileByMail(encData);
        const parsedmobile = JSON.parse(response);
        if (parsedmobile.typeId === 1) {
          const response = await SendMessage(
            parsedmobile.mobile_number,
            random,
          );
          // setOTPValid(random);
          const decRes = decryptData(response?.data);
          const parsedRes = JSON?.parse(decRes);
          if (parsedRes?.success === true) {
            navigation.navigate('OTPScreen', {
              otp: random,
              phone: parsedmobile.mobile_number,
              toggleButton: toggleButton,
            });
          }
        } else {
          navigation.navigate('PhoneNumberScreen', {
            email: values.email,
            toggleButton: toggleButton,
          });
          // navigation.navigate('LoginPassengerDetails',{email:values.email, toggleButton:toggleButton})
          console.log(encryptData(values.email), 'encrypted datatata');
          console.log(decryptData(encData), 'decrypted datatatat');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: "358198261652-knv8475jo1c241jrmvma7kmp0qofvj8r.apps.googleusercontent.com", // from Firebase project settings > web client
  //     offlineAccess: true,
  //   });
  // }, []);

  // const signInWithGoogle = async() => {
  //   // try {
  //   //   await GoogleSignin.hasPlayServices();
  //   //   const { idToken } = await GoogleSignin.signIn();
  //   //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   //   const user = await auth().signInWithCredential(googleCredential);
  //   //   console.log('✅ Signed in:', user.user);
  //   // } catch (error) {
  //   //   console.error('❌ Google Sign-In Error:', error);
  //   // }
  //   try {
  //     console.log("no 1");

  //     await GoogleSignin.hasPlayServices();
  //     console.log("no 2");
  //     // console.log(await GoogleSignin.signIn());
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log("no 3");
  //     console.log('User Info:', userInfo);
  //     if (!userInfo.idToken) {
  //       console.log("No idToken found. User might have cancelled sign-in.");
  //       return;
  //     }

  //     const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
  //     console.log("no 4");
  //     await auth().signInWithCredential(googleCredential);
  //     console.log("no 5");
  //     console.log("User signed in with Google");
  //   } catch (error) {
  //     console.log("cache");

  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("User cancelled the login flow");
  //     } else {
  //       console.error("Google Sign-In Error:", error);
  //     }
  //   }
  // };

  const [user, setUser] = useState(null);

  async function signInWithGoogle() {
    try {
      // Check if your device supports Google Play services
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const res = await auth().signInWithCredential(googleCredential);
      console.log('Google Sign-in successful', res.user);
      setUser(res.user);
    } catch (error) {
      if (error.code === 'SIGN_IN_CANCELLED') {
        // user cancelled the login flow
        console.log('User cancelled Google sign-in');
      } else if (error.code === 'IN_PROGRESS') {
        // operation (e.g. sign in) is in progress already
        console.log('Google sign-in in progress');
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        // play services not available or outdated
        Alert.alert(
          'Error',
          'Google Play Services are not available on this device.',
        );
      } else {
        console.error('Error during Google sign-in', error);
        Alert.alert('Error', 'Google sign-in failed. Please try again.');
      }
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.revokeIdToken();
      await auth().signOut();
      setUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out with Google', error);
      Alert.alert('Error', 'Error signing out.');
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/login.png')}
        style={styles.topImage}>
        <TouchableOpacity
          // onPress={() => navigation.goBack()}
          style={{marginTop: 50, marginRight: 20}}>
          {/* <Image source={require('../assets/close.png')} /> */}
        </TouchableOpacity>
      </ImageBackground>

      <ImageBackground source={backgroundImage} style={styles.bottomImage}>
        <Formik
          initialValues={values}
          validationSchema={getValidationSchema()} // This dynamically changes based on toggleButton state
          enableReinitialize={true} // Ensures form is reinitialized on validation schema change
          onSubmit={handleSubmit}>
          {({values, handleChange, errors, touched, handleSubmit}) => {
            return (
              <View style={{flex: 1, width: '100%', height: '100%'}}>
                <View style={{marginTop: 10}}>
                  <Text style={styles.text}>SignUp for amazing discounts & cashbacks !!</Text>
                </View>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={
                      toggleButton === 1
                        ? styles.phonetoggle
                        : styles.notemailtoggle
                    }
                    onPress={() => setToggleButton(1)}>
                    <Text
                      style={
                        toggleButton === 1
                          ? styles.phonetoggletext
                          : styles.notemailtoggletext
                      }>
                      Phone
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      toggleButton === 2
                        ? styles.emailtoggle
                        : styles.notphonetoggle
                    }
                    onPress={() => setToggleButton(2)}>
                    <Text
                      style={
                        toggleButton === 2
                          ? styles.emailtoggletext
                          : styles.notphonetoggletext
                      }>
                      Email
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{margin: 20}}>
                  <View>
                    {toggleButton === 1 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          borderBottomWidth: 2,
                          borderColor: '#1f487C',
                          backgroundColor: '#fff',
                          borderRadius: 10,
                          gap: 5,
                          marginBottom: 10,
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            left: 5,
                            color: '#1f487c',
                          }}>
                          +91
                        </Text>
                        <Svg
                          style={{
                            height: 15,
                            width: 15,
                            alignSelf: 'center',
                            left: 7,
                          }}>
                          <DropDownicone width="100%" height="100%" />
                        </Svg>
                        <View
                          style={{
                            width: 1,
                            height: '60%',
                            backgroundColor: '#888',
                            alignSelf: 'center',
                            marginHorizontal: 8,
                          }}
                        />
                        <TextInput
                          name="phone"
                          style={styles.textInput}
                          value={values?.phone}
                          keyboardType="number-pad"
                          onChangeText={handleChange('phone')}
                          placeholder="Enter phone number"
                          placeholderTextColor="#1f487c"
                          maxLength={10}
                        />
                        <ErrorMessage
                          name="phone"
                          render={msg => (
                            <Text
                              style={{
                                color: 'red',
                                fontSize: 12,
                                position: 'absolute',
                                top: 42,
                                left: 10,
                              }}>
                              {msg}
                            </Text>
                          )}
                        />
                      </View>
                    ) : (
                      <View>
                        <Field
                          name="email"
                          style={styles.emailInputBox}
                          placeholder="Enter your email"
                          component={TextInput}
                          value={values?.email}
                          placeholderTextColor="#1F487C"
                          onChangeText={handleChange('email')}
                        />
                        <ErrorMessage
                          name="email"
                          render={msg => (
                            <Text
                              style={{
                                color: 'red',
                                fontSize: 12,
                                position: 'absolute',
                                top: 44,
                                left: 10,
                              }}>
                              {msg}
                            </Text>
                          )}
                        />
                      </View>
                    )}
                  </View>

                  <View
                    style={{alignSelf: 'center', width: '100%', marginTop: 10}}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}>
                      <Text style={styles.buttonText}>GENERATE OTP</Text>
                    </TouchableOpacity>
                  </View>

                  {/* <View style={{ marginTop: 10 }}>
                    <Text style={styles.text1}>OR, Connect using Google</Text>
                  </View>
<TouchableOpacity onPress={signInWithGoogle}>


                  <Image
                    source={require('../assets/GoogleIcone.png')}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                  />
                  </TouchableOpacity> */}
                  <View style={{marginTop: 20}}>
                    <Text style={styles.text2}>
                      By Signing up, you agree to our Terms and{' '}
                    </Text>
                    <Text style={styles.text2}>
                      Conditions and Privacy Policy
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 20,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      bottom: 15,
                      backgroundColor: '#1F487C',
                    }}></View>
                  <TouchableOpacity
                  // onPress={() => navigation.navigate('LoginPassengerDetails')}
                  >
                    <Text style={styles.text}>HAVE A REFERRAL CODE?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#1F487C',
  },
  button: {
    backgroundColor: '#1F487C',
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  topImage: {
    flex: 3.5,
  },
  bottomImage: {
    flex: 6.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5FFF1',
  },
  text: {
    color: '#1F487C',
    fontSize: 18,
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign:"center",
  
    marginLeft:-10,
    paddingHorizontal:10,
    justifyContent:"center",
  },
  text1: {
    color: '#1F487C',
    fontSize: 14,
    fontWeight: '400',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text2: {
    color: '#1F487C',
    fontSize: 14,
    fontWeight: '600',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  phonetoggle: {
    height: 40,
    backgroundColor: '#1f487c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  emailtoggle: {
    height: 40,
    backgroundColor: '#1F487C',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
  notphonetoggle: {
    height: 40,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },

  notemailtoggle: {
    height: 40,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  notphonetoggletext: {
    color: 'black',
  },
  notemailtoggletext: {
    color: 'black',
  },
  phonetoggletext: {
    color: 'white',
  },
  emailtoggletext: {
    color: 'white',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  emailInputBox: {
    borderColor: '#1F487c',
    borderBottomWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#1F487c',
    height: 45,
    marginBottom: 10,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
