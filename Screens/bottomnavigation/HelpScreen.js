import React, { useCallback, useState } from "react";
import { SafeAreaView,Alert, View, TouchableOpacity,Linking, Text, Image, StyleSheet, ScrollView, ImageBackground, Keyboard, InputAccessoryView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Svg } from 'react-native-svg';
import BackWhite from '../assets/BackWhite';
import { Button } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HelpScreen = ({navigation}) => {

    const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const inputAccessoryViewID = 'uniqueID';


  const handlePhonePress = async () => {
    const phoneNumber = 'tel:+919988776655'; // Replace with your phone number

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
        const email = 'mailto:info@theebusstand.com';
        const canOpen = await Linking.canOpenURL(email);
        if (canOpen) {
          Linking.openURL(email).catch(err => Alert.alert('Error', 'Failed to open email client: ' + err.message));
        } else {
          Alert.alert('Error', 'No email client is available on this device.');
        }
      };

      const validateAndSubmit = () => {
        // Basic validation for Name, Email, and Message
        const nameIsValid = name.trim().length > 0;
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
        const messageIsValid = message.trim().length > 0;
    
        if (!nameIsValid || !emailIsValid || !messageIsValid) {
          Alert.alert(
            'Validation Error',
            'Please enter a valid Name, Email, and Message.'
          );
          return;
        }
    
        // Handle the form submission if valid
        Alert.alert('Success', 'Your query has been submitted successfully.');
      };

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
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
               
                <KeyboardAwareScrollView style={{flex:1}}
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


                            <Image source={require('../assets/phone.png')} style={{width:24,height:25,marginHorizontal:25}}/>
                            <View style={styles.phoneTextView}>
                                <Text style={styles.phoneText}>+91 9988776655</Text>
                            </View>

                        </TouchableOpacity>

                       
                            <TouchableOpacity style={styles.phoneView} onPress={handleEmailPress}>
                            <Image source={require('../assets/mail.png')} style={{width:25,height:20,marginHorizontal:25}} />

                            <View style={styles.phoneTextView}>
                                <Text style={styles.phoneText}>info@theebusstand.com</Text>
                            </View>
                            </TouchableOpacity>
                       

                        <View>
                            <Text style={styles.firstText}>Feel free to ask your query :)</Text>
                        </View>

                        <View style={styles.helpView} >
                            <View>
                                <Text style={styles.nameText}>Name*</Text>
                                <TextInput style={styles.nameTexfield}  value={name}
          onChangeText={setName} />
                            </View>

                            <View>
                                <Text style={styles.nameText}>Email*</Text>
                                <TextInput style={styles.nameTexfield}  
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address" />
                            </View>
                            <View>
                                <Text style={styles.nameText}>Message*</Text>
                                <TextInput style={[styles.nameTexfield, { minHeight: 86 }]} 
          value={message}
          onChangeText={setMessage}
          maxLength={252}
          multiline 
           inputAccessoryViewID={inputAccessoryViewID} // Linking input to the accessory view
          />
            <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={{backgroundColor: '#ebecec',
    padding: 3,
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'flex-end',}}>
          <TouchableOpacity style= {{ backgroundColor: '#D3D3D3',  // Customize the button background color here
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,}}
            onPress={() => {
              Keyboard.dismiss(); // Dismiss the keyboard when Done is pressed
            }}
            
            
          ><Text style={{ color: 'black',  // Customize the button title (text) color here
            fontSize: 16,
            fontWeight: 'bold',}}>Done</Text>
            </TouchableOpacity>
        </View>
      </InputAccessoryView>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                              <TouchableOpacity onPress={() => setIsActive(!isActive)}>
                              <Image source={
                isActive
                  ? require('../assets/selectTick.png')
                  : require('../assets/UnCheckBlockIcon.png')
              } style={{width:15,height:15,marginRight:8}} />
                              </TouchableOpacity>
                              <Text style={{ fontSize: 12,
                              lineHeight:15,
        fontWeight: '500',
        fontFamily:'Inter',
        color: '#1F487C',}}>I accept the Terms & Conditions</Text>
                            </View>

                        </View>

                        <TouchableOpacity style={styles.submitView} onPress={validateAndSubmit} >
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>

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
    bgView: { flex: 1, backgroundColor: '#E5FFF1' },
    ScroView: {
        display: 'flex',
        paddingHorizontal: 20,
        paddingVertical:10,
        gap: 15,
    },
    firstText: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        fontFamily:'Inter',
        color: '#1F487C',
        textAlign: 'center',
    },
    contentText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
        fontFamily:'Inter',
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
        fontFamily:'Inter',
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
        gap: 10
    },
    nameText: {
        fontSize: 15,
        fontWeight: '400',
        fontFamily:'Inter',
        lineHeight: 22,
        color: '#1F487C',
    },
    nameTexfield: {
        borderRadius: 10,
        fontFamily:'Inter',
        padding: 14,
        backgroundColor: 'rgba(214, 235, 255, 0.5)',

    },
    submitView: {
        backgroundColor: '#1F487C',
        borderRadius: 25,
        padding: 15,
        marginBottom:40,
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        color: '#FFFFFF',
        fontFamily:'Inter',
        textAlign: 'center'
    },  navigationView: {
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
        marginRight:30,
      },
      topTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'white',
      },


})

export default HelpScreen