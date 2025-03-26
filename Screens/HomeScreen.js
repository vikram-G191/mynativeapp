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
import { useRoute } from '@react-navigation/native';
import { CHECKING_DATA } from './Redux/Store/Type';
import { useDispatch, useSelector } from 'react-redux';
import { GetAds } from './API/TBSapi/Advertisement/Advertisement';
import Advertisement from './component/Advertisement/Advertisement';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const data = [
  { from_Id: '6', from_station_name: 'CHENNAI', from_state: 'TamilNadu', to_Id: '4', to_station_name: 'MUMBAI', distance: '346 Kms' },
  { from_Id: '3', from_station_name: 'HYDERABAD', from_state: 'Telengana', to_Id: '5', to_station_name: 'VIJAYAWADA', distance: '346 Kms' },
  { from_Id: '3', from_station_name: 'HYDERABAD', from_state: 'Telengana', to_Id: '7', to_station_name: 'BANGALORE', distance: '346 Kms' },
];


const DATA = [
  { id: '1', image: require('./assets/SliderImg.png') },
  { id: '2', image: require('./assets/SliderImg.png') },
  { id: '3', image: require('./assets/SliderImg.png') },
  { id: '4', image: require('./assets/SliderImg.png') },
  { id: '5', image: require('./assets/SliderImg.png') },
];
const HomeScreen = ({ navigation }) => {
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

  const dispatch = useDispatch();

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


  console.log("hellodetails");




  // console.log(adsList[currentIndex].ad_video, 'adslistttttt');

  // const website = "https://thebusstand.com"
  const checkingData = useSelector(state => state.productReducer.checking_data);
  // console.log(website + adsList[0].ad_video, "checkingData");

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

  const apiCrmImage = 'https://crm.thebusstand.com';
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

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

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1 }}>
      <View style={styles.squareBorder3}>
        <View style={{ justifyContent: 'center' }}>
          <Image
            source={require('./assets/location.png')}
            style={{ left: 5, width: 60.66, height: 60.66 }}
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
              {item.from_station_name}
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
              <Text style={styles.distanceText}>{item.distance}</Text>
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
              {item.to_station_name}
            </Text>
          </View>
        </View>
        <View style={styles.bookButton}>
          <TouchableOpacity onPress={() => gotoToBookScreen1(item, index)}>
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

  const gotoHomescreen1 = () => {
    // Check if all station values are present
    if (
      stationPoints.from_station_name &&
      stationPoints.from_Id &&
      stationPoints.to_station_name &&
      stationPoints.to_Id
    ) {
      // If all fields are present, navigate to the BusTypeDetails screen
      navigation.navigate('BusTypeDetails', {
        state: { Source_Ids: stationPoints, Journey_Date: formattedDate },
      });
    } else {
      // If any field is missing, you can show an alert or error message
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

    console.log(item, 'Popular_Searched')
    navigation.navigate('BusTypeDetails', {
      screenTheme: 'Recent Search',
      themecolor: '#1F487C',
      themeColor2: '#1F487C',
      state: { Source_Ids: item, Journey_Date: formattedDate },
    });
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['right', 'left']}>
      <View style={[styles.container, { marginTop: statustopBarheight }]}>
        <ImageBackground
          // source={require('/home_bg.png')}
          source={require('./assets/home_bg.png')}
          style={styles.background}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Bus Tickets</Text>
            <View style={styles.squareBorder}>
              <View style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      gap: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#1F487C',
                    }}>
                    <TouchableOpacity onPress={gotoFromScreen1}>
                      <Svg style={styles.icon}>
                        <MapsIcone width="100%" height="100%" />
                      </Svg>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={gotoFromScreen1}>
                      <View style={{ flexDirection: 'column', marginBottom: 10 }}>
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

                  <View style={{ alignSelf: 'flex-end', right: 27, top: 15 }}>
                    <TouchableOpacity onPress={handleFlip}>
                      <Image
                        source={require('./assets/Flip.png')}
                        style={{ width: 32, height: 32 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ margin: 10 }}>
                <View style={{ flexDirection: 'column' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#1F487C',
                    }}>
                    <TouchableOpacity onPress={gotoToScreen1}>
                      <Svg style={styles.icon}>
                        <MapsIcone width="100%" height="100%" />
                      </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={gotoToScreen1}>
                      <View style={{ flexDirection: 'column', marginBottom: 10 }}>
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
              <View style={{ flexDirection: 'row', gap: 5, margin: 10 }}>
                <View style={{ flexDirection: 'row', gap: 5 }}>
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
                    date={date}
                    onConfirm={date => {
                      console.log('date', date);
                      setOpen(false);
                      setDate(date);
                      setDatee(date);
                      setSelectedDate(date); // <-- Add this line to update selectedDate
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
                    onPress={() => setSelectedDate(new Date())}>
                    <Text style={styles.dateButtonText}>Today</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dateButton1}
                    onPress={() =>
                      setSelectedDate(
                        new Date(new Date().setDate(new Date().getDate() + 1)),
                      )
                    }>
                    <Text style={styles.dateButtonText}>Tomorrow</Text>
                  </TouchableOpacity>
                  {/* <Text style={styles.selectedDateText}>{formatDateTime(selectedDate)}</Text> */}
                </View>
              </View>
            </View>
            <View style={styles.squareBorder1}>
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
            </View>
            <TouchableOpacity onPress={gotoHomescreen1}>
              <View style={styles.squareBorder2}>
                <Svg style={styles.iconsearch}>
                  <SearchIcone width="100%" height="100%" />
                </Svg>

                <Text style={styles.searchText}>Search Buses</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={styles.overlay}>
              <View>
                {/* <ImageBackground
                  style={{
                    height: 208,
                    width: '100%',
                  }}
                  source={`http://192.168.90.47:4000/${adsList[0].ad_video}`}></ImageBackground> */}
                {isUserPlans && (
                  <View
                    style={{
                      height: 208,
                      width: '100%',
                      borderRadius: 11,
                      borderWidth: 1,
                      borderColor: 'rgba(31, 72, 124, 0.5)',
                    }}>
                    {/* {Platform.OS === 'ios' ? ( */}
                    {/* <Image
                        // source={require('./assets/homeAds.gif')}
                        // source={apiCrmImage adsList[0].ad_video}
                        source={{uri: `${apiCrmImage}${adsList[currentIndex]?.ad_video}`}}
                        style={{
                          height: 80,
                          width: '100%',
                          borderRadius: 10,
                        }}
                        resizeMode="cover"
                      /> */}
                    {/* <FastImage
                        // source={require('./assets/homeAds.gif')}
                        source={{uri: `${apiCrmImage}${adsList[currentIndex.current]?.ad_video}`}}
                        // source={{ uri: `https://thebusstand.com${[0].ad_video}` }}
                        style={{
                          height: 208,
                          width: '100%',
                          borderRadius: 10,
                          
                        }}
                        resizeMode="contain"
                        // resizeMode={FastImage.resizeMode.cover}
                      /> */}
                    <Advertisement pageId={1} />
                    {/* ) : (
                      <FastImage
                        // source={require('./assets/homeAds.gif')}
                        source={`https://crm.thebusstand.com${adsList[4].ad_video}`}
                        // source={{ uri: `https://thebusstand.com${[0].ad_video}` }}
                        style={{
                          height: 208,
                          width: '100%',
                          borderRadius: 10,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    )} */}
                  </View>
                )}

                <Text style={styles.recentlySearchedText}>
                  Popular Searched
                </Text>
                {/* <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                /> */}
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}  // Use index here for keyExtractor
                />
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
    </SafeAreaView>
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
    height: 25,

    position: 'absolute',
  },
  iconsearch: {
    width: 16.93,
    height: 25,
    left: 1,
    alignSelf: 'center',
  },
  squareBorder: {
    marginTop: 20,

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
    marginTop: 10,
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
    resizeMode: 'cover',
    height: '100%',
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
    color: '#1F487C',
    fontSize: 26,
    fontWeight: '700',
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
});

export default HomeScreen;
