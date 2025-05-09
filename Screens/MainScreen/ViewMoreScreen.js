import React, {useEffect, useMemo, useRef, useState} from 'react';
import IconSVG from '../SVG/SVG';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  SectionList,
  Image,
  Alert,
} from 'react-native';
import {Svg} from 'react-native-svg';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import BusTimeBg from '../assets/BusTimeBg';
import BluedashLine from '../assets/BluedashLine';
import {FlatList} from 'react-native-gesture-handler';
import BusTimeDisplay from '../assets/BusTimeDisplay';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {calculateDiscountedFare} from '../component/Tbs_Disocunt';

const ViewMoreScreen = ({
  visible,
  onClose,
  Data,
  busData,
  jdate,
  busPrice,
  tbs_discount,
  seatLayoutPage,
  selectedButton,
  setSelectedButton,
  selectBusType,
}) => {
  const Boardinginfo = busData?.boarding_info || []; // Ensure it's an array
  const Droppinginfo = busData?.dropping_info || [];
  const [isBoardingExpanded, setBoardingExpanded] = useState(true);
  const [isDroppingExpanded, setDroppingExpanded] = useState(false);
  //const [selectedButton, setSelectedButton] = useState(null); // Tracks selected button
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const Amenities = busData?.Amenities;
  const cancellationPolicies = busData?.Cancellationpolicy || '';
  const [timeRanges, setTimeRanges] = useState('');
  const [policy, setPolicy] = useState('');

  const scrollViewRef = useRef(null);
  const amenitiesRef = useRef(null);
  const boardingRef = useRef(null);
  const cancellationRef = useRef(null);
  const travelPolicyRef = useRef(null);

  const scrollToSection = ref => {
    if (ref.current && scrollViewRef.current) {
      ref.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          console.log('Measured Y position:', y);
          scrollViewRef.current.scrollTo({y: y, animated: true});
        },
        error => console.error(error),
      );
    }
  };

  const handleButtonPress = task => {
    setSelectedButton(task);
    switch (task) {
      case 'Amenities':
        scrollToSection(amenitiesRef);
        break;
      case 'Bus Stops':
        scrollToSection(boardingRef);
        break;
      case 'Cancel Policy':
        scrollToSection(cancellationRef);
        break;
      case 'Travel Policy':
        scrollToSection(travelPolicyRef);
        break;
      default:
        break;
    }
  };

  const busFare = calculateDiscountedFare(jdate, busPrice, tbs_discount);
  const servicesArray = Amenities ? Amenities.split(',') : [];

  const [splittedPolicy, setSplittedPolicy] = useState({
    Condition: [],
    percentage: [],
  });

  console.log(splittedPolicy, 'splittedPolicy');

  useEffect(() => {
    if (cancellationPolicies) {
      const parts = cancellationPolicies.split('--');
      setTimeRanges(parts[0] || '');
      setPolicy(parts[1] || '');
    }
  }, [cancellationPolicies]);

  useEffect(() => {
    if (timeRanges?.length > 0) {
      const conditions = timeRanges.split('#*#*');
      const percentage = policy.split('#*#*');
      setSplittedPolicy({
        Condition: conditions,
        percentage: percentage,
      });
    }
  }, [timeRanges, policy]);

  console.log(selectBusType, 'Amenities');

  const formattedBoarding = Boardinginfo?.map(item => {
    const [boarding_point, time, id, fullinfo] = item.split('^');
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
        {/* Image */}
        {selectBusType === 'Luxury Coach' || selectBusType === 'lux' ? (
          <Image
            source={require('../assets/LocationIconLux.png')}
            style={{width: 14, height: 20, marginRight: 8}}
          />
        ) : (
          <Image
            source={require('../assets/LocationIcon.png')}
            style={{width: 14, height: 20, marginRight: 8}}
          />
        )}
        {/* Boarding point and Time */}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {/* Boarding Point */}
          <Text
            style={{
              color:
                selectBusType === 'Luxury Coach' || selectBusType === 'lux'
                  ? '#393939'
                  : '#1F487C',
              fontSize: 13,
              fontFamily: 'Inter',
              fontWeight: '400',
              flex: 1, // very important to push time to the right
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {boarding_point}
          </Text>

          {/* Time */}
          <Text
            style={{
              color:
                selectBusType === 'Luxury Coach' || selectBusType === 'lux'
                  ? '#393939'
                  : '#1F487C',
              fontSize: 13,
              fontFamily: 'Inter',
              fontWeight: '400',
              textAlign: 'right',
              marginLeft: 10,
            }}>
            {time}
          </Text>
        </View>
      </View>
    );
  });

  const formattedDroppinginfo = Droppinginfo?.map(item => {
    const [id, dropping_point, time, fullinfo] = item.split('^');
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        {/* 📍 Icon */}
        {selectBusType === 'Luxury Coach' || selectBusType === 'lux' ? (
          <Image
            source={require('../assets/LocationIconLux.png')}
            style={{width: 14, height: 20, marginRight: 8}}
          />
        ) : (
          <Image
            source={require('../assets/LocationIcon.png')}
            style={{width: 14, height: 20, marginRight: 8}}
          />
        )}
        {/* Text Row */}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {/* Dropping Point */}
          <Text
            style={{
              color:
                selectBusType === 'Luxury Coach' || selectBusType === 'lux'
                  ? '#393939'
                  : '#1F487C',
              fontSize: 13,
              fontFamily: 'Inter',
              fontWeight: '400',
              flex: 1,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {dropping_point}
          </Text>

          {/* Time */}
          <Text
            style={{
              color:
                selectBusType === 'Luxury Coach' || selectBusType === 'lux'
                  ? '#393939'
                  : '#1F487C',
              fontSize: 13,
              fontFamily: 'Inter',
              fontWeight: '400',
              textAlign: 'right',
              marginLeft: 10,
            }}>
            {time}
          </Text>
        </View>
      </View>
    );
  });

  const viewListAry = [
    {
      id: '1',
      task: 'Bus Stops',
      icons: {normal: 'busStopsBlue', selected: 'busStops'},
    },
    {
      id: '2',
      task: 'Cancel Policy',
      icons: {normal: 'cancelPolicyBlue', selected: 'cancelPolicy'},
    },
    {
      id: '3',
      task: 'Amenities',
      icons: {normal: 'amenitiesBlue', selected: 'amenities'},
    },
    {
      id: '4',
      task: 'Travel Policy',
      icons: {normal: 'travelPolicyBlue', selected: 'travelPolicy'},
    },
  ];

  const TravelPolicy = [
    {
      id: '1',
      title: 'Do I need to buy a ticket for my child?',
      data: 'Please purchase a ticket for children above the age of 6.',
      Image: (
        <IconSVG
          name="child"
          width={30}
          height={30}
          fillColor={
            selectBusType === 'Luxury Coach' || selectBusType === 'lux'
              ? '#393939'
              : '#1F487C'
          }
        />
      ),
    },
    {
      id: '2',
      title: 'Will I be charged for excess luggage?',
      data: 'Yes, excess luggage is chargeable. You are allowed to carry 2 pieces of luggage, 15 Kgs each. Allowing luggages packed in carton boxes is at the discretion of the bus partner.',
      Image: (
        <IconSVG
          name="luggage"
          width={30}
          height={30}
          fillColor={
            selectBusType === 'Luxury Coach' || selectBusType === 'lux'
              ? '#393939'
              : '#1F487C'
          }
        />
      ),
    },
    {
      id: '3',
      title: 'Can I travel with my Pet?',
      data: 'Travelling with your pets in the bus is not permitted.',
      Image: (
        <IconSVG
          name="pet"
          width={30}
          height={30}
          fillColor={
            selectBusType === 'Luxury Coach' || selectBusType === 'lux'
              ? '#393939'
              : '#1F487C'
          }
        />
      ),
    },
    {
      id: '4',
      title: 'Is there any Alcohol/liquor policy?',
      data: 'Yes. Alcohol/liquor consumption and Carrying it inside the bus is prohibited. Bus partners reserves the right to deboard any passenger with inappropriate behaviour or does not comply with the policy. Refunds will not be processed in such cases.',
      Image: (
        <IconSVG
          name="alcohol"
          width={30}
          height={30}
          fillColor={
            selectBusType === 'Luxury Coach' || selectBusType === 'lux'
              ? '#393939'
              : '#1F487C'
          }
        />
      ),
    },
    {
      id: '5',
      title: 'Will the bus wait if the boarding time has passed?',
      data: 'Bus partner do not wait for the passengers beyond the departure time. There is no refund policy if the passenger missed the bus for arriving late at the boarding point.',
      Image: (
        <IconSVG
          name="boarding"
          width={30}
          height={30}
          fillColor={
            selectBusType === 'Luxury Coach' || selectBusType === 'lux'
              ? '#393939'
              : '#1F487C'
          }
        />
      ),
    },
  ];

  const AmenitiesList = [
    {
      amenity_title: 'Water Bottle',
      amenity_position: 1,
      iconName: 'water_bottle',
    },
    {amenity_title: 'Blanket', amenity_position: 2, iconName: 'blanket'},
    {amenity_title: 'TV', amenity_position: 3, iconName: 'tv'},
    {amenity_title: 'AC', amenity_position: 4, iconName: 'ac'},
    {amenity_title: 'Snacks', amenity_position: 5, iconName: 'snacks'},
    {
      amenity_title: 'Charging Point',
      amenity_position: 6,
      iconName: 'charging_point',
    },
    {amenity_title: 'CCTV', amenity_position: 7, iconName: 'cctv'},
    {
      amenity_title: 'Emergency Exit',
      amenity_position: 8,
      iconName: 'emergency_exit',
    },
    {amenity_title: 'Individual TV', amenity_position: 9, iconName: 'tv'},
    {amenity_title: 'Hammer', amenity_position: 10, iconName: 'hammer'},
    {
      amenity_title: 'Facial Tissues',
      amenity_position: 11,
      iconName: 'facial_tissues',
    },
    {amenity_title: 'Pillows', amenity_position: 12, iconName: 'pillows'},
    {
      amenity_title: 'Fire Extinguisher',
      amenity_position: 13,
      iconName: 'fire_extinguisher',
    },
    {
      amenity_title: 'Reading Light',
      amenity_position: 14,
      iconName: 'reading_light',
    },
    {
      amenity_title: 'GPS Tracking',
      amenity_position: 15,
      iconName: 'gps_tracking',
    },
    {
      amenity_title: 'First Aid Box',
      amenity_position: 16,
      iconName: 'first_aid_box',
    },
    {amenity_title: 'Wifi', amenity_position: 17, iconName: 'wifi'},
    {
      amenity_title: 'Hand Sanitizer',
      amenity_position: 18,
      iconName: 'hand_sanitizer',
    },
    {
      amenity_title: 'Temperature checks',
      amenity_position: 19,
      iconName: 'temperature_checks',
    },
    {
      amenity_title: 'Social Distancing',
      amenity_position: 20,
      iconName: 'social_distancing',
    },
    {
      amenity_title: 'Driver Conductor with masks',
      amenity_position: 21,
      iconName: 'driver_mask',
    },
    {amenity_title: 'Fumigation', amenity_position: 22, iconName: 'fumigation'},
    {amenity_title: 'Staff', amenity_position: 23, iconName: 'staff'},
  ];

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
            <View
              style={{
                flex: 1,
                position: 'relative',
                top: seatLayoutPage ? 0 : 5,
                bottom: 30,
              }}>
              {seatLayoutPage ? (
                ''
              ) : (
                <View style={{alignItems: 'flex-start', margin: 15}}>
                  <Text
                    style={{
                      color:
                        selectBusType === 'Luxury Coach' ||
                        selectBusType === 'lux'
                          ? '#393939'
                          : '#1F487C',
                      fontSize: 17,
                      fontFamily: 'Inter',
                      lineHeight: 19,
                      fontWeight: '700',
                      paddingVertical: 5,
                    }}>
                    {busData?.Traveler_Agent_Name}
                  </Text>
                  <Text style={styles.subtitle}>
                    <Text
                      style={{
                        color:
                          selectBusType === 'Luxury Coach' ||
                          selectBusType === 'lux'
                            ? '#393939'
                            : '#1F487C',
                        fontWeight: '400',
                        lineHeight: 17,
                        fontSize: 14,
                        fontFamily: 'Inter',
                      }}>
                      {busData?.Bus_Type_Name}
                    </Text>
                  </Text>
                </View>
              )}

              {/* Dynamically create buttons */}
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginBottom: 1,
                  backgroundColor: '#FFFFFF',
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  shadowColor: 'rgba(99, 95, 95, 0.81)',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 1,
                  shadowRadius: 7,
                  elevation: 5,
                }}>
                {viewListAry?.map(item => {
                  const iconToUse =
                    selectBusType === 'Luxury Coach' || selectBusType === 'lux'
                      ? item.icons.selected
                      : item.icons.normal;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleButtonPress(item.task)}
                      style={{
                        width: '23%', // About 4 items in one row with space
                        alignItems: 'center',
                        backgroundColor:
                          selectedButton === item.task
                            ? '#1F487C33'
                            : '#FFFFFF',
                        paddingVertical: 5,
                        borderRadius: 20,
                        marginBottom: 10,
                      }}>
                      {/* Icon */}
                      <IconSVG name={iconToUse} width={36} height={36} />

                      {/* Text */}
                      <Text
                        style={{
                          color:
                            selectBusType === 'Luxury Coach' ||
                            selectBusType === 'lux'
                              ? '#393939'
                              : '#1F487C',
                          fontSize: 12,
                          textAlign: 'center',
                        }}>
                        {item.task}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <ScrollView ref={scrollViewRef}>
                <View
                  ref={boardingRef}
                  style={{
                    backgroundColor:
                      selectBusType === 'Luxury Coach' ||
                      selectBusType === 'lux'
                        ? '#F6B6424D'
                        : 'rgba(214, 235, 255, 0.5)',
                    marginTop: 10,
                    shadowColor: 'rgb(0, 0, 0)',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.15,
                    elevation: 1, // Android
                  }}>
                  <Text
                    style={{
                      color:
                        selectBusType === 'Luxury Coach' ||
                        selectBusType === 'lux'
                          ? '#393939'
                          : '#1F487C',
                      fontWeight: 'bold',
                      fontSize: 17,
                      padding: 10,
                    }}>
                    Boarding Point
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      //backgroundColor: 'rgba(214, 235, 255, 0.5)',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'column',
                        padding: 10,
                      }}>
                      {formattedBoarding
                        ?.slice(
                          0,
                          isBoardingExpanded ? formattedBoarding.length : 1,
                        )
                        .map((item, index) => (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 5,
                              paddingHorizontal: 5,
                            }}>
                            {/* No extra Image or Text needed here */}
                            {item}
                          </View>
                        ))}
                    </View>
                  </View>
                  {/* Toggle Footer for Boarding */}
                  {formattedBoarding?.length > 2 && (
                    <TouchableOpacity
                      onPress={() => {
                        setBoardingExpanded(prev => !prev);
                        if (isBoardingExpanded) {
                          setDroppingExpanded(true);
                        } else {
                          setDroppingExpanded(false);
                        }
                      }}>
                      <View style={styles.footerContainer}>
                        <View style={styles.footerBgView} />
                        <View
                          style={{
                            borderRadius: 3,
                            borderColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            backgroundColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            padding: 4,
                          }}>
                          <Image
                            source={require('../assets/downWhiteArrow.png')}
                            style={{
                              width: 10,
                              height: 7,
                              transform: [
                                {
                                  rotate: isBoardingExpanded
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
                            borderBottomColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  <Text
                    style={{
                      color:
                        selectBusType === 'Luxury Coach' ||
                        selectBusType === 'lux'
                          ? '#393939'
                          : '#1F487C',
                      fontWeight: 'bold',
                      fontSize: 17,
                      padding: 10,
                    }}>
                    Dropping Point
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      //backgroundColor: 'rgba(214, 235, 255, 0.5)',
                    }}>
                    {formattedDroppinginfo
                      ?.slice(
                        0,
                        isDroppingExpanded ? formattedDroppinginfo.length : 1,
                      )
                      .map((item, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 5,
                            paddingHorizontal: 15,
                          }}>
                          {item}
                        </View>
                      ))}
                  </View>
                  {formattedDroppinginfo.length > 2 && (
                    <TouchableOpacity
                      onPress={() => {
                        setDroppingExpanded(prev => !prev);
                        if (isDroppingExpanded) {
                          setBoardingExpanded(true);
                        } else {
                          setBoardingExpanded(false);
                        }
                      }}>
                      <View style={styles.footerContainer}>
                        <View style={styles.footerBgView} />
                        <View
                          style={{
                            borderRadius: 3,
                            borderColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            backgroundColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            padding: 4,
                          }}>
                          <Image
                            source={require('../assets/downWhiteArrow.png')}
                            style={{
                              width: 10,
                              height: 7,
                              transform: [
                                {
                                  rotate: isDroppingExpanded
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
                            borderBottomColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                {/* Now, conditionally render based on selectedButton */}
                <View
                  ref={cancellationRef}
                  style={{
                    //backgroundColor: '#fff',
                    //padding: 20,
                    borderRadius: 10,
                    shadowColor: 'rgba(87, 84, 84, 0.94)',
                    shadowOffset: {width: 1, height: 2},
                  }}>
                  <Text
                    style={{
                      color:
                        selectBusType === 'Luxury Coach' ||
                        selectBusType === 'lux'
                          ? '#393939'
                          : '#1F487C',
                      fontWeight: 'bold',
                      fontSize: 17,
                      padding: 10,
                    }}>
                    Cancellation Policy
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 10,
                      marginBottom: 15,
                      backgroundColor:
                        selectBusType === 'Luxury Coach' ||
                        selectBusType === 'lux'
                          ? '#393939'
                          : '#1F487C',
                      // borderColor: '#1F487C',
                      // borderWidth: 1,
                      borderRadius: 20,
                      shadowColor: 'rgba(99, 95, 95, 0.81)', // Color of the shadow (use rgba for transparency)
                      shadowOffset: {width: 0, height: 2}, // Horizontal and Vertical offset of the shadow
                      shadowOpacity: 1, // How transparent the shadow is (0 to 1)
                      shadowRadius: 7, // The blur radius of the shadow
                      elevation: 5, // For Android shadow
                    }}>
                    {/* Header Section */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        backgroundColor:
                          selectBusType === 'Luxury Coach' ||
                          selectBusType === 'lux'
                            ? '#393939'
                            : '#1F487C',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter',
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#FFFFFF',
                        }}>
                        {'Cancellation Time'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter',
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#FFFFFF',
                        }}>
                        {'Refund Amount'}
                      </Text>
                    </View>

                    {/* Policy Details Section */}
                    <View
                      style={{
                        backgroundColor: '#FFFFFF',
                        // borderTopLeftRadius: 20,
                        // borderTopRightRadius: 20,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                        }}>
                        {splittedPolicy?.Condition?.map((policy, index) => {
                          const percentageValue = parseInt(
                            splittedPolicy?.percentage?.[index],
                            10,
                          );

                          // Calculate the discounted fare based on the percentage
                          const discountedFare =
                            busFare * (percentageValue / 100);

                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                // borderBottomWidth: 1,
                                // borderBottomColor: '#EFEFEF',
                              }}>
                              {/* Left: Policy Text */}
                              <Text
                                style={{
                                  fontFamily: 'Inter',
                                  fontSize: 13,
                                  fontWeight: '400',
                                  color:
                                    selectBusType === 'Luxury Coach' ||
                                    selectBusType === 'lux'
                                      ? '#393939'
                                      : '#1F487C'
                                      ? '#393939'
                                      : '#1F487C',
                                  flex: 1,
                                  width: '70%',
                                }}
                                numberOfLines={2}
                                ellipsizeMode="tail">
                                {policy}
                              </Text>

                              {/* Right: Fare */}
                              <Text
                                numberOfLines={2}
                                style={{
                                  fontFamily: 'Inter',
                                  fontSize: 13,
                                  width: '33%',
                                  fontWeight: '600',
                                  color:
                                    selectBusType === 'Luxury Coach' ||
                                    selectBusType === 'lux'
                                      ? '#393939'
                                      : '#1F487C'
                                      ? '#393939'
                                      : '#1F487C',
                                  textAlign: 'right',
                                }}>
                                Rs. {Math.floor(discountedFare)}/- @{' '}
                                {percentageValue}%
                              </Text>
                            </View>
                          );
                        })}
                      </View>

                      {/* Footer Note Section */}
                      <View
                        style={{
                          backgroundColor:
                            selectBusType === 'Luxury Coach' ||
                            selectBusType === 'lux'
                              ? '#F6B6424D'
                              : 'rgba(214, 235, 255, 0.5)',
                          borderRadius: 10,
                          padding: 20,
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Inter',
                            fontSize: 12,
                            fontWeight: '400',
                            color:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                          }}>
                          {
                            'Refund amount is Indicative. \n\nAdditional Rs. 15 per seat cancellation fee is applicable.\n\nPartial cancellation is not allowed.'
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  ref={amenitiesRef}
                  style={{
                    //backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color:
                        selectBusType === 'Luxury Coach' ||
                        selectBusType === 'lux'
                          ? '#393939'
                          : '#1F487C',
                      fontWeight: 'bold',
                      fontSize: 17,
                      padding: 10,
                    }}>
                    Amenities
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 10,
                      marginBottom: 15,
                      borderColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 20,
                      backgroundColor: '#FFFFFF',
                      shadowColor: 'rgba(99, 95, 95, 0.81)', // Color of the shadow (use rgba for transparency)
                      shadowOffset: {width: 0, height: 2}, // Horizontal and Vertical offset of the shadow
                      shadowOpacity: 1, // How transparent the shadow is (0 to 1)
                      shadowRadius: 7, // The blur radius of the shadow
                      elevation: 5, // For Android shadow
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'left',
                        marginVertical: 10,
                      }}>
                      {/* Check if any item in servicesArray[index] is '1' */}
                      {AmenitiesList && AmenitiesList.length > 0 ? (
                        AmenitiesList?.map((item, index) => {
                          // Only render if the condition is true
                          if (servicesArray && servicesArray[index] === '1') {
                            return (
                              <View
                                key={index}
                                style={{
                                  width: '18%', // Width to fit 5 items in a row
                                  alignItems: 'center',
                                  marginBottom: 10, // Space between items
                                }}>
                                <IconSVG
                                  name={item.iconName}
                                  width={34}
                                  height={34}
                                  fillColor={
                                    selectBusType === 'Luxury Coach' ||
                                    selectBusType === 'lux'
                                      ? '#393939'
                                      : '#1F487C'
                                  }
                                />
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontWeight: '500',
                                    fontSize: 10,
                                    textAlign: 'center',
                                    color:
                                      selectBusType === 'Luxury Coach' ||
                                      selectBusType === 'lux'
                                        ? '#393939'
                                        : '#1F487C',
                                    width: '90%',
                                  }}
                                  numberOfLines={2}>
                                  {item.amenity_title}
                                </Text>
                              </View>
                            );
                          }
                          return null; // Don't render if the condition is false
                        })
                      ) : (
                        <Text
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            color:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            fontWeight: '600',
                            fontSize: 14,
                            marginVertical: 10,
                          }}>
                          No Amenities Available
                        </Text>
                      )}

                      {/* Show "No Amenities Available" if no items passed the condition */}
                      {AmenitiesList?.every(
                        (item, index) => servicesArray[index] !== '1',
                      ) && (
                        <Text
                          style={{
                            flex: 1,
                            textAlign: 'center',
                            color:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            fontWeight: '600',
                            fontSize: 14,
                            marginVertical: 10,
                          }}>
                          No Amenities Available
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View
                  ref={travelPolicyRef}
                  style={{
                    // backgroundColor: '#fff',
                    // padding: 20,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color:
                        selectBusType === 'Luxury Coach' ||
                        selectBusType === 'lux'
                          ? '#393939'
                          : '#1F487C',
                      fontWeight: 'bold',
                      fontSize: 17,
                      padding: 10,
                    }}>
                    Travel Policy
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      marginBottom: 15,

                      // ✅ Shadow for entire section
                      shadowColor: 'rgb(0, 0, 0)',
                      shadowOffset: {width: 0, height: 4},
                      shadowOpacity: 0.15,
                      elevation: 1, // Android
                    }}>
                    {TravelPolicy?.map(item => {
                      if (!item.title || !item.data) {
                        // Skip rendering if the title or data is missing (undefined or null)
                        return null;
                      }
                      return (
                        <View
                          key={item.id}
                          style={{
                            //marginBottom: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10, // Add space for the border
                            backgroundColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#F6B6424D'
                                : 'rgba(214, 235, 255, 0.5)',
                            borderBottomColor:
                              selectBusType === 'Luxury Coach' ||
                              selectBusType === 'lux'
                                ? '#393939'
                                : '#1F487C',
                            borderBottomWidth: StyleSheet.hairlineWidth, // Apply border at the bottom
                          }}>
                          {/* Image section */}
                          {item.Image && (
                            <View style={{marginRight: 10}}>{item.Image}</View>
                          )}

                          {/* Title and Data */}
                          <View
                            style={{
                              width: '90%',
                              flexDirection: 'column',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color:
                                  selectBusType === 'Luxury Coach' ||
                                  selectBusType === 'lux'
                                    ? '#393939'
                                    : '#1F487C',
                                fontSize: 12,
                                fontWeight: '700',
                                paddingBottom: 5, // Space between title and data
                              }}>
                              {item.title}
                            </Text>
                            <Text
                              style={{
                                color:
                                  selectBusType === 'Luxury Coach' ||
                                  selectBusType === 'lux'
                                    ? '#393939'
                                    : '#1F487C',
                                fontSize: 12,
                                fontWeight: '400',
                              }}>
                              {item.data}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
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
    // backgroundColor: 'rgba(214, 235, 255, 0.5)',
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
    fontSize: 17,
    fontFamily: 'Inter',
    lineHeight: 19,
    fontWeight: '700',
    paddingVertical: 5,
  },
  subtitle: {
    fontWeight: '400',
    lineHeight: 17,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  dismissbtn: {flex: 1, width: '100%', height: '30%'},
});

export default ViewMoreScreen;
