import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from "react-native";
import ProfileComponent from "../component/ProfileComponent";
import LoginProfileComponent from "../component/LoginProfileComponent";
import ProfileDetailComponent from "../component/ProfileDetailComponent";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpModel from '../models/HelpModel';
import RateAppModels from '../models/RateAppModels';
import LanguageModel from '../models/LanguageModel';
import WomenModel from '../models/WomenModel';
import { getUserId } from '../Utils/STorage';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Svg } from 'react-native-svg';
import SeatSelector from '../component/SeatSelector';


const ProfileScreen = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [rateModel, setRateModel] = useState(false);
    const [langModel, setLangModel] = useState(false);
    const [womenModel, setWomenModel] = useState(false);
    const [userId, setUserId] = useState('');


    useFocusEffect(
        useCallback(() => {
            getUserId().then((id) => {
                setUserId(id);
                console.log("id", id);
            });
        }, [])
    );

    return (
        <SafeAreaView style={{   flex: 1,
            backgroundColor: '#1F487C',}} edges={['right', 'left','top']}>
            <ImageBackground source={require('../assets/appBackgroundImage.png')} style={{ height: '100%', width: '100%', flex: 1,
        backgroundColor: 'rgba(229, 255, 241, 1)', }} >





                {!userId && (
                    <LoginProfileComponent navigation={navigation} />
                )}
                <ScrollView >

                    {/* <LoginProfileComponent navigation={navigation} /> */}
                    {userId && (

                        <ProfileDetailComponent
                            name="Mithun Kumar"
                            mobile="+91 9988776655"
                            since="Member since Jul 2019"
                        />
                    )}
                    {/* <ProfileDetailComponent name={'Mithun Kumar'} mobile={'+91 9988776655<'} since={'Member since Jul 2019'} /> */}

                    <View style={styles.scrollview}>

                        <View style={styles.subtitleView}>
                            <Text style={styles.SubTitleText}>My details</Text>
                            <ProfileComponent title={'Booking History'}
                                image={
                                    require('../assets/BookingHis.png')
                                }
                                onPress={() => navigation.navigate('BookingHistoryScreen', { isScreen: "Profile" })} divider={true} />
                            <ProfileComponent title={'Cancel Booking'} image={require('../assets/CB.png')} onPress={() => navigation.navigate('CancelBookingScreen')} divider={true} />
                            <ProfileComponent title={'Personal Information'} image={require('../assets/PI.png')} onPress={() => navigation.navigate('PersonalInformation')} divider={true} />
                            <ProfileComponent title={'Passengers'} image={require('../assets/Ps.png')} onPress={() => navigation.navigate('Passengers')} divider={true} />



                        </View>

                        <View style={styles.subtitleView}>
                            <Text style={styles.SubTitleText}>Payments</Text>
                            <ProfileComponent title={'Tbs Wallet'} image={require('../assets/TW.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'Payment Methods'} image={require('../assets/PM.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'GST Details'} image={require('../assets/GST.png')} onPress={console.log('clicked')} divider={true} />
                        </View>

                        <View style={styles.subtitleView}>
                            <Text style={styles.SubTitleText}>More</Text>
                            <ProfileComponent title={'Offers'} image={require('../assets/OF.png')} onPress={() => navigation.navigate('OfferListScreen')} divider={true} />
                            <ProfileComponent title={'Referrals'} image={require('../assets/RF.png')} onPress={() => navigation.navigate('ReferalScreen')} divider={true} />
                            <ProfileComponent title={'Know about us'} image={require('../assets/AU.png')} onPress={() => navigation.navigate('AboutUs')} divider={true} />
                            <ProfileComponent title={'Rate app'} image={require('../assets/RA.png')} onPress={() => setRateModel(true)} divider={true} />
                            <ProfileComponent title={'Help'} image={require('../assets/H.png')} onPress={() => setModalVisible(true)} divider={true} />
                            <ProfileComponent title={'Account Settings'} image={require('../assets/St.png')} onPress={() => navigation.navigate('AccountSettings')} divider={true} />
                        </View>

                        <View style={styles.subtitleView}>
                            <Text style={styles.SubTitleText}>Preferences</Text>
                            <ProfileComponent title={'Country'} value={'India'} image={require('../assets/CF.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'Currency'} value={'INR'} image={require('../assets/CR.png')} onPress={console.log('clicked')} divider={true} />
                            <ProfileComponent title={'Language'} value={'English'} image={require('../assets/LNG.png')} onPress={() => setLangModel(true)} divider={true} />
                            <ProfileComponent title={'Booking for women'} value={'No'} image={require('../assets/BFW.png')} onPress={() => setWomenModel(true)} divider={true} />
                        </View>
                    </View>

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

    }

})

export default ProfileScreen