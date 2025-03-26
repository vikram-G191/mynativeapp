import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, TextInput, Text, ImageBackground } from 'react-native';
import SearchIcone from '../assets/SearchIcone';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import BackWhite from '../assets/BackWhite';
import Svg from 'react-native-svg';
import BackArrow from '../assets/BackArrow';
import Clockicon from '../assets/Clockicon';
import { color } from '@rneui/base';
import { fetchStations } from '../API/ABHIBUSapi/Home';

const FromeScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [stations, setStations] = useState([]);

  const handleSearch = () => {
    // Handle the search action 
  };
  const recentSearches1 = [
    { id: '1', title: 'Tirupati', title1: 'Tambaram' },
    { id: '2', title: 'Dharmapuri', title1: 'Tambaram' },
    { id: '3', title: 'Chennai', title1: 'Tambaram' },
    { id: '4', title: 'Tambaram', title1: 'Tambaram' },
    // Add more items as needed
  ];


  useEffect(() => {
    const getStations = async () => {
      setLoading(true);
      const data = await fetchStations();  // Fetch data from API
      if (data && data.StationList) {
        setStations(data.StationList); // Update state with fetched data
      }
      setLoading(false);
    };

    getStations();
  }, []);


  const renderItem1 = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.rowContainer}>
        {/* <View style={styles.leftView}>
          <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
            <Svg style={{ width: 20, height: 20 }}>
              <Clockicon width="100%" height="100%" />
            </Svg>

            <Text style={styles.itemText}>Bengaluru - Coimbatore </Text>
          </View>

        </View> */}
        {/* <View style={styles.rightView}>
          <Text style={styles.itemText11}>Route</Text>
        </View> */}
      </View>

    </TouchableOpacity>
  );
  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.leftView}>
          {
            stations?.stations?.map((item) => {
              return (
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  <Text style={styles.itemText}>{item.Station_Name}</Text>  {/* Station Name */}
                  <Text style={styles.itemText11}>{item.State_Name}</Text>  {/* City Name */}
                </View>
              )
            })
          }
          {/* <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.itemText}>{item.StationName}</Text>  
            <Text style={styles.itemText11}>{item.CityName}</Text>  
          </View> */}
        </View>
        <View style={styles.rightView}>
          <Text style={styles.itemText11}>Board at</Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  const recentSearches = [
    { id: '1', title: 'Tirupati' },
    { id: '2', title: 'Dharmapuri' },
    { id: '3', title: 'Chennai' },
    { id: '4', title: 'Tambaram' },
    // Add more items as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.safeAreaView} edges={['right', 'left', 'top']}>
      <View style={styles.container}>
        <ImageBackground
          source={require('./Screens/assets/home_bg.png')}
          style={styles.background}
        >
          {/* Top section with search bar (should not scroll) */}
          <View style={{ flex: 1, flexDirection: 'column' }}>


            <View style={{ height: 100 }}>
              <View style={styles.searchContainer}>
                <TouchableOpacity
                  style={{ left: 25 }}
                  onPress={() => navigation.goBack()}
                >
                  <Svg style={{ width: 21 }}>
                    <BackArrow width="100%" height="100%" />
                  </Svg>
                </TouchableOpacity>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Boarding Point"
                  value={location}
                  placeholderTextColor="#1F487C80"
                  onChangeText={setLocation}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                  <Image source={SearchIcone} style={styles.searchIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* ScrollView for recent searches, taking remaining space */}
            <View style={{ flex: 1, marginVertical: -20 }}>
              <ScrollView style={styles.scrollView}>
                <View style={{ margin: 20, marginVertical: 0 }}>
                  {/* <Text style={{ color: 'rgba(31, 72, 124, 1)', fontSize: 18, fontWeight: '600' }}>
                    Recent Searches
                  </Text> */}
                </View>

                <View style={styles.listContainer}>
                  {/* <FlatList
                    data={recentSearches1}
                    renderItem={renderItem1}
                    keyExtractor={item => item.id}
                    style={styles.flatList}
                  /> */}
                </View>

                <View style={{ margin: 20, marginVertical: 10 }}>
                  <Text style={{ color: 'rgba(31, 72, 124, 1)', fontSize: 18, fontWeight: '600' }}>
                    Popular Boarding Points
                  </Text>
                </View>

                <View style={styles.listContainer}>
                  <FlatList
                    data={recentSearches}
                    renderItem={renderItem2}
                    keyExtractor={item => item.id}
                    style={styles.flatList}
                  />
                </View>

                <View style={{ margin: 20, marginVertical: 10 }}>
                  <Text style={{ color: 'rgba(31, 72, 124, 1)', fontSize: 18, fontWeight: '600' }}>
                    Popular Cities
                  </Text>
                </View>

                <View style={styles.listContainer}>
                  <FlatList
                    data={recentSearches}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.flatList}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#1F487C',
  }, rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftView: {
    justifyContent: 'flex-start',
  },
  rightView: {
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5FFF1',
  }, listContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: -8,
    marginVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  }, flatList: {
    width: '100%',
  },
  itemContainer: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    color: 'rgba(31, 72, 124, 1)',
  }, itemText1: {
    fontSize: 12,
    color: 'rgba(31, 72, 124, 1)',
  }, itemText11: {
    fontSize: 12,
    color: 'rgba(31, 72, 124, 0.5)',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
  },
  scrollView: {
    flexDirection: 'column',

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,

    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 35,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
});

export default FromeScreen;
