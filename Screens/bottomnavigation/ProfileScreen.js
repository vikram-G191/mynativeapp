import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground, StatusBar, Dimensions } from "react-native";
import ProfileComponent from "../component/ProfileComponent";
import LoginProfileComponent from "../component/LoginProfileComponent";
import ProfileDetailComponent from "../component/ProfileDetailComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpModel from '../models/HelpModel';
import RateAppModels from '../models/RateAppModels';
import LanguageModel from '../models/LanguageModel';
import WomenModel from '../models/WomenModel';
import { getEmail, getName, getPhone, getUserId } from '../Utils/STorage';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Svg } from 'react-native-svg';
import SeatSelector from '../component/SeatSelector';
import { GetDiscountOffers } from '../API/TBSapi/Home/Home';

const { width, height } = Dimensions.get('screen');

const ProfileScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [rateModel, setRateModel] = useState(false);
    const [langModel, setLangModel] = useState(false);
    const [womenModel, setWomenModel] = useState(false);
    const [userId, setUserId] = useState('');
    const [passengerDetails, setPassengerDetails] = useState({
        passName: "",
        passId: "",
        PassPhone: "",
        PassEmail: ""
    })


    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const id = await getUserId();
                const name = await getName();
                const phone = await getPhone();
                const email = await getEmail();

                // Once all data is fetched, update the state at once
                setUserId(id);
                setPassengerDetails({
                    passId: id,
                    passName: name,
                    PassPhone: phone,
                    PassEmail: email,
                });
                console.log("UserId:", id);
            };

            fetchData();
        }, [])
    );


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#1F487C',
        }} edges={['right', 'left', 'top']}>
            <StatusBar
                barStyle="light-content"
                translucent={true}
                backgroundColor="#1F487C"
            />
            <ImageBackground source={require('../assets/appBackgroundImage.png')} style={{
                height: '100%', width: '100%', flex: 1,
                backgroundColor: 'rgba(229, 255, 241, 1)',
            }} >
                {!userId && (
                    // <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    //     <LoginProfileComponent navigation={navigation} />
                    // </View>
                    <View style={styles.titleView} >
                        <Text style={styles.titleText} >Log in to manage your Bookings</Text>

                        <TouchableOpacity style={styles.loginView} onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sigupView} onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.signupText}>Don’t have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text> </Text>
                        </TouchableOpacity>
                    </View>

                )}
                <ScrollView >

                    {/* <LoginProfileComponent navigation={navigation} /> */}
                    {/* {userId && ( */}
                    <>
                        {userId &&
                            <ProfileDetailComponent
                                name={passengerDetails.passName}
                                mobile={passengerDetails.PassPhone}
                                since={passengerDetails.PassEmail}
                            />
                        }

                        {/* <ProfileDetailComponent name={'Mithun Kumar'} mobile={'+91 9988776655<'} since={'Member since Jul 2019'} />  */}

                        <View style={styles.scrollview}>

                            <View style={styles.subtitleView}>
                                <Text style={styles.SubTitleText}>My details</Text>
                                <ProfileComponent title={'Booking History'}
                                    image={require('../assets/BookingHis.png')}
                                    onPress={() => userId ? navigation.navigate('BookingHistoryScreen', { isScreen: "Profile" }) : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Cancel Booking'} image={require('../assets/CB.png')} onPress={() => userId ? navigation.navigate('CancelBookingScreen') : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Personal Information'} image={require('../assets/PI.png')} onPress={() => userId ? navigation.navigate('PersonalInformation', { userId }) : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Passengers'} image={require('../assets/Ps.png')} onPress={() => userId ? navigation.navigate('Passengers', { userId }) : navigation.navigate('LoginScreen')} divider={true} />



                            </View>

                            {/* <View style={styles.subtitleView}>
                            <Text style={styles.SubTitleText}>Payments</Text>
                            <ProfileComponent title={'Tbs Wallet'} image={require('../assets/TW.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'Payment Methods'} image={require('../assets/PM.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'GST Details'} image={require('../assets/GST.png')} onPress={console.log('clicked')} divider={true} />
                        </View> */}

                            <View style={styles.subtitleView}>
                                <Text style={styles.SubTitleText}>More</Text>
                                <ProfileComponent title={'Offers'} image={require('../assets/OF.png')} onPress={() => userId ? navigation.navigate('OfferListScreen') : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Referrals'} image={require('../assets/RF.png')} onPress={() => userId ? navigation.navigate('ReferalScreen') : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Know about us'} image={require('../assets/AU.png')} onPress={() => userId ? navigation.navigate('AboutUs') : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Rate app'} image={require('../assets/RA.png')} onPress={() => userId ? setRateModel(true) : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Help'} image={require('../assets/H.png')} onPress={() => userId ? navigation.navigate('HelpScreen') : navigation.navigate('LoginScreen')} divider={true} />
                                <ProfileComponent title={'Account Settings'} image={require('../assets/St.png')} onPress={() => userId ? navigation.navigate('AccountSettings') : navigation.navigate('LoginScreen')} divider={true} />
                            </View>

                            {/* <View style={styles.subtitleView}>
                            <Text style={styles.SubTitleText}>Preferences</Text>
                            <ProfileComponent title={'Country'} value={'India'} image={require('../assets/CF.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'Currency'} value={'INR'} image={require('../assets/CR.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'Language'} value={'English'} image={require('../assets/LNG.png')} onPress={() => setLangModel(true)} divider={true} />
                            <ProfileComponent title={'Booking for women'} value={'No'} image={require('../assets/BFW.png')} onPress={() => setWomenModel(true)} divider={true} />
                        </View> */}
                        </View>
                    </>
                    {/* )} */}
                </ScrollView>

                <HelpModel visible={modalVisible} closeModel={() => setModalVisible(false)} />

                <RateAppModels visible={rateModel} closeModel={() => setRateModel(false)} />

                <LanguageModel visible={langModel} closeModel={() => setLangModel(false)} />

                <WomenModel visible={womenModel} closeModel={() => setWomenModel(false)} />


            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(229, 255, 241, 1)',

    },
    scrollview: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    dividerView: {
        borderBottomColor: '#1F487C',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 20,
        marginRight: 20
    },
    subtitleView: {
        // padding: 10,
        // paddingRight: 10,
        marginTop: 20,
        display: 'flex',
        gap: 15
    },
    SubTitleText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 20,
        color: '#1F487C',
        fontFamily: 'Inter',
    },
    titleView: {
        display: 'flex',
        gap: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: height * 0.07
    },
    titleText: {
        fontSize: 25,
        fontWeight: '700',
        lineHeight: 30,
        color: '#1F487C'
    },
    loginView: {
        padding: 10,
        backgroundColor: '#1F487C',
        borderRadius: 10,
    },
    loginText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 26,
        color: '#FFFFFF'
    },
    sigupView: {

    },
    signupText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 19,
        color: '#1F487C',
        textAlign: "center"
    },


})

export default ProfileScreen