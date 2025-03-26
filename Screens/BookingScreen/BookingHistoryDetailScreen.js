import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SectionList,
  Image,
  Alert,
  Share,
} from 'react-native';
import {Svg} from 'react-native-svg';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import BusTimeBg from '../assets/BusTimeBg';
import BluedashLine from '../assets/BluedashLine';
import {FlatList} from 'react-native-gesture-handler';
import BusTimeDisplay from '../assets/BusTimeDisplay';
import RNFetchBlob from 'react-native-blob-util';
import { downloadFile } from './DownloadFile';
import moment from 'moment';

const BookingHistoryDetailScreen = ({visible, onClose, isTripStatus, Data,onSubmit}) => {
  const [selectedGender, setSelectedGender] = useState(null);

  console.log('Data' + Data);
  const DATA = [
    {
      title: 'Main dishes',
      data: [
        {name: 'Mithun (M)', seat: 24},
        {name: 'kumar1', seat: 25},
        {name: 'Ganesh', seat: 26},
        {name: 'Ganesh1', seat: 26},
        {name: 'Ganesh2', seat: 26},
      ],
    },
  ];

  const [inputValue, setInputValue] = useState('');

  const handleSubmission = () => {
    onSubmit(inputValue);  // Pass the input value back to the parent component
     onClose();  // Close the modal after submission
  };


  const onShare = async () => {
    try {
      const result = await Share.share({
        url:'https://www.figma.com/design/Rvnet2sk2hYHtygXO8we1b/React-Native-design?node-id=0-1&t=pIfJCnAfnvs5wrGB-0',
        message:
          'Designed exclusively for travellers, TBS’s pioneering technology consolidates your bus booking into one easy-to-use platform, custom built to your exact requirements.'      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };




  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={{flex: 1, width: '100%'}}
          onPress={onClose}></TouchableOpacity>
        <View style={styles.modalContent}>
          <ImageBackground
            source={backgroundImage}
            style={{width: '100%', resizeMode: 'cover'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 5,
                marginHorizontal: 20,
                marginTop: 20,
              }}>
              <Text style={[{textAlign: 'left'}, styles.cityText]}>
                Coimbatore
              </Text>
              <Text style={[{textAlign: 'right'}, styles.cityText]}>
                Chennai
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
                marginHorizontal: 20,
              }}>
              <Text style={[{textAlign: 'left'}, styles.subCityText]}>
                Gandhipuram 1{' '}
              </Text>
              <Text style={[{textAlign: 'right'}, styles.subCityText]}>
                Koyambedu
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 40,
                marginHorizontal: 20,
                marginBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 13, color: '#1F487C', textAlign: 'left'}}>
                  20 Feb
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#1F487C',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}>
                  18:30
                </Text>
              </View>
              <View
                style={{
                  position: 'relative',
                  flex: 1,
                  paddingHorizontal: 5,
                  height: 41,
                  bottom: 0,
                }}>
                <BusTimeDisplay width="100%" height="100%" />
                <Text
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    width: '100%',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 12,
                  }}>
                  10:30 Hrs
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 13, color: '#1F487C', textAlign: 'right'}}>
                  21 Feb
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#1F487C',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}>
                  01:30
                </Text>
              </View>
            </View>
            <Svg style={{height: 3}}>
              <BluedashLine width="100%" height="100%" />
            </Svg>
            <View style={{width: '100%'}}>
              <ImageBackground
                source={
                  isTripStatus === 'COMPLETED'
                    ? require('../assets/completedBg.png')
                    : isTripStatus === 'UPCOMING'
                    ? require('../assets/UpcomingBg.png')
                    : isTripStatus === 'CANCELLED' ? require('../assets/CancelledBg.png') : null
                }
                style={{width: '100%', resizeMode: 'cover'}}>
                <SectionList
                  style={{minHeight: 280, marginBottom: 40}}
                  sections={DATA}
                  keyExtractor={(item, index) => item + index}
                  scrollEnabled
                  renderItem={({item}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 5,
                        marginHorizontal: 20,
                      }}>
                      <Text style={[{textAlign: 'left'}, styles.title]}>
                        {item.name}
                      </Text>
                      <Text style={[{textAlign: 'right'}, styles.title]}>
                        {item.seat}
                      </Text>
                    </View>
                  )}
                  renderSectionHeader={({section: {title}}) => (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={styles.header}>{'IntrCity SmartBus'}</Text>
                      <Text style={styles.subheader}>
                        {'Non AC Seater/Sleeper (2+1) - 2 seats'}
                      </Text>
                    </View>
                  )}
                  renderSectionFooter={({section: {title}}) => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginHorizontal: 20,
                          marginTop: 15,
                        }}>
                        <Text
                          style={[{textAlign: 'left'}, styles.ticketSeatText]}>
                          Ticket #{' '}
                        </Text>
                        <Text
                          style={[{textAlign: 'right'}, styles.ticketSeatText]}>
                          TT6T1234678
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 10,
                          marginHorizontal: 20,
                        }}>
                        <Text
                          style={[{textAlign: 'left'}, styles.ticketSeatText]}>
                          PNR #{' '}
                        </Text>
                        <Text
                          style={[{textAlign: 'right'}, styles.ticketSeatText]}>
                          1234567
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 20,
                          marginHorizontal: 20,
                        }}>
                        <Text
                          style={[{textAlign: 'left'}, styles.ticketSeatText]}>
                          Fare{' '}
                        </Text>
                        <Text
                          style={[{textAlign: 'right'}, styles.TotalFareText]}>
                          ₹ 1714.15
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 50,
                          width: '100%',
                          gap:13,
                          paddingHorizontal:40,
                          // justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={onShare}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#1F487C',
                            flex:1,
                            borderRadius: 24,
                            height: 49,
                            paddingHorizontal: 30,
                          }}>
                          <Image
                            source={require('../assets/ShareIcons.png')}
                            style={{width: 20, height: 22, resizeMode: 'cover'}}
                          />
                          <Text
                            style={{
                              fontSize: 17,
                              paddingLeft: 15,
                              fontWeight: '600',
                              fontFamily: 'Inter',
                              textAlign: 'center',
                              color: '#FFFFFF',
                              fontStyle: 'normal',
                            }}>
                            Share your Ticket
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleSubmission}
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../assets/DownloadIcon.png')}
                            style={{width: 32, height: 32, resizeMode: 'cover'}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  stickySectionHeadersEnabled={false}
                  stickyHeaderHiddenOnScroll
                />
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxHeight: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cityText: {
    fontSize: 16,
    color: '#1F487C',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  subCityText: {
    color: '#1F487C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  ticketSeatText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#1F487C',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    lineHeight: 25,
  },
  TotalFareText: {
    fontSize: 17,
    color: '#1F487C',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    lineHeight: 25,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    color: '#1F487C',
    textAlign: 'center',
    lineHeight: 25,
  },
  subheader: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    color: '#1F487C',
    textAlign: 'center',
    lineHeight: 22,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    color: '#1F487C',
    lineHeight: 22,
  },
});

export default BookingHistoryDetailScreen;
