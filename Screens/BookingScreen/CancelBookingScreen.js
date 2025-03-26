import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Svg } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput, } from 'react-native-gesture-handler';

import BackWhite from '../assets/BackWhite';
import DownArrow from '../assets/DownArrow';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import CloseRed from '../assets/CloseRed';
import UpArrow from '../assets/UpArrow';

const CancelBookingScreen = (props) => {

  const [ticketNumber, onChangeTicketNumber] = React.useState('');
  const [phoneNumber, onChangePhoneNumber] = React.useState('');

  const [data, setData] = useState([
    { title: "How to cancel my booking?", content: "Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket." },
    { title: "Where can I check the cancellation policy?", content: "Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket." },

  ])
  const [openItem, setOpenItem] = useState(null);

  const [statusVisible, setStatusVisible] = useState(false);


  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');
  };
  const handleItemClick = (index) => {
    setOpenItem(openItem === index ? null : index);
  };
  const renderListItem = ({ item, index }) => {
    // const getItem = item?.faqinfos?.find((each) => each.title)
    return (
      <View style={{ flex: 1 }} key={index} >
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} onPress={() => handleItemClick(index)} >
          <Text style={{ overflow: 'hidden', fontFamily: 'Inter', width: '90%', textAlign: 'left', color: '#1F487C', fontSize: 14, fontWeight: '600', lineHeight: 16, }} >{item.title}
          </Text>
          {
          openItem === index && <UpArrow width={15} height={15} /> || <DownArrow width={15} height={15} /> }
        </TouchableOpacity>

        {openItem === index &&
          <Text style={{ color: '#1F487C', fontFamily: 'Inter', fontSize: 12, textAlign: 'left', padding: 5, fontWeight: '400', lineHeight: 14, maxHeight: openItem === index ? 'auto' : 0, opacity: openItem === index ? 1 : 0, paddingBottom: 5, }} >
            {item.content} </Text>
        }
        <View style={{ height: 1, backgroundColor: 'rgba(31, 72, 124, 0.5)', margin: 10, width: '100%' }} />

      </View>
    )
  }

  const closeBottomView = () => {

    setStatusVisible(false)

  }

  const validateAndSubmit = () => {
    console.log('validateAndSubmit')
    // Basic validation for Ticket Number and Mobile Number
    const ticketNumberIsValid = ticketNumber.trim().length > 0;
    const mobileNumberIsValid = /^[0-9]{10}$/.test(phoneNumber);

    if (!ticketNumberIsValid || !mobileNumberIsValid) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid Ticket Number and Mobile Number (10 digits).'
      );
      return;
    }

    // Handle the form submission if valid
    setStatusVisible(true)
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

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
              onPress={() => props.navigation.goBack()}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                  <BackWhite width="100%" height="100%" />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={styles.topTitle}>Cancel Booking</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.tripInfoview}>
          <ImageBackground
            source={backgroundImage}
            style={{ flex: 1, resizeMode: 'cover', height: '100%', padding: 16 }}>
            <Text style={styles.title}>Enter Ticket Details</Text>
            <Text style={[styles.subtitle, { paddingVertical: 8 }]}>Check your email or SMS for booking confirmation details</Text>
            <View style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
              <View style={{
                backgroundColor:'#FFFFFF',
                flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center',
                borderColor: 'rgba(31, 72, 124, 0.5)', borderRadius: 10, borderWidth: 1, marginVertical: 8
              }}>
                <Image
                  source={require('../assets/ticketnoIcon.png')}
                  style={{ width: 30, height: 30, resizeMode: 'cover', marginLeft: 10 }}
                />
                <TextInput style={styles.input}
                  placeholderTextColor={'rgba(31, 72, 124, 0.5)'}
                  onChangeText={onChangeTicketNumber}
                  value={ticketNumber}
                  maxLength={40}
                  placeholder="Ticket Number"
                  returnKeyType="done"
                  keyboardType="numeric" />
              </View>
              <View style={{
                backgroundColor:'#FFFFFF',
                flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center',
                borderColor: 'rgba(31, 72, 124, 0.5)', borderRadius: 10, borderWidth: 1, marginVertical: 8
              }}>
                <Image
                  source={require('../assets/PhoneIcon.png')}
                  style={{ width: 25, height: 25, resizeMode: 'cover', marginHorizontal: 10 }}
                />
                <TextInput style={styles.input}
                  placeholderTextColor={'rgba(31, 72, 124, 0.5)'}
                  onChangeText={onChangePhoneNumber}
                  returnKeyType="done"
                  value={phoneNumber}
                  maxLength={10}
                  placeholder="Mobile Number"
                  keyboardType="numeric"
                  
                 />
              </View>
              <TouchableOpacity onPress={
                validateAndSubmit
              } style={{
                width: 240,
                height: 46, marginVertical: 15, backgroundColor: '#1F487C', alignItems: 'center', justifyContent: 'center', borderRadius: 22
              }}>
                <Text style={{
                  color: '#FFFFFF', fontSize: 17, fontWeight: '600',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                }}>Submit</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.title, { paddingVertical: 10 }]}>Frequently Asked Questions</Text>
            <View style={{ flex: 1, width: '100%', padding: 10, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: 1, borderColor: '#rgba(31, 72, 124, 0.5)' }}>
              <FlatList
                data={data}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>


          </ImageBackground>

        </View>
      </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        transparent={true}
        visible={statusVisible}
        onRequestClose={closeBottomView}>
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <TouchableOpacity
            style={{ flex: 1, width: '100%' }}
            onPress={closeBottomView}></TouchableOpacity>
          <View style={styles.modalContent}>
            <ImageBackground
              source={backgroundImage}
              style={{ width: '100%', flex: 1, resizeMode: 'cover', padding: 20, alignItems: 'center' }}>

              <TouchableOpacity onPress={() => { setStatusVisible(false) }} style={{ marginVertical: 10 }}>
                <Svg style={{ width: 35, height: 35, borderRadius: 100 }}>
                  <CloseRed width="100%" height="100%" />
                </Svg>
              </TouchableOpacity>
              <Text style={{
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'center',
                color: '#1F487C',
                lineHeight: 25,
                fontFamily: 'Inter'
              }}>Your Booking has been Cancelled</Text>
            </ImageBackground>
          </View>


        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F487C' },
  bgView: { flex: 1, backgroundColor: '#E5FFF1' },
  navigationView: {
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
  operatorView: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
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
  topSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tripInfoview: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 20,
   
  },
  input: {
   fontFamily:'Inter' ,
   color: '#1F487C',
   fontSize:16,
   fontWeight:'400',
   lineHeight:19,
    margin: 5,
    padding: 8,
  }, title: {
    fontSize: 16,
    lineHeight:19,
    color: '#1F487C',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  subtitle: {
    fontSize: 12,
    lineHeight:14,
    color: '#1F487C',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxHeight: '85%',
    minHeight: '20%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
});

export default CancelBookingScreen;
