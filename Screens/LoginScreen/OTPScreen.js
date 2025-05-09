import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import Svg from 'react-native-svg';
import DropDownicone from '../assets/DropDownicone';
import {getName, storeUserId} from '../Utils/STorage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {decryptData} from '../component/EncryptDecrypt/Encrypt-Decrypt';
import {getUserDataByMobile} from '../API/TBSapi/Login/Login';
import messaging from '@react-native-firebase/messaging';
import { PostNotificationToken } from '../API/TBSapi/PushNotification/PushNotification';

const OTPScreen = ({navigation}) => {
  const navigate = useNavigation();
  const route = useRoute();
  // const navigation = useNavigation()
  const {otp, phone, response, toggleButton, email} = route.params;
  // console.log(otp, 'otpp');
  // const name = getName()
  // console.log(name);

  // const username = getName().then(id => {
  //   // setUserId(id);
  //   console.log('nameeee', id);
  // });

  // console.log(getName(), 'normalloggg');

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const input5Ref = useRef();
  const input6Ref = useRef();
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const [noficationToken,setNotificationToken] = useState("")

  const [value1, setValue1] = React.useState('');
  const [value2, setValue2] = React.useState('');
  const [value3, setValue3] = React.useState('');
  const [value4, setValue4] = React.useState('');

  const [value5, setValue5] = React.useState('');
  const [value6, setValue6] = React.useState('');

  const handleKeyPress = (
    inputRef,
    nextInputRef,
    prevInputRef,
    value,
    setValue,
  ) => {
    if (value.length === 0 && prevInputRef && prevInputRef.current) {
      // If the user deleted the content, move the focus to the previous TextInput
      prevInputRef.current.focus();
    } else if (value.length === 1) {
      // If the user entered a character, move the focus to the next TextInput
      nextInputRef.current.focus();
    }
    setValue(value);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setShowResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const isOtpFilled = () => {
    return (
      value1 !== '' &&
      value2 !== '' &&
      value3 !== '' &&
      value4 !== '' &&
      value5 !== '' &&
      value6 !== ''
    );
  };

  const getBorderColor = value => {
    return value !== '' ? '#1F487C' : '#1F487C'; // Change the border color as needed
  };

   async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  
    const getToken = async() =>{
      const token = await messaging().getToken()
      setNotificationToken(token)
      console.log("token_value" , token);
      
    }
  
    useEffect(()=>{
      requestUserPermission()
      getToken()
    },[])
  

  const handleResendOtp = async () => {
    setValue1('');
    setValue2('');
    setValue3('');
    setValue4('');
    setValue5('');
    setValue6('');

    setTimer(60);
    setShowResend(false);
  };
  const handlesendOtp = async () => {
    const resultString = `${value1}${value2}${value3}${value4}${value5}${value6}`;
    if (resultString == otp) {
      // storeUserId("123456");
      // console.log('hello', value1);
      // navigation.navigate('BottomTabs');
      const postToken =  await PostNotificationToken(noficationToken);
      const mobileCheck = await getUserDataByMobile(phone);
      parseData = JSON.parse(mobileCheck);
      if (parseData?.status === 2) {
        // ProfileScreen
        navigation.navigate('BottomTabs');
      } else {
        navigation.navigate('LoginPassengerDetails', {
          phone: phone,
          toggleButton: toggleButton,
          email: email ? email : '',
          userId: parseData.tbs_passenger_id,
        });
      }
      // console.log(parseData?.status, 'mobilecheck');
      //
    } else {
      Alert.alert('invalid OTP');
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/login.png')}
        style={styles.topImage}>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabs', params: {screen: 'HomeStack'}}],
            });
          }}
          style={{marginTop: 50, marginRight: 20}}>
          {/* <Image source={require('../assets/close.png')} /> */}
        </TouchableOpacity>
      </ImageBackground>

      <ImageBackground source={backgroundImage} style={styles.bottomImage}>
        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.text}>Verify OTP</Text>
          </View>
          <View style={{margin: 20}}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{fontSize: 14, fontWeight: '400', color: '#1F487C80'}}>
                MOBILE NUMBER
              </Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <View style={{flex: 1}}>
                  <Text style={{color: '#1F487C'}}>{phone}</Text>
                  {/* <Text>{response.message} hi </Text> */}
                </View>
                <TouchableOpacity
                  style={{flex: 1, alignItems: 'flex-end'}}
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={{color: '#1F487C'}}>EDIT</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 20,
                  color: '#1F487C80',
                }}>
                ONE TIME PASSWORD
              </Text>
              <View style={styles.OtpView}>
                <TextInput
                  style={[
                    styles.BoxView,
                    {borderColor: getBorderColor(value1)},
                  ]}
                  maxLength={1}
                  value={value1}
                  keyboardType="number-pad"
                  selectionColor="#000"
                  returnKeyType="done"
                  // keyboardAppearance=""
                  onChangeText={text =>
                    handleKeyPress(input1Ref, input2Ref, null, text, setValue1)
                  }
                  ref={input1Ref}
                  scrollEnabled={false}
                />
                <TextInput
                  style={[
                    styles.BoxView,
                    {borderColor: getBorderColor(value2)},
                  ]}
                  maxLength={1}
                  value={value2}
                  keyboardType="number-pad"
                  selectionColor="#000"
                  returnKeyType="done"
                  onChangeText={text =>
                    handleKeyPress(
                      input2Ref,
                      input3Ref,
                      input1Ref,
                      text,
                      setValue2,
                    )
                  }
                  ref={input2Ref}
                />
                <TextInput
                  style={[
                    styles.BoxView,
                    {borderColor: getBorderColor(value3)},
                  ]}
                  maxLength={1}
                  value={value3}
                  keyboardType="number-pad"
                  selectionColor="#000"
                  returnKeyType="done"
                  onChangeText={text =>
                    handleKeyPress(
                      input3Ref,
                      input4Ref,
                      input2Ref,
                      text,
                      setValue3,
                    )
                  }
                  ref={input3Ref}
                />
                <TextInput
                  style={[
                    styles.BoxView,
                    {borderColor: getBorderColor(value4)},
                  ]}
                  maxLength={1}
                  value={value4}
                  keyboardType="number-pad"
                  selectionColor="#000"
                  returnKeyType="done"
                  onChangeText={text =>
                    handleKeyPress(
                      input4Ref,
                      input5Ref,
                      input3Ref,
                      text,
                      setValue4,
                    )
                  }
                  ref={input4Ref}
                />
                <TextInput
                  style={[
                    styles.BoxView,
                    {borderColor: getBorderColor(value5)},
                  ]}
                  maxLength={1}
                  value={value5}
                  keyboardType="number-pad"
                  selectionColor="#000"
                  returnKeyType="done"
                  onChangeText={text =>
                    handleKeyPress(
                      input5Ref,
                      input6Ref,
                      input4Ref,
                      text,
                      setValue5,
                    )
                  }
                  ref={input5Ref}
                />
                <TextInput
                  style={[
                    styles.BoxView,
                    {borderColor: getBorderColor(value6)},
                  ]}
                  maxLength={1}
                  value={value6}
                  keyboardType="number-pad"
                  selectionColor="#000"
                  returnKeyType="done"
                  onChangeText={text =>
                    handleKeyPress(
                      input6Ref,
                      input6Ref,
                      input5Ref,
                      text,
                      setValue6,
                    )
                  }
                  ref={input6Ref}
                />
              </View>
            </View>

            <View style={{alignSelf: 'center', width: '100%', marginTop: 20}}>
              <TouchableOpacity onPress={handlesendOtp} style={styles.button}>
                <Text style={styles.buttonText}>VERIFY OTP</Text>
              </TouchableOpacity>
            </View>

            {showResend && (
              <TouchableOpacity onPress={handleResendOtp}>
                <View style={{marginTop: 25}}>
                  <Text style={styles.text1}>RESEND OTP</Text>
                </View>
              </TouchableOpacity>
            )}

            <View style={{marginTop: 25}}>
              {/* <Text style={styles.text2}>You can resend OTP in 15 secs</Text> */}
              <View style={styles.timerView}>
                <Text style={styles.text2}>
                  You can resend OTP in {`00:${String(timer).padStart(2, '0')}`}{' '}
                  secs
                </Text>
              </View>
            </View>
          </View>
        </View>
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

    fontSize: 16,
    // Adding shadow for Material Design look
  },
  button: {
    backgroundColor: '#1F487C', // White background
    borderRadius: 10, // Square rounded corners
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 0,
    // Adding shadow for a subtle Material Design look
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  OtpView: {
    marginTop: 10,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: '#000'
  },
  BoxView: {
    fontSize: 18,
    height: 40,
    width: 40,
    borderRadius: 8,
    borderColor: '#2187D1',
    borderWidth: 0.5,
    textAlign: 'center',
    // backgroundColor: '#000'
    backgroundColor: '#fff',
    color: '#1F487C',
  },
  timerView: {
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', // Text color
    textAlign: 'center',
  },
  topImage: {
    flex: 3.5,
    // justifyContent: 'center',
    alignItems: 'flex-end',
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
});

export default OTPScreen;
