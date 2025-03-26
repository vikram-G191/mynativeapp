import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Text, ImageBackground } from 'react-native';
import backgroundImage from './assets/home_bg.png'; // Replace with your actual image path
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

const data = [
  { id: '1', city1: 'Chennai', city2: 'Bangalore', distance: '232 KMS' },
  { id: '2', city1: 'Chennai', city2: 'Bangalore', distance: '232 KMS' },
  { id: '3', city1: 'Chennai', city2: 'Bangalore', distance: '232 KMS' },
  // Add more data objects as needed
];

const DATA = [
  { id: '1', image: require('./assets/SliderImg.png') },
  { id: '2', image: require('./assets/SliderImg.png') },
  { id: '3', image: require('./assets/SliderImg.png') },
  { id: '4', image: require('./assets/SliderImg.png') },
  { id: '5', image: require('./assets/SliderImg.png') },
];
const SpalshScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('BottomTabs');
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <View style={styles.squareBorder3}>
        <View style={{ justifyContent: 'center' }}>
          <Image
            source={require('./assets/location.png')}
            style={{ left: 10, width: 55, height: 55 }}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Svg style={styles.icon}>
              <PlaceIcon width="100%" height="100%" />
            </Svg>
            <Text>{item.city1}</Text>
          </View>
          <View style={styles.distanceContainer}>
            <Svg style={styles.icon1}>
              <LineDotIcone width="100%" height="100%" />
            </Svg>
            <Svg style={styles.icon1}>
              <VehicleIcone width="100%" height="100%" />
            </Svg>
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
          <View style={styles.row}>
            <Svg style={styles.icon}>
              <PlaceIcon width="100%" height="100%" />
            </Svg>
            <Text>{item.city2}</Text>
          </View>
        </View>
        <View style={styles.bookButton}>
          <Text style={styles.bookText}>Book</Text>
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
  //   navigation.navigate('TripListScreen');
  // }
  const gotoHomescreen1 = () => {
    navigation.navigate('FakeTripListScreen');
  }
  return (
    <SafeAreaView style={styles.safeAreaView} edges={['right', 'left',]}>
      <View style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
        >
          <View style={styles.logoContainer}>
            <Image source={require('./assets/TBSLogo.png')} style={styles.logo} />
          </View>

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
    width: 308,
    height: 159,
    margin: 20,
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
    width: 140,
    height: 25,
    left: 1,
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
    gap: 10,
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
    marginVertical: 5,
  },
  distanceText: {
    marginLeft: 54,
    fontSize: 10,
    alignSelf: 'center',
    marginBottom: 5,
    color: 'white',
  },
  bookButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 78,
    height: 40,
    backgroundColor: '#1F487C',
    borderRadius: 15,
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
  },
  text: {
    color: '#1F487C',
    fontSize: 26,
    fontWeight: '700',
  },
  womenBookingText: {
    alignSelf: 'center',
    left: 20,
    fontSize: 18,
    fontWeight: '700',
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
    fontSize: 26,
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 150,
  },
});

export default SpalshScreen;
