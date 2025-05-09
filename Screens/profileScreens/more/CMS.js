import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Svg} from 'react-native-svg';
import BackWhite from '../../assets/BackWhite';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GetFooterTabs} from '../../API/TBSapi/MyAccount/MyBooking';
import {useDispatch, useSelector} from 'react-redux';

const CMS = ({route, navigation}) => {
  const {data} = route.params;
  const businfo = useSelector(state => state?.productReducer?.tbs_info);
  console.log(businfo?.terms_conditions, 'businfo');

  const dispatch = useDispatch();

  useEffect(() => {
    GetFooterTabs(dispatch);
  }, []);

  const displayText =
    data === 'privacy'
      ? businfo?.privacy_policy
      : data === 'about'
      ? businfo?.about_us
      : data === 'terms' || data === 'termsconditions'
      ? businfo?.terms_conditions
      : data === 'user' || data === 'useragreement'
      ? businfo?.user_agreement
      : '';

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <ImageBackground
        source={require('../../assets/appBackgroundImage.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.bgView}>
          {/* Header */}
          <View style={styles.navigationView}>
            <ImageBackground
              source={require('../../assets/HeadBg.png')}
              style={styles.topImageBg}
              imageStyle={{resizeMode: 'cover'}}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Svg style={{width: 30, height: 30, borderRadius: 100}}>
                    <BackWhite width="100%" height="100%" />
                  </Svg>
                </View>
              </TouchableOpacity>
              <View style={styles.topViewTitle}>
                <Text style={styles.topTitle}>
                  {data === 'privacy'
                    ? 'Know About Us'
                    : data === 'about'
                    ? 'About Us'
                    : data === 'terms' || data === 'termsconditions'
                    ? 'Know About Us'
                    : data === 'user' || data === 'useragreement'
                    ? 'Kow About us'
                    : ''}
                </Text>
              </View>
            </ImageBackground>
          </View>

          {/* Content */}
          {data === 'privacy' || data === 'about' ? (
            <View style={{padding: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#1F487C',
                  marginBottom: 10,
                  fontWeight: '800',
                }}>
                {'Privacy Policy:'}
              </Text>
              <Text
                style={{
                  fontSize: 1,
                  color: '#1F487C',
                  marginBottom: 10,
                  fontWeight: '700',
                  justifyContent:"center",
                }}>
                {data === 'privacy' ? 'Privacy Policy:' : 'About Us:'}
              </Text>
              <ScrollView
                contentContainerStyle={{paddingBottom: 100}} // adjusts scroll space
                showsVerticalScrollIndicator={true}
                indicatorStyle="red">
                
                <Text style={{fontSize: 14, color: '#1F487C',textAlign:"justify"}}>
                  {displayText}
                </Text>
              </ScrollView>
            </View>
          ) : data === 'useragreement' || data === 'user' ? (
            <View style={{padding: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#1F487C',
                  marginBottom: 10,
                  fontWeight: '800',
                //  textAlign: 'justify',
                }}>
                {'User Agreement:'}
              </Text>
              <ScrollView
                contentContainerStyle={{paddingBottom: 100}} // adjusts scroll space
                showsVerticalScrollIndicator={true}>
                <Text style={{fontSize: 14, color: '#1F487C',textAlign:"justify"}}>
                  {displayText}
                </Text>
              </ScrollView>
            </View>
          ) : data === 'termsconditions' || data === 'terms' ? (
            <View style={{padding: 20}}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#1F487C',
                  marginBottom: 10,
                  fontWeight: '800',
                  // backgroundColor:"red",
                  
                }}>
                {'Terms & Conditions'}
              </Text>
              {/* <ScrollView style={{backgroundColor: 'red',marginBottom:50,}}> */}
              <ScrollView
                contentContainerStyle={{paddingBottom: 100}} // adjusts scroll space
                showsVerticalScrollIndicator={true}>
                <Text style={{fontSize: 14, color: '#1F487C',textAlign:"justify",paddingHorizontal:5}}>
                  {displayText}
                </Text>
              </ScrollView>
            </View>
          ) : (
            <View style={{padding: 20}}>
              <Text style={{fontSize: 14, color: '#000'}}>
                No content found.
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F487C',
  },
  bgView: {
    flex: 1,
    backgroundColor: '#E5FFF1',
  },
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
  topViewTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginRight: 30,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default CMS;
