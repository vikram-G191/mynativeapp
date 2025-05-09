import React, { useEffect, useState } from 'react';
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
  Dimensions,
} from 'react-native';
import { Svg } from 'react-native-svg';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import BusTimeBg from '../assets/BusTimeBg';
import BluedashLine from '../assets/BluedashLine';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import BusTimeDisplay from '../assets/BusTimeDisplay';
import RNFetchBlob from 'react-native-blob-util';
import { downloadFile } from './DownloadFile';
import moment from 'moment';
import { GetViewTicketID } from '../API/TBSapi/MyAccount/MyBooking';
import { TICKET_DETAILS } from '../Redux/Store/Type';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '@rneui/base';
import { downloadTicket, ShareTicket } from '../API/TBSapi/MyAccount/Profile';
import UpComming from '../assets/UpComming';
import Completed from '../assets/Completed';
import Cancelled from '../assets/Cancelled';

const { width, height } = Dimensions.get('screen')
const BookingHistoryDetailScreen = ({ visible, onClose, isTripStatus, Data, onSubmit, item, setDownloadNo, currentTab }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  console.log(item?.ticket_no, 'cancellingHeroos')
  // console.log('Data' + Data);
  console.log(currentTab, 'currentTab___')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    GetViewTicketID(item?.ticket_no, dispatch, setLoader)
  }, [item?.ticket_no])

  const [inputValue] = useState('');

  const handleSubmission = (ticekt_no) => {
    onSubmit(ticekt_no);  // Pass the input value back to the parent component
    // onClose();  // Close the modal after submission
    downloadTicket(ticekt_no)
    console.log('downloadTicket', ticekt_no)
  };

  // const [details, setDetails] = useState()


  const details = useSelector((state) => state?.productReducer?.ticket_details)

  console.log(details, 'detailsssss')
  useEffect(() => {
    // setLoader(true)
    if (details?.status === 'success') {
      setLoader(false)
    }
  }, [details])
  console.log(details, 'details_details')
  // console.log(details, "details_details")

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       url: 'https://www.figma.com/design/Rvnet2sk2hYHtygXO8we1b/React-Native-design?node-id=0-1&t=pIfJCnAfnvs5wrGB-0',
  //       message:
  //         'Designed exclusively for travellers, TBS’s pioneering technology consolidates your bus booking into one easy-to-use platform, custom built to your exact requirements.'
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     Alert.alert(error.message);
  //   }
  // };

  const onShare = async (filePath) => {
    try {
      // Share the downloaded file
      const result = await Share.share({
        url: `file://${filePath}`, // Share the local file path
        message:
          'Designed exclusively for travellers, TBS’s pioneering technology consolidates your bus booking into one easy-to-use platform, custom built to your exact requirements.',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared successfully
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed action
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // const downloadAndShareTicket = async (id) => {
  //   try {
  //     const filePath = await downloadTicket(id); // Assuming downloadTicket returns the filePath
  //     await onShare(filePath); // Now share the downloaded file
  //     console.log(filePath, 'file_path')
  //   } catch (err) {
  //     console.error('Error downloading or sharing ticket:', err);
  //   }
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const weekday = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    // Create the formatted string: "Thursday, March, 20, 2025"
    return `${weekday}, ${month}, ${day}, ${year}`;
  };
  const dispatch = useDispatch()

  // const fetchTicketDetails = async () => {
  //   try {
  //     const response = await G
  //     // setDetails(response)
  //     dispatch({ type: TICKET_DETAILS, payload: response })
  //     return response
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }



  const ticketData = details?.ticketInfo?.ticket_det || [];

  // Structure data for SectionList
  const DATA = [
    {
      title: "Passenger Information",
      data: ticketData.map((item) => ({
        Passenger_Name: item.Passenger_Name,
        Seat_Num: item.Seat_Num,
        Gender: item.GENDER_TYPE,
        Age: item.Age,
      })),
    },
  ];

  // console.log(ticketData, 'passengers_data')

  const calculateDuration = (startTime, endTime) => {
    // Parse start and end times using Moment.js
    const start = moment(startTime, "hh:mm A"); // 12-hour format (e.g., "08:20 PM")
    const end = moment(endTime, "hh:mm A"); // 12-hour format (e.g., "04:00 AM")

    // If the end time is before the start time, add 1 day to the end time
    if (end.isBefore(start)) {
      end.add(1, "days"); // Add a day to end time
    }

    // Calculate the duration between the two times
    const duration = moment.duration(end.diff(start));

    // Get the hours and minutes from the duration
    const hours = duration.hours();
    const minutes = duration.minutes();

    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} >

      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={{ flex: 1, width: '100%' }}
          onPress={onClose}></TouchableOpacity>
        <View style={styles.modalContent}>
          <ImageBackground
            source={backgroundImage}
            style={{ width: '100%', resizeMode: 'cover' }}>
            <View
              style={{ zIndex: -2, position: 'absolute', top: 125, left: -5, width: width * 11, height: height * 1, resizeMode: 'contain' }}
            >
              {currentTab === '1' ?
                <Svg>
                  <UpComming width={width * 1} height={height * 0.5} />
                </Svg>
                : currentTab === '2' ?
                  <Svg>
                    <Completed width={width * 1} height={height * 0.5} />
                  </Svg> : currentTab === '3' ?
                    <Svg>
                      <Cancelled width={width * 1} height={height * 0.5} />
                    </Svg> : ''
              }
            </View>
            {/* <Image
              source={require('../assets/completedBg.png')}
              style={{ position: 'absolute', top: 125, left: -10, width: width * 1, height: height * 0.5, resizeMode: 'contain' }} /> */}
            {loader === false ?
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 5,
                    marginHorizontal: 20,
                    marginTop: 20,
                  }}>
                  <Text style={[{ textAlign: 'left' }, styles.cityText]}>
                    {details?.ticketInfo?.source_name}
                  </Text>

                  <Text style={[{ textAlign: 'right' }, styles.cityText]}>
                    {details?.ticketInfo?.dest_name}
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
                  <Text style={[{ textAlign: 'left' }, styles.subCityText]}>
                    {details?.ticketInfo?.Boarding_Place_Name}{' '}
                  </Text>
                  <Text style={[{ textAlign: 'right' }, styles.subCityText]}>
                    {item?.droping_point_name}
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
                      style={{ fontSize: 13, color: '#1F487C', textAlign: 'left' }}>
                      {`${formatDate(item?.depature_date).split(',')[2]} ${formatDate(item?.depature_date).split(',')[1]}`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#1F487C',
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      {moment(
                        details?.ticketInfo?.Start_Time,
                        "HH:mm:ss"
                      ).format("hh:mm A")}
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
                      {calculateDuration(
                        // moment(
                        //   ticketDetails?.ticketInfo?.Start_Time,
                        //   "HH:mm:ss"
                        // ).format("hh:mm A")
                        details?.ticketInfo?.Start_Time,
                        moment(
                          details?.ticketInfo?.Arr_Time,
                          "HH:mm:ss"
                        ).format("hh:mm A")
                      )}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{ fontSize: 13, color: '#1F487C', textAlign: 'right' }}>
                      {`${formatDate(item?.arrival_date).split(',')[2]} ${formatDate(item?.arrival_date).split(',')[1]}`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#1F487C',
                        fontWeight: 'bold',
                        textAlign: 'right',
                      }}>
                      {moment(
                        details?.ticketInfo?.Arr_Time,
                        "HH:mm:ss"
                      ).format("hh:mm A")}
                    </Text>
                  </View>
                </View>
                <Svg style={{ height: 3 }}>
                  <BluedashLine width="100%" height="100%" />
                </Svg>
                <View style={{ width: '100%' }}>
                  <ImageBackground
                    source={
                      isTripStatus === 'COMPLETED'
                        ? require('../assets/completedBg.png')
                        : isTripStatus === 'UPCOMING'
                          ? require('../assets/UpcomingBg.png')
                          : isTripStatus === 'CANCELLED' ? require('../assets/CancelledBg.png') : null
                    }
                    style={{ width: '100%', resizeMode: 'cover' }}>
                    <Text>Passenger Name :</Text>
                    {/* <SectionList
                    style={{ minHeight: 280, marginBottom: 40 }}
                    sections={DATA}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingVertical: 5,
                          marginHorizontal: 20,
                        }}>

                        <Text style={[{ textAlign: 'left' }, styles.title]}>{item.Passenger_Name}</Text>
                        <Text style={[{ textAlign: 'right' }, styles.title]}>{item.Seat_Num}</Text>
                      </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 10,
                          marginBottom: 5,
                        }}>
                        <Text style={styles.header}>{details?.ticketInfo?.operatorname}</Text>
                        <Text style={styles.subheader}>
                          {details?.ticketInfo?.bustype}
                        </Text>
                      </View>
                    )}
                    renderSectionFooter={({ section: { title } }) => (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            marginTop: 15,
                          }}>
                          <Text style={[{ textAlign: 'left' }, styles.ticketSeatText]}>
                            Ticket No:{' '}
                          </Text>
                          <Text style={[{ textAlign: 'right' }, styles.ticketSeatText]}>
                            {details?.ticketInfo?.Ticket_no}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            marginBottom: 15,
                          }}>
                          <Text style={[{ textAlign: 'left' }, styles.ticketSeatText]}>
                            PNR No:{' '}
                          </Text>
                          <Text style={[{ textAlign: 'right', width: 300, paddingRight: 30 }, styles.ticketSeatText]}>
                            {details?.ticketInfo?.operator_pnr}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            marginBottom: 20,
                          }}>
                          <Text style={[{ textAlign: 'left' }, styles.ticketSeatText]}>
                            Fare{' '}
                          </Text>
                          <Text style={[{ textAlign: 'right' }, styles.TotalFareText]}>
                            {`₹ ${item.total_fare}`}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: 50,
                            width: '100%',
                            gap: 13,
                            paddingHorizontal: 40,
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={onShare}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#1F487C',
                              flex: 1,
                              borderRadius: 24,
                              height: 49,
                              paddingHorizontal: 30,
                            }}>
                            <Image
                              source={require('../assets/ShareIcons.png')}
                              style={{ width: 20, height: 22, resizeMode: 'cover' }}
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
                              style={{ width: 32, height: 32, resizeMode: 'cover' }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    stickySectionHeadersEnabled={false}
                    stickyHeaderHiddenOnScroll
                  /> */}
                    <SectionList
                      style={{ minHeight: 280, marginBottom: 40 }}
                      sections={DATA}
                      keyExtractor={(item, index) => index.toString()}
                      scrollEnabled
                      renderItem={({ item }) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 5,
                            marginHorizontal: 20,
                          }}>
                          {/* Passenger Name */}
                          <Text style={[{ textAlign: 'left' }, styles.title]}>
                            {item.Passenger_Name}
                          </Text>

                          {/* Age/Gender */}
                          {/* <Text style={[{ textAlign: 'center' }, styles.title]}>
                          {`${item.Age} / ${item.Gender}`}
                        </Text> */}

                          {/* Seat Number */}
                          <Text style={[{ textAlign: 'right' }, styles.title]}>
                            {item.Seat_Num}
                          </Text>
                        </View>
                      )}
                      renderSectionHeader={({ section: { title } }) => (
                        <>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              // padding: 10,
                              paddingBottom: 5
                              // marginBottom: 5,
                            }}>
                            <Text style={styles.header}>{details?.ticketInfo?.operatorname}</Text>
                            <Text style={styles.subheader}>
                              {details?.ticketInfo?.bustype}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // alignItems: 'center',

                            }}>
                            <Text style={{
                              color: '#1F487C', textAlign: 'left', fontSize: width * height * 0.000062, fontWeight: '500', marginLeft: width * height * 0.000062
                            }}>
                              Name :
                            </Text>

                            <Text style={{
                              color: '#1F487C', textAlign: 'right', fontSize: width * height * 0.000062, fontWeight: '500', marginRight: width * height * 0.000062
                            }}>
                              Seat No :
                            </Text>

                          </View>
                          <Svg style={{ height: 3 }}>
                            <BluedashLine width="100%" height="100%" />
                          </Svg>
                        </>
                      )}
                      renderSectionFooter={({ section: { title } }) => (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: 20,
                              marginTop: 15,
                            }}>
                            <Text style={[{ textAlign: 'left' }, styles.ticketSeatText]}>
                              Ticket No:{' '}
                            </Text>
                            <Text style={[{ textAlign: 'right' }, styles.ticketSeatText]}>
                              {details?.ticketInfo?.Ticket_no}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: 20,
                              marginBottom: 15,
                            }}>
                            <Text style={[{ textAlign: 'left' }, styles.ticketSeatText]}>
                              PNR No:{' '}
                            </Text>
                            <Text
                              style={[
                                {
                                  textAlign: 'right',
                                  flexWrap: 'wrap',
                                  width: width * 0.7
                                },
                                styles.ticketSeatText,
                              ]}>
                              {details?.ticketInfo?.operator_pnr}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: 20,
                              marginBottom: 20,
                            }}>
                            <Text style={[{ textAlign: 'left' }, styles.ticketSeatText]}>
                              Fare{' '}
                            </Text>
                            <Text style={[{ textAlign: 'right' }, styles.TotalFareText]}>
                              {`₹ ${item.total_fare}`}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              height: 50,
                              width: '100%',
                              gap: 13,
                              paddingHorizontal: 40,
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={() => ShareTicket(details?.ticketInfo?.Ticket_no)}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#1F487C',
                                flex: 1,
                                borderRadius: 24,
                                height: 49,
                                paddingHorizontal: 30,
                              }}>
                              <Image
                                source={require('../assets/ShareIcons.png')}
                                style={{ width: 20, height: 22, resizeMode: 'cover' }}
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
                              onPress={() => handleSubmission(details?.ticketInfo?.Ticket_no)}
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={require('../assets/DownloadIcon.png')}
                                style={{ width: 32, height: 32, resizeMode: 'cover' }}
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
              </>
              :
              <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                {[...Array(1)].map((_, index) => (
                  <View key={index}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                      <View style={styles.SkeletonView}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                          }}>
                          <Skeleton
                            circle
                            width={40}
                            height={40}
                            style={{ marginTop: -10 }}
                          />
                          <Skeleton
                            width={250}
                            height={8}
                            style={{ marginTop: -25 }}
                          />
                        </View>
                        <Skeleton
                          width={250}
                          height={8}
                          style={{ marginTop: -20, marginLeft: 56 }}
                        />
                      </View>
                    </View>

                    {/* Divider line (not after last item) */}
                    {index !== 9 && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#ccc',
                          width: '90%',
                          alignSelf: 'center',
                          marginBottom: 10,
                        }}
                      />
                    )}
                  </View>
                ))}
              </ScrollView>
            }
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
    fontWeight: '800',
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
  SkeletonView: {
    height: 25,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    // borderWidth: 1, // Border thickness
    borderColor: '#1F487C', // Border color
    borderStyle: 'solid', // (Optional) Default is solid
  },
});

export default BookingHistoryDetailScreen;
