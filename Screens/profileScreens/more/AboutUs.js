import React from "react";
import {  View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Image } from "react-native";
import ProfileComponent from "../../component/ProfileComponent";
import { Svg } from 'react-native-svg';
import BackWhite from "../../assets/BackWhite";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutUs = ({ navigation }) => {


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
                            onPress={() => navigation.goBack()}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                                    <BackWhite width="100%" height="100%" />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.topViewTitle}>
                            <Text style={styles.topTitle}>Know About Us</Text>
                        </View>
                    </ImageBackground>
                </View>

                <ImageBackground source={require('../../assets/appBackgroundImage.png')} style={{ height: '100%', width: '100%' }}>
                    <ScrollView>

                        <View style={styles.headerView}>
                            <View style={styles.busView}>
                                <Image source={require('../../assets/tbsBus.png')} />
                            </View>

                            <View style={styles.contentView}>
                                <Text style={styles.contentText}>Designed exclusively for travellers, TBS’s pioneering technology consolidates your bus booking into one easy-to-use platform, custom built to your exact requirements.</Text>
                                <Text style={styles.contentText}>Booking bus has always proved challenging for Passengers. TBS makes it simple to configure each client’s preferences and then curates search results to show in-policy rates first, guaranteeing satisfied customers.</Text>
                                <Text style={styles.contentText}>With TBS, finding the right bus is just a few clicks away. You no longer need to hop from platform to platform as it connects to all the key players and Operator sources you use and presents the options in one easy-to-compare view.</Text>
                            </View>

                            <View style={styles.privacyView}>
                                <ProfileComponent title={'Privacy Policy'} titleStyle={styles.titleText} image={require('../../assets/privacypolicy.png')} imageStyle={styles.imgStyle} divider={true} onPress={() => navigation.navigate('CMS', { data: 'privacy' })} />
                                <ProfileComponent title={'Terms & Conditions'} titleStyle={styles.titleText} image={require('../../assets/terms.png')} imageStyle={styles.imgStyle} divider={true} onPress={() => navigation.navigate('CMS', { data: 'terms' })} />
                                <ProfileComponent title={'User Agreement'} titleStyle={styles.titleText} image={require('../../assets/terms.png')} imageStyle={styles.imgStyle} divider={true} onPress={() => navigation.navigate('CMS', { data: 'user' })} />
                            </View>
                        </View>

                    </ScrollView>
                </ImageBackground>

            </View>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#E5FFF1',
        backgroundColor: '#1F487C',
    },
    bgView: {
        flex: 1,
        backgroundColor: '#E5FFF1'
    },
    headerView: {
        padding: 20,
        display: 'flex',
        gap: 20,
        marginBottom: 80
    },
    busView: {
        //    backgroundColor: '#000',
        alignItems: 'center'
    },
    contentView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        display: 'flex',
        gap: 20
    },
    contentText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1F487C',
        lineHeight: 14,
        textAlign: 'justify'
    },
    privacyView: {
        padding: 20,
        gap: 25
    },
    titleText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1F487C',
        lineHeight: 16,
    },
    imgStyle: {
        height: 25,
        width: 22
    },
    backBtn: {
        alignItems: 'center',
        justifyContent: 'center',
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
    topImageBg1: {

        height: 110,
        flexDirection: 'row',

    },
    backBtn: {
        alignItems: 'center',
        justifyContent: 'center',
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

})

export default AboutUs