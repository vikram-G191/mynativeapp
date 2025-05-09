import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Text,
  ImageBackground,
  Platform,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import BusList1 from './assets/BusList1'; // Import your BusList1 component
import MapsIcone from './assets/MapsIcone';
import Svg from 'react-native-svg';
import CalenderIcon from './assets/CalenderIcon';
import SearchIcone from './assets/SearchIcone';
import LineDotIcone from './assets/LineDotIcone';
import VehicleIcone from './assets/VehicleIcone';
import PlaceIcon from './assets/PlaceIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FlipaddressIcon from './assets/FlipaddressIcon';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import { BackHandler, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { CHECKING_DATA } from './Redux/Store/Type';
import { useDispatch, useSelector } from 'react-redux';
import { GetAds } from './API/TBSapi/Advertisement/Advertisement';
import Advertisement from './component/Advertisement/Advertisement';
import { GetCurrentTheme, GetTopBusRoutes } from './API/TBSapi/Home/Home';
import { Button } from '@rneui/base';
import bg from "./assets/Theme/Sky/General_Sky.png";
import build from "./assets/Theme/Buildings/General_Building_1.png";
import road from "./assets/Theme/Roads/General_road_1.png";
import LinearGradient from 'react-native-linear-gradient';

import { REACT_APP_API_URL } from '@env'


const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const { width, height } = Dimensions.get('window');

const data = [
  { from_Id: '3', from_station_name: 'Hyderabad', from_state: 'Telengana', to_Id: '5', to_station_name: 'Vijayawada', distance: '332 Km' },
  { from_Id: '4', from_station_name: 'Mumbai', from_state: 'Maharashtra', to_Id: '51', to_station_name: 'Pune', distance: '152 Km' },
  { from_Id: '6', from_station_name: 'Chennai', from_state: 'TamilNadu', to_Id: '795', to_station_name: 'Tiruchirapalli', distance: '574 Km' },
];

const DATA = [
  { id: '1', image: require('./assets/SliderImg.png') },
  { id: '2', image: require('./assets/SliderImg.png') },
  { id: '3', image: require('./assets/SliderImg.png') },
  { id: '4', image: require('./assets/SliderImg.png') },
  { id: '5', image: require('./assets/SliderImg.png') },
];

const SearchBus = ({ navigation, isScrollingDown, setIsScrollingDown, setLastContentOffset, isReduced, setIsReduced }) => {


  const apiImgUrl = `https://crm.thebusstand.com`
  // const apiImgUrl = `http://192.168.90.47:4000`


  const [location, setLocation] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isUserPlans, setUserPlans] = useState(true);
  const route = useRoute();
  const From_Station = route.params?.From_Station;
  const To_Station = route.params?.To_Station;
  const From_State = route.params?.From_State;
  const From_ID = route.params?.Source_Station_Id;
  const To_ID = route.params?.Source_Station_Id;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = selectedDate.toISOString().split('T')[0];

  // console.log(selectedDate, 'selectedDate_date')
  const dispatch = useDispatch()

  useEffect(() => {
    GetTopBusRoutes(dispatch)
  }, [])

  const apiImageUrl = 'https://thebusstand.com'
  const top_bus_route = useSelector(state => state?.productReducer?.top_route_list.slice(0, 3))

  useEffect(() => {
    GetCurrentTheme(dispatch);
  }, []);

  const [lazyloading, setLazyLoading] = useState(false);

  const apiCrmImage = 'https://crm.thebusstand.com';

  // const apiCrmImage = `http://192.168.90.47:4000`

  const currentTheme = useSelector(state => state?.productReducer?.current_theme)

  // console.log(`${apiCrmImage}${currentTheme}`, 'currentTheme')


  // useEffect(() => {

  //   const images = [
  //     currentTheme.background ? `${apiImgUrl}${String(currentTheme.background)}` : bg,
  //     currentTheme.building ? `${apiImgUrl}${String(currentTheme.building)}` : build,
  //     currentTheme.road ? `${apiImgUrl}${String(currentTheme.road)}` : road,
  //   ];

  //   let loadedCount = 0;

  //   const preloadImages = images.map((src) => {
  //     return Image.prefetch(src) // Use Image.prefetch in React Native
  //       .then(() => {
  //         loadedCount++;
  //         if (loadedCount === images.length) {
  //           setLazyLoading(true); // All images are loaded
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(`Error loading image: ${src}`, err);
  //       });
  //   });

  //   // Wait for all image preloads to finish
  //   Promise.all(preloadImages)
  //     .then(() => {
  //       // Do something when all images are loaded (optional)
  //     })
  //     .catch((error) => {
  //       console.error('Error in preloading images:', error);
  //     });

  // }, [currentTheme]);


  const [stationPoints, setstationPoints] = useState({
    from_station_name: '',
    from_Id: '',
    from_state: '',
    to_station_name: '',
    to_Id: '',
  });

  const handleFlip = () => {
    setstationPoints(prevState => ({
      from_station_name: prevState.to_station_name,
      from_Id: prevState.to_Id,
      to_station_name: prevState.from_station_name,
      to_Id: prevState.from_Id,
    }));
  }

  // console.log(
  //   stationPoints,
  //   stationPoints,
  //   formattedDate,
  //   'selectedDate&stationspoints',
  // );

  // const dispatch = useDispatch();

  // Get state from Redux store
  const adsList = useSelector(state => state?.productReducer?.ads_list);
  useEffect(() => {
    // Dispatch an action to update state
    // const ads = GetAds(dispatch);
    dispatch({
      type: CHECKING_DATA,
      payload: { id: 1, name: 'Pranesh', number: '8056451650' },
    });
  }, []);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect(() => {
  //   if (adsList?.length > 0) {
  //     const interval = setInterval(() => {
  //       setCurrentIndex(prevIndex => (prevIndex + 1) % adsList.length);
  //     }, 5000); // Change image every 5 seconds

  //     return () => clearInterval(interval); // Cleanup on unmount
  //   }
  // }, []);


  // const currentIndex = useRef(0); // Keeps track of index without triggering re-renders
  // const [, forceUpdate] = useState(0); // Dummy state to trigger re-render

  // useEffect(() => {
  //   if (adsList?.length > 0) {
  //     const interval = setInterval(() => {
  //       currentIndex.current = (currentIndex.current + 1) % adsList.length;
  //       forceUpdate(prev => prev + 1); // Triggers re-render without affecting other state
  //     }, 5000);

  //     return () => clearInterval(interval); // Cleanup on unmount
  //   }
  // }, [adsList]);


  // console.log("DisplayingTBSdetails");




  // console.log(adsList[currentIndex].ad_video, 'adslistttttt');

  // const website = "https://thebusstand.com"
  const checkingData = useSelector(state => state.productReducer.checking_data);
  // console.log(website + adsList[0].ad_video, "checkingData");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Always show exit confirmation
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // prevent default behavior (going back)
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    if (To_Station?.length > 0) {
      setstationPoints(prev => ({
        ...prev, // Spread the previous state
        to_station_name: To_Station,
        to_Id: To_ID,
      }));
    } else if (From_Station?.length > 0) {
      setstationPoints(prev => ({
        ...prev, // Spread the previous state
        from_station_name: From_Station,
        from_Id: From_ID,
        from_state: From_State
      }));
    }
  }, [To_Station, From_Station, From_ID, To_ID]);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [datee, setDatee] = useState('');

  const insets = useSafeAreaInsets();
  const statustopBarheight = insets.top === 0 ? statusBarHeight : insets.top;


  useFocusEffect
  React.useCallback(() => {
    const onBackPress = () => {
      // Check if it's the first screen in the stack
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => backHandler.remove();
  }, [navigation])


  const formatDateTime = date => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short', // "Mon"
      day: 'numeric', // "9"
      month: 'long', // "July"
    });
  };

  // const renderItem = ({ item }) => (
  //   <View style={{ flex: 1 }}>
  //     <View style={styles.squareBorder3}>
  //       <View style={{ justifyContent: 'center' }}>
  //         <Image
  //           source={require('./assets/location.png')}
  //           style={{ left: 5, width: 60.66, height: 60.66 }}
  //         />
  //       </View>

  //       <View style={{ flex: 1, marginLeft: 7, justifyContent: 'center' }}>
  //         <View
  //           style={{
  //             justifyContent: 'flex-start',
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //           }}>
  //           <Svg style={styles.icon}>
  //             <PlaceIcon width="100%" height="100%" />
  //           </Svg>
  //           <Text style={{ color: '#1F487C', fontSize: 15, fontWeight: '500' }}>
  //             {item.from_city}
  //           </Text>
  //         </View>
  //         <View style={{ flex: 1, marginLeft: 10, backgroundColor: 'white' }}>
  //           <Svg style={{ flex: 1 }}>
  //             <LineDotIcone width="100%" height="100%" />
  //           </Svg>
  //           <View
  //             style={{
  //               position: 'absolute',
  //               left: 45,
  //               right: 0,
  //               alignItems: 'center',
  //             }}>
  //             <Svg style={styles.icon2}>
  //               <VehicleIcone width="100%" height="100%" />
  //             </Svg>
  //             <Text style={styles.distanceText}>{item.distance}</Text>
  //           </View>
  //         </View>
  //         <View
  //           style={{
  //             justifyContent: 'flex-start',
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //           }}>
  //           <Svg style={styles.icon}>
  //             <PlaceIcon width="100%" height="100%" />
  //           </Svg>
  //           <Text style={{ color: '#1F487C', fontSize: 15, fontWeight: '500' }}>
  //             {item.to_city}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.bookButton}>
  //         <TouchableOpacity onPress={() => gotoToBookScreen1(item)}>
  //           <Text style={styles.bookText}>Book</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // );

  const ITEM_WIDTH = 50 + 10; // width + horizontal margin (5 + 5)
  const flatListRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectingScrollDate, setSelectingScrollDate] = useState("");  // New state for date

  // console.log(selectingScrollDate.formattedDate, "selectingScrollDate")

  // Function to format the date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  const days = Array.from({ length: 127 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // e.g., "Thu"
    const dayNum = date.getDate(); // e.g., 11
    const formattedDate = formatDate(date);  // Use the formatted date here

    return {
      id: i.toString(),
      dayName,
      dayNum,
      formattedDate, // New field to store formatted date
    };
  });

  // const handleScroll = (event) => {
  //   const offsetX = event.nativeEvent.contentOffset.x;
  //   const index = Math.round(offsetX / ITEM_WIDTH); // Detect the closest index

  //   if (index !== selectedIndex) {
  //     setSelectedIndex(index); // Update the selected index
  //     setSelectedDay(days[index].dayName); // Update selected day
  //     setSelectingScrollDate(days[index]); // Update selected date with formatted version
  //     setSelectedDate(new Date(days[index].formattedDate)); // Update selectedDate with correct format
  //   }
  // };


  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH); // Detect the closest index

    // Don't update the selected date here anymore
    // Just update the selectedIndex for scrolling position only
    if (index !== selectedIndex) {
      setSelectedIndex(index); // Update the visual position
    }
  };


  // const renderDateItem = ({ item, index }) => {
  //   const isSelected = index === selectedIndex;
  //   const isSelectingScrollDate = item.formattedDate === selectingScrollDate.formattedDate;

  //   return (
  //     <View
  //       style={[
  //         styles.dayContainer,
  //         isSelected && styles.selectedDayContainer,
  //         isSelectingScrollDate && styles.selectingScrollDateContainer, // New style
  //       ]}
  //     >
  //       <Text
  //         style={[
  //           styles.dayName,
  //           isSelected && styles.selectedText,
  //           isSelectingScrollDate && styles.selectingScrollDateText, // New text style
  //         ]}
  //       >
  //         {item.dayName}
  //       </Text>
  //       <Text
  //         style={[
  //           styles.dayNum,
  //           isSelected && styles.selectedText,
  //           isSelectingScrollDate && styles.selectingScrollDateText, // New text style
  //         ]}
  //       >
  //         {item.dayNum}
  //       </Text>
  //     </View>
  //   );
  // };


  const renderDateItem = ({ item, index }) => {
    const isSelected = index === selectedIndex;
    const isSelectingScrollDate = item.formattedDate === selectingScrollDate.formattedDate;

    const handleDatePress = () => {
      setSelectedIndex(index); // Update the selected index
      setSelectedDay(item.dayName); // Update selected day name
      setSelectingScrollDate(item); // Update selected date with formatted version
      setSelectedDate(new Date(item.formattedDate)); // Update selected date with correct format

      // Scroll to the selected date item
      flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    return (
      <TouchableOpacity onPress={handleDatePress} style={[styles.dayContainer, isSelected && styles.selectedDayContainer, isSelectingScrollDate && styles.selectingScrollDateContainer]}>
        <Text style={[styles.dayName, isSelected && styles.selectedText, isSelectingScrollDate && styles.selectingScrollDateText]}>
          {item.dayName}
        </Text>
        <Text style={[styles.dayNum, isSelected && styles.selectedText, isSelectingScrollDate && styles.selectingScrollDateText]}>
          {item.dayNum}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const todayDate = new Date();
    const formattedToday = formatDate(todayDate);

    const todayIndex = days.findIndex((day) => day.formattedDate === formattedToday);

    if (todayIndex !== -1) {
      setSelectedIndex(todayIndex);
      setSelectedDay(days[todayIndex].dayName);
      setSelectingScrollDate(days[todayIndex]);
      setSelectedDate(new Date(days[todayIndex].formattedDate));
    } else {
      setSelectedIndex(0);
      setSelectedDay(days[0].dayName);
      setSelectingScrollDate(days[0]);
      setSelectedDate(new Date(days[0].formattedDate));
    }

    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: todayIndex !== -1 ? todayIndex : 0, animated: true });
    }, 100);
  }, []);

  const handleDateSelect = (date) => {
    // Find the index of the selected date in the days array
    const selectedIndex = days.findIndex(day => day.formattedDate === formatDate(date));

    if (selectedIndex !== -1) {
      setSelectedIndex(selectedIndex); // Update the selected index
      setSelectedDay(days[selectedIndex].dayName); // Update the selected day name
      setSelectingScrollDate(days[selectedIndex]); // Update selected date with formatted version
      setSelectedDate(new Date(days[selectedIndex].formattedDate)); // Update selected date

      // Scroll to the selected date item
      flatListRef.current?.scrollToIndex({ index: selectedIndex, animated: true });
    }
  };

  // // This effect handles the index and scroll position based on syncDate
  // useEffect(() => {
  //   const selectedIndex = days.findIndex((day) => day.formattedDate === formatDate(syncDate));

  //   if (selectedIndex !== -1 && selectedIndex !== selectedIndex) {
  //     setSelectedIndex(selectedIndex);
  //     flatListRef.current?.scrollToIndex({ index: selectedIndex, animated: true });
  //   }
  // }, []);

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1 }}>
      <View style={styles.squareBorder3}>
        <View style={{ justifyContent: 'center' }}>
          <Image
            // source={require('./assets/location.png')}
            source={{ uri: `${apiImageUrl}${item?.image}` }}
            style={{ left: 5, width: 60.66, height: 60.66, borderRadius: 7 }}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 7, justifyContent: 'center' }}>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Svg style={styles.icon}>
              <PlaceIcon width="100%" height="100%" />
            </Svg>
            <Text style={{ color: '#1F487C', fontSize: 15, fontWeight: '500' }}>
              {item?.from?.charAt(0).toUpperCase() + item?.from?.slice(1).toLowerCase()}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: 10, backgroundColor: 'white' }}>
            <Svg style={{ flex: 1 }}>
              <LineDotIcone width="100%" height="100%" />
            </Svg>
            <View
              style={{
                position: 'absolute',
                left: 45,
                right: 0,
                alignItems: 'center',
              }}>
              <Svg style={styles.icon2}>
                <VehicleIcone width="100%" height="100%" />
              </Svg>
              <Text style={styles.distanceText}>{`${item.bus_count} Bus`}</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Svg style={styles.icon}>
              <PlaceIcon width="100%" height="100%" />
            </Svg>
            <Text style={{ color: '#1F487C', fontSize: 15, fontWeight: '500' }}>
              {item?.to?.charAt(0).toUpperCase() + item?.to?.slice(1).toLowerCase()}
            </Text>
          </View>
        </View>
        <View style={styles.bookButton}>
          <TouchableOpacity onPress={() => gotoToBookScreen1(item)}>
            <Text style={styles.bookText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const Item = ({ image }) => (
    <View style={styles.item}>
      <Image source={image} style={styles.imageimg} />
    </View>
  );

  // const gotoHomescreen1 = () => {
  //   // Check if all station values are present
  //   if (
  //     stationPoints.from_station_name &&
  //     stationPoints.from_Id &&
  //     stationPoints.to_station_name &&
  //     stationPoints.to_Id
  //   ) {
  //     // If all fields are present, navigate to the BusTypeDetails screen
  //     navigation.navigate('BusTypeDetails', {
  //       state: { Source_Ids: stationPoints, Journey_Date: formattedDate },
  //     });
  //     // navigation.navigate('TravelerScreenDetailsSuccess', { Journey_Details: stationPoints })
  //   } else {
  //     // If any field is missing, you can show an alert or error message
  //     alert('Please fill in all station details before proceeding.');
  //   }
  // };

  const gotoHomescreen1 = () => {
    // Check if all station values are present
    if (
      stationPoints.from_station_name &&
      stationPoints.from_Id &&
      stationPoints.to_station_name &&
      stationPoints.to_Id
    ) {
      // Check if from_station_name and to_station_name are the same
      if (stationPoints.from_station_name === stationPoints.to_station_name) {
        alert('Selected Points are same');
        return; // Stop further execution if the points are the same
      }

      // // If all fields are present and points are not the same, navigate to the BusTypeDetails screen
      // navigation.navigate('BusTypeDetails', {
      //   state: { Source_Ids: stationPoints, Journey_Date: formattedDate },
      // });

      // If all fields are present and points are not the same, navigate to the BusTypeDetails screen
      navigation.navigate('SearchAI', {
        state: { Source_Ids: stationPoints, Journey_Date: formattedDate },
      });

    } else {
      // If any field is missing, show an alert or error message
      alert('Please fill in all station details before proceeding.');
    }
  };

  const gotoFromScreen1 = () => {
    navigation.navigate('FromeScreen');
  };

  const gotoToScreen1 = () => {
    navigation.navigate('ToScreen');
  };

  const gotoToBookScreen1 = (item) => {
    // console.log(item, 'Popular_Searched')
    navigation.navigate('SearchAI', {
      screenTheme: 'Recent Search',
      themecolor: '#1F487C',
      themeColor2: '#1F487C',
      state: { Source_Ids: item, Journey_Date: formattedDate },
    });
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

    const lastContentOffset = useRef(0); // Using useRef to keep track of previous offset
  
  // const handleHomeScroll = (event) => {
  //   const currentOffset = event.nativeEvent.contentOffset.y;

  //   // Detect if scrolling down or up by comparing the current offset with last offset
  //   if (currentOffset > lastContentOffset.current) {
  //     setIsScrollingDown(true); // Scrolling down
  //   } else if (currentOffset < lastContentOffset.current) {
  //     setIsScrollingDown(false); // Scrolling up
  //   }

  //   // Update the last scroll position
  //   lastContentOffset.current = currentOffset;
  // };


  return (
    <SafeAreaView style={styles.safeAreaView} edges={['right', 'left']}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="#1F487C"
      />
      {/* <ScrollView
        onScroll={handleHomeScroll}
        scrollEventThrottle={16}  // Throttle the scroll events to fire less frequently
      // style={{ zIndex: isScrollingUp === true ? 1 : -1 }}
      > */}
      {/* <Button title="Toggle Height" onPress={handlePress} /> */}
      <View style={[styles.container]}>
        <ImageBackground
          // source={require('/home_bg.png')}
          source={require('./assets/home_bg.png')}
          style={styles.background}>
          <ScrollView
            // onScroll={handleHomeScroll}
            style={styles.scrollView}>
            <View style={styles.overlay}>
              <View style={styles.squareBorder}>
                <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '85%',
                        gap: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#1F487C',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity onPress={gotoFromScreen1}>
                        <Svg style={[styles.icon]}>
                          <MapsIcone width="100%" height="100%" />
                        </Svg>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ width: '85%' }} onPress={gotoFromScreen1}>
                        <View style={{ flexDirection: 'column', marginBottom: 5 }}>
                          <Text style={{ color: '#1F487C', fontSize: 12 }}>
                            From
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '600',
                              color: '#1F487C',
                            }}>
                            {stationPoints?.from_station_name
                              ? stationPoints?.from_station_name
                              : 'Source'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={{ position: 'absolute', top: height * -0.0475, right: width * 0.31, color: '#1F487C', fontWeight: 700, backgroundColor: '#E5FFF1', fontSize: width * 0.055 }}>


                        {` Journey Place `}
                      </Text>
                      {/* marginTop: 10,
                      color: '#1F487C',
                      fontSize: 20,
                      lineHeight: 24,
                      fontWeight: '700', */}
                    </View>
                    <View>
                      <TouchableOpacity style={{ position: 'absolute', top: -13, right: -22.5, backgroundColor: '#E5FFF1', }} onPress={() => setIsReduced(!isReduced)}>
                        {isReduced === false ?
                          <Image
                            source={require('./assets/navigateUp.png')}
                            style={{ position: 'absolute', top: -21.5, right: -20, width: 30, height: 30 }} />
                          :
                          <Image
                            source={require('./assets/navigateDown.png')}
                            style={{ position: 'absolute', top: -21.5, right: -20, width: 30, height: 30 }} />
                        }
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Image
                        source={require('./assets/Suitcase.png')}
                        style={{
                          width: 18,
                          height: 36,
                          position: 'absolute',
                          top: 7,
                          left: -44.5,
                        }} />
                      <Image
                        source={require('./assets/Bag.png')}
                        style={{
                          width: 13.5,
                          height: 25,
                          position: 'absolute',
                          top: 20,
                          left: -35,
                        }} />
                      <Image
                        source={require('./assets/Men.png')}
                        style={{
                          width: 35,
                          height: 70,
                          position: 'absolute',
                          top: -2,
                          left: -25,
                          zIndex: 2
                        }} />
                    </View>
                    <View style={{ alignSelf: 'flex-end', right: -15, top: 45 }}>
                      <TouchableOpacity onPress={handleFlip} >
                        <Image
                          source={require('./assets/Flip.png')}
                          style={{ width: 32, height: 32 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#1F487C',
                        width: '85%',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity onPress={gotoToScreen1}>
                        <Svg style={styles.icon}>
                          <MapsIcone width="100%" height="100%" />
                        </Svg>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={gotoToScreen1} style={{ width: '85%' }}>
                        <View style={{ flexDirection: 'column', marginBottom: 5 }}>
                          <Text style={{ color: '#1F487C', fontSize: 12 }}>To</Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '600',
                              color: '#1F487C',
                            }}>
                            {stationPoints?.to_station_name
                              ? stationPoints?.to_station_name
                              : 'Destination'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* <TextInput
                      style={styles.input}
                      placeholderTextColor="#ACACAC"
                    /> */}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, margin: 15, marginVertical: 15 }}>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setOpen(true)}>
                      <Svg style={styles.icon}>
                        <CalenderIcon width="100%" height="100%" />
                      </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpen(true)}>
                      <View style={{ flexDirection: 'column', gap: 3 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#1F487C',
                          }}>
                          Date of Journey
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#1F487C',
                          }}>
                          {selectedDate ? formatDateTime(selectedDate) : ''}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <DatePicker
                      confirmText={'Confirm'}
                      cancelText={'Cancel'}
                      title={'Select Date of journey'}
                      modal
                      mode="date"
                      open={open}
                      date={selectedDate} // Ensure this is a Date object
                      onConfirm={(date) => {
                        // // console.log('date', date);
                        // setOpen(false);
                        // // setDate(date);
                        // setDatee(date);
                        // // setSelectedDate(date); // This is correct since `date` is already a Date object

                        // // Find the corresponding index in the days array
                        // const selectedIndex = days.findIndex(day => day.formattedDate === formatDate(date));

                        // if (selectedIndex !== -1) {
                        //   setSelectedIndex(selectedIndex);
                        //   flatListRef.current?.scrollToIndex({ index: selectedIndex, animated: true });
                        // }
                        setOpen(false);
                        handleDateSelect(date);
                      }}

                      onCancel={() => {
                        setOpen(false);
                      }}
                    />

                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      gap: 3,
                      alignSelf: 'flex-end',
                      alignContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={styles.dateButton}
                      onPress={() => {
                        const todayDate = new Date(); // Get today's date
                        handleDateSelect(todayDate); // Use the same function to handle the logic
                      }}
                    >
                      <Text style={styles.dateButtonText}>Today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dateButton1}
                      onPress={() => {
                        const tomorrowDate = new Date();
                        tomorrowDate.setDate(tomorrowDate.getDate() + 1); // Set the date to tomorrow
                        handleDateSelect(tomorrowDate); // Use the same function to handle the logic
                      }}
                    >
                      <Text style={styles.dateButtonText}>Tomorrow</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.selectedDateText}>{formatDateTime(selectedDate)}</Text> */}
                  </View>
                </View>
                <View style={{ margin: 3, marginBottom: 10 }}>
                  <FlatList
                    ref={flatListRef}
                    data={days}
                    renderItem={renderDateItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    onScroll={handleScroll}
                    snapToInterval={ITEM_WIDTH} // Ensures it scrolls in increments of ITEM_WIDTH
                    decelerationRate="fast"
                    getItemLayout={(_, index) => ({
                      length: ITEM_WIDTH,
                      offset: ITEM_WIDTH * index,
                      index,
                    })}
                    initialScrollIndex={0} // Starts at the first item
                    scrollEventThrottle={16} // Smooth scroll handling
                  />
                </View>
              </View>

              {/* <View style={styles.squareBorder1}>
              <Image
                source={require('./assets/Womenicon.png')}
                style={styles.image}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.womenBookingText}>Booking for WOMEN</Text>
                <TouchableOpacity onPress={handleToggle}>
                  <Image
                    source={
                      isToggled
                        ? require('./assets/Togal_Button_yes.png')
                        : require('./assets/Toggle_icon.png')
                    }
                    style={styles.image1}
                  />
                </TouchableOpacity>
              </View>
            </View> */}
              <TouchableOpacity onPress={gotoHomescreen1}>
                <View style={styles.squareBorder2}>
                  <Svg style={styles.iconsearch}>
                    <SearchIcone width="100%" height="100%" />
                  </Svg>
                  <Text style={styles.searchText}>Search Buses</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15 }}>
              <View>
                <ImageBackground
                  style={{
                    height: 20,
                    width: '100%',
                  }}
                  source={`http://crm.thebusstand/${adsList[0]?.ad_video}`}></ImageBackground>
                {isUserPlans && (
                  <View
                    style={{
                      height: 208,
                      width: '100%',
                      borderRadius: 11,
                      borderWidth: 1,
                      borderColor: 'rgba(31, 72, 124, 0.5)',
                    }}>
                    {Platform.OS === 'ios' ? (
                      // <Image
                      //     // source={require('./assets/homeAds.gif')}
                      //     // source={apiCrmImage adsList[0].ad_video}
                      //     source={{uri: `${apiCrmImage}${adsList[currentIndex]?.ad_video}`}}
                      //     style={{
                      //       height: 80,
                      //       width: '100%',
                      //       borderRadius: 10,
                      //     }}
                      //     resizeMode="cover"
                      //   />
                      // <FastImage
                      //     // source={require('./assets/homeAds.gif')}
                      //     source={{uri: `${apiCrmImage}${adsList[currentIndex.current]?.ad_video}`}}
                      //     // source={{ uri: `https://thebusstand.com${[0].ad_video}` }}
                      //     style={{
                      //       height: 208,
                      //       width: '100%',
                      //       borderRadius: 10,

                      //     }}
                      //     resizeMode="contain"
                      //     // resizeMode={FastImage.resizeMode.cover}
                      //   />
                      <Advertisement pageId={1} />
                    ) : (
                      // <FastImage
                      //   // source={require('./assets/homeAds.gif')}
                      //   source={`https://crm.thebusstand.com${adsList[4]?.ad_video}`}
                      //   // source={{ uri: `https://thebusstand.com${[0].ad_video}` }}
                      //   style={{
                      //     height: 208,
                      //     width: '100%',
                      //     borderRadius: 10,
                      //   }}
                      //   resizeMode={FastImage.resizeMode.cover}
                      // />
                      <Advertisement pageId={1} />
                    )}
                  </View>
                )}

                <Text style={[styles.recentlySearchedText, { marginLeft: 10 }]}>
                  Top Traveled Routes
                </Text>
                <FlatList
                  data={top_bus_route}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                />
                {/* <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}  // Use index here for keyExtractor
                /> */}
                {isUserPlans === false && (
                  <View>
                    <Text style={styles.recentlySearchedText}>
                      Offers & Deals
                    </Text>
                    <FlatList
                      data={DATA}
                      renderItem={({ item }) => <Item image={item.image} />}
                      keyExtractor={item => item.id}
                      horizontal={true} // Set to horizontal
                      showsHorizontalScrollIndicator={false} // Optional: hide scroll indicator
                    />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({

  safeAreaView: {
    flex: 1,
    backgroundColor: '#E5FFF1',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5FFF1',
    // borderTopLeftRadius: 100,
    // zIndex: 1
    paddingTop: height * 0.04, // Some padding for content
    // paddingBottom: 30, // Extra space to enable scroll
  },
  image: {
    width: 34,
    height: 40,
    left: 10,
  },
  image1: {
    width: 90,
    height: 40,
    right: 10,
  },
  flagView: {
    flexDirection: 'row',
  },
  icon: {
    width: 22,
    height: 27,
    left: 1,
  },
  icon1: {
    height: 25,

    position: 'absolute',
  },
  icon2: {
    width: 140,
    height: 28,
    position: 'absolute',
  },
  iconsearch: {
    width: 16.93,
    height: 25,
    left: 1,
    alignSelf: 'center',
  },
  squareBorder: {
    marginTop: 25,
    borderWidth: 2,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#1F487C',
  },
  squareBorder1: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 62,
    borderWidth: 2,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: '#1F487C',
  },
  squareBorder2: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
    justifyContent: 'center',
    height: 42,
    borderWidth: 2,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: '#1F487C',
    borderColor: '#1F487C',
  },
  squareBorder3: {
    width: 'auto',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    height: 78.2,
    borderWidth: 2,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#1F487C',
  },
  infoContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginVertical: 5,
  },
  distanceText: {
    padding: 4,
    fontSize: 10,
    color: 'white',
  },
  bookButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 65,
    height: 30,
    backgroundColor: '#1F487C',
    borderRadius: 7.5,
    marginRight: 5,
  },
  bookText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 1,

    margin: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
    height: '100%',
    // zIndex: 1
  },
  backgroundWrapper: {
    flex: 1, // Ensures the wrapper takes up the full available space
    justifyContent: 'center', // Centering text vertically
    alignItems: 'center', // Centering text horizontally
  },
  background_theme: {
    flex: 1,
    resizeMode: 'contain',
    width: width,
    height: height,
    // justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
  scrollView: {
    flexDirection: 'column',
  },
  overlay: {
    flexDirection: 'column',
    margin: 20,
    marginVertical: 5,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x, y)
    textShadowRadius: 5, // Shadow blur radius
    // marginLeft: 17.5,
    marginTop: 60
  },
  womenBookingText: {
    alignSelf: 'center',
    left: 20,
    fontSize: 15,
    fontWeight: '600',
    color: '#062B5A',
  },
  searchText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  recentlySearchedText: {
    marginTop: 10,
    color: '#1F487C',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',

  },
  dateButton: {
    justifyContent: 'center',
    width: 68,
    height: 40,
    backgroundColor: '#67DCFF',
    borderRadius: 15,
  },
  dateButton1: {
    justifyContent: 'center',
    width: 78,
    height: 40,
    backgroundColor: '#67DCFF',
    borderRadius: 15,
  },
  dateButtonText: {
    alignSelf: 'center',
    color: '#062B5A',
    fontWeight: '600',
  },
  item: {
    margin: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  imageimg: {
    width: 237,
    height: 97,
    borderRadius: 10,
  },
  roadImage: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    width: '225%',
    height: '65%',
    resizeMode: 'cover',
    // zIndex: 1,
    // transform: [
    //   { scaleX: 20 }, // Scale width (similar to the '1000%' in CSS, though a massive scale might need tweaking)
    //   { scaleY: 20 }, // Scale height based on the 65% height
    // ],
  },
  dayContainer: {
    width: 50,
    height: 60,
    backgroundColor: 'transparent', // fully transparent
    borderColor: '#1F487C',         // dark blue border
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderWidth: 1,                 // you can adjust thickness if needed
    borderRadius: 8,                // rounded corners
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayName: {
    color: '#1F487C'
  },
  dayNum: {
    color: '#1F487C'
  },
  selectingScrollDateContainer: {
    backgroundColor: '#1F487C', // Background color for selected date
    borderRadius: 8,  // Optional: Add border radius for rounded corners
  },
  selectingScrollDateText: {
    color: 'white', // White text color for the selected date
  },
});

export default SearchBus;
