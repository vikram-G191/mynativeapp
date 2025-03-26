import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  ImageBackground,
} from 'react-native';
import SearchIcone from '../assets/SearchIcone';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import BackWhite from '../assets/BackWhite';
import Svg from 'react-native-svg';
import BackArrow from '../assets/BackArrow';
import Clockicon from '../assets/Clockicon';
import { fetchStations } from '../API/ABHIBUSapi/Home';
import { useNavigation } from '@react-navigation/native';
import { GetStations } from '../API/TBSapi/Home/Home';
import { useDispatch, useSelector } from 'react-redux';

const FromeScreen = ({ route, navigation }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [fromStations, setFromStations] = useState([]);
  const [selectedFromStation, setSelectedFromStation] = useState(null);
  const [searchValue, setSearchValue] = useState("")
  const station = useSelector(state => state.productReducer.get_stations);
  const dispatch = useDispatch()
  useEffect(() => {
    if (route.params?.From_Station) {
      setSelectedFromStation(route.params.From_Station); // Set the selected To_Station
    }
  }, [route.params?.From_Station]);


  // console.log(station, "getting_station_From_Redux")
  // console.log(fromStations, 'From Stations');

  // const handleSearch = () => {
  //   // Handle the search action
  // };

  // const getFromStations = async () => {
  //   const data = await GetStations(); // Fetching "From" stations
  //   if (data && data.stations) {
  //     setFromStations(data.stations);
  //   }
  // };

  useEffect(() => {
    GetStations(dispatch, searchValue);
  }, [searchValue]);

  // console.log(
  //   fromStations?.map(item => item),
  //   'stationsssssss_mapping',
  // );

  const renderStation = ({ item, index }) => (

    <TouchableOpacity
      key={index}
      style={styles.itemContainer}
      onPress={() => {
        setSearchValue("")  // Clear the search input
        navigation.navigate('HomeScreen', {
          From_Station: item.station_name,
          Source_Station_Id: item?.source_id,
          From_State: item?.state_name
        })
      }
      }>
      <View style={styles.rowContainer}>
        <View style={styles.leftView}>
          <Text style={styles.itemText}>{item?.station_name}</Text>
          <Text style={styles.itemText11}>{item?.state_name}</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.itemText11}>Board at</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['right', 'left', 'top']}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/home_bg.png')}
          style={styles.background}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ height: 100 }}>
              <View style={styles.searchContainer}>
                <TouchableOpacity
                  style={{ left: 25 }}
                  onPress={() => navigation.goBack()}>
                  <Svg style={{ width: 21 }}>
                    <BackArrow width="100%" height="100%" />
                  </Svg>
                </TouchableOpacity>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Boarding Point"
                  value={searchValue}
                  placeholderTextColor="#1F487C80"
                  onChangeText={setSearchValue}  // No need for e.target.value
                />
              </View>
            </View>

            {/* Display selected To Station */}
            {selectedFromStation && (
              <View style={{ margin: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: 'blue' }}>
                  Selected To: {selectedFromStation}
                </Text>
              </View>
            )}

            {/* ScrollView for stations */}
            <View style={{ flex: 1, marginVertical: -20 }}>
              <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollView}>
                <View style={{ margin: 20, marginVertical: 0 }}>
                  <Text
                    style={{
                      color: 'rgba(31, 72, 124, 1)',
                      fontSize: 18,
                      fontWeight: '600',
                    }}>
                    Available Dropping Points
                  </Text>
                </View>

                <View style={styles.listContainer}>
                  <FlatList
                    data={station}
                    renderItem={renderStation}
                    keyExtractor={(item, index) => index.toString()}
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
  },
  rowContainer: {
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
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: -8,
    marginVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  flatList: {
    width: '100%',
    flexGrow: 0,
    height: 600,
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
  },
  itemText1: {
    fontSize: 12,
    color: 'rgba(31, 72, 124, 1)',
  },
  itemText11: {
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
