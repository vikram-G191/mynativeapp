import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import ProfileComponent from '../component/ProfileComponent';

const HelpModel = ({ visible, onPress, closeModel }) => {


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


  return (
    <Modal animationType='slide' transparent={true} visible={visible}  >

      <View style={styles.centeredView}>
        <TouchableOpacity style={{ flex: 1 }} onPress={closeModel}>

        </TouchableOpacity>
        {/* <ImageBackground source={require('../assets/appBackgroundImage.png')} style={{ height: '100%'}} > */}
        <View style={styles.modalView}>
          <ImageBackground
            source={require('../assets/appBackgroundImage.png')}
            style={{
              backgroundColor: '#ffffff',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              gap: 10,
            }}
          >
            <Text style={styles.modalText}>Help</Text>
            <ProfileComponent title={'Mail us'} image={require('../assets/mail.png')} value={'info@theebusstand.com'} onPress={handleEmailPress} titleStyle={styles.titleText} valueStyle={styles.titleText} divider={true} />
            <ProfileComponent title={'Call us'} image={require('../assets/phone.png')} value={'+91 9988776655'} onPress={handlePhonePress} titleStyle={styles.titleText} valueStyle={styles.titleText} divider={true} />
          </ImageBackground>
        </View>
        {/* </ImageBackground> */}
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',

  },
  modalView: {
    // height: 60,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 30,
    display: 'flex',
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    color: '#1F487C',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  },
  modalText: {
    color: '#1F487C',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'left',
  },
});

export default HelpModel;