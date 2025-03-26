import React, {useState, useEffect, useRef} from 'react';
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
} from 'react-native';
import {Svg} from 'react-native-svg';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import BackWhite from '../assets/BackWhite';
import HeadWhite from '../assets/HeadArrow';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import TicketLine from '../assets/TicketLine';
import BusticketSeprateLine from '../assets/BusticketSeprateLine';
import BookingHistoryDetailScreen from './BookingHistoryDetailScreen';
import moment from 'moment';
import { downloadFile } from './DownloadFile';
import RNFetchBlob from 'react-native-blob-util';
const BookingHistoryScreen = ({props,navigation,route}) => {
  const { isScreen } = route.params || {};


  const [currentTab, setCurrentTab] = useState('UPCOMING');
  var listingtype = 'UPCOMING';
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookigHistoryList, setBookigHistoryList] = useState([
    {name: 'a'},
    {name: 'b'},
    {name: 'c'},
    {name: 'd'},
  ]);

  const [modalVisible, setModalVisible] = useState(false);


  const onClickTopOptionListAction = currentTab => {
    console.log('Clicked history Button');
    // setLoading(true);
    setCurrentTab(currentTab);

    listingtype =
      currentTab === 'UPCOMING'
        ? 'UPCOMING'
        : currentTab === 'COMPLETED'
        ? 'COMPLETED'
        : 'CANCELLED';
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <Image source={require('../assets/EmptyHome.png')} /> */}
        <Text style={styles.item}>{'No Booking History '} </Text>
      </View>
    );
  };

  const renderBookingItem = ({item, index}) => {
    const onListPageRowPress = async item => {
      console.log('clicked');
      setModalVisible(true)  
     // downloadUrlFile("TBS",'https://assets.respectpropertyowners.com/emirates_id/1723793133677-input.pdf')

    };

    const Item = ({item, index, onPress}) => (
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 5,
          }}>
          <View
            style={{
              width: '45%',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}>
            <Image
              source={require('../assets/BusBuleRoundICon.png')}
              style={{width: 40, height: 40, resizeMode: 'cover'}}
            />
            <Text style={styles.DateText}>{'27'}</Text>
            <Text style={styles.DateText}>{'Monday'}</Text>
          </View>
          <View
            style={{
              width: '55%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingVertical: 5,
            }}>
            <Text
              style={[
                styles.BusTicketStatus,
                {
                  textAlign: 'right',
                  color:
                    currentTab === 'UPCOMING'
                      ? '#FF7C03'
                      : currentTab === 'COMPLETED'
                      ? '#2CA103'
                      : '#EB1B1F',
                  paddingRight: 5,
                  width: '100%',
                },
              ]}>
              {currentTab === 'UPCOMING'
                ? 'UPCOMING'
                : currentTab === 'COMPLETED'
                ? 'CONFIRM'
                : 'CANCELLED'}
            </Text>
            <Text style={styles.BusTicket}>{'Bus Ticket'}</Text>
            <Text style={styles.BusTravelPlace}>{'Coimbatore - Chennai'}</Text>
            <Text style={styles.BusTravelType}>{'IntrCity SmartBus'}</Text>
          </View>
        </View>
        <Svg style={{height: 5}}>
          <BusticketSeprateLine width="100%" height="100%" />
        </Svg>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 10,
          }}>
          <View
            style={{
              width: '45%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.boardingPointText}>{'MAY 2024'}</Text>
          </View>
          <View
            style={{
              width: '55%',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.boardingPointText}>
              {'Boarding: Gandhipuram 1'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return <Item item={item} index={index} />;
  };

  // Handle submission from the modal
  const handleModalSubmit = (value) => {
   // setSelectedValue(value);  // Set the value from the modal
    console.log('Modal was dismissed',value);
    setModalVisible(false)  

   
    // Any other actions or state updates can be performed here
    downloadUrlFile("TBS",'https://assets.respectpropertyowners.com/emirates_id/1723793133677-input.pdf')

  };




  // Function to preview the downloaded file on iOS
  
 const previewFile = async (filePath) => {
  if (Platform.OS === 'ios') {

    RNFetchBlob.fs.exists(filePath)
  .then((exists) => {
    if (exists) {
      console.log('entered')
      setTimeout(() => {
        console.log('Started')
        RNFetchBlob.ios.openDocument(filePath)
          .then(() => console.log('Document opened successfully'))
          .catch((error) => console.error('Error opening document:', error));
      }, 10); // Small delay to ensure reinitialization
     
    } else {
      console.error('File does not exist at path:', filePath);
    }
  })
  .catch((error) => console.error('Error checking file existence:', error));

    // try {
    //   // Clear the cached preview
    //   await RNFetchBlob.fs.unlink(filePath);
      
    //   // Re-download or recreate the file
    //   // your file download logic here
      
    //   RNFetchBlob.ios.previewDocument(filePath)
    //     .then(() => {
    //       console.log('Preview opened successfully');
    //     })
    //     .catch((error) => {
    //       console.error('Error opening preview:', error);
    //     });
    // } catch (error) {
    //   console.error('Error handling file:', error);
    // }
  } else {
    console.log('File preview is only available on iOS.');
  }
};

  const downloadUrlFile = async (getName, getDownloadUrl) => {

    console.log('getName', getName)
    console.log('getDownloadUrl', getDownloadUrl)

    // const getDownloadUrl = API_BASE_URL + "/" + getDocumentUrl;
    try {
      if (Platform.OS === 'ios') {
        downloadFile(getDownloadUrl).then(res => {
          console.log(res.path());
          
         // RNFetchBlob.ios.openDocument(res.path());
         previewFile(res.path())
          // RNFetchBlob.ios.previewDocument(res.path());
        });
      } else {
        const currentDate = moment().format('YYYYMMDD_HHmmss');
        let fileName;
        if (getDownloadUrl.toLowerCase().endsWith('.pdf')) {
          fileName = `${getName}_${currentDate}.pdf`;
        } else if (getDownloadUrl.toLowerCase()?.match(/\.(jpg|jpeg|png|gif)$/)) {
          fileName = `${getName}_${currentDate}.jpg`;
        } else {
          console.log('Unsupported file format.');
        }
        if (fileName) {
          try {
            await downloadFileNew(getDownloadUrl, fileName);
            console.log('Download completed successfully!');
          } catch (error) {
            console.log('Download failed:', error);
          }
        }
      }
    } catch (error) {
      console.log('BLOB ERROR -> ', error);
    }
  };

  const downloadFileNew = async (url, fileName) => {
    const { dirs } = RNFetchBlob.fs;
    const fileExtension = url.split('.').pop();
    const path = `${dirs.DocumentDir}/${fileName}.${fileExtension}`;

    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
        appendExt: fileExtension,
        path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: fileName,
          description: 'File downloaded by download manager.',
          mime: fileExtension === 'pdf' ? 'application/pdf' : `image/${fileExtension}`,
        },
      }).fetch('GET', url);
      console.log('File downloaded to:', response.path());
      return response.path();
    } catch (error) {
      console.log('Error downloading file:', error);
      return null;
    }
  };


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
              onPress={() => 
                isScreen === "Profile" ?
                navigation.reset({
                index: 0,
                routes: [{ name: 'ProfileScreen' }],
              }) : navigation.goBack()
              }>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Svg style={{width: 30, height: 30, borderRadius: 100}}>
                  <BackWhite width="100%" height="100%" />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={styles.topTitle}>Bookings History</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.tripInfoview}>
          <ImageBackground
            source={backgroundImage}
            style={{flex: 1, resizeMode: 'cover', height: '100%'}}>
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
                  {'UPCOMING'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
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
                  {'COMPLETED'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
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
              </TouchableHighlight>
            </View>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <FlatList
                backgroundColor="rgba(52, 52, 52, 0.0)"
                contentContainerStyle={{flexGrow: 1}}
                data={bookigHistoryList}
                ListEmptyComponent={myListEmpty}
                renderItem={renderBookingItem}
                keyExtractor={item => item.name}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )}
          </ImageBackground>
        </View>
        <BookingHistoryDetailScreen
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      isTripStatus={currentTab}
      Data={"Trip seats and details"}
      onSubmit={handleModalSubmit} 
        />
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
    alignItems: 'center',
    justifyContent: 'center',
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
    marginRight:30,
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
  },
});

export default BookingHistoryScreen;
