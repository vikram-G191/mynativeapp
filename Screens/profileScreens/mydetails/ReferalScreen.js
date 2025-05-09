import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
  Image,
  Alert,
  SectionList,
  Clipboard,
} from 'react-native';
import { Svg } from 'react-native-svg';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import HeadWhite from '../../assets/HeadArrow';
import backgroundImage from '../../assets/home_bg.png'; // Replace with your actual image path
import TicketLine from '../../assets/TicketLine';
import Rectbaground from '../../assets/Rectbaground.png'; // Replace with your actual image path
import Refferalbg from '../../assets/Refferalbg.png'; // Replace with your actual image path
import BusticketSeprateLine from '../../assets/BusticketSeprateLine';
import BackWhite from '../../assets/BackWhite';
import BookingHistoryDetailScreen from '../../BookingScreen/BookingHistoryDetailScreen';
import WhatsappIcone from '../../assets/WhatsappIcone';
import FaceBook from '../../assets/FaceBook';
import Xicone from '../../assets/Xicone';
import ShareIcone1 from '../../assets/ShareIcone1';
import Referallistprofile from '../../assets/Referallistprofile';
import CopyIcon from '../../assets/CopyIcon';
import { useFocusEffect } from '@react-navigation/native';
import { getUserId } from '../../Utils/STorage';
import { GetRefferalCode, GetReffralContent } from '../../API/TBSapi/MyAccount/Referral';
const ReferalScreen = (props) => {
  const [currentTab, setCurrentTab] = useState('UPCOMING');
  var listingtype = 'UPCOMING';
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookigHistoryList, setBookigHistoryList] = useState([
    { name: 'a' },

  ]);

  const getContentCode = async () => {
    const response = await GetReffralContent();
    setGetContent(response);
    console.log(response, "responce content");
  };

  useEffect(() => {
    // setSpinning(true);

    getContentCode();
  }, []);



  


  const data = [
    { id: '1', name: 'Vipin', date: '08 Aug 2024', amount: '₹400' },
    { id: '2', name: 'Mohan', date: '09 Aug 2024', amount: '₹500' },
    { id: '3', name: 'Arun', date: '09 Aug 2024', amount: '₹200' },
    { id: '4', name: 'Sivakumar', date: '09 Aug 2024', amount: '₹700' },
    { id: '5', name: 'Rajmohan', date: '09 Aug 2024', amount: '₹800' },
    { id: '6', name: 'Ganesh', date: '09 Aug 2024', amount: '₹400' },
    { id: '7', name: 'venkat', date: '09 Aug 2024', amount: '₹600' },
    // Add more items as needed
  ];


  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState()
  const [getCode, setGetCode] = useState("");
  const [getContent, setGetContent] = useState("");
  const [expandedText, setExpandedText] = useState(null);

  // Toggle function to handle expanding and collapsing text
  const toggleText = (index) => {
    setExpandedText(expandedText === index ? null : index); // Close if already open, else open the clicked one
  };


  const termsConditions = getContent?.["referernt&c"];

  // console.log(getCode, 'getContent')


  useFocusEffect(
    useCallback(() => {
      getUserId().then((id) => {
        setUserId(id);
        console.log("User_id_refferal", id);
      });
    }, [])
  );

  const copyToClipboard = () => {
    Clipboard.setString(getCode?.referral_code);  // This copies the value of getCode to the clipboard
    // alert(`Code copied to clipboard! ${getCode?.referral_code}`); // Optional: Display an alert confirming the copy
  };


  const onClickTopOptionListAction = currentTab => {
    // console.log('Clicked history Button123');
    // setLoading(true);
    setCurrentTab(currentTab);

    myListEmpty();
    // fetchContactedList(listingtype);
  };

  useEffect(() => {
    // fetchContactedList(listingtype);
    setLoading(false);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    listingtype =
      currentTab === 'UPCOMING'
        ? 'UPCOMING'
        : currentTab === 'COMPLETED'
          ? 'COMPLETED'
          : 'CANCELLED';
    // fetchContactedList(listingtype);
    setRefreshing(false);
    setLoading(false);
  };
  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator
          size="large"
          color="#CD1127"
          style={styles.indicator}
        />
        <Text style={styles.indicatorText}>{'Loading...'}</Text>
      </View>
    );
  }
  const myListEmpty = () => {
    return (
      <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
        <ScrollView>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F487C' }}>How it works :</Text>
            <View style={{ flexDirection: 'column', }}>
              <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, gap: 5 }}>
                <View>
                  <Image style={{ width: 60, height: 60 }} source={require('../../assets/Shareiconeref.png')} />

                </View>
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 2.5 }}>
                  {/* <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                    Share your unique referral code with your friends and family to earn referral benefits. The more you share, the more benefits you get!
                  </Text> */}
                  <View>
                    <TouchableOpacity onPress={() => toggleText(1)}>
                      {/* {expandedText === 1 ? */}
                      {/* <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                        {`${getContent?.procedure[0]?.text}`}
                      </Text> */}
                      <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                        {getContent?.procedure?.[0]?.text || 'Default text here'}
                      </Text>

                      {/* : <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                          {`${getContent &&
                            getContent?.procedure[0]?.text?.slice(0, 150)
                            }...`}
                        </Text>
                      } */}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, gap: 5 }}>
                <View>
                  <Image style={{ width: 61, height: 60.6 }} source={require('../../assets/Phicon.png')} />

                </View>
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 2.5 }}>
                  {/* <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                    Your friend must install the Tbs app and enter your unique code while signing up.
                  </Text> */}
                  <TouchableOpacity onPress={() => toggleText(2)}>
                    <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                      {getContent?.procedure?.[1]?.text ? getContent.procedure[1].text : null}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, gap: 5 }}>
                <View>
                  <Image style={{ width: 61, height: 60.5 }} source={require('../../assets/HandIcon.png')} />

                </View>
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 2.5 }}>
                  {/* <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                    Once they successfully sign up, they will receive a voucher of ₹250 instant discount + ₹250 cashback that can be availed on their first ever booking.
                  </Text> */}
                  <TouchableOpacity onPress={() => toggleText(3)}>
                    {expandedText === 3 ? (
                      <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                        {getContent?.procedure?.[2]?.text || 'Default text here'}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                        {getContent?.procedure?.[2]?.text?.slice(0, 150) || 'Default text here'}...
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, gap: 5 }}>
                <View>
                  <Image style={{ width: 61, height: 60.5 }} source={require('../../assets/SettingIcon.png')} />

                </View>
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 2.5 }}>
                  {/* <Text style={{ fontSize: 12, left: 4, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                    After the completion of their first travel you will receive a discount voucher worth ₹150.
                  </Text> */}
                  <TouchableOpacity onPress={() => toggleText(4)}>
                    <Text style={{ fontSize: 12, left: 5, fontWeight: '600', lineHeight: 14.25, color: '#1F487C', textAlign: 'left' }}>
                      {getContent?.procedure?.[3]?.text || 'Default text here'}
                    </Text>

                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '600', color: '#1F487C' }}>Terms & Conditions</Text>
            </TouchableOpacity>
            <View style={{ alignSelf: 'center' }}>


              <TouchableOpacity >
                <View style={styles.squareBorder2}>
                  <Text style={styles.searchText}>Refer Now</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  const myListEmpty1 = () => {
    return (
      <View style={{ flex: 1, margin: 0 }}>
        <ScrollView>
          <View style={{ margin: 20 }}>
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              height: 75,
              borderWidth: 0.5,
              borderColor: '1F487C',
              justifyContent: 'center',
              borderRadius: 22
            }}>



              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 20, color: '#1F487C' }}>₹ 0</Text>
                <Text style={{ fontSize: 20, color: '#1F487C' }}>Total Rewards</Text>
              </View>

            </View>
          </View>
          {/* if No referal is below code will run */}
          {/* <View style={{ flexDirection: 'column', marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>



            <Text style={{ fontSize: 20, fontWeight: '700', color: '#1F487C', }}>No referrals yet !</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F487C', }}>Start referring your friends and earn rewards</Text>

            <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: '600', color: '#1F487C' }}>Terms & Conditions</Text>
            <View style={{ alignSelf: 'center', marginTop: 40, }}>


              <TouchableOpacity >
                <View style={styles.squareBorder2}>


                  <Text style={styles.searchText}>Refer Now</Text>

                </View>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={{
            backgroundColor: '#1F487C',
            height: 54,
            borderWidth: 0.5,
            borderColor: '#1F487C',
            justifyContent: 'center',
            alignItems: 'flex-start', // This centers the text horizontally
            borderTopLeftRadius: 22,

            borderTopRightRadius: 22,

          }}>

            <Text style={{ fontSize: 22, color: 'white', fontWeight: '600', marginLeft: 20 }}>Referral List</Text>


          </View>
          {/* <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 1, flexDirection: 'row', margin: 5, gap: 5, alignItems: 'center', }}>
              <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                <Referallistprofile width="100%" height="100%" />
              </Svg>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>Vipin</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: '400', color: '#1F487C' }}>08 Aug 2024</Text>

              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>₹400</Text>
            </View>


          </View> */}
          {/* <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',

            borderRadius: 4, // Rounding the corners
            elevation: 4, // For Android elevation
            shadowColor: '#000', // For iOS shadow
            shadowOffset: { width: 0, height: 2 }, // For iOS shadow offset
            shadowOpacity: 0.25, // For iOS shadow opacity
            shadowRadius: 3.84, // For iOS shadow radius
          }}>
            <View style={{ flex: 1, flexDirection: 'row', margin: 5, gap: 5, alignItems: 'center' }}>
              <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                <Referallistprofile width="100%" height="100%" />
              </Svg>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>Vipin</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: '400', color: '#1F487C' }}>08 Aug 2024</Text>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>₹400</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <View style={{ flex: 1, flexDirection: 'row', margin: 5, gap: 5, alignItems: 'center', }}>
              <View style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: '#04B9EF', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>Hi</Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>Vipin11</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: '400', color: '#1F487C' }}>08 Aug 2024</Text>

              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>₹400</Text>
            </View>


          </View> */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'column' }}>


      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <View style={{ flex: 1, flexDirection: 'row', margin: 5, gap: 5, alignItems: 'center', }}>
          <View style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: '#04B9EF', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>M</Text>
          </View>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>{item.name}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#1F487C' }}>{item.date}</Text>

          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1F487C' }}>{item.amount}</Text>
        </View>


      </View>
      <View style={styles.separator} />
    </View>
  );
  const renderBookingItem = ({ item, index }) => {
    const onListPageRowPress = async item => {
      console.log('clicked');
      setModalVisible(true)
    };

    const Item = ({ item, index, onPress }) => (
      <TouchableOpacity
        style={[
          {
            backgroundColor: '#FFFFFF',
            borderColor: '#F4F4F4',
            borderWidth: 1,
            marginVertical: 8,
            marginHorizontal: 1,
            shadowColor: 'rgba(0, 0, 0, 0.08)',
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 8,
            shadowOpacity: 1,
          },
        ]}
        onPress={() => onListPageRowPress(item)}>
        <View style={{ flex: 1, }}>
          <View style={{ margin: 10 }}>
            <Text>How it works :</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return <Item item={item} index={index} />;
  };

  useEffect(() => {
    if (!userId) return;
  
    const getcode = async () => {
      try {
        const response = await GetRefferalCode(userId);
        setGetCode(response);
        console.log(response, "isuxdfoidsf");
      } catch (error) {
        console.error('Error fetching referral code:', error);
      }
    };
  
    getcode();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <View style={styles.bgView}>
        <View style={styles.navigationView}>
          <ImageBackground
            source={require('../../assets/HeadBg.png')}
            style={styles.topImageBg}
            imageStyle={{
              resizeMode: 'cover',
            }}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => props.navigation.goBack()}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                  <BackWhite width="100%" height="100%" />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={styles.topTitle}>Referrals</Text>
            </View>
          </ImageBackground>
        </View>

        <Image
          source={require('../../assets/Referalbanerbg1.png')}
          style={styles.topImageBg1}
        >

        </Image>
        <View style={styles.tripInfoview}>
          <ImageBackground
            source={backgroundImage}
            style={{ flex: 1, resizeMode: 'cover', height: '100%', }}>
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              flexDirection: 'column',
              height: 85, margin: 15,
              elevation: 0.7,
            }}>
              <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', marginTop: 20, }}>

                <View>
                  <View style={{
                    width: 160,
                    height: 33,
                    backgroundColor: '#04B9EF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    borderTopLeftRadius: 5, // Apply border radius to top-left corner
                    borderTopRightRadius: 5, // Apply border radius to top-right corner
                    borderWidth: 1, // Adjust the border width as needed
                    borderColor: '#1F487C', // Set the border color to match the background or your preferred color
                    borderTopWidth: 1, // Set border width for top border
                    borderStyle: 'dashed', // Set the border style to dotted
                  }}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>{getCode?.referral_code}</Text>

                    {/* <ImageBackground
                      source={Rectbaground}
                      style={{
                        resizeMode: 'cover', width: 120.66, height: 33, alignItems: 'center',
                        justifyContent: 'center'
                      }}>


                      <Text style={{
                        fontSize: 22.5,
                        fontWeight: '600', color: 'white',

                      }}>MI487661</Text>
                    </ImageBackground> */}
                  </View>
                  <Text style={{ fontSize: 14, marginTop: 5, left: 5, fontWeight: '400', color: '#1F487C' }}>Your referral code</Text>
                </View>
                <View >
                  {/* <ImageBackground
                    source={Refferalbg}
                    style={{
                      resizeMode: 'cover', width: 90, height: 33, alignItems: 'center',
                      justifyContent: 'center'
                    }}>



                  </ImageBackground> */}
                  <TouchableOpacity onPress={copyToClipboard}>
                    <View style={{
                      backgroundColor: '#1F487C',
                      height: 33,
                      width: 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                      flexDirection: 'row', borderRadius: 5
                    }}>
                      <Svg style={{ height: 21, width: 21 }}>
                        <CopyIcon width="100%" height="100%" />
                      </Svg>
                      <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>Copy</Text>
                    </View>
                  </TouchableOpacity>
                  {/* <View style={{ flexDirection: 'row', padding: 2, gap: 2, marginTop: 5, }}>
                    <Svg style={{ height: 21, width: 21 }}>
                      <WhatsappIcone width="100%" height="100%" />
                    </Svg>
                    <Svg style={{ height: 21, width: 21 }}>
                      <FaceBook width="100%" height="100%" />
                    </Svg>
                    <Svg style={{ height: 21, width: 21 }}>
                      <Xicone width="100%" height="100%" />
                    </Svg>
                    <Svg style={{ height: 21, width: 21 }}>
                      <ShareIcone1 width="100%" height="100%" />
                    </Svg>
                  </View> */}


                </View>
              </View>

              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', // Distributes children with space between them
                alignItems: 'center',
              }}>


                <View style={{
                  width: 15, // Diameter of the circle
                  height: 30,
                  left: -1,
                  top: -51.5,
                  borderWidth: 2.5,
                  borderLeftWidth: 0,
                  borderColor: '#E5FFF1',
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: '#E5FFF1',

                }} />
                <View style={{
                  width: 15, // Diameter of the circle
                  height: 30,
                  right: -1,
                  top: -51.5,
                  borderWidth: 2.5,
                  borderRightWidth: 0,
                  borderColor: '#E5FFF1',
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  backgroundColor: '#E5FFF1',

                }} />
              </View>

            </View>

            <View style={styles.ViewTabs}>
              <TouchableHighlight
                onPress={() => onClickTopOptionListAction('UPCOMING')}
                underlayColor="transparent"
                style={[
                  styles.tab,
                  currentTab === 'UPCOMING' && styles.tabActive,
                ]}>
                <Text
                  style={[
                    styles.tabTitle,
                    currentTab === 'UPCOMING' && styles.tabTitleActive,
                  ]}>
                  {'Refer and Earn'}
                </Text>
              </TouchableHighlight>
              {/* <TouchableHighlight
                onPress={() => onClickTopOptionListAction('COMPLETED')}
                underlayColor="transparent"
                style={[
                  styles.tab,
                  currentTab === 'COMPLETED' && styles.tabActive,
                ]}>
                <Text
                  style={[
                    styles.tabTitle,
                    currentTab === 'COMPLETED' && styles.tabTitleActive,
                  ]}>
                  {'Referral History'}
                </Text>
              </TouchableHighlight> */}
              {/* <TouchableHighlight
                onPress={() => onClickTopOptionListAction('CANCELLED')}
                underlayColor="transparent"
                style={[
                  styles.tab,
                  currentTab === 'CANCELLED' && styles.tabActive,
                ]}>
                <Text
                  style={[
                    styles.tabTitle,
                    currentTab === 'CANCELLED' && styles.tabTitleActive,
                  ]}>
                  {'CANCELLED'}
                </Text>
              </TouchableHighlight> */}
            </View>
            {/* {loading ? (
              <LoadingAnimation />
            ) : (
              <FlatList
                backgroundColor="rgba(52, 52, 52, 0.0)"
                contentContainerStyle={{ flexGrow: 1 }}
                data={bookigHistoryList}
                ListEmptyComponent={myListEmpty}
                renderItem={renderBookingItem}
                keyExtractor={item => item.name}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )} */}

            {currentTab === 'UPCOMING' ? myListEmpty() : myListEmpty1()}

          </ImageBackground>
        </View>
        {/* <BookingHistoryDetailScreen
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          isTripStatus={currentTab}
          Data={"Trip seats and details"}
        /> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{ flex: 1, width: '100%', marginTop: 20 }}
            onPress={() => setModalVisible(false)}></TouchableOpacity>
          <View style={styles.modalContent}>
            <ImageBackground
              source={backgroundImage}
              style={{ width: '100%', resizeMode: 'contain', shadowRadius: 10 }}>
              <View style={{ width: '100%', height: '75%' }}>
                <View>
                  <Text style={{ color: '#1F487C', fontWeight: '500', fontSize: 20, textAlign: 'center', marginTop: 5 }}>Terms and Condition</Text>
                </View>
                <View style={{ height: '165%' }}>
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'space-evenly', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 }}>
                      <Text style={{ color: '#1F487C' }}>
                        {termsConditions}
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F487C' },
  bgView: { flex: 1, backgroundColor: '#E5FFF1' },
  navigationView: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#1F487C',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom: 0
  },
  modalContent: {
    backgroundColor: '#fcfaf5',
    width: '100%',
    height: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: '-3%'
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
  topImageBg1: {

    height: 110,
    flexDirection: 'row',

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
    marginBottom: 0,
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
  ViewTabs: {
    flax: 1,
    flexDirection: 'row',

    marginHorizontal: 5,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 0,
    padding: 5,
  },
  tabActive: {
    borderBottomColor: '#1F487C',
    borderBottomWidth: 1.5,
  },
  tabTitle: {
    fontSize: 16,
    color: '#1F487C',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  tabTitleActive: {
    fontSize: 16,
    color: '#1F487C',
    fontWeight: '700',
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
  boardingPointText: {
    fontSize: 12,
    color: '#1F487C',
    fontWeight: '300',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  BusTravelType: {
    fontSize: 14,
    color: '#1F487C',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  BusTicket: {
    fontSize: 14,
    color: '#1F487C',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  BusTravelPlace: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#1F487C',
    fontWeight: '700',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  DateText: {
    fontSize: 17,
    color: '#1F487C',
    fontWeight: '700',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    padding: 2,
  },
  BusTicketStatus: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  }, squareBorder2: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    width: 170,
    borderRadius: 22,
    backgroundColor: '#1F487C',
    borderColor: '#1F487C',
  }, searchText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  }, backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  }, navigationView: {
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
  topImageBg1: {

    height: 110,
    flexDirection: 'row',

  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  }, topViewTitle: {
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
  }, separator: {
    height: 0.5, // Thin line height
    backgroundColor: '#1F487C', // Light grey color

  },
});

export default ReferalScreen;
