// import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
// import {
//   View,
//   Text,
//   KeyboardAvoidingView,
//   Animated,
//   ScrollView,
//   ImageBackground,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Image,
//   SectionList,
//   Platform,
//   StatusBar,
//   TextInput,
// } from 'react-native';
// import backgroundImage from '../assets/home_bg.png';
// import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

// import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import Slider from '@react-native-community/slider';
// // import { TextInput } from 'react-native-paper';

// import Slider1 from '@react-native-community/slider';

// import thumbImage from '../assets/Bullets.png';
// import {useDispatch, useSelector} from 'react-redux';
// import {FILTERED_OPERATOR, GET_BUS_FILTERS} from '../Redux/Store/Type';
// import moment from 'moment';
// // import { Checkbox } from 'react-native-paper'; // Import Checkbox from React Native Paper
// //import { CheckBox } from '@rneui/themed';
// import filter from 'lodash.filter';
// import CheckBox from '@react-native-community/checkbox';
// //import { CheckBox } from '@rneui/base';

// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Advertisement from '../component/Advertisement/Advertisement';
// import CustomScrollView from '../component/CustomScroll';

// const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// // Get screen dimensions
// const {height: screenHeight} = Dimensions.get('window');

// const {width: RangeScreenWidth} = Dimensions.get('window');

// const {width} = Dimensions.get('window');

// const FilterInsightsScreen = ({
//   visible,
//   onClose,
//   Data,
//   isLuxuryUser,
//   selectedBusesAll,
//   selectedBusesLuxury,
//   selectedBusesRegular,
//   isSelectedAC,
//   isSeatType,
//   setSelectedAC,
//   setSeatType,
//   setRegularBus,
//   regularBus,
//   luxuryBus,
//   setLuxuryBus,
//   normalBus,
//   setNormalBus,
// }) => {
//   const Bus_List = useSelector(state => state?.productReducer?.get_buslist);

//   const dispatch = useDispatch();
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const [visibleHeight, setVisibleHeight] = useState(1);
//   const [contentHeight, setContentHeight] = useState(1);

//   // Thumb height relative to visible content
//   const scrollThumbHeight = visibleHeight * (visibleHeight / contentHeight);

//   // Max scroll distance of content
//   const scrollableHeight = contentHeight - visibleHeight;

//   // Max thumb travel distance
//   const thumbScrollRange = visibleHeight - scrollThumbHeight;

//   const translateY = scrollY.interpolate({
//     inputRange: [0, scrollableHeight],
//     outputRange: [0, thumbScrollRange],
//     extrapolate: 'clamp',
//   });
//   const insets = useSafeAreaInsets();

//   console.log(
//     'status ios :',
//     selectedBusesAll,
//     selectedBusesLuxury,
//     selectedBusesRegular,
//   );

//   const statustopBarheight = insets.top === 0 ? statusBarHeight : insets.top;
//   const [selectCurrentSortName, setSelectCurrentSortName] =
//     useState('Vehicle Type');

//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [searchOperator, setSearchOperator] = useState('');
//   const [selectedFilterValue, setSelectedFilterValue] =
//     useState('Vehicle Type');

//   console.log(searchOperator, 'searachs_operatorss');
//   const maxRating = [1, 2, 3, 4, 5];

//   const [pickuptime, setPickUpTime] = useState('');

//   const [droptime, setDropTime] = useState('');
//   const [searchQueries, setSearchQueries] = useState({
//     boardingPoints: '',
//     droppingPoints: '',
//     Operators: '',
//     Amenities: '',
//   });

//   // State to store the checked status of each operator
//   const [checkedOperators, setCheckedOperators] = useState({});
//   const [checkedBoarding, setCheckedBoarding] = useState({});
//   const [checkedDropping, setCheckedDropping] = useState({});
//   const [checkedAmenities, setCheckedAmenities] = useState({});
//   const [selectedAmenities, setSelectedAmenities] = useState([]);

//   // console.log(checkedOperators, "checkedOperators")

//   const handleOperatorCheck = operatorName => {
//     setCheckedOperators(prevState => {
//       if (prevState[operatorName]) {
//         // If the operator is checked, remove it from the state
//         const updatedItems = {...prevState};
//         delete updatedItems[operatorName];
//         return updatedItems;
//       } else {
//         // If the operator is unchecked, add it to the state
//         return {...prevState, [operatorName]: true};
//       }
//     });
//   };

//   const handleBoardingCheck = boardingName => {
//     setCheckedBoarding(prevState => {
//       if (prevState[boardingName]) {
//         // If the operator is checked, remove it from the state
//         const updatedItems = {...prevState};
//         delete updatedItems[boardingName];
//         return updatedItems;
//       } else {
//         // If the operator is unchecked, add it to the state
//         return {...prevState, [boardingName]: true};
//       }
//     });
//   };

//   const handleDroppingCheck = DroppingName => {
//     setCheckedDropping(prevState => {
//       if (prevState[DroppingName]) {
//         // If the operator is checked, remove it from the state
//         const updatedItems = {...prevState};
//         delete updatedItems[DroppingName];
//         return updatedItems;
//       } else {
//         // If the operator is unchecked, add it to the state
//         return {...prevState, [DroppingName]: true};
//       }
//     });
//   };

//   const handleAmenitiesCheck = (title, index) => {
//     setCheckedAmenities(prev => {
//       const updated = {...prev};
//       if (updated[title]) {
//         delete updated[title];
//       } else {
//         updated[title] = true;
//       }
//       return updated;
//     });

//     setSelectedAmenities(prev => {
//       if (prev.includes(index)) {
//         return prev.filter(i => i !== index);
//       } else {
//         return [...prev, index];
//       }
//     });
//   };

//   // Function to toggle the pickuptime state
//   const togglePickUpTime = time => {
//     setPickUpTime(prevTime => (prevTime === time ? '' : time)); // Toggle if same, reset if different
//   };

//   const toggleDropTime = time => {
//     setDropTime(prevTime => (prevTime === time ? '' : time)); // Toggle if same, reset if different
//   };

//   function isTimeInRange(rangeStart, rangeEnd, targetTime) {
//     const startRange = moment(rangeStart, 'h:mm A');
//     const endRange = moment(rangeEnd, 'h:mm A');
//     const target = moment(targetTime, 'h:mm A');
//     if (startRange.isAfter(endRange)) {
//       return (
//         target.isBetween(
//           startRange,
//           moment('11:59 PM', 'h:mm A'),
//           null,
//           '[)',
//         ) || target.isBefore(endRange, null, '[)')
//       );
//     }
//     return target.isBetween(startRange, endRange, null, '[)');
//   }

//   function isTimeInRangedrop(rangeStart, rangeEnd, targetTime) {
//     const startRange = moment(rangeStart, 'h:mm A');
//     const endRange = moment(rangeEnd, 'h:mm A');
//     const target = moment(targetTime, 'h:mm A');
//     // Case: if the range spans across midnight (e.g., 11:00 PM to 6:00 AM)
//     if (startRange.isAfter(endRange)) {
//       // Check if target time is either after start time OR before end time
//       return (
//         target.isBetween(
//           startRange,
//           moment('11:59 PM', 'h:mm A'),
//           null,
//           '[)',
//         ) || target.isSameOrBefore(endRange, null, '[)')
//       );
//     }
//     // Regular case: check if target time is within the range
//     return target.isBetween(startRange, endRange, null, '[)');
//   }

//   useEffect(() => {
//     if (
//       selectedBusesAll?.includes('1') ||
//       selectedBusesLuxury?.includes('1') ||
//       selectedBusesRegular?.includes('1')
//     ) {
//       setSelectedAC('AC');
//     } else if (
//       selectedBusesAll?.includes('2') ||
//       selectedBusesLuxury?.includes('2') ||
//       selectedBusesRegular?.includes('2')
//     ) {
//       setSelectedAC('NonAc');
//     }

//     if (
//       selectedBusesAll?.includes('3') ||
//       selectedBusesLuxury?.includes('3') ||
//       selectedBusesRegular?.includes('3')
//     ) {
//       setSeatType('Seater');
//     } else if (
//       selectedBusesAll?.includes('4') ||
//       selectedBusesLuxury?.includes('4') ||
//       selectedBusesRegular?.includes('4')
//     ) {
//       setSeatType('Sleeper');
//     }
//   }, []);

//   useEffect(() => {
//     if (isSeatType === '') {
//       // If isSeatType is empty, remove "3" from regularBus
//       if (
//         selectedBusesRegular?.includes('3') ||
//         selectedBusesAll?.includes('3') ||
//         selectedBusesLuxury?.includes('3')
//       ) {
//         setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '3'));
//         setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '3'));
//         setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '3'));
//       }
//       if (
//         selectedBusesRegular?.includes('4') ||
//         selectedBusesAll?.includes('4') ||
//         selectedBusesLuxury?.includes('4')
//       ) {
//         setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '4'));
//         setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '4'));
//         setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '4'));
//       }
//     }
//     if (isSelectedAC === '') {
//       // If isSeatType is empty, remove "3" from regularBus
//       if (
//         selectedBusesRegular?.includes('1') ||
//         selectedBusesAll?.includes('1') ||
//         selectedBusesLuxury?.includes('1')
//       ) {
//         setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '1'));
//         setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '1'));
//         setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '1'));
//       }
//       if (
//         selectedBusesRegular?.includes('2') ||
//         selectedBusesAll?.includes('2') ||
//         selectedBusesLuxury?.includes('2')
//       ) {
//         setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '2'));
//         setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '2'));
//         setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '2'));
//       }
//     }
//   }, [isSelectedAC, isSeatType]);

//   useEffect(() => {
//     let filteredList = Bus_List || [];

//     if (pickuptime != '') {
//       filteredList = filteredList?.filter(item => {
//         const [starttime, endtime] = pickuptime.split(' - ');
//         return isTimeInRange(starttime, endtime, item?.Start_time);
//       });
//     }

//     if (droptime != '') {
//       filteredList = filteredList?.filter(item => {
//         const [starttime, endtime] = droptime.split(' - ');
//         // // console.log(isTimeInRange(starttime, endtime, item?.Arr_Time), starttime, endtime, item?.Arr_Time, "startendtime");
//         return isTimeInRangedrop(starttime, endtime, item?.Arr_Time);
//       });
//     }
//     dispatch({
//       type: GET_BUS_FILTERS,
//       payload: filteredList,
//     });
//   }, [pickuptime, droptime, checkedOperators]);

//   useEffect(() => {
//     let filteredList = Bus_List || [];

//     // ✅ Operator Filter (already working)
//     if (Object.keys(checkedOperators)?.length > 0) {
//       filteredList = filteredList?.filter(item => {
//         const operator =
//           item?.Traveler_Agent_Name?.toString?.().toLowerCase?.().trim?.() ||
//           '';
//         return Object.keys(checkedOperators).some(
//           val => checkedOperators[val] && val.toLowerCase().trim() === operator,
//         );
//       });
//     }

//     // ✅ Boarding Filter (updated for partial match and safety)
//     if (Object.keys(checkedBoarding)?.length > 0) {
//       filteredList = filteredList?.filter(item => {
//         const boarding =
//           item?.boarding_info?.toString?.().toLowerCase?.().trim?.() || '';

//         // 🧪 Optional: log actual data for debugging
//         // console.log('Boarding Info:', boarding);
//         // console.log('Checked Boarding Keys:', Object.keys(checkedBoarding));

//         return Object.keys(checkedBoarding).some(
//           val =>
//             checkedBoarding[val] && boarding.includes(val.toLowerCase().trim()),
//         );
//       });
//     }

//     // ✅ Dropping Filter (updated for partial match and safety)
//     if (Object.keys(checkedDropping)?.length > 0) {
//       filteredList = filteredList?.filter(item => {
//         const dropping =
//           item?.dropping_info?.toString?.().toLowerCase?.().trim?.() || '';
//         return Object.keys(checkedDropping).some(
//           val =>
//             checkedDropping[val] &&
//             dropping?.includes(val.toLowerCase().trim()),
//         );
//       });
//     }

//     if (selectedAmenities?.length > 0) {
//       filteredList = filteredList?.filter(item => {
//         const amenity_1 = item?.Amenities?.split?.(',') || [];
//         const amenity_2 = amenity_1.map(a => Number(a));

//         const amenity_filter = selectedAmenities.every(index => {
//           return amenity_2[index] === 1;
//         });

//         return amenity_filter;
//       });
//     }

//     dispatch({
//       type: GET_BUS_FILTERS,
//       payload: filteredList,
//     });
//   }, [
//     searchQueries,
//     checkedOperators,
//     checkedBoarding,
//     checkedDropping,
//     selectedAmenities,
//     Bus_List,
//   ]);

//   const handleSeatSelection = selectedValue => {
//     setSeatType(prevSelected =>
//       prevSelected === selectedValue ? '' : selectedValue,
//     );
//   };

//   const handleAcNonAc = selectedValue => {
//     setSelectedAC(prevSelected =>
//       prevSelected === selectedValue ? '' : selectedValue,
//     );
//   };

//   // const handleSearchChange = (text, key) => {
//   //   console.log('Input Changed:', text); // Check the input value
//   //   setSearchQueries((prevState) => ({
//   //     ...prevState,
//   //     [key]: text, // Dynamically set the correct key with the new text value
//   //   }));
//   // };

//   // const [filteredOperators, setFilteredOperators] = useState(operatorArray);

//   const [searchQuery, setSearchQuery] = useState('');

//   // const handleSearch = (query) => {
//   //   setSearchQuery(query);

//   //   if (query === '') {
//   //     setFilteredOperators(operatorArray); // If search query is empty, show all operators
//   //   } else {
//   //     const filteredData = operatorArray.filter((item) =>
//   //       item.operator.toLowerCase().includes(query.toLowerCase())
//   //     );
//   //     setFilteredOperators(filteredData);
//   //   }
//   // };

//   // const handleSearch = useCallback((query) => {
//   //   setSearchQuery(query);
//   //   if (query === '') {
//   //     setFilteredOperators(operatorArray);
//   //   } else {
//   //     const filteredData = operatorArray.filter((item) =>
//   //       item.operator.toLowerCase().includes(query.toLowerCase())
//   //     );
//   //     setFilteredOperators(filteredData);
//   //   }
//   // }, [operatorArray]);
//   // Handle input change for searching operators

//   // const debounceTimeout = useRef(null);

//   // const handleSearchChange = (text) => {
//   //   // Clear the previous timeout to debounce the change
//   //   if (debounceTimeout.current) {
//   //     clearTimeout(debounceTimeout.current);
//   //   }

//   //   debounceTimeout.current = setTimeout(() => {
//   //     setSearchQueries((prevState) => ({
//   //       ...prevState,
//   //       Operators: text,
//   //     }));
//   //   }, 500); // Adjust debounce delay as needed
//   // };

//   // console.log(isSeatType, "pranesh___")
//   const TimeList = [
//     {
//       id: '1',
//       title: 'Morning',
//       value: '1',
//       Selected: false,
//       time: '6 AM to 11 AM',
//       image: require('../assets/MorningIcon.png'),
//     },
//     {
//       id: '2',
//       title: 'Afternoon',
//       value: '2',
//       Selected: true,
//       time: '11 AM to 6 PM',
//       image: require('../assets/AfternoonIcon.png'),
//     },
//     {
//       id: '3',
//       title: 'Evening',
//       value: '3',
//       Selected: false,
//       time: '6 PM to 11 PM',
//       image: require('../assets/EveningIcon.png'),
//     },
//     {
//       id: '4',
//       title: 'Late Night',
//       value: '4',
//       Selected: false,
//       time: '11 PM to 6 AM',
//       image: require('../assets/LateNightIcon.png'),
//     },
//   ];

//   const AmentiesList = [
//     {
//       id: '1',
//       title: 'Water Bottle',
//       value: '1',
//       Selected: false,
//     },
//     {
//       id: '2',
//       title: 'Blanket',
//       value: '2',
//       Selected: true,
//     },
//     {
//       id: '3',
//       title: 'TV',
//       value: '3',
//       Selected: false,
//     },
//     {
//       id: '4',
//       title: 'AC',
//       value: '4',
//       Selected: true,
//     },
//     {
//       id: '5',
//       title: 'Snacks',
//       value: '4',
//       Selected: false,
//     },
//     {
//       id: '6',
//       title: 'Charging Point',
//       value: '4',
//       Selected: false,
//     },
//     {
//       id: '7',
//       title: 'CCTV',
//       value: '4',
//       Selected: false,
//     },
//     {
//       id: '8',
//       title: 'Emergency Exit',
//       value: '4',
//       Selected: false,
//     },
//     {
//       id: '9',
//       title: 'Individual TV',
//       value: '9',
//       Selected: false,
//     },
//     {
//       id: '10',
//       title: 'Hammer',
//       value: '10',
//       Selected: true,
//     },
//     {
//       id: '11',
//       title: 'Facial Tissues',
//       value: '11',
//       Selected: false,
//     },
//     {
//       id: '12',
//       title: 'Pillows',
//       value: '12',
//       Selected: true,
//     },
//     {
//       id: '13',
//       title: 'Fire Extinguisher',
//       value: '13',
//       Selected: false,
//     },
//     {
//       id: '14',
//       title: 'Reading Light',
//       value: '14',
//       Selected: false,
//     },
//     {
//       id: '15',
//       title: 'GPS Tracking',
//       value: '15',
//       Selected: false,
//     },
//     {
//       id: '16',
//       title: 'First Aid Box',
//       value: '16',
//       Selected: false,
//     },
//     {
//       id: '17',
//       title: 'Wifi',
//       value: '17',
//       Selected: false,
//     },
//     {
//       id: '18',
//       title: 'Hand Sanitizer',
//       value: '18',
//       Selected: false,
//     },
//     {
//       id: '19',
//       title: 'Temperature checks',
//       value: '19',
//       Selected: false,
//     },
//     {
//       id: '20',
//       title: 'Social Distancing',
//       value: '20',
//       Selected: false,
//     },
//     {
//       id: '21',
//       title: 'Driver Conductor with masks',
//       value: '21',
//       Selected: false,
//     },
//     {
//       id: '22',
//       title: 'Fumigation',
//       value: '22',
//       Selected: false,
//     },
//     {
//       id: '23',
//       title: 'Staff',
//       value: '23',
//       Selected: false,
//     },
//   ];

//   const sortListAry = [
//     {
//       id: '1',
//       title: 'Vehicle Type',
//       keyValue: 'Vehicle Type',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'High to Low', value: '1', Selected: false},
//         {id: '2', title: 'Low to High', value: '2', Selected: false},
//       ],
//     },
//     // {
//     //   id: '2',
//     //   title: 'Star Ratings',
//     //   keyValue: 'Star Ratings',
//     //   isSelect: false,
//     //   data: [
//     //     { id: '1', title: 'High to Low', value: '1', Selected: false },
//     //     { id: '2', title: 'Low to High', value: '2', Selected: false },
//     //   ],
//     // },
//     {
//       id: '3',
//       title: 'Price Range',
//       keyValue: 'Price Range',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'High to Low', value: '1', Selected: false},
//         {id: '2', title: 'Low to High', value: '2', Selected: false},
//       ],
//     },
//     {
//       id: '4',
//       title: 'Boarding Points',
//       keyValue: 'Boarding Points',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
//         {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
//       ],
//     },
//     {
//       id: '5',
//       title: 'Boarding Time',
//       keyValue: 'Boarding Time',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
//         {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
//       ],
//     },
//     {
//       id: '6',
//       title: 'Travel Operators',
//       keyValue: 'Travel Operators',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
//         {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
//       ],
//     },
//     {
//       id: '7',
//       title: 'Dropping Points',
//       keyValue: 'Dropping Points',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
//         {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
//       ],
//     },
//     {
//       id: '8',
//       title: 'Dropping time',
//       keyValue: 'Dropping time',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
//         {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
//       ],
//     },
//     {
//       id: '9',
//       title: 'Amenities',
//       keyValue: 'Amenities',
//       isSelect: false,
//       data: [
//         {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
//         {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
//       ],
//     },
//   ];

//   const PointsList = [
//     {
//       title: 'Popular',
//       data: [
//         {
//           id: '1',
//           title: 'Poonamallee',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '2',
//           title: 'Sriperumbudur',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '3',
//           title: 'Koyambedu',
//           Selected: true,
//           count: '15',
//         },
//         {
//           id: '4',
//           title: 'Vadapalani',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '5',
//           title: 'Ashok Pillar',
//           Selected: true,
//           count: '15',
//         },
//       ],
//     },
//     {
//       title: 'Others',
//       data: [
//         {
//           id: '1',
//           title: 'Poonamallee',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '2',
//           title: 'Sriperumbudur',
//           Selected: true,
//           count: '15',
//         },
//         {
//           id: '3',
//           title: 'Koyambedu',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '4',
//           title: 'Vadapalani',
//           Selected: true,
//           count: '15',
//         },
//         {
//           id: '5',
//           title: 'Ashok Pillar',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '6',
//           title: 'Dilsukhnagar',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '7',
//           title: 'Lakdikapul',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '8',
//           title: 'Sr Nagar',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '9',
//           title: 'KPHB-Pulla Reddy',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '10',
//           title: 'Ashok Pillar',
//           Selected: false,
//           count: '15',
//         },
//       ],
//     },
//     // Add more sections here
//   ];

//   const StartRatingList = [
//     {
//       id: '1',
//       title: '5',
//       value: 5,
//       Selected: false,
//       count: '15',
//     },
//     {
//       id: '2',
//       title: '4',
//       value: 4,
//       Selected: true,
//       count: '15',
//     },
//     {
//       id: '3',
//       title: '3',
//       value: 3,
//       Selected: false,
//       count: '15',
//     },
//     {
//       id: '4',
//       title: '2',
//       value: 2,
//       Selected: false,
//       count: '15',
//     },
//     {
//       id: '5',
//       title: '1',
//       value: 1,
//       Selected: false,
//       count: '15',
//     },
//   ];

//   const SeatTypeList = [
//     {
//       id: '1',
//       title: 'Seater',
//       value: '1',
//       Selected: false,
//       image: require('../assets/Filters/Seater.png'),
//     },
//     // {
//     //   id: '2',
//     //   title: 'Semi Sleeper',
//     //   value: '2',
//     //   Selected: true,
//     //   image: require('../assets/Filters/SemiSeater.png'),
//     // },
//     {
//       id: '2',
//       title: 'Sleeper',
//       value: '2',
//       Selected: false,
//       image: require('../assets/Filters/Sleepers.png'),
//     },
//   ];

//   const TravelOperatorList = [
//     {
//       title: 'Popular',
//       data: [
//         {
//           id: '1',
//           title: 'Poonamallee',
//           Selected: true,
//           count: '15',
//         },
//         {
//           id: '2',
//           title: 'Sriperumbudur',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '3',
//           title: 'Koyambedu',
//           Selected: true,
//           count: '15',
//         },
//         {
//           id: '4',
//           title: 'Vadapalani',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '5',
//           title: 'Ashok Pillar',
//           Selected: true,
//           count: '15',
//         },
//       ],
//     },
//     {
//       title: 'Others',
//       data: [
//         {
//           id: '1',
//           title: 'Poonamallee',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '2',
//           title: 'Sriperumbudur',
//           Selected: true,
//           count: '15',
//         },
//         {
//           id: '3',
//           title: 'Koyambedu',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '4',
//           title: 'Vadapalani',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '5',
//           title: 'Ashok Pillar',
//           Selected: true,
//           count: '15',
//         },
//         {
//           id: '6',
//           title: 'Dilsukhnagar',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '7',
//           title: 'Lakdikapul',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '8',
//           title: 'Sr Nagar',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '9',
//           title: 'KPHB-Pulla Reddy',
//           Selected: false,
//           count: '15',
//         },
//         {
//           id: '10',
//           title: 'Ashok Pillar',
//           Selected: false,
//           count: '15',
//         },
//       ],
//     },
//     // Add more sections here
//   ];

//   // const [price, setPrice] = useState(500);
//   // const minPrice = 260;
//   // const maxPrice = 1260;
//   // // const sliderWidth = (RangeScreenWidth * 0.60) - 40 ; // Adjust based on your container's padding/margin
//   // const sliderWidth = 200 - 40;
//   // // Calculate the position for the floating label
//   // const calculateLabelPosition = () => {
//   //   const percentage = (price - minPrice) / (maxPrice - minPrice);
//   //   return percentage * sliderWidth;
//   // };

//   // New Price range
//   const [price1, setPrice1] = useState(500);
//   const minPrice1 = 260;
//   const maxPrice1 = 1260;

//   const sliderWidth1 = width * 0.7; // 70% of the screen width
//   const thumbWidth1 = 30; // Assume the thumb is 30px wide (adjust if different)
//   const labelWidth1 = 50; // Assume the label is 50px wide (adjust if different)

//   const animatedValue1 = useState(new Animated.Value(0))[0];

//   useEffect(() => {
//     // Initial position calculation
//     handleValueChange(price1);
//   }, []);

//   const handleValueChange = value => {
//     setPrice1(value);

//     // Calculate the exact position of the thumb
//     const ratio = (value - minPrice1) / (maxPrice1 - minPrice1);
//     const position = ratio * (sliderWidth1 / 2) - thumbWidth1 / 2 - 50;

//     // Update the animated value
//     Animated.timing(animatedValue1, {
//       toValue: position,
//       duration: 100, // smooth transition
//       useNativeDriver: false,
//     }).start();
//   };

//   const Separator = () => <View style={styles.separator} />;

//   // Manage state for expanded sections
//   const [sections, setSections] = useState(
//     PointsList.map(section => ({...section, expanded: false})),
//   );

//   // Function to toggle section
//   const toggleSection = getIndex => {
//     setSections(prevSections =>
//       prevSections.map((section, i) =>
//         i === getIndex
//           ? {...section, expanded: !section.expanded}
//           : {...section, expanded: false},
//       ),
//     );
//   };

//   const boardCounts = Bus_List?.map(item =>
//     item.boarding_info.map(data => {
//       const [boarding_info, time, id] = data?.split('^');
//       return {boarding_info, id}; // Return boarding_info and id
//     }),
//   )
//     ?.flat() // Flatten the array if necessary
//     ?.reduce((acc, {boarding_info, id}) => {
//       // Initialize the accumulator for each boarding point
//       if (!acc[boarding_info]) {
//         acc[boarding_info] = {count: 0, pikupId: []};
//       }

//       // Increment the count and add the id to the pikupId array
//       acc[boarding_info].count += 1;
//       acc[boarding_info].pikupId.push(id);

//       return acc;
//     }, {});

//   const BoardingPoints =
//     boardCounts &&
//     Object.entries(boardCounts).map(([name, {count, pikupId}]) => ({
//       name,
//       count,
//       pikupId,
//     }));

//   const filteredBoardingPoints = BoardingPoints?.filter(point =>
//     point?.name
//       ?.toLowerCase()
//       ?.includes(searchQueries?.boardingPoints?.toLowerCase() || ''),
//   );

//   const dropCount = Bus_List?.map(item =>
//     item.dropping_info?.map(data => {
//       const [id, dropping_info] = data?.split('^');
//       return {dropping_info, id};
//     }),
//   )
//     ?.flat()
//     ?.reduce((acc, {dropping_info, id}) => {
//       if (!acc[dropping_info]) {
//         acc[dropping_info] = {count: 0, dropId: []};
//       }
//       acc[dropping_info].count += 1;
//       acc[dropping_info].dropId.push(id);

//       return acc;
//     }, {});

//   // Get the unique names and their counts as an array of objects
//   const DroppingPoints =
//     dropCount &&
//     Object?.entries(dropCount)?.map(([name, {count, dropId}]) => ({
//       name,
//       count,
//       dropId,
//     }));

//   const filtereDroppingPoints = DroppingPoints?.filter(point =>
//     point?.name
//       ?.toLowerCase()
//       ?.includes(searchQueries?.droppingPoints?.toLowerCase() || ''),
//   );

//   const filterAmenities = AmentiesList?.filter(point =>
//     point?.title
//       ?.toLowerCase()
//       ?.includes(searchQueries?.Amenities?.toLowerCase() || ''),
//   );

//   const OperatorName = [
//     ...new Set(Bus_List?.map(item => item?.Traveler_Agent_Name)),
//   ];
//   const operatorArray = OperatorName?.map(name => ({operator: name}));
//   // console.log(operatorArray, "operajfddfkjdfk");

//   const filteredOperatorName = operatorArray?.filter(ope =>
//     ope?.operator
//       ?.toLowerCase()
//       ?.includes(searchQueries?.Operators?.toString().toLowerCase() || ''),
//   );

//   // const [data, setData] = useState([])
//   // console.log(data, "filtered___operator")

//   // const filteredOperatorName = filter(operatorArray, (ope) =>
//   //   ope?.operator?.toLowerCase().includes(searchQueries?.Operators?.toLowerCase())
//   // );

//   // const filteredOperatorName = filter(operatorArray, (ope) => {
//   //   const operatorName = ope?.operator?.toLowerCase();
//   //   const searchQuery = searchQueries?.Operators?.toLowerCase();
//   //   return operatorName && searchQuery ? operatorName.includes(searchQuery) : false;
//   // });

//   const handleSearchChange = text => {
//     setSearchQueries(prevState => ({
//       ...prevState,
//       Operators: text,
//     }));
//     // const filtereddata = filter(operatorArray, (data) => {
//     //   return includes(data, text)
//     // })
//     // setData(filtereddata)
//   };

//   const handleBlur = () => {
//     // You can perform additional actions on blur if needed, such as finalizing or logging.
//     // console.log('Search finalized:', searchQueries.Operators);
//   };

//   // useEffect(() => {
//   //   if (searchQueries.Operators.length > 0) {
//   //     dispatch({ type: FILTERED_OPERATOR, payload: filteredOperatorName })
//   //   }
//   // }, [searchQueries])

//   const newitme = useSelector(state => state.productReducer.filtered_operator);

//   // console.log(newitme, "newitme")
//   function SortMainRowView({item, index, LastCount}) {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           setSelectedIndex(index);
//           setSelectCurrentSortName(item.title);
//           setSelectedFilterValue(item.keyValue);
//         }}>
//         <View
//           style={[
//             {
//               flex: 1,
//               flexDirection: 'row',
//               borderBottomWidth: 0.9,
//               borderColor: '#1F487C',
//               borderBottomEndRadius:
//                 LastCount === index && selectedFilterValue !== item.keyValue
//                   ? 20
//                   : 0,
//               height: 54,
//             },
//             selectedFilterValue === item.keyValue
//               ? {
//                   borderRightWidth: 0.0,
//                   backgroundColor: 'rgba(52, 52, 52, 0.0)',
//                 }
//               : {
//                   borderRightWidth: 0.9,
//                   backgroundColor: 'rgba(255, 255, 255, 0.5)',
//                 },
//           ]}>
//           {selectedFilterValue === item.keyValue && (
//             <View
//               style={{
//                 backgroundColor: '#1F487C',
//                 height: '100%',
//                 width: 8,
//               }}></View>
//           )}
//           <Text
//             style={[
//               {
//                 alignSelf: 'center',
//                 fontFamily: 'Inter',
//                 textAlign: 'justify',
//               },
//               selectedFilterValue === item.keyValue
//                 ? {
//                     color: '#1F487C',
//                     fontWeight: '700',
//                     fontSize: 15,
//                     lineHeight: 18,
//                     paddingHorizontal: 10,
//                   }
//                 : {
//                     color: '#393939',
//                     fontWeight: '400',
//                     fontSize: 14,
//                     lineHeight: 16,
//                     paddingHorizontal: 15,
//                   },
//             ]}>
//             {item.title}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }

//   function SortingSubRowView({item, index}) {
//     return (
//       <TouchableOpacity
//         style={{padding: 12}}
//         onPress={() => {
//           // console.log('clicked');
//         }}>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text
//             style={{
//               fontWeight: '400',
//               fontSize: 16,
//               fontFamily: 'Inter',
//               color: '#1F487C',
//               lineHeight: 20,
//             }}>
//             {item.title}
//           </Text>
//           <Image
//             source={require('../assets/UnSelectSort.png')}
//             style={{width: 20, height: 20, marginLeft: 20}}
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   }

//   const RenderViewSectionHeader = ({section}) => {
//     // console.log('index---' + section.expanded)
//     const index = PointsList.findIndex(s => s.title === section.title);
//     return (
//       <TouchableOpacity onPress={() => toggleSection(index)}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             width: '96%',
//             paddingVertical: 10,
//           }}>
//           <Text
//             style={{
//               fontWeight: '600',
//               fontSize: 16,
//               fontFamily: 'Inter',
//               color: '#1F487C',
//               lineHeight: 18,
//             }}>
//             {section.title}
//           </Text>
//           <Image
//             source={
//               section.expanded === true
//                 ? require('../assets/UpArrowFilterIcon.png')
//                 : require('../assets/DownFilterIcon.png')
//             }
//             style={{width: 15, height: 8}}
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const renderViewSectionFooter = ({section}) => {
//     return (
//       <View
//         style={{
//           paddingHorizontal: 15,
//           paddingVertical: 5,
//           justifyContent: 'center',
//           alignItems: 'flex-start',
//         }}>
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'row',
//             borderRadius: 15,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#1F487C',
//             paddingHorizontal: 15,
//             height: 30,
//           }}>
//           <Text
//             style={{
//               fontWeight: '300',
//               fontSize: 14,
//               fontFamily: 'Inter',
//               color: '#FFFFFF',
//               lineHeight: 17,
//             }}>
//             {'200 Seats'}
//           </Text>
//           <Image
//             source={require('../assets/ArrowRight.gif')}
//             style={{width: 14, height: 15, marginHorizontal: 5}}
//           />
//         </View>
//       </View>
//     );
//   };

//   const FilterBoardingTimeView = () => {
//     return (
//       <>
//         <View style={{alignItems: 'flex-start', marginLeft: 10}}>
//           {/* <FlatList
//           data={TimeList}
//           renderItem={({ item, index }) => {
//             return <BoardingTimeRowView item={item} index={index} />;
//           }}
//           contentContainerStyle={{ gap: 20 }}
//           keyExtractor={(item, index) => item + index}
//         /> */}
//           <View>
//             {/* Morning Time Slot */}
//             <TouchableOpacity
//               onPress={() => togglePickUpTime('6:00 AM - 11:00 AM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                     pickuptime === '6:00 AM - 11:00 AM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     source={require('../assets/MorningIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                         pickuptime === '6:00 AM - 11:00 AM'
//                           ? '#FFFFFF'
//                           : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '6:00 AM - 11:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'Morning'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '6:00 AM - 11:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'6:00 AM - 11:00 AM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Afternoon Time Slot */}
//             <TouchableOpacity
//               onPress={() => togglePickUpTime('11:00 AM - 6:00 PM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 20,
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                     pickuptime === '11:00 AM - 6:00 PM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     source={require('../assets/AfternoonIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                         pickuptime === '11:00 AM - 6:00 PM'
//                           ? '#FFFFFF'
//                           : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '11:00 AM - 6:00 PM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'Afternoon'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '11:00 AM - 6:00 PM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'11:00 AM - 6:00 PM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Evening Time Slot */}
//             <TouchableOpacity
//               onPress={() => togglePickUpTime('6:00 PM - 11:00 PM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 20,
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                     pickuptime === '6:00 PM - 11:00 PM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     source={require('../assets/EveningIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                         pickuptime === '6:00 PM - 11:00 PM'
//                           ? '#FFFFFF'
//                           : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '6:00 PM - 11:00 PM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'Evening'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '6:00 PM - 11:00 PM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'6:00 PM - 11:00 PM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Late Night Time Slot */}
//             <TouchableOpacity
//               onPress={() => togglePickUpTime('11:00 PM - 6:00 AM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop: 20,
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                     pickuptime === '11:00 PM - 6:00 AM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     source={require('../assets/LateNightIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                         pickuptime === '11:00 PM - 6:00 AM'
//                           ? '#FFFFFF'
//                           : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '11:00 PM - 6:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'Late Night'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         pickuptime === '11:00 PM - 6:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'11:00 PM - 6:00 AM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </>
//     );
//   };

//   const FilterDropTimeView = () => {
//     return (
//       <>
//         <View style={{alignItems: 'flex-start', marginLeft: 10}}>
//           {/* <FlatList
//           data={TimeList}
//           renderItem={({ item, index }) => {
//             return <BoardingTimeRowView item={item} index={index} />;
//           }}
//           contentContainerStyle={{ gap: 20 }}
//           keyExtractor={(item, index) => item + index}
//         /> */}
//           <View>
//             {/* Morning Time Slot */}

//             <TouchableOpacity
//               onPress={() => toggleDropTime('6:00 AM - 11:00 AM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                   droptime === '6:00 AM - 11:00 AM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     source={require('../assets/MorningIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                       droptime === '6:00 AM - 11:00 AM'
//                         ? '#FFFFFF'
//                         : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                         droptime === '6:00 AM - 11:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'Morning'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         droptime === '6:00 AM - 11:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'6:00 AM - 11:00 AM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Afternoon Time Slot */}
//             <TouchableOpacity
//               onPress={() => toggleDropTime('11:00 AM - 6:00 PM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginTop:20,
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                   droptime === '11:00 AM - 6:00 PM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     source={require('../assets/AfternoonIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                       droptime === '11:00 AM - 6:00 PM'
//                         ? '#FFFFFF'
//                         : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                       droptime === '11:00 AM - 6:00 PM'
//                         ? '#FFFFFF'
//                         : '#4A4A4A',
//                     lineHeight: 22,
//                   }}>
//                   {'Afternoon'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         droptime === '6:00 AM - 11:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'6:00 AM - 11:00 AM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Evening Time Slot */}
//             <TouchableOpacity
//               onPress={() => toggleDropTime('6:00 PM - 11:00 PM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop:20,
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                   droptime === '6:00 PM - 11:00 PM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     source={require('../assets/EveningIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                       droptime === '6:00 PM - 11:00 PM'
//                         ? '#FFFFFF'
//                         : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                       droptime === '6:00 PM - 11:00 PM'
//                         ? '#FFFFFF'
//                         : '#4A4A4A',
//                     lineHeight: 22,
//                   }}>
//                   {'Evening'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         droptime === '6:00 PM - 11:00 PM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'6:00 PM - 11:00 PM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Late Night Time Slot */}
//             <TouchableOpacity
//             onPress={() => toggleDropTime('11:00 PM - 6:00 AM')}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginTop:20,
//                   justifyContent: 'space-between',
//                   width: 230,
//                   padding: 10,
//                   borderRadius: 12,
//                   borderColor: '#C9C9C9',
//                   borderWidth: 1,
//                   backgroundColor:
//                   droptime === '11:00 PM - 6:00 AM' ? '#1F487C' : '#FFFFFF',
//                 }}>
//                 {/* Left section: Image, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                   source={require('../assets/LateNightIcon.png')}
//                     style={{
//                       width: 30,
//                       height: 30,
//                       tintColor:
//                       droptime === '11:00 PM - 6:00 AM'
//                         ? '#FFFFFF'
//                         : 'rgba(74, 74, 74, 0.6)',
//                       resizeMode: 'cover',
//                     }}
//                   />
//                 </View>

//                 {/* Right section: Texts, centered vertically */}
//                 <View
//                   style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginRight: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontWeight: '700',
//                       fontSize: 16,
//                       fontFamily: 'Inter',
//                       color:
//                         droptime === '11:00 PM - 6:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'Late Night'}
//                   </Text>
//                   <Text
//                     style={{
//                       fontWeight: '400',
//                       fontSize: 13,
//                       fontFamily: 'Inter',
//                       color:
//                         droptime === '11:00 PM - 6:00 AM'
//                           ? '#FFFFFF'
//                           : '#4A4A4A',
//                       lineHeight: 22,
//                     }}>
//                     {'11:00 PM - 6:00 AM'}
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </>
//     );
//   };

//   function BoardingTimeRowView({item, index}) {
//     return (
//       <>
//         <TouchableOpacity
//           onPress={() => {
//             // console.log('clicked');
//           }}>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 12,
//               borderColor: '#C9C9C9',
//               backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
//               borderWidth: 1,
//               paddingHorizontal: 10,
//             }}>
//             <Image
//               source={item.image}
//               style={{
//                 width: 28,
//                 height: 28,
//                 tintColor:
//                   item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
//                 marginHorizontal: 10,
//                 resizeMode: 'cover',
//               }}
//             />
//             <View
//               style={{
//                 flexDirection: 'column',
//                 paddingVertical: 2,
//                 paddingHorizontal: 10,
//               }}>
//               <Text
//                 style={{
//                   fontWeight: '600',
//                   fontSize: 16,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.title}
//               </Text>
//               <Text
//                 style={{
//                   fontWeight: '400',
//                   fontSize: 13,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.time}
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             // console.log('clicked');
//           }}>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 12,
//               borderColor: '#C9C9C9',
//               backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
//               borderWidth: 1,
//               paddingHorizontal: 10,
//             }}>
//             <Image
//               source={item.image}
//               style={{
//                 width: 28,
//                 height: 28,
//                 tintColor:
//                   item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
//                 marginHorizontal: 10,
//                 resizeMode: 'cover',
//               }}
//             />
//             <View
//               style={{
//                 flexDirection: 'column',
//                 paddingVertical: 2,
//                 paddingHorizontal: 10,
//               }}>
//               <Text
//                 style={{
//                   fontWeight: '600',
//                   fontSize: 16,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.title}
//               </Text>
//               <Text
//                 style={{
//                   fontWeight: '400',
//                   fontSize: 13,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.time}
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             // console.log('clicked');
//           }}>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 12,
//               borderColor: '#C9C9C9',
//               backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
//               borderWidth: 1,
//               paddingHorizontal: 10,
//             }}>
//             <Image
//               source={item.image}
//               style={{
//                 width: 28,
//                 height: 28,
//                 tintColor:
//                   item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
//                 marginHorizontal: 10,
//                 resizeMode: 'cover',
//               }}
//             />
//             <View
//               style={{
//                 flexDirection: 'column',
//                 paddingVertical: 2,
//                 paddingHorizontal: 10,
//               }}>
//               <Text
//                 style={{
//                   fontWeight: '600',
//                   fontSize: 16,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.title}
//               </Text>
//               <Text
//                 style={{
//                   fontWeight: '400',
//                   fontSize: 13,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.time}
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             // console.log('clicked');
//           }}>
//           <View
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 12,
//               borderColor: '#C9C9C9',
//               backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
//               borderWidth: 1,
//               paddingHorizontal: 10,
//             }}>
//             <Image
//               source={item.image}
//               style={{
//                 width: 28,
//                 height: 28,
//                 tintColor:
//                   item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
//                 marginHorizontal: 10,
//                 resizeMode: 'cover',
//               }}
//             />
//             <View
//               style={{
//                 flexDirection: 'column',
//                 paddingVertical: 2,
//                 paddingHorizontal: 10,
//               }}>
//               <Text
//                 style={{
//                   fontWeight: '600',
//                   fontSize: 16,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.title}
//               </Text>
//               <Text
//                 style={{
//                   fontWeight: '400',
//                   fontSize: 13,
//                   fontFamily: 'Inter',
//                   color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
//                   lineHeight: 22,
//                 }}>
//                 {item.time}
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </>
//     );
//   }

//   const FilterAmenitiesView = () => {
//     return (
//       <>
//         <View style={[styles.container, {height: 30}]}>
//           <FlatList
//             data={filterAmenities}
//             keyExtractor={(item, index) => index.toString()}
//             onScroll={Animated.event(
//               [{nativeEvent: {contentOffset: {y: scrollY}}}],
//               {useNativeDriver: false},
//             )}
//             scrollEventThrottle={16}
//             contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
//             renderItem={({item, index}) => (
//               <AmenitiesRowView
//                 item={item}
//                 index={index}
//                 checkedAmenities={checkedAmenities}
//                 handleAmenitiesCheck={handleAmenitiesCheck}
//               />
//             )}
//           />
//         </View>
//       </>
//     );
//   };

//   function AmenitiesRowView({
//     item,
//     index,
//     checkedAmenities,
//     handleAmenitiesCheck,
//   }) {
//     const isChecked = selectedAmenities.includes(index);

//     return (
//       <View key={item.index} style={styles.checkboxContainer}>
//         <TouchableOpacity
//           onPress={() => handleAmenitiesCheck(item.title, index)}>
//           <Image
//             source={
//               isChecked
//                 ? require('../assets/selectTick.png')
//                 : require('../assets/UnCheckBlockIcon.png')
//             }
//             style={{width: 17, height: 17, marginRight: 8}}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontWeight: '400',
//             fontSize: 12,
//             fontFamily: 'Inter',
//             color: '#4A4A4A',
//             lineHeight: 14,
//           }}>
//           {item?.title?.length > 26
//             ? item?.title?.slice(0, 27) + '...'
//             : item?.title}
//         </Text>
//       </View>
//     );
//   }

//   const StartRatingView = () => {
//     return (
//       <View style={{alignItems: 'flex-start', marginHorizontal: 10}}>
//         <FlatList
//           data={StartRatingList}
//           renderItem={({item, index}) => {
//             return <StartRatingRowView item={item} index={index} />;
//           }}
//           contentContainerStyle={{gap: 5}}
//           keyExtractor={(item, index) => item + index}
//         />
//       </View>
//     );
//   };

//   function StartRatingRowView({item, index}) {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           // console.log('clicked');
//         }}>
//         <View
//           style={{
//             flex: 1,
//             width: '96%',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             borderColor: '#C9C9C9',
//             paddingVertical: 6,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}>
//             <Image
//               source={
//                 item.Selected === true
//                   ? require('../assets/selectTick.png')
//                   : require('../assets/UnCheckBlockIcon.png')
//               }
//               style={{
//                 width: 18,
//                 height: 18,
//                 resizeMode: 'cover',
//                 marginRight: 10,
//                 marginTop: 2,
//               }}
//             />
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'row',
//               }}>
//               {maxRating.map(rates => {
//                 return (
//                   <View>
//                     <Image
//                       style={{
//                         width: 20,
//                         height: 20,
//                         resizeMode: 'cover',
//                         marginRight: 6,
//                       }}
//                       source={
//                         rates <= item.value
//                           ? require('../assets/FilterFullStar.png')
//                           : require('../assets/FilterEmptyStar.png')
//                       }
//                     />
//                   </View>
//                 );
//               })}
//             </View>
//           </View>
//           <Text
//             style={{
//               alignSelf: 'flex-end',
//               fontWeight: '400',
//               fontSize: 10,
//               fontFamily: 'Inter',
//               color: '#9B9B9B',
//               lineHeight: 13,
//               textAlign: 'right',
//             }}>
//             {'(14)'}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }

//   const VehicleTypeView = () => {
//     return (
//       <View style={{alignItems: 'flex-start', marginHorizontal: 10}}>
//         <View style={{flexDirection: 'row', width: '100%', gap: 8}}>
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 6,
//               borderColor: '#1F487C',
//               backgroundColor: isSelectedAC === 'AC' ? '#1F487C' : '#FFFFFF',
//               borderWidth: 0.5,
//               borderRightWidth: 5,
//             }}
//             onPress={() => {
//               // console.log('clicked');
//               handleAcNonAc('AC');
//             }}>
//             <Image
//               source={require('../assets/Filters/Ac.png')}
//               style={{
//                 width: 20,
//                 height: 18,
//                 resizeMode: 'cover',
//                 marginRight: 5,
//                 tintColor: isSelectedAC === 'AC' ? '#FFFFFF' : '#1F487C',
//               }}
//             />
//             <Text
//               style={{
//                 fontWeight: '600',
//                 fontSize: 14,
//                 fontFamily: 'Inter',
//                 color: isSelectedAC === 'AC' ? '#FFFFFF' : '#1F487C',
//                 lineHeight: 16,
//               }}>
//               AC
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 6,
//               borderColor: '#1F487C',
//               backgroundColor: isSelectedAC === 'NonAC' ? '#1F487C' : '#FFFFFF',
//               borderWidth: 0.5,
//               borderRightWidth: 5,
//               paddingVertical: 8,
//             }}
//             onPress={() => {
//               handleAcNonAc('NonAC');
//               // console.log('clicked');
//             }}>
//             <Image
//               source={require('../assets/Filters/NonAc.png')}
//               style={{
//                 width: 20,
//                 height: 18,
//                 resizeMode: 'cover',
//                 tintColor: isSelectedAC === 'NonAC' ? '#FFFFFF' : '#1F487C',
//                 marginRight: 5,
//               }}
//             />
//             <Text
//               style={{
//                 fontWeight: '600',
//                 fontSize: 14,
//                 fontFamily: 'Inter',
//                 color: isSelectedAC === 'NonAC' ? '#FFFFFF' : '#1F487C',
//                 lineHeight: 16,
//               }}>
//               {'Non AC'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{paddingTop: 25, paddingBottom: 8}}>
//           <Text
//             style={{
//               fontWeight: '600',
//               fontSize: 16,
//               fontFamily: 'Inter',
//               color: '#1F487C',
//               lineHeight: 20,
//             }}>
//             Seat Type
//           </Text>
//         </View>
//         {/* <FlatList
//           data={SeatTypeList}
//           renderItem={({ item, index }) => {
//             return (
//               <VehicleTypeRowView
//                 item={item}
//                 index={index}
//                 isSeatType={isSeatType}
//               // onPress={() => handleSeatSelection(item.value)} // Update the selected seat on press
//               />
//             );
//           }}
//           contentContainerStyle={{ gap: 2 }}
//           keyExtractor={(item, index) => item.id + index}
//         /> */}
//         <View style={{alignItems: 'flex-start', marginHorizontal: 10}}>
//           <View style={{flexDirection: 'row', width: '100%', gap: 8}}>
//             <TouchableOpacity
//               onPress={() => {
//                 handleSeatSelection('Seater');
//                 // setSeatType("Seater")
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   width:109,
//                   borderRadius: 6,
//                   borderColor: '#1F487C',
//                   backgroundColor:
//                     isSeatType === 'Seater' ? '#1F487C' : '#FFFFFF',
//                   borderWidth: 0.5,
//                   borderRightWidth: 5,
//                   paddingVertical: 10,
//                   paddingLeft: 10,
//                   paddingRight: 10,
//                   marginVertical: 8,
//                   marginLeft:-8
//                 }}>
//                 <Image
//                   source={require('../assets/Filters/Seater.png')}
//                   style={{
//                     width: 20,
//                     height: 18,
//                     resizeMode: 'cover',
//                     marginRight: 10,
//                     tintColor: isSeatType === 'Seater' ? '#FFFFFF' : '#1F487C' 
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontWeight: '600',
//                     fontSize: 14,
//                     fontFamily: 'Inter',
//                     color: isSeatType === 'Seater' ? '#FFFFFF' : '#1F487C',
//                     lineHeight: 17,
//                   }}>
//                   {`Seater`}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 handleSeatSelection('Sleeper');
//               }}>
//               <View
//                 style={{
//                   flex: 1,
//                   width:109,
//                   flexDirection: 'row',
//                   justifyContent: 'flex-start',
//                   alignItems: 'center',
//                   borderRadius: 6,
//                   borderColor: '#1F487C',
//                   backgroundColor:
//                     isSeatType === 'Sleeper' ? '#1F487C' : '#FFFFFF',
//                   borderWidth: 0.5,
//                   borderRightWidth: 5,
//                   paddingVertical: 10,
//                   paddingLeft: 5,
//                   paddingRight: 10,
//                   marginVertical: 8,
//                 }}>
//                 <Image
//                   source={require('../assets/Filters/Sleepers.png')}
//                   style={{
//                     width: 20,
//                     height: 18,
//                     resizeMode: 'cover',
//                     marginRight: 10,
//                     tintColor: isSeatType === "Sleeper" ? '#FFFFFF' : '#1F487C'
//                   }}
//                 />
//                 <Text
//                   style={{
//                     fontWeight: '600',
//                     fontSize: 14,
//                     fontFamily: 'Inter',
//                     color: isSeatType === 'Sleeper' ? '#FFFFFF' : '#1F487C',
//                     lineHeight: 17,
//                   }}>
//                   {`Sleeper`}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   function VehicleTypeRowView({item, index}) {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           handleSeatSelection(item.value);
//         }}>
//         <View
//           style={{
//             flex: 1,
//             width: '100%',
//             flexDirection: 'row',
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             borderRadius: 6,
//             borderColor: '#1F487C',
//             backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
//             borderWidth: 0.5,
//             borderRightWidth: 5,
//             paddingVertical: 10,
//             paddingLeft: 10,
//             paddingRight: 10,
//             marginVertical: 8,
//           }}>
//           <Image
//             source={item.image}
//             style={{
//               width: 20,
//               height: 18,
//               resizeMode: 'cover',
//               marginRight: 10,
//               tintColor: item.Selected === true ? '#FFFFFF' : '#1F487C',
//             }}
//           />
//           <Text
//             style={{
//               fontWeight: '600',
//               fontSize: 14,
//               fontFamily: 'Inter',
//               color: item.Selected === true ? '#FFFFFF' : '#1F487C',
//               lineHeight: 17,
//             }}>
//             {item.title}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }

//   // const PriceRangeView = () => {
//   //   return (
//   //     <View style={{ width: 200, padding: 20, }}>

//   //       <View style={styles.sliderContainer}>
//   //         <View style={styles.startingPointCircle} />
//   //         <Slider
//   //           style={styles.slider}
//   //           minimumValue={minPrice}
//   //           maximumValue={maxPrice}
//   //           step={1}
//   //           value={price}
//   //           onValueChange={(value) => setPrice(value)}
//   //           minimumTrackTintColor="transparent" // Make the minimum track transparent to show the custom filled track
//   //           maximumTrackTintColor="#d3d3d3"
//   //           thumbImage={thumbImage}               // Set the thumb image
//   //         />
//   //         <View style={[styles.filledTrack, { width: calculateLabelPosition() }]} />

//   //         <View style={[styles.floatingLabel, { left: calculateLabelPosition() - 20 }]}>
//   //           <Text style={styles.floatingLabelText}>₹{price}</Text>
//   //         </View>
//   //         {/* <View style={styles.staticLabel}>
//   //         <Text style={styles.staticLabelText}>₹{minPrice}</Text>
//   //       </View>
//   //       <View style={styles.staticLabelMax}>
//   //         <Text style={styles.staticLabelText}>₹{maxPrice}</Text>
//   //       </View> */}
//   //       </View>
//   //       <View style={{ flexDirection: 'row', marginTop: 20, gap: 15, width: '100%' }}>
//   //         <View style={{ flex: 1 }}>
//   //           <Text style={{
//   //             fontWeight: '500',
//   //             fontSize: 14,
//   //             fontFamily: 'Inter',
//   //             color: '#1F487C',
//   //             lineHeight: 17,
//   //             paddingBottom: 5,
//   //           }}>Min. Price</Text>
//   //           <View style={{
//   //             flexDirection: 'row',
//   //             justifyContent: 'flex-start',
//   //             alignItems: 'center',
//   //             borderRadius: 5,
//   //             borderColor: '#1F487C',
//   //             backgroundColor: '#FFFFFF',
//   //             borderWidth: 0.5,
//   //             padding: 8,
//   //           }}>
//   //             <TextInput
//   //               style={{
//   //                 fontWeight: '500',
//   //                 fontSize: 12,
//   //                 fontFamily: 'Inter',
//   //                 color: '#1F487C',
//   //                 lineHeight: 16,
//   //               }}
//   //               placeholder={"₹0 "}
//   //               placeholderTextColor="#9B9B9B" />
//   //           </View>
//   //         </View>
//   //         <View style={{ flex: 1 }}>
//   //           <Text style={{
//   //             fontWeight: '500',
//   //             fontSize: 14,
//   //             fontFamily: 'Inter',
//   //             color: '#1F487C',
//   //             lineHeight: 17,
//   //             paddingBottom: 5,
//   //           }}>Max. Price</Text>
//   //           <View style={{
//   //             flexDirection: 'row',
//   //             justifyContent: 'flex-start',
//   //             alignItems: 'center',
//   //             borderRadius: 5,
//   //             borderColor: '#1F487C',
//   //             backgroundColor: '#FFFFFF',
//   //             borderWidth: 0.5,
//   //             padding: 8,
//   //           }}>
//   //             <TextInput
//   //               style={{
//   //                 fontWeight: '500',
//   //                 fontSize: 12,
//   //                 fontFamily: 'Inter',
//   //                 color: '#1F487C',
//   //                 lineHeight: 16,

//   //               }}
//   //               placeholder={"₹500 "}
//   //               placeholderTextColor="#9B9B9B" />
//   //           </View>
//   //         </View>
//   //       </View>
//   //       {/* <View style={styles.priceInputs}>
//   //       <View style={styles.inputContainer}>
//   //         <Text style={styles.inputLabel}>Min. Price</Text>
//   //         <TextInput style={styles.input} value={`₹${minPrice}`} editable={false} />
//   //       </View>
//   //       <View style={styles.inputContainer}>
//   //         <Text style={styles.inputLabel}>Max. Price</Text>
//   //         <TextInput style={styles.input} value={`₹${price}`} editable={false} />
//   //       </View>
//   //     </View> */}

//   //     </View>
//   //   );
//   // };
//   console.log(filteredBoardingPoints, 'filteredBoardingPoints');

//   const BoardingPointsView = ({filterKey}) => {
//     return (
//       <>
//         <View style={[styles.container, {height: 30}]}>
//           <FlatList
//             data={filteredBoardingPoints}
//             keyExtractor={(item, index) => index.toString()}
//             onScroll={Animated.event(
//               [{nativeEvent: {contentOffset: {y: scrollY}}}],
//               {useNativeDriver: false},
//             )}
//             scrollEventThrottle={16}
//             contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
//             renderItem={({item, index}) => (
//               <BoardingPointRowView
//                 item={item}
//                 index={index}
//                 checkedBoarding={checkedBoarding}
//                 handleBoardingCheck={handleBoardingCheck}
//               />
//             )}
//           />

//           {/* Scrollbar */}
//           {/* <View style={styles.scrollTrack}>
//          <Animated.View
//            style={[
//              styles.scrollThumb,
//              {
//                transform: [
//                  {
//                    translateY: scrollY.interpolate({
//                      inputRange: [0, 4000], // adjust for your scroll range
//                      outputRange: [0, 330], // scrollbar travel height
//                      extrapolate: 'clamp',
//                    }),
//                  },
//                ],
//              },
//            ]}
//          />
//        </View> */}
//         </View>
//       </>
//       // <View style={{alignItems: 'flex-start', flex: 1, marginHorizontal: 10}}>
//       //   <View
//       //     style={{
//       //       flexDirection: 'row',
//       //       justifyContent: 'flex-start',
//       //       alignItems: 'center',
//       //       backgroundColor: '#FFFFFF',
//       //       width: '100%',
//       //       height: 33,
//       //       borderWidth: 0.5,
//       //       borderColor: 'rgba(31, 72, 124, 0.5)',
//       //       borderRadius: 18,
//       //       paddingHorizontal: 15,
//       //       marginBottom: 5,
//       //     }}>
//       //     <Image
//       //       source={require('../assets/FilterSearchIcon.png')}
//       //       style={{
//       //         width: 11,
//       //         height: 11,
//       //         resizeMode: 'cover',
//       //         marginRight: 10,
//       //       }}
//       //     />
//       //     <TextInput
//       //       style={{
//       //         fontWeight: '300',
//       //         fontSize: 10,
//       //         fontFamily: 'Inter',
//       //         color: '#1F487C',
//       //         lineHeight: 14,
//       //       }}
//       //       autoFocus={false}
//       //       placeholder={'Search ' + filterKey}
//       //       placeholderTextColor="rgba(31, 72, 124, 0.8)"
//       //     />
//       //   </View>

//       //   <View style={{flex: 1, overflow: 'scroll'}}>
//       //     <SectionList
//       //       sections={sections.map(section => ({
//       //         ...section,
//       //         data: section.expanded ? section.data : [], // Show items only if expanded
//       //       }))}
//       //       renderItem={({item, index}) => {
//       //         // console.log('Mohan section number' + item.title)

//       //         return <DroppingPointRowView item={item} index={index} />;
//       //       }}
//       //       renderSectionHeader={({section}) => {
//       //         return <RenderViewSectionHeader section={section} />;
//       //       }}
//       //       keyExtractor={(item, index) => item + index}
//       //       stickySectionHeadersEnabled={false}
//       //       stickyHeaderHiddenOnScroll
//       //     />
//       //   </View>
//       // </View>
//     );
//   };
//   const DroppingPointsView = ({filterKey}) => {
//     return (
//       <>
//         <View style={[styles.container, {height: 30}]}>
//           <FlatList
//             data={filtereDroppingPoints}
//             keyExtractor={(item, index) => index.toString()}
//             onScroll={Animated.event(
//               [{nativeEvent: {contentOffset: {y: scrollY}}}],
//               {useNativeDriver: false},
//             )}
//             scrollEventThrottle={16}
//             contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
//             renderItem={({item, index}) => (
//               <DroppingPointRowView
//                 item={item}
//                 index={index}
//                 checkedDropping={checkedDropping}
//                 handleDroppingCheck={handleDroppingCheck}
//               />
//             )}
//           />
//         </View>
//       </>
//     );
//   };

//   function BoardingPointRowView({
//     item,
//     index,
//     checkedBoarding,
//     handleBoardingCheck,
//   }) {
//     const isChecked = checkedBoarding?.[item?.name];
//     return (
//       <View key={item.name} style={styles.checkboxContainer}>
//         <TouchableOpacity onPress={() => handleBoardingCheck(item?.name)}>
//           <Image
//             source={
//               isChecked
//                 ? require('../assets/selectTick.png')
//                 : require('../assets/UnCheckBlockIcon.png')
//             }
//             style={{width: 17, height: 17, marginRight: 8}}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontWeight: '400',
//             fontSize: 12,
//             fontFamily: 'Inter',
//             color: '#4A4A4A',
//             lineHeight: 14,
//           }}>
//           {item?.name?.length > 26
//             ? item?.name?.slice(0, 27) + '...'
//             : item?.name}
//         </Text>
//       </View>
//     );
//   }
//   function DroppingPointRowView({
//     item,
//     index,
//     checkedDropping,
//     handleDroppingCheck,
//   }) {
//     const isChecked = checkedDropping?.[item?.name];
//     return (
//       <View key={item.index} style={styles.checkboxContainer}>
//         <TouchableOpacity onPress={() => handleDroppingCheck(item?.name)}>
//           <Image
//             source={
//               isChecked
//                 ? require('../assets/selectTick.png')
//                 : require('../assets/UnCheckBlockIcon.png')
//             }
//             style={{width: 17, height: 17, marginRight: 8}}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontWeight: '400',
//             fontSize: 12,
//             fontFamily: 'Inter',
//             color: '#4A4A4A',
//             lineHeight: 14,
//           }}>
//           {item?.name?.length > 26
//             ? item?.name?.slice(0, 27) + '...'
//             : item?.name}
//         </Text>
//       </View>
//     );
//   }

//   const TravelerOperators = () => {
//     return (
//       <>
//         <ScrollView
//           style={styles.scrollView}
//           showsVerticalScrollIndicator={true} // ← this makes it appear
//           indicatorStyle="black" // ← iOS only: "white" | "black" | "default"
//         >
//         <View style={[styles.container, {height: 30}]}>
//           <FlatList
//             data={filteredOperatorName}
//             keyExtractor={(item, index) => index.toString()}
//             onScroll={Animated.event(
//               [{nativeEvent: {contentOffset: {y: scrollY}}}],
//               {useNativeDriver: false},
//             )}
//             scrollEventThrottle={16}
//             contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
//             renderItem={({item, index}) => (
//               <Operator_Name_Row
//                 item={item}
//                 index={index}
//                 checkedOperators={checkedOperators}
//                 handleOperatorCheck={handleOperatorCheck}
//               />
//             )}
//           />

//           {/* Scrollbar */}
//           <View style={styles.scrollTrack}>
//         <Animated.View
//           style={[
//             styles.scrollThumb,
//             {
//               transform: [
//                 {
//                   translateY: scrollY.interpolate({
//                     inputRange: [0, 4000], // adjust for your scroll range
//                     outputRange: [0, 330], // scrollbar travel height
//                     extrapolate: 'clamp',
//                   }),
//                 },
//               ],
//             },
//           ]}
//         />
//       </View>
//         </View>
//         </ScrollView>
//       </>
//     );
//   };

//   function Operator_Name_Row({
//     item,
//     index,
//     checkedOperators,
//     handleOperatorCheck,
//   }) {
//     const isChecked = checkedOperators?.[item.operator];

//     return (
//       <View key={item.operator} style={styles.checkboxContainer}>
//         <TouchableOpacity onPress={() => handleOperatorCheck(item.operator)}>
//           <Image
//             source={
//               isChecked
//                 ? require('../assets/selectTick.png')
//                 : require('../assets/UnCheckBlockIcon.png')
//             }
//             style={{width: 17, height: 17, marginRight: 8}}
//           />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontWeight: '400',
//             fontSize: 12,
//             fontFamily: 'Inter',
//             color: '#4A4A4A',
//             lineHeight: 14,
//           }}>
//           {item.operator?.length > 26
//             ? item.operator.slice(0, 27) + '...'
//             : item.operator}
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       statusBarTranslucent={true}
//       onRequestClose={onClose}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'rgba(0, 0, 0, 0.2)',
//         }}>
//         <TouchableOpacity
//           style={{flex: 1, width: '100%'}}
//           onPress={onClose}></TouchableOpacity>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: '#E5FFF1',
//             borderTopRightRadius: 30,
//             borderTopLeftRadius: 30,
//             height:
//               screenHeight -
//               (isLuxuryUser === true
//                 ? statustopBarheight + 50
//                 : statustopBarheight + 150),
//             position: 'absolute', //Here is the trick
//             bottom: 0, //Here is the trick
//           }}>
//           <ImageBackground
//             source={backgroundImage}
//             style={{flex: 1, resizeMode: 'cover'}}>
//             <ScrollView contentContainerStyle={{flexGrow: 1}}>
//               <View style={{flex: 1, justifyContent: 'flex-start'}}>
//                 <View
//                   style={{
//                     alignItems: 'center',
//                     height: 49,
//                     justifyContent: 'center',
//                   }}>
//                   <Text
//                     style={{
//                       color: '#1F487C',
//                       textAlign: 'center',
//                       fontSize: 22,
//                       fontFamily: 'Montserrat',
//                       fontWeight: '600',
//                     }}>
//                     {isLuxuryUser === true
//                       ? 'Popular Filters'
//                       : 'Filter Insights'}
//                   </Text>
//                 </View>

//                 <Separator />

//                 <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
//                   {/* Left Section */}
//                   <View style={{flex: 1}}>
//                     <FlatList
//                       data={sortListAry}
//                       renderItem={({item, index}) => {
//                         return (
//                           <SortMainRowView
//                             item={item}
//                             index={index}
//                             LastCount={sortListAry.length - 1}
//                           />
//                         );
//                       }}
//                       keyExtractor={(item, index) => item + index}
//                     />
//                   </View>

//                   {/* Right Section */}
//                   <View style={{flex: 1.5}}>
//                     <View
//                       style={{
//                         height: 50,
//                         justifyContent: 'center',
//                         alignItems: 'flex-start',
//                         paddingLeft: 10,
//                       }}>
//                       <Text
//                         style={{
//                           fontWeight: '700',
//                           fontSize: 17,
//                           fontFamily: 'Inter',
//                           color: '#1F487C',
//                           lineHeight: 20,
//                         }}>
//                         {selectedFilterValue === 'Vehicle Type'
//                           ? 'Air Condition'
//                           : selectCurrentSortName}
//                       </Text>
//                     </View>

//                     {/* Conditional Views */}
//                     {selectedFilterValue === 'Boarding Time' && (
//                       <FilterBoardingTimeView />
//                     )}
//                     {selectedFilterValue === 'Dropping time' && (
//                       <FilterDropTimeView />
//                     )}
//                     {selectedFilterValue === 'Vehicle Type' && (
//                       <VehicleTypeView />
//                     )}
//                     {selectedFilterValue === 'Price Range' && (
//                       <View style={{padding: 10, flex: 1}}>
//                         <View style={styles.labelContainer1}>
//                           <Text style={styles.label1}>₹{minPrice1}</Text>
//                           <Text style={styles.label1}>₹{maxPrice1}</Text>
//                         </View>
//                         <View style={styles.sliderContainer1}>
//                           {/* Floating label */}
//                           <View style={styles.startingPointCircle} />
//                           <Animated.View
//                             style={[
//                               styles.floatingLabel1,
//                               {
//                                 transform: [{translateX: animatedValue1}],
//                               },
//                             ]}>
//                             <Text style={styles.floatingLabelText1}>
//                               ₹{price1}
//                             </Text>
//                           </Animated.View>
//                           <Slider1
//                             style={styles.slider1}
//                             minimumValue={minPrice1}
//                             maximumValue={maxPrice1}
//                             step={10}
//                             value={price1}
//                             onValueChange={handleValueChange}
//                             minimumTrackTintColor="#1F487C"
//                             maximumTrackTintColor="#C9C9C9"
//                             thumbImage={thumbImage}
//                             //thumbTintColor="#1F487C"
//                           />
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             marginTop: 25,
//                             gap: 15,
//                             width: '100%',
//                             paddingRight: 10,
//                           }}>
//                           <View style={{flex: 1}}>
//                             <Text
//                               style={{
//                                 fontWeight: '500',
//                                 fontSize: 14,
//                                 fontFamily: 'Inter',
//                                 color: '#1F487C',
//                                 lineHeight: 17,
//                                 paddingBottom: 5,
//                               }}>
//                               Min. Price
//                             </Text>
//                             <View
//                               style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'center',
//                                 borderRadius: 5,
//                                 borderColor: '#1F487C',
//                                 backgroundColor: '#FFFFFF',
//                                 borderWidth: 0.5,
//                                 padding: 8,
//                               }}>
//                               <TextInput
//                                 style={{
//                                   fontWeight: '500',
//                                   fontSize: 12,
//                                   fontFamily: 'Inter',
//                                   color: '#1F487C',
//                                   lineHeight: 16,
//                                 }}
//                                 placeholder={'₹0 '}
//                                 placeholderTextColor="#9B9B9B"
//                               />
//                             </View>
//                           </View>
//                           <View style={{flex: 1}}>
//                             <Text
//                               style={{
//                                 fontWeight: '500',
//                                 fontSize: 14,
//                                 fontFamily: 'Inter',
//                                 color: '#1F487C',
//                                 lineHeight: 17,
//                                 paddingBottom: 5,
//                               }}>
//                               Max. Price
//                             </Text>
//                             <View
//                               style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'flex-start',
//                                 alignItems: 'center',
//                                 borderRadius: 5,
//                                 borderColor: '#1F487C',
//                                 backgroundColor: '#FFFFFF',
//                                 borderWidth: 0.5,
//                                 padding: 8,
//                               }}>
//                               <TextInput
//                                 style={{
//                                   fontWeight: '500',
//                                   fontSize: 12,
//                                   fontFamily: 'Inter',
//                                   color: '#1F487C',
//                                   lineHeight: 16,
//                                 }}
//                                 placeholder={'₹500 '}
//                                 placeholderTextColor="#9B9B9B"
//                               />
//                             </View>
//                           </View>
//                         </View>
//                       </View>
//                     )}
//                     {selectedFilterValue === 'Star Ratings' && (
//                       <StartRatingView />
//                     )}
//                     {selectedFilterValue === 'Amenities' && (
//                       <>
//                         <View style={styles.searchContainer}>
//                           <Image
//                             source={require('../assets/FilterSearchIcon.png')}
//                             style={{
//                               width: 12,
//                               height: 12,
//                               resizeMode: 'cover',
//                               marginLeft: 10,
//                               marginRight: 10,
//                             }}
//                           />
//                           <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search Amenities"
//                             placeholderTextColor="#1F487C80"
//                             value={searchQueries?.Amenities}
//                             onChangeText={text =>
//                               setSearchQueries({
//                                 Amenities: text,
//                               })
//                             }
//                           />
//                         </View>
//                         <FilterAmenitiesView />
//                       </>
//                     )}
//                     {selectedFilterValue === 'Dropping Points' && (
//                       <>
//                         <View style={styles.searchContainer}>
//                           <Image
//                             source={require('../assets/FilterSearchIcon.png')}
//                             style={{
//                               width: 12,
//                               height: 12,
//                               resizeMode: 'cover',
//                               marginLeft: 10,
//                               marginRight: 10,
//                             }}
//                           />
//                           <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search Droping Point"
//                             placeholderTextColor="#1F487C80"
//                             value={searchQueries?.droppingPoints}
//                             onChangeText={text =>
//                               setSearchQueries({
//                                 droppingPoints: text,
//                               })
//                             }
//                           />
//                         </View>
//                         <DroppingPointsView filterKey={selectedFilterValue} />
//                       </>
//                     )}
//                     {selectedFilterValue === 'Boarding Points' && (
//                       <>
//                         <View style={styles.searchContainer}>
//                           <Image
//                             source={require('../assets/FilterSearchIcon.png')}
//                             style={{
//                               width: 12,
//                               height: 12,
//                               resizeMode: 'cover',
//                               marginLeft: 10,
//                               marginRight: 10,
//                             }}
//                           />
//                           <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search Boarding Point"
//                             placeholderTextColor="#1F487C80"
//                             value={searchQueries?.boardingPoints}
//                             onChangeText={text =>
//                               setSearchQueries({
//                                 boardingPoints: text,
//                               })
//                             }
//                           />
//                         </View>
//                         <BoardingPointsView filterKey={selectedFilterValue} />
//                       </>
//                     )}
//                     {selectedFilterValue === 'Travel Operators' && (
//                       <>
//                         <View style={styles.searchContainer}>
//                           <Image
//                             source={require('../assets/FilterSearchIcon.png')}
//                             style={{
//                               width: 11,
//                               height: 11,
//                               resizeMode: 'cover',
//                               marginLeft: 10,
//                               marginRight: 10,
//                             }}
//                           />
//                           <TextInput
//                             style={styles.searchInput}
//                             placeholder="Search Operators"
//                             placeholderTextColor="#1F487C80"
//                             value={searchQueries?.Operators}
//                             onChangeText={text =>
//                               setSearchQueries({
//                                 Operators: text,
//                               })
//                             }
//                           />
//                         </View>
//                         <TravelerOperators />
//                       </>
//                     )}
//                   </View>
//                 </View>
//               </View>

//               <View
//                 style={{
//                   justifyContent: 'flex-end',
//                   paddingHorizontal: 12,
//                   paddingVertical: 5,
//                 }}>
//                 <View
//                   style={{
//                     height: 160,
//                     borderRadius: 10,
//                     borderWidth: 1,
//                     marginTop: 5,
//                     borderColor: 'rgba(31, 72, 124, 0.5)',
//                     marginHorizontal: 10,
//                   }}>
//                   <Advertisement pageId={3} />
//                 </View>
//                 {isLuxuryUser === true && (
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       width: '100%',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       marginVertical: 5,
//                     }}>
//                     {/* <Image
//                       source={require('../assets/Banner.gif')}
//                       style={{
//                         height: 150,
//                         resizeMode: 'cover',
//                         borderRadius: 10,
//                         flex: 1,
//                       }}
//                       resizeMode="cover"
//                     /> */}
//                   </View>
//                 )}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     width: '100%',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     height: 40,
//                     gap: 10,
//                     marginVertical: 5,
//                     marginBottom: 15,
//                   }}>
//                   <TouchableOpacity onPress={onClose} style={styles.clearBtn}>
//                     <Text style={styles.clearTxt}>CLEAR</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={onClose} style={styles.applyBtn}>
//                     <Text style={styles.apply}>APPLY</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </ScrollView>
//           </ImageBackground>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 19,
//   },
//   checkbox: {
//     marginRight: 10,
//   },
//   separator: {
//     marginVertical: 1,
//     borderBottomColor: '#1F487C',
//     borderBottomWidth: 1,
//   },
//   applyBtn: {
//     backgroundColor: '#1F487C',
//     flex: 1.3,
//     borderRadius: 24,
//     borderWidth: 0,
//     borderColor: 'rgba(31, 72, 124, 0.5)',
//   },
//   clearBtn: {
//     backgroundColor: '#FFFFFF',
//     flex: 1,
//     borderRadius: 24,
//     borderWidth: 0,
//     borderColor: 'rgba(31, 72, 124, 0.5)',
//   },
//   buttonView: {
//     flexDirection: 'row',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     height: 54,
//     paddingHorizontal: 20,
//     marginTop: 10,
//     paddingBottom: 10,
//     marginBottom: 15,
//   },
//   clearTxt: {
//     color: '#1F487C',
//     fontSize: 16,
//     fontFamily: 'Inter',
//     textAlign: 'center',
//     fontWeight: '600',
//     padding: 10,
//   },
//   apply: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: 'Inter',
//     textAlign: 'center',
//     fontWeight: '600',
//     padding: 10,
//   },
//   startingPointCircle: {
//     position: 'absolute',
//     width: 16, // Adjust size as needed
//     height: 16,
//     borderWidth: 3,
//     borderColor: '#1F487C',
//     backgroundColor: '#FFFFFF', // The color for the circle
//     borderRadius: 10, // Half of width and height to make it circular
//     top: '50%',
//     left: 0, // Adjust to align with the start of the slider
//     transform: [{translateY: -8}], // Center vertically
//   },
//   sliderContainer: {
//     position: 'relative',
//     width: '100%',
//   },
//   slider: {
//     width: '100%',
//     height: 40,
//   },
//   priceText: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   filledTrack: {
//     position: 'absolute',
//     height: 5,
//     backgroundColor: '#1F487C',
//     borderRadius: 2.5,
//     top: '50%',
//     transform: [{translateY: -2.5}],
//     zIndex: -1,
//   },
//   floatingLabel: {
//     position: 'absolute',
//     bottom: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#1F487C',
//     borderRadius: 14,
//     padding: 5,
//   },
//   floatingLabelText: {
//     color: '#fff',
//     fontSize: 16,
//     paddingHorizontal: 5,
//   },
//   priceInputs: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   inputContainer: {
//     width: '45%',
//   },
//   inputLabel: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   staticLabel: {
//     position: 'absolute',
//     bottom: 40,
//     left: -10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 40,
//     backgroundColor: '#1fb28a',
//     borderRadius: 5,
//     padding: 5,
//   },
//   staticLabelText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   staticLabelMax: {
//     position: 'absolute',
//     bottom: 40,
//     right: -10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#1fb28a',
//     borderRadius: 5,
//     padding: 5,
//   },
//   sliderContainer1: {
//     alignItems: 'center',
//     position: 'relative',
//     paddingHorizontal: 10,
//   },
//   slider1: {
//     width: '100%',
//     height: 40,
//   },
//   labelContainer1: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingRight: 10,
//   },
//   label1: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#444444',
//     fontFamily: 'Inter',
//     lineHeight: 18,
//   },
//   floatingLabel1: {
//     position: 'absolute',
//     top: -18,
//     backgroundColor: '#1F487C',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 14,
//     height: 28,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   floatingLabelText1: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   searchInput: {
//     width: '100%',
//     height: 40,
//     borderColor: '#1F487C',
//     borderWidth: 1,
//     borderRadius: 30,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     marginVertical: 4,
//     color: '#333',
//     backgroundColor: '#FFFFFF',
//   },
//   flatList: {
//     width: '100%',
//     flexGrow: 0,
//     height: 720,
//   },
//   scrollView: {
//     flexDirection: 'column',
//     height: 300,
//   },
//   input1: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: '#1F487C',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     color: '#1F487C',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     marginTop: -7,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     width: '90%',
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#1F487C',
//     borderRadius: 18,
//     height: 33,
//   },
//   searchInput: {
//     flex: 1,
//     height: 48,
//     fontSize: 14,
//     color: '#1F487C80',
//   },
//   container: {
//     flex: 1,
//   },
//   scrollTrack: {
//     position: 'absolute',
//     right: 4,
//     top: 10,
//     bottom: 1,
//     width: 6,
//     height: 330,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 3,
//   },
//   scrollThumb: {
//     width: 6,
//     height: 30,
//     backgroundColor: '#1F487C',
//     borderRadius: 3,
//   },
// });
// export default FilterInsightsScreen;

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Animated,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  SectionList,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import backgroundImage from '../assets/home_bg.png';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
// import { TextInput } from 'react-native-paper';

import Slider1 from '@react-native-community/slider';

import thumbImage from '../assets/Bullets.png';
import { useDispatch, useSelector } from 'react-redux';
import { FILTERED_OPERATOR, GET_BUS_FILTERS } from '../Redux/Store/Type';
import moment from 'moment';
// import { Checkbox } from 'react-native-paper'; // Import Checkbox from React Native Paper
//import { CheckBox } from '@rneui/themed';
import filter from 'lodash.filter';
import CheckBox from '@react-native-community/checkbox';
//import { CheckBox } from '@rneui/base';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Advertisement from '../component/Advertisement/Advertisement';
import CustomScrollView from '../component/CustomScroll';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

// Get screen dimensions
const { height: screenHeight } = Dimensions.get('window');

const { width: RangeScreenWidth } = Dimensions.get('window');

const { width } = Dimensions.get('window');

const FilterInsightsScreen = ({
  visible,
  onClose,
  Data,
  isLuxuryUser,
  selectedBusesAll,
  selectedBusesLuxury,
  selectedBusesRegular,
  isSelectedAC,
  isSeatType,
  setSelectedAC,
  setSeatType,
  setRegularBus,
  regularBus,
  luxuryBus,
  setLuxuryBus,
  normalBus,
  setNormalBus,
  setFilterCount,
  setIsAC,
  setIsNonAC,
  isNonAC,
  isAC,
  setIsSleeper,
  isSleeper,
  setIsSeater,
  isSeater,
  setIsDay,
  setIsNight,
  isDay,
  isNight,
  pickuptime,
  setPickUpTime
}) => {
  const Bus_List = useSelector(state => state?.productReducer?.get_buslist);

  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [visibleHeight, setVisibleHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);

  // Thumb height relative to visible content
  const scrollThumbHeight = visibleHeight * (visibleHeight / contentHeight);

  // Max scroll distance of content
  const scrollableHeight = contentHeight - visibleHeight;

  // Max thumb travel distance
  const thumbScrollRange = visibleHeight - scrollThumbHeight;

  const translateY = scrollY.interpolate({
    inputRange: [0, scrollableHeight],
    outputRange: [0, thumbScrollRange],
    extrapolate: 'clamp',
  });
  const insets = useSafeAreaInsets();

  console.log(
    'status ios :',
    selectedBusesAll,
    selectedBusesLuxury,
    selectedBusesRegular,
  );

  const statustopBarheight = insets.top === 0 ? statusBarHeight : insets.top;
  const [selectCurrentSortName, setSelectCurrentSortName] =
    useState('Vehicle Type');

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchOperator, setSearchOperator] = useState('');
  const [selectedFilterValue, setSelectedFilterValue] =
    useState('Vehicle Type');

  console.log(searchOperator, 'searachs_operatorss');
  const maxRating = [1, 2, 3, 4, 5];

  // const [pickuptime, setPickUpTime] = useState('');

  const [droptime, setDropTime] = useState('');
  const [searchQueries, setSearchQueries] = useState({
    boardingPoints: '',
    droppingPoints: '',
    Operators: '',
    Amenities: '',
  });

  // State to store the checked status of each operator
  const [checkedOperators, setCheckedOperators] = useState({});
  const [checkedBoarding, setCheckedBoarding] = useState({});
  const [checkedDropping, setCheckedDropping] = useState({});
  const [checkedAmenities, setCheckedAmenities] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // console.log(checkedOperators, "checkedOperators")

  const handleOperatorCheck = operatorName => {
    setCheckedOperators(prevState => {
      if (prevState[operatorName]) {
        // If the operator is checked, remove it from the state
        const updatedItems = { ...prevState };
        delete updatedItems[operatorName];
        return updatedItems;
      } else {
        // If the operator is unchecked, add it to the state
        return { ...prevState, [operatorName]: true };
      }
    });
  };

  const handleBoardingCheck = boardingName => {
    setCheckedBoarding(prevState => {
      if (prevState[boardingName]) {
        // If the operator is checked, remove it from the state
        const updatedItems = { ...prevState };
        delete updatedItems[boardingName];
        return updatedItems;
      } else {
        // If the operator is unchecked, add it to the state
        return { ...prevState, [boardingName]: true };
      }
    });
  };

  const handleDroppingCheck = DroppingName => {
    setCheckedDropping(prevState => {
      if (prevState[DroppingName]) {
        // If the operator is checked, remove it from the state
        const updatedItems = { ...prevState };
        delete updatedItems[DroppingName];
        return updatedItems;
      } else {
        // If the operator is unchecked, add it to the state
        return { ...prevState, [DroppingName]: true };
      }
    });
  };

  const handleAmenitiesCheck = (title, index) => {
    setCheckedAmenities(prev => {
      const updated = { ...prev };
      if (updated[title]) {
        delete updated[title];
      } else {
        updated[title] = true;
      }
      return updated;
    });

    setSelectedAmenities(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Function to toggle the pickuptime state
  const togglePickUpTime = time => {
    setPickUpTime(prevTime => (prevTime === time ? '' : time)); // Toggle if same, reset if different

    if (time === '6:00 AM - 11:00 AM') {

      if (time === '6:00 AM - 11:00 AM' && isDay === '') {
        setIsDay('6:00 AM - 11:00 AM');
        setIsNight('');
      } else {
        setIsDay(''); // Clear Day if already selected
      }
    }
    else if (time === '6:00 PM - 11:00 PM') {

      if (time === '6:00 PM - 11:00 PM' && isNight === '') {
        setIsNight('6:00 PM - 11:00 PM'); // Unselect Night if Day is selected
        setIsDay('');
      } else {
        setIsNight('');
      }
    }
  }


  const toggleDropTime = time => {
    setDropTime(prevTime => (prevTime === time ? '' : time)); // Toggle if same, reset if different
  };

  function isTimeInRange(rangeStart, rangeEnd, targetTime) {
    const startRange = moment(rangeStart, 'h:mm A');
    const endRange = moment(rangeEnd, 'h:mm A');
    const target = moment(targetTime, 'h:mm A');
    if (startRange.isAfter(endRange)) {
      return (
        target.isBetween(
          startRange,
          moment('11:59 PM', 'h:mm A'),
          null,
          '[)',
        ) || target.isBefore(endRange, null, '[)')
      );
    }
    return target.isBetween(startRange, endRange, null, '[)');
  }

  function isTimeInRangedrop(rangeStart, rangeEnd, targetTime) {
    const startRange = moment(rangeStart, 'h:mm A');
    const endRange = moment(rangeEnd, 'h:mm A');
    const target = moment(targetTime, 'h:mm A');
    // Case: if the range spans across midnight (e.g., 11:00 PM to 6:00 AM)
    if (startRange.isAfter(endRange)) {
      // Check if target time is either after start time OR before end time
      return (
        target.isBetween(
          startRange,
          moment('11:59 PM', 'h:mm A'),
          null,
          '[)',
        ) || target.isSameOrBefore(endRange, null, '[)')
      );
    }
    // Regular case: check if target time is within the range
    return target.isBetween(startRange, endRange, null, '[)');
  }

  useEffect(() => {
    if (
      selectedBusesAll?.includes('1') ||
      selectedBusesLuxury?.includes('1') ||
      selectedBusesRegular?.includes('1')
    ) {
      setSelectedAC('AC');
    } else if (
      selectedBusesAll?.includes('2') ||
      selectedBusesLuxury?.includes('2') ||
      selectedBusesRegular?.includes('2')
    ) {
      setSelectedAC('NonAc');
    }

    if (
      selectedBusesAll?.includes('3') ||
      selectedBusesLuxury?.includes('3') ||
      selectedBusesRegular?.includes('3')
    ) {
      setSeatType('Seater');
    } else if (
      selectedBusesAll?.includes('4') ||
      selectedBusesLuxury?.includes('4') ||
      selectedBusesRegular?.includes('4')
    ) {
      setSeatType('Sleeper');
    }
  }, []);

  useEffect(() => {
    if (isSeatType === '') {
      // If isSeatType is empty, remove "3" from regularBus
      if (
        selectedBusesRegular?.includes('3') ||
        selectedBusesAll?.includes('3') ||
        selectedBusesLuxury?.includes('3')
      ) {
        setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '3'));
        setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '3'));
        setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '3'));
      }
      if (
        selectedBusesRegular?.includes('4') ||
        selectedBusesAll?.includes('4') ||
        selectedBusesLuxury?.includes('4')
      ) {
        setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '4'));
        setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '4'));
        setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '4'));
      }
    }
    if (isSelectedAC === '') {
      // If isSeatType is empty, remove "3" from regularBus
      if (
        selectedBusesRegular?.includes('1') ||
        selectedBusesAll?.includes('1') ||
        selectedBusesLuxury?.includes('1')
      ) {
        setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '1'));
        setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '1'));
        setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '1'));
      }
      if (
        selectedBusesRegular?.includes('2') ||
        selectedBusesAll?.includes('2') ||
        selectedBusesLuxury?.includes('2')
      ) {
        setRegularBus(prevBuses => prevBuses?.filter(bus => bus !== '2'));
        setNormalBus(prevBuses => prevBuses?.filter(bus => bus !== '2'));
        setLuxuryBus(prevBuses => prevBuses?.filter(bus => bus !== '2'));
      }
    }
  }, [isSelectedAC, isSeatType]);

  useEffect(() => {
    let filteredList = Bus_List || [];

    if (pickuptime != ''  && pickuptime !="6:00 AM - 11:00 AM" && pickuptime !='6:00 PM - 11:00 PM' ) {
      filteredList = filteredList?.filter(item => {
        const [starttime, endtime] = pickuptime.split(' - ');
        return isTimeInRange(starttime, endtime, item?.Start_time);
      });
    }

    if (droptime != '') {
      filteredList = filteredList?.filter(item => {
        const [starttime, endtime] = droptime.split(' - ');
        // // console.log(isTimeInRange(starttime, endtime, item?.Arr_Time), starttime, endtime, item?.Arr_Time, "startendtime");
        return isTimeInRangedrop(starttime, endtime, item?.Arr_Time);
      });
    }
    dispatch({
      type: GET_BUS_FILTERS,
      payload: filteredList,
    });
  }, [pickuptime, droptime, checkedOperators]);

  useEffect(() => {
    let filteredList = Bus_List || [];

    // ✅ Operator Filter (already working)
    if (Object.keys(checkedOperators)?.length > 0) {
      filteredList = filteredList?.filter(item => {
        const operator =
          item?.Traveler_Agent_Name?.toString?.().toLowerCase?.().trim?.() ||
          '';
        return Object.keys(checkedOperators).some(
          val => checkedOperators[val] && val.toLowerCase().trim() === operator,
        );
      });
    }

    // ✅ Boarding Filter (updated for partial match and safety)
    if (Object.keys(checkedBoarding)?.length > 0) {
      filteredList = filteredList?.filter(item => {
        const boarding =
          item?.boarding_info?.toString?.().toLowerCase?.().trim?.() || '';

        // 🧪 Optional: log actual data for debugging
        // console.log('Boarding Info:', boarding);
        // console.log('Checked Boarding Keys:', Object.keys(checkedBoarding));

        return Object.keys(checkedBoarding).some(
          val =>
            checkedBoarding[val] && boarding.includes(val.toLowerCase().trim()),
        );
      });
    }

    // ✅ Dropping Filter (updated for partial match and safety)
    if (Object.keys(checkedDropping)?.length > 0) {
      filteredList = filteredList?.filter(item => {
        const dropping =
          item?.dropping_info?.toString?.().toLowerCase?.().trim?.() || '';
        return Object.keys(checkedDropping).some(
          val =>
            checkedDropping[val] &&
            dropping?.includes(val.toLowerCase().trim()),
        );
      });
    }

    if (selectedAmenities?.length > 0) {
      filteredList = filteredList?.filter(item => {
        const amenity_1 = item?.Amenities?.split?.(',') || [];
        const amenity_2 = amenity_1.map(a => Number(a));

        const amenity_filter = selectedAmenities.every(index => {
          return amenity_2[index] === 1;
        });

        return amenity_filter;
      });
    }

    dispatch({
      type: GET_BUS_FILTERS,
      payload: filteredList,
    });
  }, [
    searchQueries,
    checkedOperators,
    checkedBoarding,
    checkedDropping,
    selectedAmenities,
    Bus_List,
  ]);


  const clearAllFilters = async() =>{
   
    setIsSeater(false)
    setSeatType("")
    setSelectedAC("")
    setIsSleeper(false)
    setIsAC(false)
    setIsNonAC(false)
    // selectedAmenities("")
    // secheckedAmenities([])
    setCheckedAmenities([])
    // checkedBoarding([])
    setCheckedBoarding([])
    // checkedDropping([])
 setCheckedDropping([])
    // checkedOperators([])
    setCheckedOperators([])
    setPickUpTime("")
    setIsDay("")
    setIsNight("")
    setDropTime("")
    setPrice1("")
    onClose()
  }

  const handleSeatSelection = (selectedValue) => {
    setSeatType(prevSelected =>
      prevSelected === selectedValue ? '' : selectedValue,
    );
    if (selectedValue === "Seater") {
      setIsSleeper(false)
      setIsSeater(!isSeater)
      // console.log("seaterlog",!isSeater,selectedValue);

    }
    else if (selectedValue === "Sleeper") {
      setIsSeater(false)
      setIsSleeper(!isSleeper)
      // console.log("sleeperlog",!isSleeper,selectedValue);  
    }
  };

  const handleAcNonAc = (selectedValue) => {

    setSelectedAC(prevSelected =>
      prevSelected === selectedValue ? '' : selectedValue,
    );
    if (selectedValue === "NonAC") {
      setIsAC(false)
      setIsNonAC(!isNonAC)
    }
    else if (selectedValue === "AC") {
      setIsNonAC(false)
      setIsAC(!isAC)
    }
    // 
    // setIsAC(true)
  };

  // const handleSearchChange = (text, key) => {
  //   console.log('Input Changed:', text); // Check the input value
  //   setSearchQueries((prevState) => ({
  //     ...prevState,
  //     [key]: text, // Dynamically set the correct key with the new text value
  //   }));
  // };

  // const [filteredOperators, setFilteredOperators] = useState(operatorArray);

  const [searchQuery, setSearchQuery] = useState('');

  // const handleSearch = (query) => {
  //   setSearchQuery(query);

  //   if (query === '') {
  //     setFilteredOperators(operatorArray); // If search query is empty, show all operators
  //   } else {
  //     const filteredData = operatorArray.filter((item) =>
  //       item.operator.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredOperators(filteredData);
  //   }
  // };

  // const handleSearch = useCallback((query) => {
  //   setSearchQuery(query);
  //   if (query === '') {
  //     setFilteredOperators(operatorArray);
  //   } else {
  //     const filteredData = operatorArray.filter((item) =>
  //       item.operator.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredOperators(filteredData);
  //   }
  // }, [operatorArray]);
  // Handle input change for searching operators

  // const debounceTimeout = useRef(null);

  // const handleSearchChange = (text) => {
  //   // Clear the previous timeout to debounce the change
  //   if (debounceTimeout.current) {
  //     clearTimeout(debounceTimeout.current);
  //   }

  //   debounceTimeout.current = setTimeout(() => {
  //     setSearchQueries((prevState) => ({
  //       ...prevState,
  //       Operators: text,
  //     }));
  //   }, 500); // Adjust debounce delay as needed
  // };

  // console.log(isSeatType, "pranesh___")
  const TimeList = [
    {
      id: '1',
      title: 'Morning',
      value: '1',
      Selected: false,
      time: '6 AM to 11 AM',
      image: require('../assets/MorningIcon.png'),
    },
    {
      id: '2',
      title: 'Afternoon',
      value: '2',
      Selected: true,
      time: '11 AM to 6 PM',
      image: require('../assets/AfternoonIcon.png'),
    },
    {
      id: '3',
      title: 'Evening',
      value: '3',
      Selected: false,
      time: '6 PM to 11 PM',
      image: require('../assets/EveningIcon.png'),
    },
    {
      id: '4',
      title: 'Late Night',
      value: '4',
      Selected: false,
      time: '11 PM to 6 AM',
      image: require('../assets/LateNightIcon.png'),
    },
  ];

  const AmentiesList = [
    {
      id: '1',
      title: 'Water Bottle',
      value: '1',
      Selected: false,
    },
    {
      id: '2',
      title: 'Blanket',
      value: '2',
      Selected: true,
    },
    {
      id: '3',
      title: 'TV',
      value: '3',
      Selected: false,
    },
    {
      id: '4',
      title: 'AC',
      value: '4',
      Selected: true,
    },
    {
      id: '5',
      title: 'Snacks',
      value: '4',
      Selected: false,
    },
    {
      id: '6',
      title: 'Charging Point',
      value: '4',
      Selected: false,
    },
    {
      id: '7',
      title: 'CCTV',
      value: '4',
      Selected: false,
    },
    {
      id: '8',
      title: 'Emergency Exit',
      value: '4',
      Selected: false,
    },
    {
      id: '9',
      title: 'Individual TV',
      value: '9',
      Selected: false,
    },
    {
      id: '10',
      title: 'Hammer',
      value: '10',
      Selected: true,
    },
    {
      id: '11',
      title: 'Facial Tissues',
      value: '11',
      Selected: false,
    },
    {
      id: '12',
      title: 'Pillows',
      value: '12',
      Selected: true,
    },
    {
      id: '13',
      title: 'Fire Extinguisher',
      value: '13',
      Selected: false,
    },
    {
      id: '14',
      title: 'Reading Light',
      value: '14',
      Selected: false,
    },
    {
      id: '15',
      title: 'GPS Tracking',
      value: '15',
      Selected: false,
    },
    {
      id: '16',
      title: 'First Aid Box',
      value: '16',
      Selected: false,
    },
    {
      id: '17',
      title: 'Wifi',
      value: '17',
      Selected: false,
    },
    {
      id: '18',
      title: 'Hand Sanitizer',
      value: '18',
      Selected: false,
    },
    {
      id: '19',
      title: 'Temperature checks',
      value: '19',
      Selected: false,
    },
    {
      id: '20',
      title: 'Social Distancing',
      value: '20',
      Selected: false,
    },
    {
      id: '21',
      title: 'Driver Conductor with masks',
      value: '21',
      Selected: false,
    },
    {
      id: '22',
      title: 'Fumigation',
      value: '22',
      Selected: false,
    },
    {
      id: '23',
      title: 'Staff',
      value: '23',
      Selected: false,
    },
  ];

  // const sortListAry = [
  //   {
  //     id: '1',
  //     title: 'Vehicle Type',
  //     keyValue: 'Vehicle Type',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'High to Low', value: '1', Selected: false},
  //       {id: '2', title: 'Low to High', value: '2', Selected: false},
  //     ],
  //   },
  //   // {
  //   //   id: '2',
  //   //   title: 'Star Ratings',
  //   //   keyValue: 'Star Ratings',
  //   //   isSelect: false,
  //   //   data: [
  //   //     { id: '1', title: 'High to Low', value: '1', Selected: false },
  //   //     { id: '2', title: 'Low to High', value: '2', Selected: false },
  //   //   ],
  //   // },
  //   {
  //     id: '3',
  //     title: 'Price Range',
  //     keyValue: 'Price Range',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'High to Low', value: '1', Selected: false},
  //       {id: '2', title: 'Low to High', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '4',
  //     title: 'Boarding Points',
  //     keyValue: 'Boarding Points',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '5',
  //     title: 'Boarding Time',
  //     keyValue: 'Boarding Time',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '6',
  //     title: 'Travel Operators',
  //     keyValue: 'Travel Operators',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '7',
  //     title: 'Dropping Points',
  //     keyValue: 'Dropping Points',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '8',
  //     title: 'Dropping time',
  //     keyValue: 'Dropping time',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  //   {
  //     id: '9',
  //     title: 'Amenities',
  //     keyValue: 'Amenities',
  //     isSelect: false,
  //     data: [
  //       {id: '1', title: 'Earliest to Latest', value: '1', Selected: false},
  //       {id: '2', title: 'Latest to Earliest', value: '2', Selected: false},
  //     ],
  //   },
  // ];

  const sortListAry = [
    {
      id: '1',
      title: 'Vehicle Type',
      keyValue: 'Vehicle Type',
      count: (isSeatType != null && isSeatType != "" ? 1 : 0) + (isSelectedAC != null && isSelectedAC != "" ? 1 : 0),
      isSelect: false,
      data: [
        { id: '1', title: 'High to Low', value: '1', Selected: false },
        { id: '2', title: 'Low to High', value: '2', Selected: false },
      ],
    },
    // {
    //   id: '2',
    //   title: 'Star Ratings',
    //   keyValue: 'Star Ratings',
    //   isSelect: false,
    //   data: [
    //     { id: '1', title: 'High to Low', value: '1', Selected: false },
    //     { id: '2', title: 'Low to High', value: '2', Selected: false },
    //   ],
    // },
    {
      id: '3',
      title: 'Price Range',
      keyValue: 'Price Range',
      // count: priceRange.max != "" && priceRange.max !=null ? 1 : 0,
      isSelect: false,
      data: [
        { id: '1', title: 'High to Low', value: '1', Selected: false },
        { id: '2', title: 'Low to High', value: '2', Selected: false },
      ],
    },
    {
      id: '4',
      title: 'Boarding Points',
      keyValue: 'Boarding Points',
      count: Object.keys(checkedBoarding)?.length > 0 ? Object.keys(checkedBoarding)?.length : 0,
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '5',
      title: 'Boarding Time',
      keyValue: 'Boarding Time',
      count: pickuptime != "" && pickuptime != null ? 1 : 0,
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '6',
      title: 'Travel Operators',
      keyValue: 'Travel Operators',
      count: Object.keys(checkedOperators)?.length > 0 ? Object.keys(checkedOperators)?.length : 0,
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '7',
      title: 'Dropping Points',
      keyValue: 'Dropping Points',
      count: Object.keys(checkedDropping)?.length > 0 ? Object.keys(checkedDropping)?.length : 0,
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '8',
      title: 'Dropping time',
      keyValue: 'Dropping time',
      count: droptime != "" && droptime != null ? 1 : 0,
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
    {
      id: '9',
      title: 'Amenities',
      keyValue: 'Amenities',
      count: Object.keys(checkedAmenities)?.length > 0 ? Object.keys(checkedAmenities)?.length : 0,
      isSelect: false,
      data: [
        { id: '1', title: 'Earliest to Latest', value: '1', Selected: false },
        { id: '2', title: 'Latest to Earliest', value: '2', Selected: false },
      ],
    },
  ];

  const PointsList = [
    {
      title: 'Popular',
      data: [
        {
          id: '1',
          title: 'Poonamallee',
          Selected: false,
          count: '15',
        },
        {
          id: '2',
          title: 'Sriperumbudur',
          Selected: false,
          count: '15',
        },
        {
          id: '3',
          title: 'Koyambedu',
          Selected: true,
          count: '15',
        },
        {
          id: '4',
          title: 'Vadapalani',
          Selected: false,
          count: '15',
        },
        {
          id: '5',
          title: 'Ashok Pillar',
          Selected: true,
          count: '15',
        },
      ],
    },
    {
      title: 'Others',
      data: [
        {
          id: '1',
          title: 'Poonamallee',
          Selected: false,
          count: '15',
        },
        {
          id: '2',
          title: 'Sriperumbudur',
          Selected: true,
          count: '15',
        },
        {
          id: '3',
          title: 'Koyambedu',
          Selected: false,
          count: '15',
        },
        {
          id: '4',
          title: 'Vadapalani',
          Selected: true,
          count: '15',
        },
        {
          id: '5',
          title: 'Ashok Pillar',
          Selected: false,
          count: '15',
        },
        {
          id: '6',
          title: 'Dilsukhnagar',
          Selected: false,
          count: '15',
        },
        {
          id: '7',
          title: 'Lakdikapul',
          Selected: false,
          count: '15',
        },
        {
          id: '8',
          title: 'Sr Nagar',
          Selected: false,
          count: '15',
        },
        {
          id: '9',
          title: 'KPHB-Pulla Reddy',
          Selected: false,
          count: '15',
        },
        {
          id: '10',
          title: 'Ashok Pillar',
          Selected: false,
          count: '15',
        },
      ],
    },
    // Add more sections here
  ];

  const StartRatingList = [
    {
      id: '1',
      title: '5',
      value: 5,
      Selected: false,
      count: '15',
    },
    {
      id: '2',
      title: '4',
      value: 4,
      Selected: true,
      count: '15',
    },
    {
      id: '3',
      title: '3',
      value: 3,
      Selected: false,
      count: '15',
    },
    {
      id: '4',
      title: '2',
      value: 2,
      Selected: false,
      count: '15',
    },
    {
      id: '5',
      title: '1',
      value: 1,
      Selected: false,
      count: '15',
    },
  ];

  const SeatTypeList = [
    {
      id: '1',
      title: 'Seater',
      value: '1',
      Selected: false,
      image: require('../assets/Filters/Seater.png'),
    },
    // {
    //   id: '2',
    //   title: 'Semi Sleeper',
    //   value: '2',
    //   Selected: true,
    //   image: require('../assets/Filters/SemiSeater.png'),
    // },
    {
      id: '2',
      title: 'Sleeper',
      value: '2',
      Selected: false,
      image: require('../assets/Filters/Sleepers.png'),
    },
  ];

  const TravelOperatorList = [
    {
      title: 'Popular',
      data: [
        {
          id: '1',
          title: 'Poonamallee',
          Selected: true,
          count: '15',
        },
        {
          id: '2',
          title: 'Sriperumbudur',
          Selected: false,
          count: '15',
        },
        {
          id: '3',
          title: 'Koyambedu',
          Selected: true,
          count: '15',
        },
        {
          id: '4',
          title: 'Vadapalani',
          Selected: false,
          count: '15',
        },
        {
          id: '5',
          title: 'Ashok Pillar',
          Selected: true,
          count: '15',
        },
      ],
    },
    {
      title: 'Others',
      data: [
        {
          id: '1',
          title: 'Poonamallee',
          Selected: false,
          count: '15',
        },
        {
          id: '2',
          title: 'Sriperumbudur',
          Selected: true,
          count: '15',
        },
        {
          id: '3',
          title: 'Koyambedu',
          Selected: false,
          count: '15',
        },
        {
          id: '4',
          title: 'Vadapalani',
          Selected: false,
          count: '15',
        },
        {
          id: '5',
          title: 'Ashok Pillar',
          Selected: true,
          count: '15',
        },
        {
          id: '6',
          title: 'Dilsukhnagar',
          Selected: false,
          count: '15',
        },
        {
          id: '7',
          title: 'Lakdikapul',
          Selected: false,
          count: '15',
        },
        {
          id: '8',
          title: 'Sr Nagar',
          Selected: false,
          count: '15',
        },
        {
          id: '9',
          title: 'KPHB-Pulla Reddy',
          Selected: false,
          count: '15',
        },
        {
          id: '10',
          title: 'Ashok Pillar',
          Selected: false,
          count: '15',
        },
      ],
    },
    // Add more sections here
  ];

  // const [price, setPrice] = useState(500);
  // const minPrice = 260;
  // const maxPrice = 1260;
  // // const sliderWidth = (RangeScreenWidth * 0.60) - 40 ; // Adjust based on your container's padding/margin
  // const sliderWidth = 200 - 40;
  // // Calculate the position for the floating label
  // const calculateLabelPosition = () => {
  //   const percentage = (price - minPrice) / (maxPrice - minPrice);
  //   return percentage * sliderWidth;
  // };

  // New Price range
  const [price1, setPrice1] = useState(500);
  const minPrice1 = 260;
  const maxPrice1 = 1260;

  const sliderWidth1 = width * 0.7; // 70% of the screen width
  const thumbWidth1 = 30; // Assume the thumb is 30px wide (adjust if different)
  const labelWidth1 = 50; // Assume the label is 50px wide (adjust if different)

  const animatedValue1 = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Initial position calculation
    handleValueChange(price1);
  }, []);

  const handleValueChange = value => {
    setPrice1(value);

    // Calculate the exact position of the thumb
    const ratio = (value - minPrice1) / (maxPrice1 - minPrice1);
    const position = ratio * (sliderWidth1 / 2) - thumbWidth1 / 2 - 50;

    // Update the animated value
    Animated.timing(animatedValue1, {
      toValue: position,
      duration: 100, // smooth transition
      useNativeDriver: false,
    }).start();
  };

  const Separator = () => <View style={styles.separator} />;

  // Manage state for expanded sections
  const [sections, setSections] = useState(
    PointsList.map(section => ({ ...section, expanded: false })),
  );

  // Function to toggle section
  const toggleSection = getIndex => {
    setSections(prevSections =>
      prevSections.map((section, i) =>
        i === getIndex
          ? { ...section, expanded: !section.expanded }
          : { ...section, expanded: false },
      ),
    );
  };

  const boardCounts = Bus_List?.map(item =>
    item.boarding_info.map(data => {
      const [boarding_info, time, id] = data?.split('^');
      return { boarding_info, id }; // Return boarding_info and id
    }),
  )
    ?.flat() // Flatten the array if necessary
    ?.reduce((acc, { boarding_info, id }) => {
      // Initialize the accumulator for each boarding point
      if (!acc[boarding_info]) {
        acc[boarding_info] = { count: 0, pikupId: [] };
      }

      // Increment the count and add the id to the pikupId array
      acc[boarding_info].count += 1;
      acc[boarding_info].pikupId.push(id);

      return acc;
    }, {});

  const BoardingPoints =
    boardCounts &&
    Object.entries(boardCounts).map(([name, { count, pikupId }]) => ({
      name,
      count,
      pikupId,
    }));

  const filteredBoardingPoints = BoardingPoints?.filter(point =>
    point?.name
      ?.toLowerCase()
      ?.includes(searchQueries?.boardingPoints?.toLowerCase() || ''),
  );

  const dropCount = Bus_List?.map(item =>
    item.dropping_info?.map(data => {
      const [id, dropping_info] = data?.split('^');
      return { dropping_info, id };
    }),
  )
    ?.flat()
    ?.reduce((acc, { dropping_info, id }) => {
      if (!acc[dropping_info]) {
        acc[dropping_info] = { count: 0, dropId: [] };
      }
      acc[dropping_info].count += 1;
      acc[dropping_info].dropId.push(id);

      return acc;
    }, {});

  // Get the unique names and their counts as an array of objects
  const DroppingPoints =
    dropCount &&
    Object?.entries(dropCount)?.map(([name, { count, dropId }]) => ({
      name,
      count,
      dropId,
    }));

  const filtereDroppingPoints = DroppingPoints?.filter(point =>
    point?.name
      ?.toLowerCase()
      ?.includes(searchQueries?.droppingPoints?.toLowerCase() || ''),
  );

  const filterAmenities = AmentiesList?.filter(point =>
    point?.title
      ?.toLowerCase()
      ?.includes(searchQueries?.Amenities?.toLowerCase() || ''),
  );

  const OperatorName = [
    ...new Set(Bus_List?.map(item => item?.Traveler_Agent_Name)),
  ];
  const operatorArray = OperatorName?.map(name => ({ operator: name }));
  // console.log(operatorArray, "operajfddfkjdfk");

  const filteredOperatorName = operatorArray?.filter(ope =>
    ope?.operator
      ?.toLowerCase()
      ?.includes(searchQueries?.Operators?.toString().toLowerCase() || ''),
  );

  // const [data, setData] = useState([])
  // console.log(data, "filtered___operator")

  // const filteredOperatorName = filter(operatorArray, (ope) =>
  //   ope?.operator?.toLowerCase().includes(searchQueries?.Operators?.toLowerCase())
  // );

  // const filteredOperatorName = filter(operatorArray, (ope) => {
  //   const operatorName = ope?.operator?.toLowerCase();
  //   const searchQuery = searchQueries?.Operators?.toLowerCase();
  //   return operatorName && searchQuery ? operatorName.includes(searchQuery) : false;
  // });

  const handleSearchChange = text => {
    setSearchQueries(prevState => ({
      ...prevState,
      Operators: text,
    }));
    // const filtereddata = filter(operatorArray, (data) => {
    //   return includes(data, text)
    // })
    // setData(filtereddata)
  };

  const handleBlur = () => {
    // You can perform additional actions on blur if needed, such as finalizing or logging.
    // console.log('Search finalized:', searchQueries.Operators);
  };

  // useEffect(() => {
  //   if (searchQueries.Operators.length > 0) {
  //     dispatch({ type: FILTERED_OPERATOR, payload: filteredOperatorName })
  //   }
  // }, [searchQueries])

  const newitme = useSelector(state => state.productReducer.filtered_operator);

  // // console.log(newitme, "newitme")
  // function SortMainRowView({item, index, LastCount}) {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         setSelectedIndex(index);
  //         setSelectCurrentSortName(item.title);
  //         setSelectedFilterValue(item.keyValue);
  //       }}>
  //       <View
  //         style={[
  //           {
  //             flex: 1,
  //             flexDirection: 'row',
  //             borderBottomWidth: 0.9,
  //             borderColor: '#1F487C',
  //             borderBottomEndRadius:
  //               LastCount === index && selectedFilterValue !== item.keyValue
  //                 ? 20
  //                 : 0,
  //             height: 54,
  //           },
  //           selectedFilterValue === item.keyValue
  //             ? {
  //                 borderRightWidth: 0.0,
  //                 backgroundColor: 'rgba(52, 52, 52, 0.0)',
  //               }
  //             : {
  //                 borderRightWidth: 0.9,
  //                 backgroundColor: 'rgba(255, 255, 255, 0.5)',
  //               },
  //         ]}>
  //         {selectedFilterValue === item.keyValue && (
  //           <View
  //             style={{
  //               backgroundColor: '#1F487C',
  //               height: '100%',
  //               width: 8,
  //             }}></View>
  //         )}
  //         <Text
  //           style={[
  //             {
  //               alignSelf: 'center',
  //               fontFamily: 'Inter',
  //               textAlign: 'justify',
  //             },
  //             selectedFilterValue === item.keyValue
  //               ? {
  //                   color: '#1F487C',
  //                   fontWeight: '700',
  //                   fontSize: 15,
  //                   lineHeight: 18,
  //                   paddingHorizontal: 10,
  //                 }
  //               : {
  //                   color: '#393939',
  //                   fontWeight: '400',
  //                   fontSize: 14,
  //                   lineHeight: 16,
  //                   paddingHorizontal: 15,
  //                 },
  //           ]}>
  //           {item.title}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }

  useEffect(() => {
    sortListAry
    const totalCount = sortListAry?.reduce((sum, item) => sum + (item.count || 0), 0)
    setFilterCount(totalCount)
  }, [sortListAry, isSeatType, isSelectedAC, pickuptime])

  function SortMainRowView({ item, index, LastCount }) {

    // console.log(item,"itemsssvaluiesdkfjd");

    // const totalCount = item?.reduce((sum,item)=>sum + (item?.count || 0),0)
    // setFilterCount(totalCount)
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedIndex(index);
          setSelectCurrentSortName(item.title);
          setSelectedFilterValue(item.keyValue);
        }}>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 0.9,
              borderColor: '#1F487C',
              borderBottomEndRadius:
                LastCount === index && selectedFilterValue !== item.keyValue
                  ? 20
                  : 0,
              height: 54,
            },
            selectedFilterValue === item.keyValue
              ? {
                borderRightWidth: 0.0,
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
              }
              : {
                borderRightWidth: 0.9,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
          ]}>
          {selectedFilterValue === item.keyValue && (
            <View
              style={{
                backgroundColor: '#1F487C',
                height: '100%',
                width: 8,
              }}></View>
          )}
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <Text
              style={[
                {
                  fontFamily: 'Inter',
                  textAlign: 'justify',
                },
                selectedFilterValue === item.keyValue
                  ? {
                    color: '#1F487C',
                    fontWeight: '700',
                    fontSize: 15,
                    lineHeight: 18,
                  }
                  : {
                    color: '#393939',
                    fontWeight: '400',
                    fontSize: 14,
                    lineHeight: 16,
                  },
              ]}
            >
              {item.title}
            </Text>
            {
              item?.count > 0 ? <Text
                style={{
                  color: '#393939',
                  fontSize: 14,
                  paddingTop: 20
                }}
              >
                {item?.count}
              </Text> : ""
            }

          </View>

        </View>
      </TouchableOpacity>
    );
  }
  function SortingSubRowView({ item, index }) {
    return (
      <TouchableOpacity
        style={{ padding: 12 }}
        onPress={() => {
          // console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 20,
            }}>
            {item.title}
          </Text>
          <Image
            source={require('../assets/UnSelectSort.png')}
            style={{ width: 20, height: 20, marginLeft: 20 }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const RenderViewSectionHeader = ({ section }) => {
    // console.log('index---' + section.expanded)
    const index = PointsList.findIndex(s => s.title === section.title);
    return (
      <TouchableOpacity onPress={() => toggleSection(index)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '96%',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 18,
            }}>
            {section.title}
          </Text>
          <Image
            source={
              section.expanded === true
                ? require('../assets/UpArrowFilterIcon.png')
                : require('../assets/DownFilterIcon.png')
            }
            style={{ width: 15, height: 8 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderViewSectionFooter = ({ section }) => {
    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1F487C',
            paddingHorizontal: 15,
            height: 30,
          }}>
          <Text
            style={{
              fontWeight: '300',
              fontSize: 14,
              fontFamily: 'Inter',
              color: '#FFFFFF',
              lineHeight: 17,
            }}>
            {'200 Seats'}
          </Text>
          <Image
            source={require('../assets/ArrowRight.gif')}
            style={{ width: 14, height: 15, marginHorizontal: 5 }}
          />
        </View>
      </View>
    );
  };

  const FilterBoardingTimeView = () => {
    return (
      <>
        <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
          {/* <FlatList
          data={TimeList}
          renderItem={({ item, index }) => {
            return <BoardingTimeRowView item={item} index={index} />;
          }}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item, index) => item + index}
        /> */}
          <View>
            {/* Morning Time Slot */}
            <TouchableOpacity
              onPress={() => togglePickUpTime('6:00 AM - 11:00 AM')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    pickuptime === '6:00 AM - 11:00 AM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/MorningIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        pickuptime === '6:00 AM - 11:00 AM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '6:00 AM - 11:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Morning'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '6:00 AM - 11:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'6:00 AM - 11:00 AM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Afternoon Time Slot */}
            <TouchableOpacity
              onPress={() => togglePickUpTime('11:00 AM - 6:00 PM')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    pickuptime === '11:00 AM - 6:00 PM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/AfternoonIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        pickuptime === '11:00 AM - 6:00 PM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '11:00 AM - 6:00 PM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Afternoon'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '11:00 AM - 6:00 PM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'11:00 AM - 6:00 PM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Evening Time Slot */}
            <TouchableOpacity
              onPress={() => togglePickUpTime('6:00 PM - 11:00 PM')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    pickuptime === '6:00 PM - 11:00 PM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/EveningIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        pickuptime === '6:00 PM - 11:00 PM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '6:00 PM - 11:00 PM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Evening'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '6:00 PM - 11:00 PM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'6:00 PM - 11:00 PM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Late Night Time Slot */}
            <TouchableOpacity
              onPress={() => togglePickUpTime('11:00 PM - 6:00 AM')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    pickuptime === '11:00 PM - 6:00 AM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/LateNightIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        pickuptime === '11:00 PM - 6:00 AM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '11:00 PM - 6:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Late Night'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        pickuptime === '11:00 PM - 6:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'11:00 PM - 6:00 AM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const FilterDropTimeView = () => {
    return (
      <>
        <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
          {/* <FlatList
          data={TimeList}
          renderItem={({ item, index }) => {
            return <BoardingTimeRowView item={item} index={index} />;
          }}
          contentContainerStyle={{ gap: 20 }}
          keyExtractor={(item, index) => item + index}
        /> */}
          <View>
            {/* Morning Time Slot */}

            <TouchableOpacity
              onPress={() => toggleDropTime('6:00 AM - 11:00 AM')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    droptime === '6:00 AM - 11:00 AM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/MorningIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        droptime === '6:00 AM - 11:00 AM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        droptime === '6:00 AM - 11:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Morning'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        droptime === '6:00 AM - 11:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'6:00 AM - 11:00 AM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Afternoon Time Slot */}
            <TouchableOpacity
              onPress={() => toggleDropTime('11:00 AM - 6:00 PM')}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    droptime === '11:00 AM - 6:00 PM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/AfternoonIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        droptime === '11:00 AM - 6:00 PM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        droptime === '11:00 AM - 6:00 PM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Afternoon'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        droptime === '6:00 AM - 11:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'6:00 AM - 11:00 AM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Evening Time Slot */}
            <TouchableOpacity
              onPress={() => toggleDropTime('6:00 PM - 11:00 PM')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    droptime === '6:00 PM - 11:00 PM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/EveningIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        droptime === '6:00 PM - 11:00 PM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        droptime === '6:00 PM - 11:00 PM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Evening'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        droptime === '6:00 PM - 11:00 PM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'6:00 PM - 11:00 PM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Late Night Time Slot */}
            <TouchableOpacity
              onPress={() => toggleDropTime('11:00 PM - 6:00 AM')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'space-between',
                  width: 230,
                  padding: 10,
                  borderRadius: 12,
                  borderColor: '#C9C9C9',
                  borderWidth: 1,
                  backgroundColor:
                    droptime === '11:00 PM - 6:00 AM' ? '#1F487C' : '#FFFFFF',
                }}>
                {/* Left section: Image, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={require('../assets/LateNightIcon.png')}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor:
                        droptime === '11:00 PM - 6:00 AM'
                          ? '#FFFFFF'
                          : 'rgba(74, 74, 74, 0.6)',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                {/* Right section: Texts, centered vertically */}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 16,
                      fontFamily: 'Inter',
                      color:
                        droptime === '11:00 PM - 6:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'Late Night'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 13,
                      fontFamily: 'Inter',
                      color:
                        droptime === '11:00 PM - 6:00 AM'
                          ? '#FFFFFF'
                          : '#4A4A4A',
                      lineHeight: 22,
                    }}>
                    {'11:00 PM - 6:00 AM'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  function BoardingTimeRowView({ item, index }) {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            // console.log('clicked');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              borderColor: '#C9C9C9',
              backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Image
              source={item.image}
              style={{
                width: 28,
                height: 28,
                tintColor:
                  item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
                marginHorizontal: 10,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 13,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // console.log('clicked');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              borderColor: '#C9C9C9',
              backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Image
              source={item.image}
              style={{
                width: 28,
                height: 28,
                tintColor:
                  item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
                marginHorizontal: 10,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 13,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // console.log('clicked');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              borderColor: '#C9C9C9',
              backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Image
              source={item.image}
              style={{
                width: 28,
                height: 28,
                tintColor:
                  item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
                marginHorizontal: 10,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 13,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // console.log('clicked');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              borderColor: '#C9C9C9',
              backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
              borderWidth: 1,
              paddingHorizontal: 10,
            }}>
            <Image
              source={item.image}
              style={{
                width: 28,
                height: 28,
                tintColor:
                  item.Selected === true ? '#FFFFFF' : 'rgba(74, 74, 74, 0.6)',
                marginHorizontal: 10,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 13,
                  fontFamily: 'Inter',
                  color: item.Selected === true ? '#FFFFFF' : '#4A4A4A',
                  lineHeight: 22,
                }}>
                {item.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }

  const FilterAmenitiesView = () => {
    return (
      <>
        <View style={[styles.container, { height: 30 }]}>
          <FlatList
            data={filterAmenities}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
            renderItem={({ item, index }) => (
              <AmenitiesRowView
                item={item}
                index={index}
                checkedAmenities={checkedAmenities}
                handleAmenitiesCheck={handleAmenitiesCheck}
              />
            )}
          />
        </View>
      </>
    );
  };

  function AmenitiesRowView({
    item,
    index,
    checkedAmenities,
    handleAmenitiesCheck,
  }) {
    const isChecked = selectedAmenities.includes(index);

    return (
      <View key={item.index} style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => handleAmenitiesCheck(item.title, index)}>
          <Image
            source={
              isChecked
                ? require('../assets/selectTick.png')
                : require('../assets/UnCheckBlockIcon.png')
            }
            style={{ width: 17, height: 17, marginRight: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
            fontFamily: 'Inter',
            color: '#4A4A4A',
            lineHeight: 14,
          }}>
          {item?.title?.length > 26
            ? item?.title?.slice(0, 27) + '...'
            : item?.title}
        </Text>
      </View>
    );
  }

  const StartRatingView = () => {
    return (
      <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>
        <FlatList
          data={StartRatingList}
          renderItem={({ item, index }) => {
            return <StartRatingRowView item={item} index={index} />;
          }}
          contentContainerStyle={{ gap: 5 }}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  };

  function StartRatingRowView({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log('clicked');
        }}>
        <View
          style={{
            flex: 1,
            width: '96%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#C9C9C9',
            paddingVertical: 6,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={
                item.Selected === true
                  ? require('../assets/selectTick.png')
                  : require('../assets/UnCheckBlockIcon.png')
              }
              style={{
                width: 18,
                height: 18,
                resizeMode: 'cover',
                marginRight: 10,
                marginTop: 2,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {maxRating.map(rates => {
                return (
                  <View>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: 'cover',
                        marginRight: 6,
                      }}
                      source={
                        rates <= item.value
                          ? require('../assets/FilterFullStar.png')
                          : require('../assets/FilterEmptyStar.png')
                      }
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              fontWeight: '400',
              fontSize: 10,
              fontFamily: 'Inter',
              color: '#9B9B9B',
              lineHeight: 13,
              textAlign: 'right',
            }}>
            {'(14)'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const VehicleTypeView = () => {
    return (
      <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
              borderColor: '#1F487C',
              backgroundColor: isSelectedAC === 'AC' ? '#1F487C' : '#FFFFFF',
              borderWidth: 0.5,
              borderRightWidth: 5,
            }}
            onPress={() => {
              handleAcNonAc('AC');
              // setSelectedAC("AC")
              // setIsAC(true)
              // console.log('clickedavavavacacacacacacac');
            }}>
            <Image
              source={require('../assets/Filters/Ac.png')}
              style={{
                width: 20,
                height: 18,
                resizeMode: 'cover',
                marginRight: 5,
                tintColor: isSelectedAC === 'AC' ? '#FFFFFF' : '#1F487C',
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                fontFamily: 'Inter',
                color: isSelectedAC === 'AC' ? '#FFFFFF' : '#1F487C',
                lineHeight: 16,
              }}>
              AC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
              borderColor: '#1F487C',
              backgroundColor: isSelectedAC === 'NonAC' ? '#1F487C' : '#FFFFFF',
              borderWidth: 0.5,
              borderRightWidth: 5,
              paddingVertical: 8,
            }}
            onPress={() => {
              handleAcNonAc('NonAC');
              // setSelectedAC("NonAC")
              // setIsNonAC(true)
              // setIsNonAC(!isNonAC)
              // console.log('clicked');
            }}>
            <Image
              source={require('../assets/Filters/NonAc.png')}
              style={{
                width: 20,
                height: 18,
                resizeMode: 'cover',
                tintColor: isSelectedAC === 'NonAC' ? '#FFFFFF' : '#1F487C',
                marginRight: 5,
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                fontFamily: 'Inter',
                color: isSelectedAC === 'NonAC' ? '#FFFFFF' : '#1F487C',
                lineHeight: 16,
              }}>
              {'Non AC'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 25, paddingBottom: 8 }}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              fontFamily: 'Inter',
              color: '#1F487C',
              lineHeight: 20,
            }}>
            Seat Type
          </Text>
        </View>
        {/* <FlatList
          data={SeatTypeList}
          renderItem={({ item, index }) => {
            return (
              <VehicleTypeRowView
                item={item}
                index={index}
                isSeatType={isSeatType}
              // onPress={() => handleSeatSelection(item.value)} // Update the selected seat on press
              />
            );
          }}
          contentContainerStyle={{ gap: 2 }}
          keyExtractor={(item, index) => item.id + index}
        /> */}
        <View style={{ alignItems: 'flex-start', marginHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
            <TouchableOpacity
              onPress={() => {
                handleSeatSelection('Seater');
                // setSeatType("Seater")
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 109,
                  borderRadius: 6,
                  borderColor: '#1F487C',
                  backgroundColor:
                    isSeatType === 'Seater' ? '#1F487C' : '#FFFFFF',
                  borderWidth: 0.5,
                  borderRightWidth: 5,
                  paddingVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginVertical: 8,
                  marginLeft: -8
                }}>
                <Image
                  source={require('../assets/Filters/Seater.png')}
                  style={{
                    width: 20,
                    height: 18,
                    resizeMode: 'cover',
                    marginRight: 10,
                    tintColor: isSeatType === 'Seater' ? '#FFFFFF' : '#1F487C'
                  }}
                />
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    fontFamily: 'Inter',
                    color: isSeatType === 'Seater' ? '#FFFFFF' : '#1F487C',
                    lineHeight: 17,
                  }}>
                  {`Seater`}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSeatSelection('Sleeper');
              }}>
              <View
                style={{
                  flex: 1,
                  width: 109,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderRadius: 6,
                  borderColor: '#1F487C',
                  backgroundColor:
                    isSeatType === 'Sleeper' ? '#1F487C' : '#FFFFFF',
                  borderWidth: 0.5,
                  borderRightWidth: 5,
                  paddingVertical: 10,
                  paddingLeft: 5,
                  paddingRight: 10,
                  marginVertical: 8,
                }}>
                <Image
                  source={require('../assets/Filters/Sleepers.png')}
                  style={{
                    width: 20,
                    height: 18,
                    resizeMode: 'cover',
                    marginRight: 10,
                    tintColor: isSeatType === "Sleeper" ? '#FFFFFF' : '#1F487C'
                  }}
                />
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    fontFamily: 'Inter',
                    color: isSeatType === 'Sleeper' ? '#FFFFFF' : '#1F487C',
                    lineHeight: 17,
                  }}>
                  {`Sleeper`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  function VehicleTypeRowView({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          handleSeatSelection(item.value);
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 6,
            borderColor: '#1F487C',
            backgroundColor: item.Selected === true ? '#1F487C' : '#FFFFFF',
            borderWidth: 0.5,
            borderRightWidth: 5,
            paddingVertical: 10,
            paddingLeft: 10,
            paddingRight: 10,
            marginVertical: 8,
          }}>
          <Image
            source={item.image}
            style={{
              width: 20,
              height: 18,
              resizeMode: 'cover',
              marginRight: 10,
              tintColor: item.Selected === true ? '#FFFFFF' : '#1F487C',
            }}
          />
          <Text
            style={{
              fontWeight: '600',
              fontSize: 14,
              fontFamily: 'Inter',
              color: item.Selected === true ? '#FFFFFF' : '#1F487C',
              lineHeight: 17,
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // const PriceRangeView = () => {
  //   return (
  //     <View style={{ width: 200, padding: 20, }}>

  //       <View style={styles.sliderContainer}>
  //         <View style={styles.startingPointCircle} />
  //         <Slider
  //           style={styles.slider}
  //           minimumValue={minPrice}
  //           maximumValue={maxPrice}
  //           step={1}
  //           value={price}
  //           onValueChange={(value) => setPrice(value)}
  //           minimumTrackTintColor="transparent" // Make the minimum track transparent to show the custom filled track
  //           maximumTrackTintColor="#d3d3d3"
  //           thumbImage={thumbImage}               // Set the thumb image
  //         />
  //         <View style={[styles.filledTrack, { width: calculateLabelPosition() }]} />

  //         <View style={[styles.floatingLabel, { left: calculateLabelPosition() - 20 }]}>
  //           <Text style={styles.floatingLabelText}>₹{price}</Text>
  //         </View>
  //         {/* <View style={styles.staticLabel}>
  //         <Text style={styles.staticLabelText}>₹{minPrice}</Text>
  //       </View>
  //       <View style={styles.staticLabelMax}>
  //         <Text style={styles.staticLabelText}>₹{maxPrice}</Text>
  //       </View> */}
  //       </View>
  //       <View style={{ flexDirection: 'row', marginTop: 20, gap: 15, width: '100%' }}>
  //         <View style={{ flex: 1 }}>
  //           <Text style={{
  //             fontWeight: '500',
  //             fontSize: 14,
  //             fontFamily: 'Inter',
  //             color: '#1F487C',
  //             lineHeight: 17,
  //             paddingBottom: 5,
  //           }}>Min. Price</Text>
  //           <View style={{
  //             flexDirection: 'row',
  //             justifyContent: 'flex-start',
  //             alignItems: 'center',
  //             borderRadius: 5,
  //             borderColor: '#1F487C',
  //             backgroundColor: '#FFFFFF',
  //             borderWidth: 0.5,
  //             padding: 8,
  //           }}>
  //             <TextInput
  //               style={{
  //                 fontWeight: '500',
  //                 fontSize: 12,
  //                 fontFamily: 'Inter',
  //                 color: '#1F487C',
  //                 lineHeight: 16,
  //               }}
  //               placeholder={"₹0 "}
  //               placeholderTextColor="#9B9B9B" />
  //           </View>
  //         </View>
  //         <View style={{ flex: 1 }}>
  //           <Text style={{
  //             fontWeight: '500',
  //             fontSize: 14,
  //             fontFamily: 'Inter',
  //             color: '#1F487C',
  //             lineHeight: 17,
  //             paddingBottom: 5,
  //           }}>Max. Price</Text>
  //           <View style={{
  //             flexDirection: 'row',
  //             justifyContent: 'flex-start',
  //             alignItems: 'center',
  //             borderRadius: 5,
  //             borderColor: '#1F487C',
  //             backgroundColor: '#FFFFFF',
  //             borderWidth: 0.5,
  //             padding: 8,
  //           }}>
  //             <TextInput
  //               style={{
  //                 fontWeight: '500',
  //                 fontSize: 12,
  //                 fontFamily: 'Inter',
  //                 color: '#1F487C',
  //                 lineHeight: 16,

  //               }}
  //               placeholder={"₹500 "}
  //               placeholderTextColor="#9B9B9B" />
  //           </View>
  //         </View>
  //       </View>
  //       {/* <View style={styles.priceInputs}>
  //       <View style={styles.inputContainer}>
  //         <Text style={styles.inputLabel}>Min. Price</Text>
  //         <TextInput style={styles.input} value={`₹${minPrice}`} editable={false} />
  //       </View>
  //       <View style={styles.inputContainer}>
  //         <Text style={styles.inputLabel}>Max. Price</Text>
  //         <TextInput style={styles.input} value={`₹${price}`} editable={false} />
  //       </View>
  //     </View> */}

  //     </View>
  //   );
  // };
  console.log(filteredBoardingPoints, 'filteredBoardingPoints');

  const BoardingPointsView = ({ filterKey }) => {
    return (
      <>
        <View style={[styles.container, { height: 30 }]}>
          <FlatList
            data={filteredBoardingPoints}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
            renderItem={({ item, index }) => (
              <BoardingPointRowView
                item={item}
                index={index}
                checkedBoarding={checkedBoarding}
                handleBoardingCheck={handleBoardingCheck}
              />
            )}
          />

          {/* Scrollbar */}
          {/* <View style={styles.scrollTrack}>
         <Animated.View
           style={[
             styles.scrollThumb,
             {
               transform: [
                 {
                   translateY: scrollY.interpolate({
                     inputRange: [0, 4000], // adjust for your scroll range
                     outputRange: [0, 330], // scrollbar travel height
                     extrapolate: 'clamp',
                   }),
                 },
               ],
             },
           ]}
         />
       </View> */}
        </View>
      </>
      // <View style={{alignItems: 'flex-start', flex: 1, marginHorizontal: 10}}>
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       justifyContent: 'flex-start',
      //       alignItems: 'center',
      //       backgroundColor: '#FFFFFF',
      //       width: '100%',
      //       height: 33,
      //       borderWidth: 0.5,
      //       borderColor: 'rgba(31, 72, 124, 0.5)',
      //       borderRadius: 18,
      //       paddingHorizontal: 15,
      //       marginBottom: 5,
      //     }}>
      //     <Image
      //       source={require('../assets/FilterSearchIcon.png')}
      //       style={{
      //         width: 11,
      //         height: 11,
      //         resizeMode: 'cover',
      //         marginRight: 10,
      //       }}
      //     />
      //     <TextInput
      //       style={{
      //         fontWeight: '300',
      //         fontSize: 10,
      //         fontFamily: 'Inter',
      //         color: '#1F487C',
      //         lineHeight: 14,
      //       }}
      //       autoFocus={false}
      //       placeholder={'Search ' + filterKey}
      //       placeholderTextColor="rgba(31, 72, 124, 0.8)"
      //     />
      //   </View>

      //   <View style={{flex: 1, overflow: 'scroll'}}>
      //     <SectionList
      //       sections={sections.map(section => ({
      //         ...section,
      //         data: section.expanded ? section.data : [], // Show items only if expanded
      //       }))}
      //       renderItem={({item, index}) => {
      //         // console.log('Mohan section number' + item.title)

      //         return <DroppingPointRowView item={item} index={index} />;
      //       }}
      //       renderSectionHeader={({section}) => {
      //         return <RenderViewSectionHeader section={section} />;
      //       }}
      //       keyExtractor={(item, index) => item + index}
      //       stickySectionHeadersEnabled={false}
      //       stickyHeaderHiddenOnScroll
      //     />
      //   </View>
      // </View>
    );
  };
  const DroppingPointsView = ({ filterKey }) => {
    return (
      <>
        <View style={[styles.container, { height: 30 }]}>
          <FlatList
            data={filtereDroppingPoints}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
            renderItem={({ item, index }) => (
              <DroppingPointRowView
                item={item}
                index={index}
                checkedDropping={checkedDropping}
                handleDroppingCheck={handleDroppingCheck}
              />
            )}
          />
        </View>
      </>
    );
  };

  function BoardingPointRowView({
    item,
    index,
    checkedBoarding,
    handleBoardingCheck,
  }) {
    const isChecked = checkedBoarding?.[item?.name];
    return (
      <View key={item.name} style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => handleBoardingCheck(item?.name)}>
          <Image
            source={
              isChecked
                ? require('../assets/selectTick.png')
                : require('../assets/UnCheckBlockIcon.png')
            }
            style={{ width: 17, height: 17, marginRight: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
            fontFamily: 'Inter',
            color: '#4A4A4A',
            lineHeight: 14,
          }}>
          {item?.name?.length > 26
            ? item?.name?.slice(0, 27) + '...'
            : item?.name}
        </Text>
      </View>
    );
  }
  function DroppingPointRowView({
    item,
    index,
    checkedDropping,
    handleDroppingCheck,
  }) {
    const isChecked = checkedDropping?.[item?.name];
    return (
      <View key={item.index} style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => handleDroppingCheck(item?.name)}>
          <Image
            source={
              isChecked
                ? require('../assets/selectTick.png')
                : require('../assets/UnCheckBlockIcon.png')
            }
            style={{ width: 17, height: 17, marginRight: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
            fontFamily: 'Inter',
            color: '#4A4A4A',
            lineHeight: 14,
          }}>
          {item?.name?.length > 26
            ? item?.name?.slice(0, 27) + '...'
            : item?.name}
        </Text>
      </View>
    );
  }

  const TravelerOperators = () => {
    return (
      <>
        {/* <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true} // ← this makes it appear
          indicatorStyle="black" // ← iOS only: "white" | "black" | "default"
        > */}
        <View style={[styles.container, { height: 30 }]}>
          <FlatList
            data={filteredOperatorName}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
            renderItem={({ item, index }) => (
              <Operator_Name_Row
                item={item}
                index={index}
                checkedOperators={checkedOperators}
                handleOperatorCheck={handleOperatorCheck}
              />
            )}
          />

          {/* Scrollbar */}
          {/* <View style={styles.scrollTrack}>
        <Animated.View
          style={[
            styles.scrollThumb,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 4000], // adjust for your scroll range
                    outputRange: [0, 330], // scrollbar travel height
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </View> */}
        </View>
        {/* </ScrollView> */}
      </>
    );
  };

  function Operator_Name_Row({
    item,
    index,
    checkedOperators,
    handleOperatorCheck,
  }) {
    const isChecked = checkedOperators?.[item.operator];

    return (
      <View key={item.operator} style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => handleOperatorCheck(item.operator)}>
          <Image
            source={
              isChecked
                ? require('../assets/selectTick.png')
                : require('../assets/UnCheckBlockIcon.png')
            }
            style={{ width: 17, height: 17, marginRight: 8 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
            fontFamily: 'Inter',
            color: '#4A4A4A',
            lineHeight: 14,
          }}>
          {item.operator?.length > 26
            ? item.operator.slice(0, 27) + '...'
            : item.operator}
        </Text>
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}>
        <TouchableOpacity
          style={{ flex: 1, width: '100%' }}
          onPress={onClose}></TouchableOpacity>
        <View
          style={{
            flex: 1,
            backgroundColor: '#E5FFF1',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            height:
              screenHeight -
              (isLuxuryUser === true
                ? statustopBarheight + 50
                : statustopBarheight + 150),
            position: 'absolute', //Here is the trick
            bottom: 0, //Here is the trick
          }}>
          <ImageBackground
            source={backgroundImage}
            style={{ flex: 1, resizeMode: 'cover' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View
                  style={{
                    alignItems: 'center',
                    height: 49,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#1F487C',
                      textAlign: 'center',
                      fontSize: 22,
                      fontFamily: 'Montserrat',
                      fontWeight: '600',
                    }}>
                    {isLuxuryUser === true
                      ? 'Popular Filters'
                      : 'Filter Insights'}
                  </Text>
                </View>

                <Separator />

                <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                  {/* Left Section */}
                  <View style={{ flex: 1 }}>
                    <FlatList
                      data={sortListAry}
                      renderItem={({ item, index }) => {
                        return (
                          <SortMainRowView
                            item={item}
                            index={index}
                            LastCount={sortListAry.length - 1}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => item + index}
                    />
                  </View>

                  {/* Right Section */}
                  <View style={{ flex: 1.5 }}>
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 17,
                          fontFamily: 'Inter',
                          color: '#1F487C',
                          lineHeight: 20,
                        }}>
                        {selectedFilterValue === 'Vehicle Type'
                          ? 'Air Condition'
                          : selectCurrentSortName}
                      </Text>
                    </View>

                    {/* Conditional Views */}
                    {selectedFilterValue === 'Boarding Time' && (
                      <FilterBoardingTimeView />
                    )}
                    {selectedFilterValue === 'Dropping time' && (
                      <FilterDropTimeView />
                    )}
                    {selectedFilterValue === 'Vehicle Type' && (
                      <VehicleTypeView />
                    )}
                    {selectedFilterValue === 'Price Range' && (
                      <View style={{ padding: 10, flex: 1 }}>
                        <View style={styles.labelContainer1}>
                          <Text style={styles.label1}>₹{minPrice1}</Text>
                          <Text style={styles.label1}>₹{maxPrice1}</Text>
                        </View>
                        <View style={styles.sliderContainer1}>
                          {/* Floating label */}
                          <View style={styles.startingPointCircle} />
                          <Animated.View
                            style={[
                              styles.floatingLabel1,
                              {
                                transform: [{ translateX: animatedValue1 }],
                              },
                            ]}>
                            <Text style={styles.floatingLabelText1}>
                              ₹{price1}
                            </Text>
                          </Animated.View>
                          <Slider1
                            style={styles.slider1}
                            minimumValue={minPrice1}
                            maximumValue={maxPrice1}
                            step={10}
                            value={price1}
                            onValueChange={handleValueChange}
                            minimumTrackTintColor="#1F487C"
                            maximumTrackTintColor="#C9C9C9"
                            thumbImage={thumbImage}
                          //thumbTintColor="#1F487C"
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 25,
                            gap: 15,
                            width: '100%',
                            paddingRight: 10,
                          }}>
                          <View style={{ flex: 1 }}>
                            <Text
                              style={{
                                fontWeight: '500',
                                fontSize: 14,
                                fontFamily: 'Inter',
                                color: '#1F487C',
                                lineHeight: 17,
                                paddingBottom: 5,
                              }}>
                              Min. Price
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                borderRadius: 5,
                                borderColor: '#1F487C',
                                backgroundColor: '#FFFFFF',
                                borderWidth: 0.5,
                                padding: 8,
                              }}>
                              <TextInput
                                style={{
                                  fontWeight: '500',
                                  fontSize: 12,
                                  fontFamily: 'Inter',
                                  color: '#1F487C',
                                  lineHeight: 16,
                                }}
                                placeholder={'₹0 '}
                                placeholderTextColor="#9B9B9B"
                              />
                            </View>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text
                              style={{
                                fontWeight: '500',
                                fontSize: 14,
                                fontFamily: 'Inter',
                                color: '#1F487C',
                                lineHeight: 17,
                                paddingBottom: 5,
                              }}>
                              Max. Price
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                borderRadius: 5,
                                borderColor: '#1F487C',
                                backgroundColor: '#FFFFFF',
                                borderWidth: 0.5,
                                padding: 8,
                              }}>
                              <TextInput
                                style={{
                                  fontWeight: '500',
                                  fontSize: 12,
                                  fontFamily: 'Inter',
                                  color: '#1F487C',
                                  lineHeight: 16,
                                }}
                                placeholder={'₹500 '}
                                placeholderTextColor="#9B9B9B"
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    {selectedFilterValue === 'Star Ratings' && (
                      <StartRatingView />
                    )}
                    {selectedFilterValue === 'Amenities' && (
                      <>
                        <View style={styles.searchContainer}>
                          <Image
                            source={require('../assets/FilterSearchIcon.png')}
                            style={{
                              width: 12,
                              height: 12,
                              resizeMode: 'cover',
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                          />
                          <TextInput
                            style={styles.searchInput}
                            placeholder="Search Amenities"
                            placeholderTextColor="#1F487C80"
                            value={searchQueries?.Amenities}
                            onChangeText={text =>
                              setSearchQueries({
                                Amenities: text,
                              })
                            }
                          />
                        </View>
                        <FilterAmenitiesView />
                      </>
                    )}
                    {selectedFilterValue === 'Dropping Points' && (
                      <>
                        <View style={styles.searchContainer}>
                          <Image
                            source={require('../assets/FilterSearchIcon.png')}
                            style={{
                              width: 12,
                              height: 12,
                              resizeMode: 'cover',
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                          />
                          <TextInput
                            style={styles.searchInput}
                            placeholder="Search Droping Point"
                            placeholderTextColor="#1F487C80"
                            value={searchQueries?.droppingPoints}
                            onChangeText={text =>
                              setSearchQueries({
                                droppingPoints: text,
                              })
                            }
                          />
                        </View>
                        <DroppingPointsView filterKey={selectedFilterValue} />
                      </>
                    )}
                    {selectedFilterValue === 'Boarding Points' && (
                      <>
                        <View style={styles.searchContainer}>
                          <Image
                            source={require('../assets/FilterSearchIcon.png')}
                            style={{
                              width: 12,
                              height: 12,
                              resizeMode: 'cover',
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                          />
                          <TextInput
                            style={styles.searchInput}
                            placeholder="Search Boarding Point"
                            placeholderTextColor="#1F487C80"
                            value={searchQueries?.boardingPoints}
                            onChangeText={text =>
                              setSearchQueries({
                                boardingPoints: text,
                              })
                            }
                          />
                        </View>
                        <BoardingPointsView filterKey={selectedFilterValue} />
                      </>
                    )}
                    {selectedFilterValue === 'Travel Operators' && (
                      <>
                        <View style={styles.searchContainer}>
                          <Image
                            source={require('../assets/FilterSearchIcon.png')}
                            style={{
                              width: 11,
                              height: 11,
                              resizeMode: 'cover',
                              marginLeft: 10,
                              marginRight: 10,
                            }}
                          />
                          <TextInput
                            style={styles.searchInput}
                            placeholder="Search Operators"
                            placeholderTextColor="#1F487C80"
                            value={searchQueries?.Operators}
                            onChangeText={text =>
                              setSearchQueries({
                                Operators: text,
                              })
                            }
                          />
                        </View>
                        <TravelerOperators />
                      </>
                    )}
                  </View>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'flex-end',
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                }}>
                <View
                  style={{
                    height: 160,
                    borderRadius: 10,
                    borderWidth: 1,
                    marginTop: 5,
                    borderColor: 'rgba(31, 72, 124, 0.5)',
                    marginHorizontal: 10,
                  }}>
                  <Advertisement pageId={3} />
                </View>
                {isLuxuryUser === true && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 5,
                    }}>
                    {/* <Image
                      source={require('../assets/Banner.gif')}
                      style={{
                        height: 150,
                        resizeMode: 'cover',
                        borderRadius: 10,
                        flex: 1,
                      }}
                      resizeMode="cover"
                    /> */}
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 40,
                    gap: 10,
                    marginVertical: 5,
                    marginBottom: 15,
                  }}>
                  <TouchableOpacity onPress={clearAllFilters} style={styles.clearBtn}>
                    <Text style={styles.clearTxt}>CLEAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onClose} style={styles.applyBtn}>
                    <Text style={styles.apply}>APPLY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  checkbox: {
    marginRight: 10,
  },
  separator: {
    marginVertical: 1,
    borderBottomColor: '#1F487C',
    borderBottomWidth: 1,
  },
  applyBtn: {
    backgroundColor: '#1F487C',
    flex: 1.3,
    borderRadius: 24,
    borderWidth: 0,
    borderColor: 'rgba(31, 72, 124, 0.5)',
  },
  clearBtn: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderRadius: 24,
    borderWidth: 0,
    borderColor: 'rgba(31, 72, 124, 0.5)',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
  },
  clearTxt: {
    color: '#1F487C',
    fontSize: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
  },
  apply: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
  },
  startingPointCircle: {
    position: 'absolute',
    width: 16, // Adjust size as needed
    height: 16,
    borderWidth: 3,
    borderColor: '#1F487C',
    backgroundColor: '#FFFFFF', // The color for the circle
    borderRadius: 10, // Half of width and height to make it circular
    top: '50%',
    left: 0, // Adjust to align with the start of the slider
    transform: [{ translateY: -8 }], // Center vertically
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  filledTrack: {
    position: 'absolute',
    height: 5,
    backgroundColor: '#1F487C',
    borderRadius: 2.5,
    top: '50%',
    transform: [{ translateY: -2.5 }],
    zIndex: -1,
  },
  floatingLabel: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F487C',
    borderRadius: 14,
    padding: 5,
  },
  floatingLabelText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 5,
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputContainer: {
    width: '45%',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  staticLabel: {
    position: 'absolute',
    bottom: 40,
    left: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    backgroundColor: '#1fb28a',
    borderRadius: 5,
    padding: 5,
  },
  staticLabelText: {
    color: '#fff',
    fontSize: 16,
  },
  staticLabelMax: {
    position: 'absolute',
    bottom: 40,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1fb28a',
    borderRadius: 5,
    padding: 5,
  },
  sliderContainer1: {
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 10,
  },
  slider1: {
    width: '100%',
    height: 40,
  },
  labelContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
  },
  label1: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444444',
    fontFamily: 'Inter',
    lineHeight: 18,
  },
  floatingLabel1: {
    position: 'absolute',
    top: -18,
    backgroundColor: '#1F487C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    height: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingLabelText1: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#1F487C',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
    backgroundColor: '#FFFFFF',
  },
  flatList: {
    width: '100%',
    flexGrow: 0,
    height: 720,
  },
  scrollView: {
    flexDirection: 'column',
    height: 300,
  },
  input1: {
    height: 48,
    borderWidth: 1,
    borderColor: '#1F487C',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1F487C',
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: -7,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#1F487C',
    borderRadius: 18,
    height: 33,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: '#1F487C80',
  },
  container: {
    flex: 1,
  },
  scrollTrack: {
    position: 'absolute',
    right: 4,
    top: 10,
    bottom: 1,
    width: 6,
    height: 330,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  scrollThumb: {
    width: 6,
    height: 30,
    backgroundColor: '#1F487C',
    borderRadius: 3,
  },
});
export default FilterInsightsScreen;
