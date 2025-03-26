import { useState } from "react";
import {  View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';
import { Svg } from 'react-native-svg';
import BackWhite from "../../assets/BackWhite";
import { SafeAreaView } from "react-native-safe-area-context";

const CMS = ({ route, navigation }) => {

    console.log('route', route)

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
            <ImageBackground source={require('../../assets/appBackgroundImage.png')} style={{ height: '100%', width: '100%' }}>

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
                    {
                        route?.params?.data === 'privacy' ? <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} /> :
                            route?.params?.data === 'terms' ? <WebView source={{ uri: 'https://www.npmjs.com/package/react-native-webview' }} style={{ flex: 1 }} /> :
                                route?.params?.data === 'user' ? <WebView source={{ uri: 'https://www.npmjs.com/package/rn-range-slider' }} style={{ flex: 1 }} /> : <View></View>
                    }

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F487C',
    },
    bgView: {
        flex: 1,
        backgroundColor: '#E5FFF1'
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
    headerView: {
        padding: 20,
        display: 'flex',
        gap: 20
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
        lineHeight: 20,
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
    contentView: {
        padding: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    verticalContent: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        height: 500,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10
    }
})

export default CMS