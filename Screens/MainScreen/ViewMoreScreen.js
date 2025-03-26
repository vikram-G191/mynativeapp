import React, { useState } from 'react';
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
} from 'react-native';
import { Svg } from 'react-native-svg';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import BusTimeBg from '../assets/BusTimeBg';
import BluedashLine from '../assets/BluedashLine';
import { FlatList } from 'react-native-gesture-handler';
import BusTimeDisplay from '../assets/BusTimeDisplay';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ViewMoreScreen = ({ visible, onClose, Data, busData }) => {
  const Boardinginfo = busData?.boarding_info || []; // Ensure it's an array
  const Droppinginfo = busData?.dropping_info || [];
  const Amenities = busData?.Amenities;

  const formattedBoarding = Boardinginfo.map(item => {
    const parts = item.split('^'); // Split by '^'
    const [boarding_point, time, id, fullinfo] = item.split('^');
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Text>{boarding_point}</Text>
        <Text style={[styles.BoardingTime, { textAlign: 'right' }]}>{time}</Text>
        {/* <Text>{id}</Text> */}
        {/* <Text>{fullinfo}</Text> */}
      </View>
    );
    //   boarding_point: parts[0] || "",
    //   time: parts[1] || "",
    //   idL: parts[2] || "",
    //   landMark: parts[3] || ""
    // };
    // boarding_point,
    // time,
    // id
  });


  const formattedDroppinginfo = Droppinginfo.map(item => {
    const parts = item.split('^'); // Split by '^'
    const [dropping_point, time, id, fullinfo] = item.split('^');
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Text>{dropping_point}</Text>
        <Text style={[styles.DroppingTime, { textAlign: 'right' }]}>{time}</Text>
        {/* <Text>{id}</Text> */}
        {/* <Text>{fullinfo}</Text> */}
      </View>
    );
  });


  const viewListAry = [
    {
      id: '0',
      title: '',
      data: [
        {
          id: '1',
          ListData: [
            {
              id: '1',
              task: 'Boarding/Dropping Point',
            },
            {
              id: '2',
              task: 'Cancellation Policy',
            },
            {
              id: '3',
              task: 'Amenities',
            },
            {
              id: '4',
              task: 'Travel Policy',
            },
          ],
        },
      ],
    },
    // {
    //   id: '1',
    //   title: 'Boarding Points',
    //   data: [
    //     {
    //       id: '1',
    //       task: 'Make a section list tutorial1',
    //     },
    //     {
    //       id: '2',
    //       task: 'Make a section list tutorial2',
    //     },
    //   ],
    // },
    // {
    //   id: '2',
    //   title: 'Dropping Points',
    //   data: [
    //     {
    //       id: '6',
    //       task: 'Make a section list tutorial22',
    //     },
    //   ],
    // },
    {
      id: '1',
      title: 'Boarding Points',
      data: [Boardinginfo],
    },
    {
      id: '2',
      title: 'Dropping Info',
      data: [formattedDroppinginfo],
    },
    {
      id: '3',
      title: 'Cancellation Policy',
      data: [
        {
          id: '18',
          task: 'Make a section list tutorial45',
        },
      ],
    },
    {
      id: '4',
      title: 'Amenities',
      data: [Amenities],
    },
    {
      id: '5',
      title: 'Travel Policy',
      data: [
        {
          id: '116',
          task: 'Make a section list tutorial',
        },
        {
          id: '112',
          task: 'Make a section list tutorial',
        },
        {
          id: '113',
          task: 'Make a section list tutorial Make a section list tutorial',
        },
      ],
    },
  ];

  const [isDroppingRowMore, setDroppingRowMore] = useState(false);

  const [isBoardingRowMore, setBoardingRowMore] = useState(false);

  const AmenitiesList = [
    { amenity_title: 'Water Bottle', amenity_position: 1, icon: 'tint' },
    { amenity_title: 'Blanket', amenity_position: 2, icon: 'bed' },
    { amenity_title: 'TV', amenity_position: 3, icon: 'tv' },
    { amenity_title: 'AC', amenity_position: 4, icon: 'snowflake' },
    { amenity_title: 'Snacks', amenity_position: 5, icon: 'cookie-bite' },
    { amenity_title: 'Charging Point', amenity_position: 6, icon: 'plug' },
    { amenity_title: 'CCTV', amenity_position: 7, icon: 'video' },
    { amenity_title: 'Emergency Exit', amenity_position: 8, icon: 'door-open' },
    { amenity_title: 'Individual TV', amenity_position: 9, icon: 'tv' },
    { amenity_title: 'Hammer', amenity_position: 10, icon: 'hammer' },
    { amenity_title: 'Facial Tissues', amenity_position: 11, icon: 'box-tissue' },
    { amenity_title: 'Pillows', amenity_position: 12, icon: 'bed' },
    {
      amenity_title: 'Fire Extinguisher',
      amenity_position: 13,
      icon: 'fire-extinguisher',
    },
    { amenity_title: 'Reading Light', amenity_position: 14, icon: 'lightbulb' },
    {
      amenity_title: 'GPS Tracking',
      amenity_position: 15,
      icon: 'location-arrow',
    },
    { amenity_title: 'First Aid Box', amenity_position: 16, icon: 'first-aid' },
    { amenity_title: 'Wifi', amenity_position: 17, icon: 'wifi' },
    { amenity_title: 'Hand Sanitizer', amenity_position: 18, icon: 'hands-wash' },
    {
      amenity_title: 'Temperature checks',
      amenity_position: 19,
      icon: 'thermometer-full',
    },
    { amenity_title: 'Social Distancing', amenity_position: 20, icon: 'users' },
    {
      amenity_title: 'Driver Conductor with masks',
      amenity_position: 21,
      icon: 'user-shield',
    },
    { amenity_title: 'Fumigation', amenity_position: 22, icon: 'spray-can' },
    { amenity_title: 'Staff', amenity_position: 23, icon: 'users-cog' },
  ];

  const ViewMoresections = viewListAry.map(section => {
    const dataToShow =
      isBoardingRowMore === false &&
        section.id === '1' &&
        section.data.length >= 2
        ? section.data.slice(0, 1)
        : isDroppingRowMore === false &&
          section.id === '2' &&
          section.data.length >= 2
          ? section.data.slice(0, 1)
          : section.data;
    return {
      ...section,
      data: dataToShow,
    };
  });

  const myListAmenitiesEmpty = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.item}>No Amenities</Text>
      </View>
    );
  };
  function AmenitiesItem({ item, index }) {

    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 15,
          paddingHorizontal: 5,
          alignItems: 'center',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              backgroundColor: '#1F487C',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10, // Add padding for spacing
            }}>
            {/* Use the correct FontAwesome5 icon dynamically */}
            <FontAwesome5
              name={item.icon} // Dynamically set the icon
              size={30} // Set the icon size
              color="#E55959" // Set the icon color
              solid // Ensure solid style is used if needed
            />
          </View>

          {/* Display Amenity Title */}
          <Text style={{ marginTop: 5, fontWeight: 'bold' }}>
            {item.amenity_title}
          </Text>
        </View>
      </View>
    );
  }
  const renderViewMoreItem = ({ item, index, section }) => {
    // Example condition: Render item only if it's in 'Section 1' and starts with 'Item 1'
    if (section.id === '5') {
      return (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(214, 235, 255, 0.5)',
          }}>
          <Text
            style={{
              color: '#001938',
              fontSize: 12,
              fontFamily: 'Inter',
              textAlign: 'left',
              fontWeight: '600',
              padding: 5,
            }}>
            {'Can I travel with my Pet?'}
          </Text>
          <Text
            style={{
              color: '#1F487C',
              fontSize: 12,
              fontFamily: 'Inter',
              textAlign: 'left',
              fontWeight: '400',
              padding: 5,
            }}>
            {
              'Travelling with your pets in the bus is not permitted.Travelling with your pets in the bus is not permitted.'
            }
          </Text>
          <View
            style={{
              marginVertical: 7,
              width: '100%',
              borderBottomColor: '#1F487C',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>
      );
    } else if (section.id === '4') {
      return (
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginBottom: 15,
            borderColor: '#FFFFFF',
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
          }}>
          <FlatList
            numColumns={5}
            key={5}
            bounces={false}
            ListEmptyComponent={myListAmenitiesEmpty}
            // contentContainerStyle={{
            //   flexDirection: 'column',
            //   flexWrap: 'wrap',
            //   alignSelf: 'center',
            // }}
            data={AmenitiesList}
            renderItem={({ item, index }) => {
              return <AmenitiesItem item={item} index={index} />;
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    } else if (section.id === '3') {
      return (
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            padding: 10,
            marginBottom: 15,
            borderColor: '#FFFFFF',
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 15,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 18,
                color: '#1F487C',
              }}>
              {'Cancellation Time'}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 15,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 18,
                color: '#1F487C',
              }}>
              {'Refund Amount'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {'Before 20 - Feb 18:00'}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {'Rs 1190/- @ 85% refund'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {'Between 20 Feb & 21 Feb 10:00'}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {'Rs 980/- @ 70% refund'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                fontStyle: 'normal',
                textAlign: 'left',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {'After 21 Feb - 10:00'}
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '600',
                fontStyle: 'normal',
                textAlign: 'right',
                lineHeight: 14,
                color: '#1F487C',
              }}>
              {'Rs 0/- @ 0% refund'}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(214, 235, 255, 0.5)',
              flex: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                fontStyle: 'normal',
                color: '#1F487C',
              }}>
              {
                'Refund amount is Indicative. \n\nAdditional Rs. 15 per seat cancellation fee is applicable.\n\nPartial cancellation is not allowed.'
              }
            </Text>
          </View>
        </View>
      );
    } else if (section.id === '2') {
      return (
        <View style={{ flex: 1, backgroundColor: 'rgba(214, 235, 255, 0.5)' }}>
          {formattedDroppinginfo.map((item, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
              >
                {/* Location Icon for Each Point */}
                <Image
                  source={require('../assets/LocationIcon.png')}
                  style={{ width: 14, height: 20, marginLeft: 15 }}
                />

                {/* Dropping Point Name */}
                <Text
                  style={{
                    color: '#1F487C',
                    fontSize: 14,
                    fontFamily: 'Inter',
                    textAlign: 'left',
                    lineHeight: 16,
                    fontWeight: '400',
                    paddingLeft: 10,
                    flex: 1, // Ensures proper spacing
                  }}>
                  {formattedDroppinginfo}
                </Text>

                {/* Time - Keeping Your Static Date/Time */}
                <View style={{ width: '50%' }}>
                  <Text
                    style={{
                      color: '#1F487C',
                      fontSize: 14,
                      fontFamily: 'Inter',
                      textAlign: 'right',
                      lineHeight: 16,
                      fontWeight: '400',
                      paddingRight: 10,
                    }}>
                    {'21 Feb, 01:30'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      );
    } else if (section.id === '1') {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'rgba(214, 235, 255, 0.5)',
          }}>
          {/* Left Section: Boarding Points with Icons */}
          <View style={{ width: '50%', flexDirection: 'column', padding: 10 }}>
            {formattedBoarding.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Image
                  source={require('../assets/LocationIcon.png')}
                  style={{ width: 14, height: 20, marginRight: 5 }}
                />
                {item}
              </View>
            ))}
          </View>

          {/* Right Section: Static Date & Time */}
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'flex-end',
              padding: 10,
            }}>
            <Text
              style={{
                color: '#1F487C',
                fontSize: 14,
                fontFamily: 'Inter',
                textAlign: 'right',
                lineHeight: 16,
                fontWeight: '400',
              }}>
              {'21 Feb, 01:30'}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ alignItems: 'flex-start', margin: 15 }}>
            <Text style={styles.title}>{busData?.Traveler_Agent_Name}</Text>

            <Text style={styles.subtitle}>
              <Text style={styles.subtitle}>{busData?.Bus_Type_Name}</Text>
            </Text>
          </View>
          <FlatList
            style={{ marginHorizontal: 10 }}
            bounces={false}
            //columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              flex: 1,
            }}
            data={section.data[0].ListData}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    borderRadius: 6,
                    borderWidth: 1,

                    height: 36,
                    borderColor: '#1F487C',
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 3,
                    margin: 5,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter',
                      color: '#1F487C',
                      fontWeight: '400',
                      lineHeight: 17,
                      textAlign: 'center',
                      paddingHorizontal: 5,
                    }}>
                    {item.task}
                  </Text>
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
  };
  const renderViewSectionHeader = ({ section }) => {
    if (section.id.startsWith('0')) {
      return null; // Return null to render nothing for other sections
    } else {
      return (
        <View
          key={section}
          style={{
            backgroundColor:
              section.id === '1' || section.id === '2' || section.id === '5'
                ? 'rgba(214, 235, 255, 0.5)'
                : 'rgba(0, 0, 0, 0)',
            padding: 15,
          }}>
          <Text
            style={{
              fontWeight: '600',
              color: '#1F487C',
              fontFamily: 'Inter',
              fontSize: 16,
              lineHeight: 19,
            }}>
            {section.title}
          </Text>
        </View>
      );
    }
  };
  const renderViewSectionFooter = ({ section }) => {
    // Example condition: Render section header only if title starts with 'Section 1'
    if (section.id.startsWith('1') || section.id.startsWith('2')) {
      return (
        <TouchableOpacity
          on
          onPress={() => {
            if (section.id === '1') {
              setDroppingRowMore(false);
              setBoardingRowMore(!isBoardingRowMore);
            } else if (section.id === '2') {
              setBoardingRowMore(false);
              setDroppingRowMore(!isDroppingRowMore);
            } else {
              setBoardingRowMore(false);
              setDroppingRowMore(false);
            }
          }}>
          <View style={styles.footerContainer}>
            <View style={styles.footerBgView} />
            <View
              style={{
                borderRadius: 3,
                borderColor: '#1F487C',
                backgroundColor: '#1F487C',
                padding: 4,
              }}>
              <Image
                source={require('../assets/downWhiteArrow.png')}
                style={{
                  width: 10,
                  height: 7,
                  transform: [
                    {
                      rotate:
                        section.id === '1' &&
                          isBoardingRowMore === true &&
                          section.data.length >= 2
                          ? '180deg'
                          : section.id === '2' &&
                            isDroppingRowMore === true &&
                            section.data.length >= 2
                            ? '180deg'
                            : '0deg',
                    },
                  ],
                }}
              />
            </View>
            <View
              style={{
                marginVertical: 7,
                width: '45%',
                borderBottomColor: '#1F487C',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null; // Return null to render nothing for other sections
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.dismissbtn}
          onPress={onClose}></TouchableOpacity>
        <View style={styles.topBgView}>
          <ImageBackground source={backgroundImage} style={styles.ImageBg}>
            <View style={{ flex: 1, position: 'relative', top: 5, bottom: 30 }}>
              <SectionList
                style={{ marginBottom: 5 }}
                sections={ViewMoresections}
                renderItem={renderViewMoreItem}
                renderSectionHeader={renderViewSectionHeader}
                renderSectionFooter={renderViewSectionFooter}
                keyExtractor={(item, index) => item.id}
                stickySectionHeadersEnabled={false}
                stickyHeaderHiddenOnScroll
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  footerBgView: {
    marginVertical: 7,
    width: '45%',
    borderBottomColor: '#1F487C',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  footerContainer: {
    backgroundColor: 'rgba(214, 235, 255, 0.5)',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBgView: {
    width: '100%',
    height: '75%',
    backgroundColor: '#E5FFF1',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  // BoardingTime:{

  // },
  ImageBg: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
  },
  title: {
    color: '#1F487C',
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 19,
    fontWeight: '600',
    paddingVertical: 5,
  },
  subtitle: {
    color: '#1F487C',
    fontWeight: '400',
    lineHeight: 17,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  dismissbtn: { flex: 1, width: '100%', height: '30%' },
});

export default ViewMoreScreen;
