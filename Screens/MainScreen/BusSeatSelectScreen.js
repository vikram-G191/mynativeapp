import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Image,
  Animated,
  Alert,
  SectionList,
  BackHandler,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import BackWhite from '../assets/BackWhite';
import BusTimeBg from '../assets/BusTimeBg';
import SeatRed from '../assets/SeatRed';
import UserWhite from '../assets/UserWhite';
import StarWhite from '../assets/StarWhite';
import SeatBtnIcon from '../assets/SeatBtnIcon';
import BoadingBtnIcon from '../assets/BoadingBtnIcon';
import SleeperSeat from '../assets/SleeperSeat';
import BlueStandLine from '../assets/BlueStandLine';
import {BackgroundImage} from '@rneui/base';
import SeatInfoScreen from './SeatInfoScreen';
import BusSeater from '../assets/BusSeater';
import BusLight from '../assets/BusLight';
import {search} from 'react-native-country-picker-modal/lib/CountryService';
import moment from 'moment';
import {GetTBSSeatLayout} from '../API/TBSapi/DashBoard/Dashboard';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';
import {calculateDiscountedFare} from '../component/Tbs_Disocunt';
import {CURRENT_PERCENTAGE} from '../Redux/Store/Type';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import IconSVG from '../SVG/SVG';
import ViewMoreScreen from './ViewMoreScreen';
// import { useRoute } from '@react-navigation/native';
const BusSeatSelectScreen = ({props, navigation, route}) => {
  const dispatch = useDispatch();

  const scrollYPrivacy = useRef(new Animated.Value(0)).current;

  const contentHeightPrivacy = useRef(1);

  const scrollViewHeightPrivacy = useRef(1);

  const scrollViewRefPrivacy = useRef(null); // Separate ref for Privacy

  // Function to handle the custom scrollbar with separate scrollbar height
  const renderCustomScrollbar = section => {
    const scrollY = scrollYPrivacy;
    const scrollViewHeight = scrollViewHeightPrivacy;

    const speedFactor = 1; // Speed factor for each section

    // Separate scrollbar height for each section
    const scrollbarHeightPrivacy = 60;

    const scrollbarHeight = scrollY.interpolate({
      inputRange: [0, contentHeightPrivacy.current - scrollViewHeight.current],
      outputRange: [
        scrollbarHeightPrivacy,
        60, // Minimum height for the scrollbar
      ],
      extrapolate: 'clamp',
    });

    const thumbTranslateY = scrollY.interpolate({
      inputRange: [0, contentHeightPrivacy.current - scrollViewHeight.current],
      outputRange: [
        0,
        (scrollViewHeight.current - 80) * speedFactor, // Adjusted by speed factor
      ],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.scrollbarTrack}>
        <Animated.View
          style={[
            styles.scrollbarThumb,
            {
              height: scrollbarHeight, // Set scrollbar height dynamically
              transform: [
                {
                  translateY: thumbTranslateY,
                },
              ],
            },
          ]}
        />
      </View>
    );
  };

  const tbs_discount = useSelector(state => state?.productReducer?.live_per);

  useEffect(() => {
    dispatch({type: CURRENT_PERCENTAGE, payload: 5});
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedTab, setSelectedTab] = useState('All');

  const [selectedPrice, setSelectedPrice] = useState('500');

  const [selectedIndex, setSelectedIndex] = useState(0); // Initialize with default index
  const [selectedButton, setSelectedButton] = useState(null); // Tracks selected button
  const useThemeColor = route.params.themecolor;

  const screenHeight = Dimensions.get('window').height;
  const contentHeight = screenHeight * 0.68; // 50% of screen height
  const contentHeight2 = screenHeight * 0.64;

  const [showBottomModal, setShowBottomModal] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current; // start off-screen

  const openBottomModal = () => {
    setShowBottomModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomModal = () => {
    setShowBottomModal(false);
    // Now animate modal close
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedButton(null);
    });
  };

  const {item, screenTheme, themecolor, themeColor2, Journey_Details} =
    route?.params;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('TripListScreen', {
          state: {Journey_Details: Journey_Details},
        }); // change 'Home' to your desired screen
        return true; // prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  // const { screenTheme = 'Normal Coach' } = route.params || {};

  const operatorFontColor =
    screenTheme === 'Luxury Coach' ? '#393939' : useThemeColor; // Default to black if not '#393939'

  const themeheaderFontColor =
    screenTheme === 'Luxury Coach' ? '#393939' : '#FFFFFF'; // Default to black if not '#393939'

  const [selectSeatScreen, setSelectSeatScreen] = useState('SelectSeat');
  const [seatModal, setseatModal] = useState(false);
  const handleOpen = () => setModalVisible(true);
  const [statusVisible, setStatusVisible] = useState(false);
  const [busData, setBusdata] = useState([]);
  const handleClose = () => setModalVisible(false);

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

  const [seatSelection, setSeatSelection] = useState(null);
  // const [selectedSeat, setSelectedSeat] = useState(null);

  const [seatLayout, setSeatLayout] = useState();

  console.log(seatLayout, 'setSeatLayout');

  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState({
    place_id: '',
    city: '',
    time: '',
    landmark: '',
  });

  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState({
    place_id: '',
    city: '',
    time: '',
    landmark: '',
  });

  const [selectedSeat, setSelectedSeat] = useState([]); // Use an array for multiple selections
  const scrollViewRef = useRef(null);
  console.log(selectedSeat, 'selected_Seat');
  const formatTravelTime = timeStr => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':');
    const hours = parseInt(h, 10);
    const minutes = parseInt(m, 10);

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  };

  const [totalPrice, setTotalPrice] = useState(0);

  // Assuming selectedSeats is your array of selected seat objects

  useEffect(() => {
    if (selectedSeat && selectedSeat.length > 0) {
      // Calculate the total price if selectedSeats is not empty
      const calculatedPrice = selectedSeat.reduce(
        (total, seat) => total + seat.price,
        0,
      );
      setTotalPrice(calculatedPrice);
    } else {
      // If no seats are selected, reset the total price to 0
      setTotalPrice(0);
    }
  }, [selectedSeat]);

  const parseBoardingInfo = boardingData => {
    return boardingData.map(info => {
      // Split the string by '^' and remove any empty parts
      const parts = info.split('^').filter(part => part.trim() !== ''); // Remove empty strings if any

      // Destructure the parts into city, time, place_id, and landmark
      const city = parts[0];
      const time = parts[1];
      const place_id = parts[2];

      // The remaining parts (after place_id) will be the landmark
      const landmark = parts.slice(3).join(' '); // Join the remaining parts to form the landmark

      return {city, time, place_id, landmark, Selected: false}; // Default selection state
    });
  };

  const parseDroppinginfo = droppingData => {
    return droppingData.map(info => {
      // Split by the '^' symbol and remove the empty elements
      const parts = info.split('^').filter(part => part.trim() !== ''); // Remove empty parts if any

      // Destructure the split parts into place_id, city, time, and landmark
      const place_id = parts[0];
      const city = parts[1];
      const time = parts[2];

      // The remaining part (after time) should be the landmark
      const landmark = parts.slice(3).join(' '); // Join the remaining parts to form the landmark

      return {place_id, city, time, landmark, selected: false};
    });
  };

  const [boardingPoints, setBoardingPoints] = useState(() =>
    parseBoardingInfo(item?.boarding_info || []),
  );

  const [droppingPoints, setDroppingPoints] = useState(() =>
    parseDroppinginfo(item?.dropping_info || []),
  );

  console.log(boardingPoints, '|---------------|');

  useEffect(() => {
    if (selectedSeat) {
      // You can pass the selected seat data to another function or use it as needed
    }
  }, [selectedSeat]);

  // const route = useRoute()

  const fetchSeatLayout = async () => {
    try {
      // const data = await Abhibus_SeatLayout(item, dispatch);
      setBusdata(item);
      const data = await GetTBSSeatLayout(item, dispatch);
      setSeatLayout(data?.seatlayout);
    } catch (error) {
      console.error('Error fetching seat layout data', error);
    }
  };

  useEffect(() => {
    fetchSeatLayout();
  }, []);

  const formatSeatData1 = seatList => {
    return seatList?.map(seat => {
      const [
        seatNumber,
        column,
        row,
        type,
        isBooked,
        gender,
        price,
        seatTypeID,
        tax,
        childFare,
        category,
        weight,
      ] = seat.split(', ');

      // Safely parse tax as a number, default to 0 if invalid
      const parsedTax = isNaN(tax) ? 0 : Number(tax);

      return {
        // seatNumber,
        // row: Number(column), // Swap row and column for rotation
        // column: Number(row),
        // type,
        // isBooked: isBooked === 'N',
        // gender,
        // price: Number(price),
        // seatTypeID: seatTypeID,
        // tax: parsedTax,
        // childFare: Number(childFare),
        // category,
        // weight: Number(weight),

 
        seatNumber,
        column: parseInt(column, 10),
        row: parseInt(row, 10), 
        type,
        isBooked: isBooked === 'N',
        gender,
        price: Number(price),
        seatTypeID: seatTypeID,
        tax: parsedTax,
        childFare: Number(childFare),
        category,
        weight: Number(weight),


      };
    });
  };

   const formatSeatData = seatList => {
    return seatList?.map(seat => {
      const [
        seatNumber,
        row,
        column,
        type,
        isBooked,
        gender,
        price,
        seatTypeID,
        tax,
        childFare,
        category,
        weight,
      ] = seat.split(', ');

      // Safely parse tax as a number, default to 0 if invalid
      const parsedTax = isNaN(tax) ? 0 : Number(tax);

      return {
        seatNumber,
        row: Number(column), // Swap row and column for rotation
        column: Number(row),
        type,
        isBooked: isBooked === 'N',
        gender,
        price: Number(price),
        seatTypeID: seatTypeID,
        tax: parsedTax,
        childFare: Number(childFare),
        category,
        weight: Number(weight),

 
        // seatNumber,
        // column: parseInt(column, 10),
        // row: parseInt(row, 10), 
        // type,
        // isBooked: isBooked === 'N',
        // gender,
        // price: Number(price),
        // seatTypeID: seatTypeID,
        // tax: parsedTax,
        // childFare: Number(childFare),
        // category,
        // weight: Number(weight),


      };
    });
  };

  console.log(upper_list_rows1, 'screenTheme');

  // Format seat data
  const lowerDeckSeats = formatSeatData1(
    seatLayout?.TotalSeatList?.lowerdeck_seat_nos || [],
  );
  const upperDeckSeats = formatSeatData1(
    seatLayout?.TotalSeatList?.upperdeck_seat_nos || [],
  );
  console.log(lowerDeckSeats, 'seating_layout');

  const Formatting = date => {
    const formattedDate = new Date(date);
    const options = {day: '2-digit', month: 'short'}; // '2-digit' for day, 'short' for month abbreviation (e.g., Mar)
    const travel_date = new Intl.DateTimeFormat('en-GB', options).format(
      formattedDate,
    );
    // console.log(travel_date); // Output: "13 Mar"
    return travel_date;
  };
  const handleSeatLeftColor = item => {
    const seats = Number(item.available_seats);

    if (seats >= 0 && seats < 10) {
      return {
        bg: '#FFC1C180',
        text: '#C62B2B',
      };
    } else if (seats >= 10 && seats < 30) {
      return {
        bg: '#f9e5c9',
        text: '#ce7a00',
      };
    } else {
      return {
        bg: '#dbefdc',
        text: '#229e37',
      };
    }
  };

  const calculateArrival = (departureDate, departureTime, duration) => {
    const departureDateTime = moment(
      `${departureDate} ${departureTime}`,
      'YYYY-MM-DD hh:mm A',
    );

    // Add the duration to the departure time
    const arrivalDateTime = departureDateTime.add(moment.duration(duration));

    // Format the arrival date and time
    const arrivalDate = arrivalDateTime.format('YYYY-MM-DD');
    // const arrivalTime = arrivalDateTime.format("hh:mm A");
    const formattedDate = moment(arrivalDate).format('DD MMM');

    return formattedDate;
  };

  const totalseats = lowerDeckSeats.concat(upperDeckSeats);
  // console.log(totalseats, "totalseats");

  const allprice = totalseats
    ?.filter(item => !item?.isBooked) // Filter out booked seats
    .map(item => Math.round(item?.price)) // Extract and round prices
    .sort((a, b) => a - b); // Sort in ascending order

  const unq = [...new Set(allprice)];

  const uniqueprice = unq?.filter(item => {
    return Number(item) != 0;
  });
  // console.log(unq, "uniquepriceuniqueprice");

  const selectedSeats = [];

  const onTabsSelectScreenClickPress = selectedTab => {
    setSelectSeatScreen(selectedTab);
  };

  // const [lowerRow1, setLoweRow1] = useState(
  //   [{ id: 1, isBooked: true, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 2, isBooked: false, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 3, isBooked: false, isSelected: true, SeatLegend: 'Unisex' },
  //   { id: 4, isBooked: false, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 5, isBooked: false, isSelected: false, SeatLegend: 'Women' },
  //   { id: 6, isBooked: false, isSelected: false, SeatLegend: 'Women' },
  //   { id: 7, isBooked: false, isSelected: false, SeatLegend: 'Women' },
  //   { id: 8, isBooked: true, isSelected: true, SeatLegend: 'Men' },
  //   { id: 9, isBooked: true, isSelected: false, SeatLegend: 'Men' },
  //   ]
  // )
  // const [LowerRow2, setLowerRow2] = useState(
  //   [{ id: 1, isBooked: true, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 2, isBooked: true, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 3, isBooked: false, isSelected: true, SeatLegend: 'Unisex' },
  //   { id: 4, isBooked: false, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 5, isBooked: false, isSelected: false, SeatLegend: 'Women' },
  //   { id: 6, isBooked: false, isSelected: false, SeatLegend: 'Women' },
  //   { id: 7, isBooked: false, isSelected: false, SeatLegend: 'Women' },
  //   { id: 8, isBooked: false, isSelected: true, SeatLegend: 'Men' },
  //   { id: 9, isBooked: false, isSelected: false, SeatLegend: 'Men' },
  //   { id: 10, isBooked: false, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 11, isBooked: true, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 12, isBooked: true, isSelected: true, SeatLegend: 'Unisex' },
  //   { id: 13, isBooked: true, isSelected: false, SeatLegend: 'Unisex' },
  //   { id: 14, isBooked: true, isSelected: false, SeatLegend: 'Women' },
  //   { id: 15, isBooked: true, isSelected: false, SeatLegend: 'Women' },
  //   { id: 16, isBooked: true, isSelected: false, SeatLegend: 'Women' },
  //   { id: 17, isBooked: true, isSelected: true, SeatLegend: 'Men' },
  //   { id: 18, isBooked: true, isSelected: false, SeatLegend: 'Men' },
  //   { id: 19, isBooked: true, isSelected: true, SeatLegend: 'Men' },
  //   { id: 20, isBooked: true, isSelected: false, SeatLegend: 'Men' },
  //   ]
  // )
  // const [lowerLastRow, setLowerLastRow] = useState(
  //   [{ id: 1, isBooked: true, isSelected: true, SeatLegend: 'Men' },
  //   { id: 2, isBooked: true, isSelected: false, SeatLegend: 'Men' },
  //   ]
  // )

  const [upperRow1, setUpperRow1] = useState([
    {id: 1, isBooked: true, isSelected: false, SeatLegend: 'Women'},
    {id: 2, isBooked: true, isSelected: true, SeatLegend: 'Men'},
    {id: 3, isBooked: true, isSelected: false, SeatLegend: 'Men'},
    {id: 4, isBooked: false, isSelected: true, SeatLegend: 'Unisex'},
    {id: 5, isBooked: true, isSelected: false, SeatLegend: 'Unisex'},
  ]);

  const [upperRow2, setUpperRow2] = useState([
    {id: 1, isBooked: true, isSelected: false, SeatLegend: 'Women'},
    {id: 2, isBooked: true, isSelected: true, SeatLegend: 'Men'},
    {id: 3, isBooked: false, isSelected: false, SeatLegend: 'Unisex'},
    {id: 4, isBooked: false, isSelected: true, SeatLegend: 'Unisex'},
    {id: 5, isBooked: true, isSelected: false, SeatLegend: 'Men'},
    {id: 6, isBooked: false, isSelected: false, SeatLegend: 'Women'},
    {id: 7, isBooked: false, isSelected: true, SeatLegend: 'Unisex'},
    {id: 8, isBooked: true, isSelected: false, SeatLegend: 'Men'},
    {id: 9, isBooked: false, isSelected: true, SeatLegend: 'Men'},
    {id: 10, isBooked: true, isSelected: false, SeatLegend: 'Men'},
  ]);

  const handleContinuePress = () => {
    if (selectSeatScreen === 'SelectSeat') {
      if (selectedSeat.length === 0) {
        // Alert if seat is not selected
        Alert.alert('Select Seat', 'Please select a seat first');
      } else {
        // Move to BoardingPoint screen after selecting the seat
        setSelectSeatScreen('BoardingPoint');
      }
    } else if (selectSeatScreen === 'BoardingPoint') {
      if (
        selectedSeat.length > 0 &&
        selectedBoardingPoint.city?.length > 0 &&
        selectedDroppingPoint.city?.length > 0
      ) {
        // Proceed to next screen if all conditions are met
        navigation.navigate('TravelerScreenDetails', {
          screenTheme: screenTheme,
          themecolor: useThemeColor,
          themeColor2: route.params.themeColor2,
          selectedBoardingPoint: selectedBoardingPoint,
          selectedDroppingPoint: selectedDroppingPoint,
          seatLayout: seatLayout,
          selectedBusData: item,
          selectedSeat: selectedSeat,
          totalPrice: totalPrice,
          Journey_Details: Journey_Details,
        });
      } else if (selectedSeat.length > 0) {
        // Alert for missing Boarding or Dropping point
        Alert.alert(
          'Missing Points',
          'Please select both Boarding and Dropping Points',
        );
      } else {
        // Alert for missing seat selection
        Alert.alert('Select Seat', 'Please select a seat first');
      }
    }
  };

  //Filter Listview and Row
  const HorizontalFilterListItem = ({item}) => {
    // console.log('item---', item)
    return (
      <TouchableOpacity
        style={{overflow: 'hidden'}}
        onPress={() => OnClickCategoryList(item)}>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              minWidth: 50,
              height: '100%',
              padding: 5,
              marginRight: 1,
            },
            {
              backgroundColor:
                selectedTab === item
                  ? `${hexToRGB('#FFFFFF', 0.5)}`
                  : '#FFFFFF',
            },
          ]}>
          <Text
            style={[
              {
                fontSize: 12,
                fontWeight: '600',
                fontFamily: 'Inter',
                textAlign: 'center',
                color: selectedTab === item ? '#FFFFFF' : useThemeColor,
                lineHeight: 14,
              },
            ]}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const OnClickCategoryList = item => {
    setSelectedTab(item);
  };

  const BusBookingDetails = ({details, isExpanded}) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        top: 15,
        backgroundColor: '#FFF',
        // shadowColor: 'gray',
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //   height: 1,
        //   width: 0,
        // },
      }}>
      <ImageBackground
        source={
          screenTheme === 'Luxury Coach'
            ? require('../assets/journeyBg.png')
            : ''
        }
        style={{
          elevation: 2,
          padding: 5,
          flex: 1,
          backgroundColor: '#FFF',
        }}
        imageStyle={{
          borderRadius: 15,
          borderWidth: 1.3,
          borderColor:
            screenTheme === 'Luxury Coach'
              ? 'rgba(215, 147, 20, 0.7)'
              : 'rgba(31, 72, 124, 0.7)',
        }}>
        <View style={{paddingTop: 8, flexDirection: 'row'}}>
          <View style={{paddingTop: 8, width: '66%'}}>
            <Text
              style={{
                fontSize: 10,
                padding: 8,
                lineHeight: 12,
                fontWeight: '400',
                fontFamily: 'Inter',
                color: operatorFontColor,
                textAlign: 'center',
              }}>
              {item?.Bus_Type_Name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 40,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    lineHeight: 15,
                    fontWeight: '300',
                    fontFamily: 'Inter',
                    color: operatorFontColor,
                    textAlign: 'left',
                  }}>
                  {Formatting(item?.BUS_START_DATE)}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 19,
                    fontWeight: '500',
                    fontFamily: 'Inter',
                    color: operatorFontColor,
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}>
                  {item?.Start_time}
                </Text>
              </View>
              <View
                style={{
                  position: 'relative',
                  flex: 1,
                  paddingHorizontal: 5,
                  height: 38,
                  bottom: 0,
                }}>
                <BusTimeBg width="110%" height="110%" color={useThemeColor} />
                <Text
                  style={{
                    position: 'absolute',
                    top: 13,
                    left: 9,
                    width: '100%',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 9,
                    fontFamily: 'Inter',
                    fontWeight: '600',
                  }}>
                  <Text style={styles.tripDurationTimeTxt}>
                    {formatTravelTime(item?.TravelTime)}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    lineHeight: 15,
                    fontWeight: '400',
                    fontFamily: 'Inter',
                    color: operatorFontColor,
                    textAlign: 'right',
                  }}>
                  {calculateArrival(
                    item?.BUS_START_DATE,
                    item?.Start_time,
                    item?.TravelTime,
                  )}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 19,
                    fontWeight: '500',
                    fontFamily: 'Inter',
                    color: operatorFontColor,
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}>
                  {item?.Arr_Time}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Svg style={{width: 4}}>
              <BlueStandLine width="100%" height="92" color={useThemeColor} />
            </Svg>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              gap: 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderColor: '#2CA103',
                borderWidth: 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: 24,
                borderRadius: 5,
                bottom: 8,
                overflow: 'hidden',
              }}>
              {/* <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '#2CA103',
                }}>
                <Svg style={{ width: 16, height: '100%', marginHorizontal: 3 }}>
                  <StarWhite width="100%" height="100%" />
                </Svg>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter",
                    fontWeight: '400',
                    lineHeight: 13,
                    color: '#FFFFFF',
                  }}>
                  4.0
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  height: '100%'
                }}>
                <Svg style={{ width: 14, height: 14, marginHorizontal: 2 }}>
                  <UserWhite width="90%" height="90%" />
                </Svg>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: "Inter",
                    fontWeight: '400',
                    lineHeight: 13,
                    color: '#2CA103',
                    paddingRight: 5,
                  }}>
                  8.8k
                </Text>
              </View> */}
            </View>

            <Text
              style={{
                marginTop: -20,
                color: screenTheme === 'Luxury Coach' ? '#393939' : '#1F487C',
                fontWeight: '600',
                fontFamily: 'Inter',
                fontSize: 12,
              }}>
              Available Seats
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: handleSeatLeftColor(item).bg,
                justifyContent: 'center',
                alignItems: 'center',
                height: 24,
                borderRadius: 12,
              }}>
              <Svg style={{width: 14, height: 14, margin: 5}}>
                <SeatRed
                  width="90%"
                  height="90%"
                  color={handleSeatLeftColor(item).text}
                />
              </Svg>
              <Text
                style={{
                  fontSize: 10,
                  color: handleSeatLeftColor(item).text,
                  fontWeight: 'bold',
                  paddingRight: 5,
                }}>
                {item?.available_seats} Seats left
              </Text>
            </View>
            {/* <Text
              style={{
                fontSize: 12,
                fontFamily: 'Inter',
                fontWeight: '500',
                lineHeight: 15,
                color: operatorFontColor,
                textAlign: 'center',
                top: 5,
              }}>
              9 Window Seats
            </Text> */}
          </View>
        </View>
        {seatLayout ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              borderColor: useThemeColor,
              borderBottomRightRadius: 15,
              borderBottomLeftRadius: 15,
              borderWidth: 1,
              flex: 1,
              width: '100%',
              backgroundColor:
                screenTheme === 'Luxury Coach' ? '#FFEEC9' : '#EEEDED',
            }}>
            <View
              style={{
                backgroundColor: useThemeColor,
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                width: '104%',
                borderBottomRightRadius: 4,
                borderTopRightRadius: 4,
                position: 'relative',
                top: -1,
                left: 0,
                flexDirection: 'row',
                shadowColor: 'rgb(0, 0, 0)',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 10,
                shadowRadius: 1,
                elevation: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '100%',
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                <View
                  style={{
                    height: '100%',
                    overflow: 'hidden',
                  }}>
                  <FlatList
                    data={['All']} // Include 'All' button as first item
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item}
                    contentContainerStyle={{
                      overflow: 'hidden',
                      width: '99%',
                      height: '100%',
                    }}
                    renderItem={({item, index}) => (
                      <View style={[styles.ViewTabs, {width: '100%'}]}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            // alignItems: 'center',
                            // justifyContent: 'flex-start',
                          }}>
                          <Svg
                            style={{width: '12%', height: '45%', margin: '3%'}}>
                            <SeatBtnIcon width="100%" color="#E92E3D" />
                          </Svg>
                          <TouchableOpacity
                            style={[
                              styles.tab,
                              selectSeatScreen === 'SelectSeat' &&
                                styles.tabActive,
                              {borderBottomColor: useThemeColor},
                            ]}
                            onPress={() =>
                              onTabsSelectScreenClickPress('SelectSeat')
                            }>
                            <Text
                              style={[
                                {
                                  fontSize: 14,
                                  fontWeight: '200',
                                  color: '#FFFFFFCC',
                                  fontFamily: 'Inter',
                                  fontStyle: 'normal',
                                  marginBottom: '4%',
                                },
                                selectSeatScreen === 'SelectSeat' && {
                                  fontSize: 14, // This is redundant if the same
                                  fontWeight: '700',
                                  color: '#FFFFFF',
                                  fontFamily: 'Inter',
                                  fontStyle: 'normal',
                                  marginBottom: '3%',
                                },
                              ]}>
                              {'Select your Seats'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                          }}>
                          <Svg
                            style={{
                              width: 17,
                              height: 17,
                              marginHorizontal: 5,
                              marginVertical: '3%',
                              marginLeft: '-4%',
                            }}>
                            <BoadingBtnIcon
                              width="100%"
                              height="100%"
                              // color={
                              //   selectSeatScreen === 'BoardingPoint'
                              //     ? 'rgba(31, 72, 124, 0.5)'
                              //     : 'white'
                              // }
                              // color1={
                              //   selectSeatScreen === 'BoardingPoint' ? '#1F487C' : '#000000'
                              // }
                            />
                          </Svg>
                          <TouchableOpacity
                            onPress={() =>
                              onTabsSelectScreenClickPress('BoardingPoint')
                            }
                            style={[
                              styles.tab,
                              selectSeatScreen === 'BoardingPoint' &&
                                styles.tabActive,
                              {borderBottomColor: useThemeColor},
                            ]}>
                            <Text
                              style={[
                                {
                                  fontSize: 14,
                                  fontWeight: '200',
                                  color: '#FFFFFFCC',
                                  fontFamily: 'Inter',
                                  fontStyle: 'normal',
                                  marginBottom: '4%',
                                },
                                selectSeatScreen === 'BoardingPoint' && {
                                  // Any overrides or additional styles
                                  fontSize: 14, // This is redundant if the same
                                  fontWeight: '700',
                                  color: '#FFFFFF',
                                  fontFamily: 'Inter',
                                  fontStyle: 'normal',
                                  marginBottom: '4%',
                                },
                              ]}>
                              {'Boarding & Drop Point'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      // <HorizontalFilterListItem item={item} Index={index} />
                    )}
                  />
                </View>
                {/* <SegmentedControl
            style= {{height:30,width:'80%'}}
              values={['All', '₹ 500','₹ 500','₹ 500','₹ 500']}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
            /> */}

                {/* <View style={styles.infoView}>
              <TouchableOpacity
                onPress={() => onTabsTopbarClickPress('All')}
                style={[
                  styles.infoTab,
                  selectedTab === 'All' && {
                    backgroundColor: `${hexToRGB(useThemeColor, 0.5)}`,
                  },
                ]}>
                <Text
                  style={[
                    styles.infotabTitle, {
                      color: useThemeColor,
                    },
                    selectedTab === 'All' && styles.InfotabTitleActive,
                  ]}>
                  {'All'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onTabsTopbarClickPress('Price')}
                style={[
                  styles.infoTab,
                  selectedTab === 'Price' && { backgroundColor: `${hexToRGB(useThemeColor, 0.5)}` },
                ]}>
                <Text
                  style={[
                    styles.infotabTitle, {
                      color: useThemeColor,
                    },
                    selectedTab === 'Price' && styles.InfotabTitleActive,
                  ]}>
                  {'RS500'}
                </Text>
              </TouchableOpacity>
            </View> */}
              </View>

              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: -8,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderRightWidth: 8,
                  borderTopWidth: 10,
                  borderRightColor: 'transparent',
                  borderTopColor: useThemeColor,
                }}></View>
            </View>
            {/* <View style={styles.ViewTabs}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    source={require('../assets/SeatInfoIcon.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 8,
                      tintColor:
                        screenTheme === 'Luxury Coach'
                          ? '#D89E2F'
                          : useThemeColor,
                    }}
                  />
                </TouchableOpacity>
                <Svg style={{ width: 18, height: 21, marginRight: 5 }}>
                  <SeatBtnIcon width="100%" height="100%" color="#E92E3D" />
                </Svg>

                <TouchableOpacity
                  style={[
                    styles.tab,
                    selectSeatScreen === 'SelectSeat' && styles.tabActive,
                    { borderBottomColor: useThemeColor },
                  ]}
                  onPress={() => onTabsSelectScreenClickPress('SelectSeat')}>
                  <Text
                    style={[
                      styles.tabTitle,
                      selectSeatScreen === 'SelectSeat' && {
                        fontSize: 13,
                        fontWeight: '500',
                        color: useThemeColor,
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                      },
                    ]}>
                    {'Select your Seats'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Svg style={{ width: 18, height: 18, marginRight: 3 }}>
                  <BoadingBtnIcon
                    width="100%"
                    height="100%"
                  // color={
                  //   selectSeatScreen === 'BoardingPoint'
                  //     ? 'rgba(31, 72, 124, 0.5)'
                  //     : 'white'
                  // }
                  // color1={
                  //   selectSeatScreen === 'BoardingPoint' ? '#1F487C' : '#000000'
                  // }
                  />
                </Svg>
                <TouchableOpacity
                  onPress={() => onTabsSelectScreenClickPress('BoardingPoint')}
                  style={[
                    styles.tab,
                    selectSeatScreen === 'BoardingPoint' && styles.tabActive,
                    { borderBottomColor: useThemeColor },
                  ]}>
                  <Text
                    style={[
                      styles.tabTitle,
                      selectSeatScreen === 'BoardingPoint' && {
                        fontSize: 13,
                        fontWeight: '500',
                        color: useThemeColor,
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                      },
                    ]}>
                    {'Boarding & Drop Point'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={{flex: 1, width: '100%', height: '40%'}}>
              {selectSeatScreen === 'SelectSeat' ? (
                <View style={{height: contentHeight}}>
                  <BookBusSeatView BusSeatsData={null} />
                </View>
              ) : (
                <View style={{overflow: 'hidden', height: contentHeight2}}>
                  <BoardingDropPointView BusBoardingData={null} />
                </View>
              )}
            </View>
          </View>
        ) : (
          <View
            style={{
              // height: 150,
              backgroundColor: '',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              style={{height: 120, width: 120, borderRadius: 100}}
              source={require('../assets/Loader/Busloader.gif')}></FastImage>
          </View>
        )}
      </ImageBackground>
    </View>
  );

  // // Sort the seats by column and then by row
  // const sortedSeats = upperDeckSeats?.sort((a, b) => {
  //   if (a.column === b.column) {
  //     return a.row - b.row;
  //   }
  //   return a.column - b.column;
  // });

  // // Group seats into rows (we'll use a map of rows and their seats)
  // const groupSeatsByRow = () => {
  //   const rows = {};
  //   sortedSeats.forEach(seat => {
  //     if (!rows[seat.row]) {
  //       rows[seat.row] = [];
  //     }
  //     rows[seat.row].push(seat);
  //   });
  //   return rows;
  // };

  // const renderSeat = (seat, index) => {
  //   const gridRow = seat.type === 'UB' ? `span 2` : seat.row;
  //   const gridColumn = seat.column === 3 ? 4 : seat.column;

  //   return (
  //     <View
  //       key={index}
  //       style={{
  //         marginHorizontal: 5,
  //         marginVertical: 6,
  //         gridRow: gridRow,
  //         gridColumn: gridColumn,
  //       }}
  //     >
  //       <TouchableOpacity
  //         style={[
  //           {
  //             gridRow: gridRow,
  //             gridColumn: gridColumn,
  //           },
  //           selectedPrice === 'All' && {
  //             shadowColor: '#44AA21',
  //             shadowOffset: { width: 0, height: 3 },
  //             shadowOpacity: 1,
  //             shadowRadius: 3,
  //             elevation: 3,
  //           },
  //         ]}
  //         onPress={() => {
  //           if (!seat.isBooked) {
  //             console.log(`Seat ${seat.seatNumber} selected`);
  //           } else {
  //             Alert.alert('Seat Already Booked');
  //           }
  //         }}
  //         disabled={seat.isBooked}
  //       >
  //         <Svg style={{ width: 26, height: 68 }}>
  //           {seat.type === 'SS' ? (
  //             <BusSeater width="100%" height="100%" fillColor={getSeatFillColor(seat)} strokeColor={getSeatColor(seat)} />
  //           ) : (
  //             <SleeperSeat width="100%" height="100%" fillColor={getSeatFillColor(seat)} strokeColor={getSeatColor(seat)} />
  //           )}
  //         </Svg>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  // ---------------------------------------------------------------SeatLayout-------------------------------------------------

  const handleSeatSelection = (seat, index) => {
    if (seat.isBooked) {
      Alert.alert('Seat Already Booked');
      return;
    }

    const isSeatSelected = selectedSeat.some(
      s => s.seatNumber === seat.seatNumber,
    );

    if (isSeatSelected) {
      const updatedSeats = selectedSeat.filter(
        s => s.seatNumber !== seat.seatNumber,
      );
      setSelectedSeat(updatedSeats);

      if (updatedSeats.length === 0) {
        closeBottomModal(); // Close modal if no seats selected
      }
    } else {
      if (selectedSeat.length >= 6) {
        Alert.alert('You can only select up to 6 seats.');
        return;
      }

      const updatedSeats = [...selectedSeat, seat];
      setSelectedSeat(updatedSeats);

      if (updatedSeats.length === 1) {
        openBottomModal(); // Open modal when first seat is selected
      }
    }
  };

  // ------------------------------------------------------------Upper Berth-------------------------------------
  const upper_count = upperDeckSeats?.length;
  // console.log(upper_count, "upper_count");

  const UpperBerthArrangement = () => {
    const rows = [];

    // Grouping seats by row and column
    upperDeckSeats.forEach(seat => {
      // Ensure that the row exists
      if (!rows[seat.row - 1]) {
        rows[seat.row - 1] = {
          row: seat.row,
          seats: [undefined, undefined, undefined], // C5, C2, C1 (indexed positions)
        };
      }

      // Place seats in their respective columns (C5, C2, C1)
      // if (seat.column === 5 || seat.column === 4) {
      //   rows[seat.row - 1].seats[0] = seat; // Column 5 in the first position
      // } else
      if (seat.column === 2) {
        rows[seat.row - 1].seats[1] = seat; // Column 2 in the second position
      } else if (seat.column === 1) {
        rows[seat.row - 1].seats[2] = seat; // Column 1 in the third position
      }
       else if (seat.column === 3) {
        rows[seat.row - 1].seats[3] = seat;
       }
       else {
        // console.log(`Unexpected column ${seat.column} for seat ${seat.seatNumber}`);
      }
    });

    // Remove rows that have no seats (all columns are undefined)
    const filteredRows = rows.filter(row =>
      row.seats.some(seat => seat !== undefined),
    );

    return filteredRows;
  };

  const UpperBerthArrangement1 = () => {
    const rows = [];

    // Grouping seats by row and column
    upperDeckSeats.forEach(seat => {
      console.log(seat.column, 'seat.column');
      // Ensure that the row exists
      if (!rows[seat.row - 1]) {
        rows[seat.row - 1] = {
          row: seat.row,
          seats: [undefined, undefined, undefined], // C5, C2, C1 (indexed positions)
        };
      }

      // Place seats in their respective columns (C5, C2, C1)
      if (seat.column === 5 || seat.column === 6 || seat.column === 4) {
        rows[seat.row - 1].seats[0] = seat; // Column 5 in the first position
      }
      // if (seat.column === 2) {
      //   rows[seat.row - 1].seats[1] = seat; // Column 2 in the second position
      // } else if (seat.column === 1) {
      //   rows[seat.row - 1].seats[2] = seat; // Column 1 in the third position
      // } else
      else {
        // console.log(`Unexpected column ${seat.column} for seat ${seat.seatNumber}`);
      }
    });

    // Remove rows that have no seats (all columns are undefined)
    const filteredRows = rows.filter(row =>
      row.seats.some(seat => seat !== undefined),
    );

    return filteredRows;
  };

  const renderUpperSeat = (seat, index) => {
    if (!seat) return null; // If the seat is undefined (empty spot), do nothing
    const isSelected = selectedSeats.some(
      s => s.seatNumber === seat.seatNumber,
    );
    console.log(seat, 'column');
    return (
      <View key={index} style={{marginHorizontal: 3, marginVertical: '20%'}}>
        <TouchableOpacity
          style={[
            {flexDirection: 'row', justifyContent: 'center'},
            seat.isBooked && {opacity: 0.5},
          ]}
          onPress={() => handleSeatSelection(seat, index)}
          disabled={seat.isBooked}>
          <Svg style={{width: 30, height: seat.type === 'SS' ? 30 : 77}}>
            {seat.type === 'SS' ? (
              <BusSeater
                width="100%"
                height="100%"
                bottomColor={getSeatBottomColor(seat, index)}
                fillColor={getSeatFillColor(seat, index)}
                strokeColor={getSeatColor(seat, index)}
              />
            ) : (
              <SleeperSeat
                width="100%"
                height="100%"
                borderBottomColor={getSeatBorderBottomColor(seat, index)}
                borderColor={getSeatBorderColor(seat, index)}
                bottomColor={getSeatBottomColor(seat, index)}
                fillColor={getSeatFillColor(seat, index)}
                strokeColor={getSleeperColor(seat, index)}
              />
            )}
            <Text
              style={{
                color: 'white',
                fontSize: 8,
                fontWeight: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
                marginTop: '-43%',
              }}>
              {seat?.price > 0 ? `₹${seat?.price}` : ''}
            </Text>
          </Svg>
        </TouchableOpacity>
      </View>
    );
  };
  // Running the arrangement logic based on dynamic data
  const Upper_list_rows = UpperBerthArrangement(); // Grouping seats by row and column
  const upper_list_rows1 = UpperBerthArrangement1();
  // Convert the rows object into an array for rendering
  // const rowData = Object.keys(rows).map(rowKey => rows[rowKey]);

  const {width} = Dimensions.get('window');
  const calculatedUpperHeight =
    (seatLayout?.upperTotalColumns !== 0
      ? Number(seatLayout?.upperTotalColumns) + 1
      : Number(seatLayout?.lowerTotalColumns) + 1) *
    (width * 0.135); // 0.04 is like multiplying by 4vw

  const validHeight =
    !isNaN(calculatedUpperHeight) && calculatedUpperHeight > 0
      ? calculatedUpperHeight
      : '100%'; // Default to 100 if invalid

  // -----------------------------------------------------------------------------------LowerBerth----------------------------------------

  const lower_count = lowerDeckSeats?.length;
 const LowerBerthArrangement = () => {
    const rows = [];

    // Grouping seats by row and column
    lowerDeckSeats.forEach(seat => {
      // Ensure that the row exists
      if (!rows[seat.row - 1]) {
        rows[seat.row - 1] = {
          row: seat.row,
          seats: [undefined, undefined, undefined], // C5, C2, C1 (indexed positions)
        };
      }

      // Place seats in their respective columns (C5, C2, C1)
      // if (seat.column === 5 || seat.column === 4) {
      //   rows[seat.row - 1].seats[0] = seat; // Column 5 in the first position
      // } else
      if (seat.column === 2) {
        rows[seat.row - 1].seats[1] = seat; // Column 2 in the second position
      } else if (seat.column === 1) {
        rows[seat.row - 1].seats[2] = seat; // Column 1 in the third position
      } else {
        // console.log(`Unexpected column ${seat.column} for seat ${seat.seatNumber}`);
      }
    });

    // Remove rows that have no seats (all columns are undefined)
    const filteredRows = rows.filter(row =>
      row.seats.some(seat => seat !== undefined),
    );

    return filteredRows;
  };
  // const LowerBerthArrangement = () => {
  //   const rows = [];

  //   // Grouping seats by row and column
  //   lowerDeckSeats.forEach(seat => {
  //     // Ensure that the row exists
  //     if (!rows[seat.row - 1]) {
  //       rows[seat.row - 1] = {
  //         row: seat.row,
  //         seats: [undefined, undefined, undefined], // C5, C2, C1 (indexed positions)
  //       };
  //     }

  //     // Place seats in their respective columns (C5, C2, C1)
  //     // if (seat.column === 5 || seat.column === 4) {
  //     //   rows[seat.row - 1].seats[0] = seat; // Column 5 in the first position
  //     // } else
  //     if (seat.column === 2) {
  //       rows[seat.row - 1].seats[1] = seat; // Column 2 in the second position
  //     } else if (seat.column === 1) {
  //       rows[seat.row - 1].seats[2] = seat; // Column 1 in the third position
  //     } else {
  //       // console.log(`Unexpected column ${seat.column} for seat ${seat.seatNumber}`);
  //     }
  //   });

  //   // Remove rows that have no seats (all columns are undefined)
  //   const filteredRows = rows.filter(row =>
  //     row.seats.some(seat => seat !== undefined),
  //   );

  //   return filteredRows;
  // };

  // const LowerBerthArrangement1 = () => {
  //   const rows = [];

  //   // Grouping seats by row and column
  //   lowerDeckSeats.forEach(seat => {
  //     // Ensure that the row exists
  //     if (!rows[seat.row - 1]) {
  //       rows[seat.row - 1] = {
  //         row: seat.row,
  //         seats: [undefined, undefined, undefined], // C5, C2, C1 (indexed positions)
  //       };
  //     }

  //     // Place seats in their respective columns (C5, C2, C1)
  //     if (seat.column === 5 || seat.column === 4) {
  //       rows[seat.row - 1].seats[0] = seat; // Column 5 in the first position
  //     }
  //     // else if (seat.column === 2) {
  //     //   rows[seat.row - 1].seats[1] = seat; // Column 2 in the second position
  //     // } else if (seat.column === 1) {
  //     //   rows[seat.row - 1].seats[2] = seat; // Column 1 in the third position
  //     // }
  //     else {
  //       // console.log(`Unexpected column ${seat.column} for seat ${seat.seatNumber}`);
  //     }
  //   });

  //   // Remove rows that have no seats (all columns are undefined)
  //   const filteredRows = rows.filter(row =>
  //     row.seats.some(seat => seat !== undefined),
  //   );

  //   return filteredRows;
  // };
  const LowerBerthArrangement1 = () => {
    const rows = [];

    // Grouping seats by row and column
    lowerDeckSeats.forEach(seat => {
      // Ensure that the row exists
      if (!rows[seat.row - 1]) {
        rows[seat.row - 1] = {
          row: seat.row,
          seats: [], // C5, C2, C1 (indexed positions)
        };
      }

      // Place seats in their respective columns (C5, C2, C1)
      // if (seat.column === 5 || seat.column === 4) {
      //   rows[seat.row - 1].seats[0] = seat; // Column 5 in the first position
      // }
       if (seat.column === 6) {
        rows[seat.row - 1].seats[0] = seat; // Column 2 in the second position
      }
      else if (seat.column === 5) {
        rows[seat.row - 1].seats[1] = seat; // Column 2 in the second position
      }
       else if (seat.column === 4) {
        rows[seat.row - 1].seats[2] = seat; // Column 1 in the third position
      }
      else if (seat.column === 3){
        if(lowerDeckSeats.length > 34){
          rows[seat.row - 1].seats[3] = seat
        }
        else{
          rows[seat.row - 1].seats[3] = seat
        }
      }
      else {
        // console.log(`Unexpected column ${seat.column} for seat ${seat.seatNumber}`);
      }
    });

    // Remove rows that have no seats (all columns are undefined)
    const filteredRows = rows.filter(row =>
      row.seats.some(seat => seat !== undefined),
    );
console.log(rows,"rowsrowsrows");

    return filteredRows;
  };

  const renderLowerSeat = (seat, index) => {
    if (!seat) return null; // If the seat is undefined (empty spot), do nothing

    const isSelected = selectedSeats.some(
      s => s.seatNumber === seat.seatNumber,
    );

    console.log(seat,"lowerseatssss");
    

    return (
      <View key={index} style={{marginHorizontal: 3, marginVertical: '20%'}}>
        <TouchableOpacity
          style={[
            {flexDirection: 'row', justifyContent: 'center'},
            seat.isBooked && {opacity: 0.5},
          ]}
          onPress={() => handleSeatSelection(seat, index)}
          disabled={seat.isBooked}>
          <Svg style={{width: 30, height: seat.type === 'SS' ? 30 : 77}}>
            {seat.type === 'SS'  ? (
              <>
                <BusSeater
                  width="100%"
                  height="100%"
                  bottomColor={getSeatBottomColor(seat, index)}
                  fillColor={getSeatFillColor(seat, index)}
                  strokeColor={getSeatColor(seat, index)}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 8,
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginTop: '-39%',
                  }}>
                  {seat?.price > 0 ? `₹${seat?.price}` : ''}
                </Text>
              </>
            ) : (
              <>
                <SleeperSeat
                  width="100%"
                  height="100%"
                  borderBottomColor={getSeatBorderBottomColor(seat, index)}
                  borderColor={getSeatBorderColor(seat, index)}
                  bottomColor={getSeatBottomColor(seat, index)}
                  fillColor={getSeatFillColor(seat, index)}
                  strokeColor={getSleeperColor(seat, index)}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 8,
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginTop: '-42%',
                  }}>
                  {seat?.price > 0 ? `₹${seat?.price}` : ''}
                </Text>
              </>
            )}
          </Svg>
        </TouchableOpacity>
      </View>
    );
  };

  // Running the arrangement logic based on dynamic data
  const Lower_list_rows = LowerBerthArrangement(); // Grouping seats by row and column
  const Lower_list_rows1 = LowerBerthArrangement1();
// console.log(lowerDeckSeats.length,"lisisisisisisisis");
// console.log(Lower_list_rows1.map((row)=> row.seats),"mappdedseatsssss");

//  const maxRow = lowerDeckSeats.reduce((m, s) => Math.max(m, s.row), 0);
//   const maxCol = lowerDeckSeats.reduce((m, s) => Math.max(m, s.column), 0);

//     const rows = Array.from({ length: maxRow }, (_, i) =>
//     lowerDeckSeats.filter(s => s.row === i + 1)
//   );

//   const seatWidth = 40;
//   const seatHeight = 45;
//   const totalCols = Math.max(...lowerDeckSeats.map(s => s.column));
//   const totalRows = Math.max(...lowerDeckSeats.map(s => s.row));
//   const containerHeight = (totalRows + 1) * seatHeight;
//   const containerWidth = (totalCols + 1) * seatWidth;


//   const layout = lowerDeckSeats.map(seat => {
//   return {
//     ...seat,
//     top: (seat.row - 1) * seatHeight,
//     left: (totalCols - seat.column) * seatWidth, // <-- Flip left-to-right
//     height: seat.type === 'SS' ? seatHeight : seatHeight * 2 ,
//   };
// });


const renderDeckSeats = (lowerDeckSeats) => {
  const seatWidth = 40;
  const seatHeight = 45;

 const allCols = [...new Set(lowerDeckSeats.map(s => s.column))].sort((a, b) => a - b);
 const colMap = {};
  let displayCol = 0;
  for (let i = 0; i < allCols.length; i++) {
    const curr = allCols[i];
    const prev = allCols[i - 1];
    if (i > 0 && curr - prev > 1) {
      displayCol += 1; // Only one space for a gap
    }
    colMap[curr] = displayCol;
    displayCol += 1;
  }

const totalCompressedCols = displayCol;

  const totalCols = Math.max(...lowerDeckSeats.map(s => s.column));
  const totalRows = Math.max(...lowerDeckSeats.map(s => s.row));
  // const layout = lowerDeckSeats.map(seat => ({
  //   ...seat,
  //   top: (seat.row - 1) * seatHeight,
  //   left: (totalCols - seat.column) * seatWidth, // Flip left-to-right
  //   height: seat.type === 'SS' ? seatHeight : seatHeight * 2,
  // }));
  const layout = lowerDeckSeats.map(seat => {
    const compressedCol = colMap[seat.column];
    const flippedCol = totalCompressedCols - 1 - compressedCol;

    return {
      ...seat,
      top: (seat.row - 1) * seatHeight,
      left: flippedCol * seatWidth,
      height: seat.type === 'SS' ? seatHeight : seatHeight * 2,
    };
  });

  const containerHeight = (totalRows + 1) * seatHeight;
  const containerWidth = (totalCols + 1) * seatWidth;

  return (
    <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ width: containerWidth -30, height: containerHeight, position: 'relative', marginTop: 5 }}>
        {layout.map((seat, index) => (
          <TouchableOpacity
            key={index}
            style={[
              { flexDirection: 'row', justifyContent: 'center' },
              seat.isBooked && { opacity: 0.5 },
            ]}
            onPress={() => handleSeatSelection(seat, index)}
            disabled={seat.isBooked}
          >
            <Svg
              style={{
                width: seatWidth - 8,
                height: seat.height - 8,
                position: 'absolute',
                top: seat.top,
                left: seat.left,
                backgroundColor: '#e0f7ff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                margin: 4,
              }}
            >
              {seat.type === 'SS' ? (
                <>
                  <BusSeater
                    width="100%"
                    height="100%"
                    bottomColor={getSeatBottomColor(seat, index)}
                    fillColor={getSeatFillColor(seat, index)}
                    strokeColor={getSeatColor(seat, index)}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 8,
                      textAlign: 'center',
                      justifyContent: 'center',
                      marginTop: '-39%',
                      paddingLeft: '20%',
                    }}
                  >
                    {seat?.price > 0 ? `₹${seat?.price}` : ''}
                  </Text>
                </>
              ) : (
                <>
                  <SleeperSeat
                    width="100%"
                    height="100%"
                    borderBottomColor={getSeatBorderBottomColor(seat, index)}
                    borderColor={getSeatBorderColor(seat, index)}
                    bottomColor={getSeatBottomColor(seat, index)}
                    fillColor={getSeatFillColor(seat, index)}
                    strokeColor={getSleeperColor(seat, index)}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 8,
                      textAlign: 'center',
                      justifyContent: 'center',
                      marginTop: '-42%',
                      paddingLeft: '20%',
                    }}
                  >
                    {seat?.price > 0 ? `₹${seat?.price}` : ''}
                  </Text>
                </>
              )}
            </Svg>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};


  const BookBusSeatView = ({BusSeatsData}) => {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: '2%',
            gap: 10,
            marginTop: 20,
            marginBottom: showBottomModal ? '41%' : '25%',
            justifyContent:"center"
          }}>
          <View
            style={{
              height: '100%',
              // width: upperDeckSeats?.length > 0 ? '50%' :'auto',
              // flex: 1.05,
               flex: upperDeckSeats?.length > 0 ? 1.05 : null,
              borderColor:
                screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor,
              borderWidth: 0.9,
              borderRadius: 20,
              backgroundColor: '#FFFFFF',
            }}>
            <View style={{height: '7%'}}>
              <View
                style={{
                  width: '100%',
                  height: '3%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  position: 'absolute',
                  marginTop: -7,
                }}>
                <Svg style={{width: 14, height: 7}}>
                  <BusLight
                    width="100%"
                    height="100%"
                    color={
                      screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor
                    }
                  />
                </Svg>
                <Svg style={{width: 14, height: 7}}>
                  <BusLight
                    width="100%"
                    height="100%"
                    color={
                      screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor
                    }
                  />
                </Svg>
              </View>
              <Text
                style={{
                  fontWeight: '400',
                  marginTop: '3%',
                  color: '#393939',
                  fontFamily: 'Inter',
                  fontSize: 10,
                  textAlign: 'center',
                  lineHeight: 12,
                }}>
                LOWER BERTH ({lowerDeckSeats?.length})
              </Text>
              <Image
                source={require('../assets/stearing.png')}
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: 'flex-end',
                  marginTop: '-4%',
                  marginRight: 12,
                }}
              />
              <View
                style={{
                  width: 15,
                  height: '50%',
                  marginTop: '-5%',
                  backgroundColor:
                    screenTheme === 'Luxury Coach' ? '#FFEEC9' : '#EEEDED',
                  left: -1,
                  borderColor:
                    screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                }}
              />
            </View>
            <View
              style={[
                styles.seat_layout_container,
                {height: validHeight, width: '100%'},
              ]}>
              {/* <View style={{ flex: 1 }} >

              <FlatList data={lowerDeckSeats}
                renderItem={({ item, index }) => <NonSleeperRowView SeatData={item} Index={index} SeatRow={'Row1'} />}
              />
              <FlatList data={lowerDeckSeats}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => <BottomSeaterRowView SeatData={item} Index={index} />}
              />
            </View> */}




              {/* <View style={{flexDirection: 'row'}}>
                <View>
                  {Lower_list_rows1.map((row, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                      {row.seats.map((seat, seatIndex) => (
                        <View key={seatIndex}>
                          {renderLowerSeat(seat, seatIndex)}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
                <View style={{marginLeft: lowerDeckSeats.length > 34 ? null : '18%'}}>
                  {Lower_list_rows.map((row, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                      {row.seats.map((seat, seatIndex) => (
                        <View key={seatIndex}>
                          {renderLowerSeat(seat, seatIndex)}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View> */}

{/* 
                  <ScrollView horizontal contentContainerStyle={styles.container}>
                       <View style={{ width: containerWidth, height: containerHeight, position: 'relative',marginTop:5}}>
        {layout.map((seat, index) => (
             <TouchableOpacity
          style={[
            {flexDirection: 'row', justifyContent: 'center'},
            seat.isBooked && {opacity: 0.5},
          ]}
          onPress={() => handleSeatSelection(seat, index)}
          disabled={seat.isBooked}>

               <Svg style={{width: 30, height: seat.type === 'SS' ? 30 : 77, position: 'absolute',
              top: seat.top,
              left: seat.left,
              width: seatWidth - 8,
              height: seat.height - 8,
              backgroundColor: '#e0f7ff',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              margin: 4,}}>
            {seat.type === 'SS'  ? (
              <>
                <BusSeater
                  width="100%"
                  height="100%"
                  bottomColor={getSeatBottomColor(seat, index)}
                  fillColor={getSeatFillColor(seat, index)}
                  strokeColor={getSeatColor(seat, index)}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 8,
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginTop: '-39%',
                    paddingLeft:"20%"
                  }}>
                  {seat?.price > 0 ? `₹${seat?.price}` : ''}
                </Text>
              </>
            ) : (
              <>
                <SleeperSeat
                  width="100%"
                  height="100%"
                  borderBottomColor={getSeatBorderBottomColor(seat, index)}
                  borderColor={getSeatBorderColor(seat, index)}
                  bottomColor={getSeatBottomColor(seat, index)}
                  fillColor={getSeatFillColor(seat, index)}
                  strokeColor={getSleeperColor(seat, index)}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 8,
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginTop: '-42%',
                    paddingLeft:"20%"
                  }}>
                  {seat?.price > 0 ? `₹${seat?.price}` : ''}
                </Text>
              </>
            )}
          </Svg>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView> */}
            {renderDeckSeats(lowerDeckSeats)}

              {/* <View>
              <FlatList data={lowerDeckSeats}
                renderItem={({ item, index }) =>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '100%'
                    }}
                  >
                    <LowerListSeats SeatData={item} Index={index} SeatRow={'Row1'} />
                  </View>

                }
              />

            </View> */}
            </View>
            {/* <View style = {{flex:1,paddingHorizontal: 6,paddingBottom:5}}>
          <FlatList data={lowerLastRow}
           horizontal
           showsHorizontalScrollIndicator={false}
           keyExtractor={item => item.id}
                renderItem={({ item, index }) => <BottomSeaterRowView index={index}/>}
              />
          </View> */}
          </View>
             {
            upperDeckSeats?.length > 0 &&
          <View
            style={{
              height: '100%',
              width: '100%',
              flex: 1,
              borderRadius: 20,
              borderColor:
                screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor,
              borderWidth: 0.9,
              backgroundColor: '#FFFFFF',
            }}>
            <View style={{height: '7%'}}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  position: 'absolute',
                  height: '50%',
                  marginTop: '-5%',
                }}>
                <Svg style={{width: 14, height: 7}}>
                  <BusLight
                    width="100%"
                    height="100%"
                    color={
                      screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor
                    }
                  />
                </Svg>
                <Svg style={{width: 14, height: 7}}>
                  <BusLight
                    width="100%"
                    height="100%"
                    color={
                      screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor
                    }
                  />
                </Svg>
              </View>
              <Text
                style={{
                  fontWeight: '400',
                  marginTop: '3%',
                  color: '#393939',
                  fontFamily: 'Inter',
                  fontSize: 10,
                  textAlign: 'center',
                  lineHeight: 12,
                }}>
                UPPER BERTH ({upperDeckSeats?.length})
              </Text>
            </View>
            <View
              style={[
                styles.seat_layout_container,
                {height: validHeight, width: '100%'},
              ]}>
              {/* <View style={{flexDirection: 'row'}}>
                <View>
                  {upper_list_rows1.map((row, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                      {row.seats.map((seat, seatIndex) => (
                        <View key={seatIndex}>
                          {renderUpperSeat(seat, seatIndex)}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
                <View style={{marginLeft: '23%'}}>
                  {Upper_list_rows.map((row, rowIndex) => (
                    <View
                      key={rowIndex}
                      style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                      {row.seats.map((seat, seatIndex) => (
                        <View key={seatIndex}>
                          {renderUpperSeat(seat, seatIndex)}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </View> */}
{renderDeckSeats(upperDeckSeats)}
              {/* {upperDeckSeats?.map((seat, index) =>
              seat?.type === "SS" ?
                <View>
                  <View>
                    <TouchableOpacity
                      style={[
                        {
                          marginHorizontal: 5,
                          marginVertical: 6,
                          gridRow: SeatData.column === 5
                            ? SeatData.row
                            : SeatData.type === "UB"
                              ? `span 2`
                              : SeatData.row, // Sleeper seats span 2 rows
                          gridColumn: SeatData.column === 3 ? 4 : SeatData?.column,
                        },
                        selectedPrice === 'All' && {
                          shadowColor: '#44AA21',
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 1,
                          shadowRadius: 3,
                          elevation: 3,
                        },
                      ]}
                      onPress={() => {
                        if (!seat.isBooked) {
                          // Implement selection logic for unbooked seats
                          console.log(`Seat ${seat.seatNumber} selected`);
                        } else {
                          Alert.alert('Seat Already Booked');
                        }
                      }}
                      disabled={seat.isBooked} // Disable button if seat is booked
                    >
                      <Svg style={{ width: 26, height: 68 }}>
                        <BusSeater width="100%" height="100%" fillColor={getSeatFillColor(seat)} strokeColor={getSeatColor(seat)} />
                      </Svg>
                    </TouchableOpacity>
                  </View>
                </View>
                :
                <View>
                  <TouchableOpacity style={[
                    {
                      marginHorizontal: 5,
                      marginVertical: 6,
                      gridRow: seat.column === 5
                        ? seat.row
                        : seat.type === "UB"
                          ? `span 2`
                          : seat.row, // Sleeper seats span 2 rows
                      gridColumn: seat.column === 3 ? 4 : seat?.column,
                    },
                    (selectedPrice === 'All') && {
                      shadowColor: '#44AA21',
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 1,
                      shadowRadius: 3,
                      elevation: 3,
                    },
                  ]} onPress={() => {
                    // if (!seat.isBooked && SeatRow === 'Row1') {
                    //   onSelectUpperRow1(Index);
                    // } else if (!seat.isBooked && SeatRow === 'Row2') {
                    //   onSelectUpperRow2(Index);
                    // } else {
                    //   Alert.alert('Seat Already Booked');
                    // }

                  }}
                    disabled={seat.isBooked}
                  >
                    <Svg style={{ width: 26, height: 68 }}>
                      <SleeperSeat width="100%" height="100%" fillColor={getSeatFillColor(seat)} strokeColor={getSeatColor(seat)} />
                    </Svg>
                  
                  </TouchableOpacity>
                </View>)} */}
              {/* <FlatList
        data={rowData}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {item.map((seat, seatIndex) => renderSeat(seat, seatIndex))}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
              {/* <FlatList
              data={upperDeckSeats}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: 'column', // Set to 'column' to stack items vertically
                    flexWrap: 'wrap',
                    width: '100%' // Ensure each item takes full width for wrapping
                  }}
                >
                  <UpperListSeats SeatData={item} Index={index} SeatRow={'Row1'} />

                </View>
              )}
            /> */}
            </View>
          </View>
             }
        </View>
      </ScrollView>
    );
  };
  console.log(Upper_list_rows, 'Lower_list_rows1');
  // const BookBusSeatView = () => {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.SeatContainer}>
  //         <ScrollView style={styles.scrollView}>
  //           <View style={styles.seatCategory}>
  //             {lowerDeckSeats?.map((seat, index) => (
  //               <View style={styles.seatCategoryGrid} key={`${seat.row}-${seat.column}`}>
  //                 {/* Seat Type SS */}
  //                 {seat?.type === "SS" && (
  //                   // <TouchableOpacity onPress={() => handleSeatSelect(seat)}>
  //                   <Svg width={28} height={32} viewBox="0 0 28 32" fill="none">
  //                     <Path
  //                       d="M3.57869 12.2962V5.25614C3.57869 3.08157 5.34153 1.31873 7.5161 1.31873H21.3079C23.4825 1.31873 25.2454 3.08139 25.2454 5.25596C25.2454 8.57832 25.2454 12.2961 25.2454 12.2961M25.2454 12.2961L26.3927 12.2962C26.8759 12.2962 27.2676 12.6879 27.2676 13.1712V30.0504C27.2676 30.7753 26.68 31.3629 25.9551 31.3629H2.58005C1.85519 31.3629 1.26758 30.7753 1.26758 30.0504V13.1712C1.26758 12.688 1.65932 12.2962 2.14256 12.2962H5.01482C5.49806 12.2962 5.8898 12.688 5.8898 13.1712V26.5838C5.8898 27.3086 6.47741 27.8962 7.20227 27.8962H21.9107C22.6355 27.8962 23.2231 27.3086 23.2231 26.5838V13.1712C23.2231 12.6879 23.6148 12.2962 24.0981 12.2962L25.2454 12.2961Z"
  //                       stroke={getSeatColor(seat.gender)} // Set the stroke dynamically based on gender
  //                       strokeWidth={0.738265}
  //                     />
  //                   </Svg>
  //                   // </TouchableOpacity>
  //                 )}

  //                 {/* Seat Type LB */}
  //                 {seat?.type === "LB" && (
  //                   // <TouchableOpacity onPress={() => handleSeatSelect(seat)}>
  //                   <Svg
  //                     width={Dimensions.get('window').width * 0.25} // Dynamic width based on screen width
  //                     height={Dimensions.get('window').width * 0.6} // Dynamic height based on screen width
  //                     viewBox="0 0 94 221"
  //                     fill="none"
  //                   >
  //                     <Path
  //                       d="M1.30176 209.776V7.28689C1.30176 4.18046 3.82002 1.6622 6.92645 1.6622H45.3618L82.8597 1.66212C85.9662 1.66211 88.4844 4.18038 88.4844 7.28681V209.776C88.4844 212.882 85.9662 215.4 82.8597 215.4H45.3618H6.92645C3.82002 215.4 1.30176 212.882 1.30176 209.776Z"
  //                       fill={selectedSeats.includes(seat) ? "blue" : getSeatColor(seat.gender)} // Set the fill dynamically
  //                       stroke={getSeatColor(seat.gender)} // Set the stroke dynamically
  //                       strokeWidth="1.8749"
  //                     />
  //                     <Path
  //                       d="M63.5838 180.224H26.2565C22.1334 180.224 18.791 183.566 18.791 187.689C18.791 191.812 22.1334 195.155 26.2565 195.155H63.5838C67.7069 195.155 71.0493 191.812 71.0493 187.689C71.0493 183.566 67.7069 180.224 63.5838 180.224Z"
  //                       fill={selectedSeats.includes(seat) ? "blue" : getSeatColor(seat.gender)} // Set the fill dynamically
  //                       stroke={getSeatColor(seat.gender)} // Set the stroke dynamically
  //                       strokeWidth="1.65808"
  //                     />
  //                   </Svg>
  //                   // </TouchableOpacity>
  //                 )}

  //                 {/* Seat Type UB */}
  //                 {seat?.type === "UB" && (
  //                   // <TouchableOpacity onPress={() => handleSeatSelect(seat)}>
  //                   <Svg
  //                     width={Dimensions.get('window').width * 0.3} // Dynamic width based on screen width
  //                     height={Dimensions.get('window').width * 0.2} // Dynamic height based on screen width
  //                     viewBox="0 0 94 221"
  //                   >
  //                     <Path
  //                       d="M1.30176 209.776V7.28689C1.30176 4.18046 3.82002 1.6622 6.92645 1.6622H45.3618L82.8597 1.66212C85.9662 1.66211 88.4844 4.18038 88.4844 7.28681V209.776C88.4844 212.882 85.9662 215.4 82.8597 215.4H45.3618H6.92645C3.82002 215.4 1.30176 212.882 1.30176 209.776Z"
  //                       fill={selectedSeats.includes(seat) ? "blue" : getSeatColor(seat.gender)} // Set the fill dynamically
  //                       stroke={getSeatColor(seat.gender)} // Set the stroke dynamically
  //                       strokeWidth="1.8749"
  //                     />
  //                     <Path
  //                       d="M63.5838 180.224H26.2565C22.1334 180.224 18.791 183.566 18.791 187.689C18.791 191.812 22.1334 195.155 26.2565 195.155H63.5838C67.7069 195.155 71.0493 191.812 71.0493 187.689C71.0493 183.566 67.7069 180.224 63.5838 180.224Z"
  //                       fill={selectedSeats.includes(seat) ? "blue" : getSeatColor(seat.gender)} // Set the fill dynamically
  //                       stroke={getSeatColor(seat.gender)} // Set the stroke dynamically
  //                       strokeWidth="1.65808"
  //                     />
  //                   </Svg>
  //                   // </TouchableOpacity>
  //                 )}
  //               </View>
  //             ))}
  //           </View>
  //         </ScrollView>
  //       </View>
  //     </View>
  //   );
  // };

  const UpperListSeats = ({SeatData, Index, SeatRow}) => {
    // console.log(SeatData, "UpperListSeats")
    return (
      <View>
        <TouchableOpacity
          style={[
            {
              marginHorizontal: 5,
              marginVertical: 6,
              gridRow:
                SeatData.column === 5
                  ? SeatData.row
                  : SeatData.type === 'UB'
                  ? `span 2`
                  : SeatData.row, // Sleeper seats span 2 rows
              gridColumn: SeatData.column === 3 ? 4 : SeatData?.column,
            },
            selectedPrice === 'All' && {
              shadowColor: '#44AA21',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 1,
              shadowRadius: 3,
              elevation: 3,
            },
          ]}
          onPress={() => {
            // if (!SeatData.isBooked && SeatRow === 'Row1') {
            //   onSelectUpperRow1(Index);
            // } else if (!SeatData.isBooked && SeatRow === 'Row2') {
            //   onSelectUpperRow2(Index);
            // } else {
            //   Alert.alert('Seat Already Booked');
            // }
          }}
          disabled={SeatData.isBooked}>
          <Svg style={{width: 26, height: 68}}>
            <SleeperSeat
              width="100%"
              height="100%"
              fillColor={getSeatFillColor(SeatData)}
              strokeColor={getSleeperColor(SeatData)}
            />
          </Svg>
          {/* <Text style={[styles.rowTitle, { paddingTop: 3 }]}>$ 500</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  const onSelectUpperRow1 = index => {
    let tempRow = [];
    tempRow = upperRow1;
    tempRow.map((item, ind) => {
      if (index === ind) {
        if (item.isSelected === true) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item => {
      tempSeats.push(item);
    });
    setUpperRow1(tempSeats);
  };
  const onSelectUpperRow2 = index => {
    let tempRow = [];
    tempRow = upperRow2;
    tempRow.map((item, ind) => {
      if (index === ind) {
        if (item.isSelected === true) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item => {
      tempSeats.push(item);
    });
    setUpperRow2(tempSeats);
  };

  const onSelectLowerRow1 = index => {
    let tempRow = [];
    tempRow = lowerRow1;
    tempRow.map((item, ind) => {
      if (index === ind) {
        if (item.isSelected === true) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item => {
      tempSeats.push(item);
    });
    setLoweRow1(tempSeats);
  };

  const onSelectLowerRow2 = index => {
    let tempRow = [];
    tempRow = LowerRow2;
    tempRow.map((item, ind) => {
      if (index === ind) {
        if (item.isSelected === true) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
      }
    });
    let tempSeats = [];
    tempRow.map(item => {
      tempSeats.push(item);
    });
    setLowerRow2(tempSeats);
  };

  const onAllSelectedSeats = () => {
    lowerRow1.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item);
      }
    });

    LowerRow2.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item);
      }
    });

    upperRow1.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item);
      }
    });

    upperRow2.map(item => {
      if (item.isSelected === true) {
        selectedSeats.push(item);
      }
    });
    return selectedSeats.length;
  };

  // const boardingPointedSelectClick = (item) => {
  //   console.log('Clicked boarding point clicked')
  // }

  // const LowerListSeats = ({ SeatData, Index, SeatRow }) => {
  //   console.log(SeatData, "LowerListSeats");

  //   return (
  //     <View>
  //       <TouchableOpacity
  //         style={[
  //           {
  //             marginHorizontal: 5,
  //             marginVertical: 4, // Matching the vertical margin of UpperListSeats
  //             gridRow: SeatData.column === 5
  //               ? SeatData.row
  //               : SeatData.type === "SS" // Adjust this to your seat type, similar to UpperListSeats
  //                 ? 2 // Seat type "SS" spans 2 rows (adjust as needed)
  //                 : SeatData.row,
  //             gridColumn: SeatData.column === 3 ? 4 : SeatData?.column,
  //           },
  //           selectedPrice === 'All' && {
  //             shadowColor: '#44AA21',
  //             shadowOffset: { width: 0, height: 3 },
  //             shadowOpacity: 1,
  //             shadowRadius: 3,
  //             elevation: 3,
  //           },
  //         ]}
  //         onPress={() => {
  //           // Implement your onSelect logic similar to UpperListSeats
  //           // if (!SeatData.isBooked && SeatRow === 'Row1') {
  //           //   onSelectLowerRow1(Index);
  //           // } else if (!SeatData.isBooked && SeatRow === 'Row2') {
  //           //   onSelectLowerRow2(Index);
  //           // } else {
  //           //   Alert.alert('Seat Already Booked');
  //           // }
  //         }}
  //         disabled={SeatData.isBooked}
  //       >
  //         <Svg style={{ width: 26, height: 68 }}>
  //           {SeatData?.type === "SS" ? (
  //             <BusSeater width="100%" height="100%" fillColor={getSeatFillColor(SeatData)} strokeColor={getSeatColor(SeatData)} />
  //           ) : (
  //             <SleeperSeat width="100%" height="100%" fillColor={getSeatFillColor(SeatData)} strokeColor={getSeatColor(SeatData)} />
  //           )}
  //         </Svg>
  //       </TouchableOpacity>
  //     </View >
  //   );
  // };

  // const LowerListSeats = ({ SeatData, Index, SeatRow }) => {
  //   // console.log(SeatData, "LowerListSeats");

  //   // Helper function to get the seat styles based on its type and position
  //   const getSeatStyles = () => {
  //     // Handling the seat styles based on its column and row position
  //     if (SeatData.type === "LB") {
  //       return {
  //         gridRow: SeatData.column === 3 ? SeatData.row : SeatData.type === "LB" ? "span 2" : SeatData.row,
  //         gridColumn: SeatData.column === 3 ? 2 : SeatData.column,
  //       };
  //     }
  //     if (SeatData.type === "SS") {
  //       return {
  //         gridRow: SeatData.row,
  //         gridColumn: SeatData.column,
  //       };
  //     }
  //     return {}; // Default styles if no matching seat type
  //   };

  //   return (
  //     <View>
  //       <TouchableOpacity
  //         style={[
  //           {
  //             marginHorizontal: 5,
  //             marginVertical: 4, // Matching the vertical margin of UpperListSeats
  //             ...getSeatStyles(), // Applying seat-specific styles
  //           },
  //           selectedPrice === 'All' && {
  //             shadowColor: '#44AA21',
  //             shadowOffset: { width: 0, height: 3 },
  //             shadowOpacity: 1,
  //             shadowRadius: 3,
  //             elevation: 3,
  //           },
  //         ]}
  //         onPress={() => {
  //           if (!SeatData.isBooked) {
  //             // Implement selection logic for unbooked seats
  //             // console.log(`Seat ${SeatData.seatNumber} selected`);
  //           } else {
  //             Alert.alert('Seat Already Booked');
  //           }
  //         }}
  //         disabled={SeatData.isBooked} // Disable button if seat is booked
  //       >
  //         <Svg style={{ width: 26, height: 68 }}>
  //           {SeatData?.type === "SS" ? (
  //             <BusSeater width="100%" height="100%" fillColor={getSeatFillColor(SeatData)} strokeColor={getSeatColor(SeatData)} />
  //           ) : (
  //             <SleeperSeat width="100%" height="100%" fillColor={getSeatFillColor(SeatData)} strokeColor={getSeatColor(SeatData)} />
  //           )}
  //         </Svg>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const BottomSeaterRowView = ({SeatData, index}) => {
    return (
      <TouchableOpacity
        style={[
          {marginLeft: 5, marginVertical: 3},
          selectedPrice === 'All' && {
            shadowColor: '#44AA21',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3,
          },
        ]}
        onPress={() => {
          if (SeatData.isBooked) {
            Alert.alert('Clicked Non Sleeper seat');
          }
        }}
        disabled={SeatData.isBooked}>
        <Svg style={{width: 26, height: 32}}>
          <BusSeater
            width="100%"
            height="100%"
            bottomColor={getSeatBottomColor(
              SeatData.isSelected,
              SeatData.isBooked,
              SeatData.SeatLegend,
            )}
            fillColor={getSeatFillColor(
              SeatData.isSelected,
              SeatData.isBooked,
              SeatData.SeatLegend,
            )}
            strokeColor={getSeatColor(
              SeatData.isSelected,
              SeatData.isBooked,
              SeatData.SeatLegend,
            )}
          />
        </Svg>
        {/* <Text style={styles.rowTitle}>$ 500</Text> */}
      </TouchableOpacity>
    );
  };
  /*
  // Declare variables for colors or other properties
  const fillColorUnisex = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#84EC7A' : '#D8D8D8';
  const fillColorWomen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#FDB0F9' : '#FFE9FE';
  const fillColorMen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#58E1FF' : '#CCF6FF';
  */
  // const getSeatColor = (seat, index) => {
  //   if (seatSelection === index) {
  //     // Apply selected seat color (darker or lighter)
  //     return seat.gender === 'Unisex' ? '#6cd365' : seat.gender === 'M' ? '#84ec7a' : '#D887D7';
  //   }

  //   if (seat?.isBooked === false) {
  //     return seat.gender === 'Unisex' ? '#6cd365' : seat.gender === 'M' ? '#84ec7a' : '#D887D7';
  //   } else if (seat?.isBooked) {
  //     return seat.gender === 'Unisex' ? '#B0B0B0' : seat.gender === 'M' ? '#99E0FF' : '#F0B4FF';
  //   }

  //   return '#B0B0B0';
  // };

  // // Get seat fill color based on selection and status
  // const getSeatFillColor = (seat, index) => {
  //   if (seatSelection === index) {
  //     // Apply selected seat fill color (lighter)
  //     return '#FFF';
  //   }

  //   if (seat?.isBooked) {
  //     return seat.gender === 'Unisex' ? '#FFF' : seat.gender === 'M' ? '#D9F5FF' : '#FFEDFF';
  //   }
  //   return '#E1E1E1';
  // };

  const getSeatColor = (seat, index) => {
    const isSelected = selectedSeat.some(s => s.seatNumber === seat.seatNumber);

    if (isSelected) {
      // Apply selected seat color (darker or lighter)
      return 'white';
    }
    if (seat?.isBooked === false) {
      console.log(seat.gender, 'seat.gender');

      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#298121'
        : '#FF00D5';
    } else if (seat?.isBooked) {
      return seat.gender === 'Unisex'
        ? '#B0B0B0'
        : seat.gender === 'M'
        ? '#0088D3'
        : '#FF00D5';
    }

    return '#B0B0B0';
  };

  const getSleeperColor = (seat, index) => {
    const isSelected = selectedSeat.some(s => s.seatNumber === seat.seatNumber);

    if (isSelected) {
      // Apply selected seat color (darker or lighter)
      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#298121'
        : '#FF00D5';
    }

    if (seat?.isBooked === false) {
      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#298121'
        : '#FF00D5';
    } else if (seat?.isBooked) {
      return seat.gender === 'Unisex'
        ? '#B0B0B0'
        : seat.gender === 'M'
        ? '#0088D3'
        : '#FF00D5';
    }

    return '#B0B0B0';
  };

  const getSeatFillColor = (seat, index) => {
    const isSelected = selectedSeat.some(s => s.seatNumber === seat.seatNumber);

    if (isSelected) {
      // Apply selected seat fill color (lighter)
      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#298121'
        : '#FF70E7';
    }

    if (seat?.isBooked) {
      return seat.gender === 'Unisex'
        ? '#D8D8D8'
        : seat.gender === 'M'
        ? '#CCF6FF'
        : '#FFE9FE';
    }
    return '#FFF';
  };

  const getSeatBottomColor = (seat, index) => {
    const isSelected = selectedSeat.some(s => s.seatNumber === seat.seatNumber);

    if (isSelected) {
      // Apply selected seat fill color (lighter)
      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#298121'
        : '#FF70E7';
    }

    if (seat?.isBooked) {
      return seat.gender === 'Unisex'
        ? '#D8D8D8'
        : seat.gender === 'M'
        ? '#CCF6FF'
        : '#FFE9FE';
    }
    if (seat?.isBooked === false) {
      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#298121'
        : '#FF70E7';
    }
    return '#FFF';
  };

  const getSeatBorderColor = (seat, index) => {
    const isSelected = selectedSeat.some(s => s.seatNumber === seat.seatNumber);

    if (isSelected) {
      // Apply selected seat fill color (lighter)
      return 'white';
    }

    if (seat?.isBooked) {
      return seat.gender === 'Unisex'
        ? '#D8D8D8'
        : seat.gender === 'M'
        ? '#CCF6FF'
        : '#FFE9FE';
    }
    if (seat?.isBooked === false) {
      return 'white';
    }
    return '#FFF';
  };

  const getSeatBorderBottomColor = (seat, index) => {
    const isSelected = selectedSeat.some(s => s.seatNumber === seat.seatNumber);

    if (isSelected) {
      // Apply selected seat fill color (lighter)
      return 'white';
    }

    if (seat?.isBooked) {
      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#0088D3'
        : '#FF00D5';
    }
    if (seat?.isBooked === false) {
      return seat.gender === 'Unisex'
        ? '#298121'
        : seat.gender === 'M'
        ? '#0088D3'
        : '#FF00D5';
    }
    return '#FFF';
  };

  // const BoardingPointRowView = ({ SeatData }) => {
  //   return (<TouchableOpacity style={[styles.RowpointViewPlace,
  //   SeatData.Selected === true && { backgroundColor: (screenTheme === 'Luxury Coach') ? `${hexToRGB('#FFE5AB', 1)}` : `${hexToRGB(useThemeColor, 0.2)}`, borderColor: (screenTheme === 'Luxury Coach') ? '#ffffff' : useThemeColor, borderWidth: (screenTheme === 'Luxury Coach') ? 0 : 1 }]} onPress={() => boardingPointedSelectClick(SeatData)}>
  //     <Text style={[styles.rowPointTime, SeatData.Selected === true && { color: useThemeColor }]}>04:45   (05 Jun)</Text>
  //     <Text style={[styles.rowPointPlace, SeatData.Selected === true && { color: useThemeColor }]}>Vijaymangalam Toll </Text>
  //   </TouchableOpacity>);
  // };

  // const parseDroppinginfo = droppingData => {
  //   return droppingData.map(info => {
  //     const [place_id, city, time, landmark] = info.split('^');
  //     return { place_id, city, time, landmark, selected: false };
  //   });
  // };

  // const [selectedPoint, setSelectedPoint] = useState(null);

  // const handleSelect = item => {
  //   setSelectedPoint(item.place_id);
  // };
  // Set the first item as selected when the component mounts
  useEffect(() => {
    if (boardingPoints?.length > 0) {
      setSelectedBoardingPoint(boardingPoints[0]);
    }
  }, [boardingPoints]);

  useEffect(() => {
    if (droppingPoints?.length > 0) {
      setSelectedDroppingPoint(droppingPoints[0]);
    }
  }, [droppingPoints]);

  const handleSelectBoarding = point => {
    const updatedBoardingPoints = [
      point,
      ...boardingPoints.filter(p => p.place_id !== point.place_id),
    ];
    setSelectedBoardingPoint({
      place_id: point.place_id,
      city: point.city,
      time: point.time,
      landmark: point.landmark,
    });
    setBoardingPoints(updatedBoardingPoints);
  };

  const handleSelectDropping = point => {
    const updatedDroppingPoints = [
      point,
      ...droppingPoints.filter(p => p.place_id !== point.place_id),
    ];
    setDroppingPoints(updatedDroppingPoints);
    setSelectedDroppingPoint({
      place_id: point.place_id,
      city: point.city,
      time: point.time,
      landmark: point.landmark,
    });
  };

  // console.log(selectedDroppingPoint, selectedBoardingPoint, "selectedBoardingPoint")

  const BoardingPointRowView = ({
    SeatData,
    selectedBoardingPoint,
    onSelect,
  }) => {
    const isSelected = selectedBoardingPoint?.place_id === SeatData.place_id; // Check if selected

    return (
      <TouchableOpacity
        style={[
          styles.RowpointViewPlace,
          isSelected && {
            backgroundColor:
              screenTheme === 'Luxury Coach'
                ? `${hexToRGB('#FFE5AB', 1)}`
                : `${hexToRGB(useThemeColor, 0.2)}`,
            borderColor:
              screenTheme === 'Luxury Coach' ? '#ffffff' : useThemeColor,
            borderWidth: screenTheme === 'Luxury Coach' ? 0 : 1,
          },
          {
            borderBottomWidth: 0.3,
            borderBottomColor: '#ccc', // or useThemeColor or any color you prefer
          },
        ]}
        onPress={() => handleSelectBoarding(SeatData)}>
        <Text
          style={[styles.rowPointTime, isSelected && {color: useThemeColor}]}>
          {SeatData.time}
        </Text>
        <Text
          style={[styles.rowPointPlace, isSelected && {color: useThemeColor}]}>
          {SeatData.city}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.rowPointLandmark,
            isSelected && {color: useThemeColor},
          ]}>
          {SeatData.landmark}
        </Text>
      </TouchableOpacity>
    );
  };

  const DroppingPointRowView = ({
    SeatData,
    selectedDroppingPoint,
    onSelect,
  }) => {
    const isSelected = selectedDroppingPoint?.place_id === SeatData.place_id; // Check if selected

    return (
      <TouchableOpacity
        style={[
          styles.RowpointViewPlace,
          isSelected && {
            backgroundColor:
              screenTheme === 'Luxury Coach'
                ? `${hexToRGB('#FFE5AB', 1)}`
                : `${hexToRGB(useThemeColor, 0.2)}`,
            borderColor:
              screenTheme === 'Luxury Coach' ? '#ffffff' : useThemeColor,
            borderWidth: screenTheme === 'Luxury Coach' ? 0 : 1,
          },
          {
            borderBottomWidth: 0.3,
            borderBottomColor: '#ccc', // or useThemeColor or any color you prefer
          },
        ]}
        onPress={() => onSelect(SeatData)}>
        <Text
          style={[styles.rowPointTime, isSelected && {color: useThemeColor}]}>
          {SeatData.time}
        </Text>
        <Text
          style={[styles.rowPointPlace, isSelected && {color: useThemeColor}]}>
          {SeatData.city}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.rowPointLandmark,
            isSelected && {color: useThemeColor},
          ]}>
          {SeatData.landmark}
        </Text>
      </TouchableOpacity>
    );
  };

  const BoardingDropPointView = ({BusBoardingData}) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          gap: 10,
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: showBottomModal ? 100 : 50,
        }}>
        {/* Boarding Points Section */}
        <View
          style={{
            height: '100%',
            overflow: 'hidden',
            flex: 1,
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              height: 37,
              backgroundColor: useThemeColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.SectionPointTitle}>BOARDING POINT</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#FFFFFF', height: 200}}>
            <FlatList
              data={boardingPoints}
              renderItem={({item}) => (
                <BoardingPointRowView
                  SeatData={item}
                  selectedBoardingPoint={selectedBoardingPoint}
                  onSelect={handleSelectBoarding}
                />
              )}
              keyExtractor={item => item.place_id}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{flexGrow: 1}}
              extraData={selectedBoardingPoint} // Prevents scroll from jumping
            />
          </View>
        </View>

        {/* Dropping Points Section */}
        <View
          style={{
            height: '100%',
            overflow: 'hidden',
            flex: 1,
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              height: 37,
              backgroundColor: useThemeColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.SectionPointTitle}>DROP POINT</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#FFFFFF', height: 200}}>
            <FlatList
              data={droppingPoints}
              renderItem={({item}) => (
                <DroppingPointRowView
                  SeatData={item}
                  selectedDroppingPoint={selectedDroppingPoint} // ✅ Updated
                  onSelect={handleSelectDropping} // ✅ Updated
                />
              )}
              keyExtractor={item => item.place_id}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{flexGrow: 1}}
            />
          </View>
        </View>
      </View>
    );
  };

  const hexToRGB = (hex_value, opecity = 1) => {
    const numericValue = parseInt(hex_value.slice(1), 16);
    const r = (numericValue >> 16) & 0xff;
    const g = (numericValue >> 8) & 0xff;
    const b = numericValue & 0xff;
    return `rgba(${r}, ${g}, ${b},${opecity})`;
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            screenTheme === 'Luxury Coach' ? '#F6B642' : useThemeColor,
        },
      ]}
      edges={['right', 'left', 'top']}>
      <View style={styles.bgView}>
        <ImageBackground
          source={
            screenTheme === 'Luxury Coach'
              ? require('../assets/luxuryHeaderBg.png')
              : require('../assets/HeadBg.png')
          }
          imageStyle={{
            resizeMode: 'cover',
          }}
          style={[
            styles.navigationView,
            {
              backgroundColor:
                screenTheme === 'Luxury Coach' ? '#F6B642' : useThemeColor,
            },
          ]}>
          <View style={styles.topImageBg}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Svg style={{width: 30, height: 30, borderRadius: 100}}>
                  <BackWhite
                    width="100%"
                    height="100%"
                    color={themeheaderFontColor}
                  />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={[styles.topTitle, {color: themeheaderFontColor}]}>
                Select Seats
              </Text>
              <Text
                style={[
                  styles.topSubtitle,
                  {color: `${hexToRGB(themeheaderFontColor, 0.8)}`},
                ]}>
                Step 1 of 3
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={handleOpen}>
                <IconSVG name="seatDetails" width={34} height={34} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <ScrollView>
          <View style={styles.tripInfoview}>
            <BusBookingDetails details={[]} />
            <View
              style={{
                flexDirection: 'row',
                width: '65%',
                position: 'absolute',
              }}>
              {screenTheme === 'Luxury Coach' ? (
                <BackgroundImage
                  source={require('../assets/luxuryTopImage.png')}
                  style={[
                    {
                      borderTopLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      overflow: 'hidden',
                      height: 38,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {borderColor: 'rgba(57, 57, 57, 1)'},
                  ]}>
                  <View
                    style={{
                      borderTopWidth: 1.3,
                      overflow: 'hidden',
                      borderLeftWidth: 1.3,
                      borderRightWidth: 1.3,
                      borderTopLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      flexDirection: 'row',
                      overflow: 'hidden',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                    }}>
                    <View style={{flex: 1, paddingRight: 3}}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '500',
                          fontFamily: 'Inter',
                          lineHeight: 12,
                          textAlign: 'left',
                          color: '#393939',
                        }}>
                        Bus Operator
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Inter',
                          lineHeight: 18,
                          textAlign: 'left',
                          fontWeight: '600',
                          numberOfLines: 1, // Shows only 1 line of text
                          ellipsizeMode: 'tail',
                          color: '#393939',
                        }}>
                        {item?.Traveler_Agent_Name
                          ? item.Traveler_Agent_Name.length > 25
                            ? item.Traveler_Agent_Name.slice(0, 24) + '...'
                            : item.Traveler_Agent_Name
                          : ''}
                      </Text>
                    </View>
                    {/* <Image
                        source={require('../assets/OperatorIcon.png')}
                        style={{ width: 30, height: 30 }}
                      /> */}
                  </View>
                </BackgroundImage>
              ) : (
                <LinearGradient
                  colors={['#1F487C', '#0890B4']}
                  style={styles.operatorView}
                  start={{x: 0, y: 0.5}}
                  end={{x: 0.5, y: 0.2}}>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: '500',
                        fontFamily: 'Inter',
                        lineHeight: 12,
                        textAlign: 'left',
                        color: 'white',
                      }}>
                      Bus Operator
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Inter',
                        lineHeight: 18,
                        textAlign: 'left',
                        fontWeight: '600',
                        color: 'white',
                      }}>
                      {item?.Traveler_Agent_Name}
                    </Text>
                  </View>
                  {/* <Image
                      source={require('../assets/OperatorIcon.png')}
                      style={{ width: 30, height: 30 }}
                    /> */}
                </LinearGradient>
              )}
              <View
                style={{
                  backgroundColor: '#1F487C',
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 0,
                  borderRightWidth: 15,
                  borderBottomWidth: 15,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                }}></View>
            </View>
          </View>
        </ScrollView>
      </View>
      <SeatInfoScreen
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <View
        style={{
          position: 'absolute',
          bottom: showBottomModal ? 50 : 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 10,
            paddingTop: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            shadowColor: 'rgb(0, 0, 0)',
            shadowOffset: {width: 0, height: 6},
            shadowOpacity: 8,
            elevation: 30, // Android
          }}>
          {viewListAry?.map(item => {
            const iconToUse =
              screenTheme === 'Luxury Coach'
                ? item.icons.selected
                : item.icons.normal;
            return (
              <TouchableOpacity
                key={item.id}
                //onPress={() => handleButtonPress(item.task)}
                style={{
                  width: '23%',
                  alignItems: 'center',
                  backgroundColor:
                    selectedButton === item.task ? '#1F487C33' : '#FFFFFF',
                  paddingVertical: 5,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                onPress={() => {
                  setStatusVisible(true);
                  setSelectedButton(item.task);
                }}>
                <IconSVG name={iconToUse} width={36} height={36} />

                <Text
                  style={{
                    color: selectedButton === item.task ? '#1F487C' : '#1F487C',
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  {item.task}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ViewMoreScreen
          visible={statusVisible}
          busData={busData}
          jdate={busData?.BUS_START_DATE}
          tbs_discount={tbs_discount}
          busPrice={busData?.Fare}
          onClose={() => {
            setStatusVisible(false);
            setSelectedButton(null);
          }}
          Data={'Trip seats and details'}
          seatLayoutPage={true}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          selectBusType={screenTheme}
          scrollViewRef={scrollViewRef}
        />
      </View>

      {showBottomModal && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            transform: [{translateY: slideAnim}],
            zIndex: 100,
          }}>
          {/* Your existing View with BackgroundImage */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <BackgroundImage
                source={
                  screenTheme === 'Luxury Coach'
                    ? require('../assets/luxuryContBg.png')
                    : ''
                }
                style={{
                  height: '100%',
                  flexDirection: 'row',
                  //margin: 10,
                  // borderColor: '#001938',
                  // borderWidth: 1,
                  // borderRadius: 10,
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor:
                    screenTheme === 'Luxury Coach' ? '#D89E2F' : useThemeColor,
                  //borderRadius: 10,
                }}
                imageStyle={{
                  borderWidth: 1,
                  borderColor:
                    screenTheme === 'Luxury Coach' ? '#D89E2F' : '#1F487C',
                  borderRadius: 10,
                }}>
                {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ justifyContent: 'flex-start', gap: 5 }}>
                    <Text
                      style={{
                        color: screenTheme === 'Luxury Coach' ? useThemeColor : 'white',
                        fontWeight: '700',
                        fontFamily: 'Inter',
                        fontSize: 15,
                      }}
                    >
                      {selectedSeat.length > 0
                        ? selectedSeat.map(seat => seat.seatNumber).join(', ') // List seat numbers
                        : 'No seats selected'}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        lineHeight: 16,
                        color: screenTheme === 'Luxury Coach' ? useThemeColor : 'white',
                      }}
                    >
                      Selected Seat{selectedSeat.length > 1 ? 's' : ''}
                    </Text>
                  </View>

                  <View style={{ justifyContent: 'flex-end', gap: 5 }}>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        fontWeight: '700',
                        fontFamily: 'Inter',
                        fontSize: 15,
                        color: screenTheme === 'Luxury Coach' ? useThemeColor : 'white',
                      }}
                    >
                      ₹ {selectedSeat.reduce((total, seat) => total + seat.price, 0)} 
                    </Text>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontFamily: 'Inter',
                        fontSize: 15,
                        alignSelf: 'flex-end',
                        fontWeight: '500',
                        color: screenTheme === 'Luxury Coach' ? useThemeColor : 'white',
                      }}
                    >
                      Price
                    </Text>
                  </View>
                </View>
              </View> */}
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '54%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        {selectedSeat?.map((seat, index) => (
                          <Text
                            key={index}
                            style={{
                              width: '33.33%', // 100% / 3 = 33.33% per item to fit 3 per row
                              color:
                                screenTheme === 'Luxury Coach'
                                  ? useThemeColor
                                  : 'white',
                              fontWeight: '700',
                              fontFamily: 'Inter',
                              fontSize: 13,
                            }}>
                            {seat.seatNumber}
                            {index !== selectedSeat.length - 1 ? ',' : ''}
                          </Text>
                        ))}
                      </View>

                      <Text
                        style={{
                          color:
                            screenTheme === 'Luxury Coach'
                              ? useThemeColor
                              : 'white',
                          fontWeight: 'lighter',
                          fontFamily: 'Inter',
                          fontSize: 13,
                          marginTop: '1%',
                        }}>
                        {selectedSeat?.length > 1
                          ? 'Selected Seats'
                          : 'Selected Seat'}
                      </Text>
                    </View>

                    <View
                      style={{
                        justifyContent: 'flex-end',
                        gap: 5,
                        marginLeft: -5,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'flex-end',
                          fontWeight: '700',
                          fontFamily: 'Inter',
                          fontSize: 13,
                          color:
                            screenTheme === 'Luxury Coach'
                              ? useThemeColor
                              : 'white',
                        }}>
                        {/* ₹ {selectedSeat.reduce((total, seat) => total + seat.price, 0)}  */}
                        {/* ₹ {totalPrice} */}
                        {`₹ ${calculateDiscountedFare(
                          item?.BUS_START_DATE,
                          totalPrice,
                          tbs_discount,
                        ).toFixed(2)}`}
                        {/* {console.log(item?.BUS_START_DATE,
                        totalPrice,
                        tbs_discount, 'kinnesdf')} */}
                      </Text>
                      <Text
                        style={{
                          alignSelf: 'flex-end',
                          fontWeight: 'lighter',
                          fontFamily: 'Inter',
                          fontSize: 13,
                          color:
                            screenTheme === 'Luxury Coach'
                              ? useThemeColor
                              : 'white',
                        }}>
                        Excl. of taxes
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{alignSelf: 'center'}}>
                  <Image
                    source={require('../assets/Linewhite.png')}
                    style={{
                      width: 1.5,
                      margin: 10,
                      height: 36,
                      tintColor:
                        screenTheme === 'Luxury Coach'
                          ? useThemeColor
                          : '#FFFFFF',
                    }}
                  />
                </View>
                <View style={{alignSelf: 'center', paddingRight: 15}}>
                  <TouchableOpacity
                    style={[
                      styles.cornerbutton,
                      screenTheme === 'Luxury Coach'
                        ? {backgroundColor: useThemeColor}
                        : {backgroundColor: '#fff'},
                    ]}
                    // onPress={() => {
                    //   if (
                    //     selectedSeat?.length > 0 &&
                    //     selectedDroppingPoint?.city?.length > 0 &&
                    //     selectedBoardingPoint.city?.length > 0
                    //   ) {
                    //     navigation.navigate('TravelerScreenDetails', {
                    //       screenTheme: screenTheme,
                    //       themecolor: useThemeColor,
                    //       themeColor2: route.params.themeColor2,
                    //       selectedBoardingPoint: selectedBoardingPoint,
                    //       selectedDroppingPoint: selectedDroppingPoint,
                    //       seatLayout: seatLayout,
                    //       selectedBusData: item,
                    //       selectedSeat: selectedSeat,
                    //       totalPrice: totalPrice,
                    //       Journey_Details: Journey_Details,
                    //     });
                    //   } else if (
                    //     selectedSeat?.length > 0 &&
                    //     selectSeatScreen === 'BoardingPoint'
                    //   ) {
                    //     // alert("Please select Boarding and Dropping Point")
                    //   } else if (
                    //     selectedSeat?.length === 0 &&
                    //     selectSeatScreen === 'BoardingPoint'
                    //   ) {
                    //     onTabsSelectScreenClickPress('SelectSeat');
                    //   } else {
                    //     onTabsSelectScreenClickPress('BoardingPoint');
                    //   }
                    // }}
                    onPress={handleContinuePress}>
                    <Text
                      style={{
                        fontWeight: '400',
                        color:
                          screenTheme === 'Luxury Coach'
                            ? '#FFFFFF'
                            : useThemeColor,
                        fontFamily: 'Inter',
                        fontSize: 18,
                        lineHeight: 22,
                      }}>
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </BackgroundImage>
            </View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  bgView: {flex: 1, backgroundColor: '#E5FFF1'},
  navigationView: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
  },
  topImageBg: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
    position: 'relative',
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  RowpointViewPlace: {paddingVertical: 10, width: '100%', paddingHorizontal: 8},
  RowSelectPlace: {
    marginVertical: 8,
    width: '100%',
    padding: 5,
    borderColor: '#1F487C',
  },
  topViewTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginRight: 25,
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
    marginLeft: 8,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  infoView: {
    flexDirection: 'row',
    width: 120,
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'space-between',
    display: 'flex',
    backgroundColor: '#FFFFFF',
  },
  infoTab: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  infotabActive: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    textAlign: 'center',
    fontSize: 9,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  SectionPointTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  rowPointPlace: {
    textAlign: 'justify',
    fontSize: 13,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  rowPointPlace: {
    textAlign: 'justify',
    fontSize: 13,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  rowPointLandmark: {
    textAlign: 'justify',
    fontSize: 11,
    color: '#A9A9A9',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  rowPointTime: {
    textAlign: 'justify',
    fontSize: 11,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  infotabTitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#1F487C',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  InfotabTitleActive: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  separator: {
    marginVertical: 7,
    borderBottomColor: '#C5C5C5',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ViewTabs: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 5,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 0,
    paddingVertical: 4,
  },
  tabActive: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    paddingVertical: 4,
  },
  tabTitle: {
    fontSize: 15,
    fontWeight: '200',
    color: '#FFFFFFCC',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    marginBottom: '9%',
    paddingHorizontal: 5,
  },
  tabTitleActive: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
  },
  cornerbutton: {
    backgroundColor: '#fff', // White background
    borderRadius: 20, // Square rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    // Adding shadow for a subtle Material Design look
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(229, 255, 241, 0.8)',
  },
  SeatContainer: {
    flex: 0.4,
    padding: 16,
    backgroundColor: '#fff',
    width: '60%',
    height: '200%',
  },
  seatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  seatIcon: {
    marginRight: 10,
  },
  seatText: {
    fontSize: 14,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  seatCategory: {
    flexDirection: 'row', // Arrange items in rows
    flexWrap: 'wrap', // Allow wrapping to next line
    justifyContent: 'space-evenly', // Distribute items evenly
    marginHorizontal: 10,
    padding: 8,
    // backgroundColor: '#FF0000',
    borderRadius: 5,
    gap: 5,
  },
  seatCategoryGrid: {
    width: '20%', // 2 items per row
    aspectRatio: 1, // Keep it square
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  SeatContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  seatCategory: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seatCategoryGrid: {
    margin: 5,
  },
  SteeringSvg: {
    marginLeft: 155,
  },
  seat_layout_container: {
    //backgroundColor: '#FFF',
    overflow: 'hidden',
    paddingHorizontal: '2%',
    marginBottom: '2%',
    flexDirection: 'row', // Change this to 'column' to allow vertical wrapping
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  legendTable: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  infoText: {
    color: '#1F487C',
    fontWeight: '600',
  },
  headerText: {
    fontWeight: '700',
    color: '#1F487C',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowTitle: {
    width: 120,
    fontWeight: '500',
  },
  seatIcon: {
    width: 24,
    alignItems: 'center',
  },
});

export default BusSeatSelectScreen;
