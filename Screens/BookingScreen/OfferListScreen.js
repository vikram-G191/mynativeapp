import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {Svg} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';

import BackWhite from '../assets/BackWhite';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import {getOffersList} from '../Utils/STorage';
import {GetDiscountOffers} from '../API/TBSapi/Home/Home';
import {useFocusEffect} from '@react-navigation/native';

const OfferListScreen = props => {
  const [data, setData] = useState([
    {
      title: 'How to cancel my booking?',
      content:
        'Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket.',
    },
    {
      title: 'Where can I check the cancellation policy?',
      content:
        'Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket.',
    },
    {
      title: 'How to cancel my booking?',
      content:
        'Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket.',
    },
    {
      title: 'Where can I check the cancellation policy?',
      content:
        'Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket.',
    },
  ]);

  const categoryList = [
    {title: 'All'},
    {title: 'General Public'},
    {title: 'Physically Challenged'},
    {title: 'Pilgrim Travellers'},
    {title: 'Senior Citizens'},
    {title: 'Students'},
    {title: 'Tourists'},
    {title: 'Corporate Travellers'},
  ];

  const [selectedId, setSelectedId] = useState('All');
  const [offersList, setOffersList] = useState();
  const apicrmimage = process.env.REACT_APP_CRM_API_URL_IMAGE;

  console.log(offersList, 'offers_list');
  const handleItemClick = index => {
    setOpenItem(openItem === index ? null : index);
  };

  const handleCategoryItemClick = (itemId, index) => {
    if (selectedId === itemId) {
      // If the same item is clicked again, deselect it
      setSelectedId(null);
    } else {
      setSelectedId(itemId);
    }

    console.log('clicked ' + index);
  };

  const categoryListItems = ({item, index}) => {
    const isSelected = item.title === selectedId;

    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            margin: 2,
            padding: 3,
            borderColor: 'rgba(31, 72, 124, 0.4)',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: '#FFFFFF',
          },
          isSelected && {backgroundColor: '#1F487C'},
        ]}
        onPress={() => handleCategoryItemClick(item.title, index)}>
        <Text
          style={[
            {
              fontFamily: 'Inter',
              textAlign: 'center',
              color: '#1F487C',
              fontSize: 11,
              fontWeight: '300',
              lineHeight: 12,
            },
            isSelected && {
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: '600',
              lineHeight: 15,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderListItem = ({item}) => {
    const imageUrl = item?.theme
      ? `${apicrmimage}${item.theme}`
      : `${apicrmimage}${item.background_image}`;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 10,
          overflow: 'hidden',
          height: 150,
          margin: 8,
        }}>
        <View style={{flex: 1, position: 'relative'}}>
          <Image
            alt="background_image"
            source={{uri: imageUrl}}
            style={{width: '100%', height: 150, resizeMode: 'contain'}}
          />

          <View style={styles.spanStyle1}>
            <View
              style={{
                backgroundColor: '#E5FFF1',
                borderWidth: 0,
                width: 25,
                height: 25,
                borderRadius: 50,
                marginBottom: 0,
              }}></View>
          </View>

          <View style={styles.spanStyle2}>
            <View
              style={{
                backgroundColor: '#E5FFF1',
                borderWidth: 0,
                width: 25,
                height: 25,
                borderRadius: 50,
                marginTop: 0,
              }}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchAndUpdateOffers = async () => {
        await GetDiscountOffers(); // fetch from API and store
        const offers = await getOffersList(); // get from AsyncStorage
        setOffersList(offers);
      };

      fetchAndUpdateOffers();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const fetchOffersDetails = async () => {
        const offers = await getOffersList();
        setOffersList(offers);
      };

      fetchOffersDetails();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <View style={styles.bgView}>
        <View style={styles.navigationView}>
          <ImageBackground
            source={require('../assets/HeadBg.png')}
            style={styles.topImageBg}
            imageStyle={{
              resizeMode: 'cover',
            }}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => props.navigation.goBack()}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Svg style={{width: 30, height: 30, borderRadius: 100}}>
                  <BackWhite width="100%" height="100%" />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={styles.topTitle}>Offers</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.tripInfoview}>
          <ImageBackground
            source={backgroundImage}
            style={{
              flex: 1,
              marginLeft: 5,
              flexDirection: 'column',
              resizeMode: 'cover',
              height: '100%',
              width: '98%',
              padding: 10,
            }}>
            {/* <View>
            <FlatList
              data={categoryList}
              numColumns={4}
              bounces={false}
              renderItem={categoryListItems}
              keyExtractor={(item, index) => item.title}
              extraData={selectedId}

            />
            </View> */}
            <View style={{flex: 1, marginTop: 8}}>
              <FlatList
                data={offersList}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#1F487C'},
  bgView: {flex: 1, backgroundColor: '#E5FFF1'},
  navigationView: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#1F487C',
  },
  topImageBg: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 5,
    overflow: 'hidden',
    position: 'relative',
    bottom: 5,
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
    padding: 5,
  },
  topViewTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginRight: 30,
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
    marginTop: 8,
  },
  input: {
    height: 40,
    margin: 5,
    padding: 5,
  },
  title: {
    fontSize: 16,
    color: '#1F487C',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  subtitle: {
    fontSize: 12,
    color: '#1F487C',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  spanStyle1: {
    position: 'absolute',
    left: 115,
    top: -15,
    zIndex: 2,
  },
  spanStyle2: {
    position: 'absolute',
    left: 115,
    bottom: -15,
    zIndex: 2,
  },
});
export default OfferListScreen;
