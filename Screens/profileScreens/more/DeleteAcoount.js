import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, FlatList, TextInput, TouchableOpacity } from "react-native";
import DeleteAccountModel from "../../models/DeleteAccountModel";
import { Svg } from 'react-native-svg';
import BackWhite from "../../assets/BackWhite";
import { clearUserId } from "../../Utils/STorage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const DeleteAcoount = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false)


    const data = [
        { key: 'Your payment and booking history information will be deleted.' },
        { key: 'You will need to re-enter all your details if you decide to use Tbs services again.' },
        { key: 'You will be unsubscribed from our mailing list and stop receiving the latest deals and offers.' }
    ]

    const renderItem = ({ item }) => {
        return (
            <View style={{ paddingTop: 22, flexDirection: 'row', }}>
                <Text style={{ fontWeight: '800', }}>{`\u2022`}</Text>
                <Text style={{ fontWeight: '600', fontFamily: 'Inter', fontSize: 15, lineHeight: 18, color: '#1F487C', paddingLeft: 10 }}>{item.key}</Text>
            </View>
        );
    }

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
                            <Text style={styles.topTitle}>Account Settings</Text>
                        </View>
                    </ImageBackground>
                </View>

                <ImageBackground source={require('../../assets/appBackgroundImage.png')} style={{ flex: 1, }}>
                <KeyboardAwareScrollView style={{flex:1}}
      contentContainerStyle={styles.innerContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}>
                        <View style={styles.headerView} >

                            <View style={{
                                marginHorizontal: 22,
                                marginTop: 25,
                                flexDirection: 'row',
                            }}>
                                <View style={{ width: 50, height: 50, }}>
                                    <Image source={require('../../assets/danger.png')} resizeMode='contain' style={{ height: 50, width: 48 }} />
                                </View>
                                <Text style={{
                                    marginHorizontal: 20, fontSize: 20, fontFamily: 'Inter', fontWeight: '600', lineHeight: 24,
                                    color: '#1F487C',
                                }}>This action will permanently delete your account in 90 days</Text>
                            </View>

                            <View style={{ flex: 1, marginHorizontal: 8 }}>
                                <FlatList
                                    data={data}
                                    renderItem={renderItem}
                                    scrollEnabled={false}
                                />
                            </View>

                            <View style={styles.paraView}>
                                <Text style={styles.paraText}>You can log in at any time within the next 90 days, until 09 Oct 2024, to cancel the deletion of your account. </Text>
                            </View>

                            <View style={styles.feedbackView}>
                                <TextInput
                                    placeholder="Feedback (optional)"
                                    placeholderTextColor={'rgba(31, 72, 124, 0.5)'}
                                    style={styles.textInputStyle}
                                    multiline
                                />

                            </View>

                            <View style={styles.buttonView}>
                                <TouchableOpacity onPress={() => navigation.navigate('AccountSettings')} style={styles.submitView} >
                                    <Text style={styles.submitText}>Keep my account with Tbs</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.delView} >
                                    <Text style={styles.delText}>Delete my account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ImageBackground>

            </View>

            <DeleteAccountModel visible={modalVisible} closeModel={() => { setModalVisible(false) }} />

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
    }, feedbackView: {
        marginHorizontal: 22,
        height: 134,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        borderColor: 'rgba(31, 72, 124, 1)',
        borderWidth: 0.5,
        justifyContent: 'flex-start',  // Ensure content starts from the top
        paddingHorizontal: 15,  // Padding only on the left and right
    },

    textInputStyle: {
        flex: 1,
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        margin: 5,
        top: 5,
        color: '#1F487C',
        lineHeight: 16,
        textAlignVertical: 'top',  // Ensure text starts from the top of the TextInput
        padding: 0,  // Remove any additional padding
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
        flex: 1,
        width: '100%',

    },
    danView: {
        flex: 1,
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    danText: {
        // backgroundColor: '#fff',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
        color: '#1F487C',
        // textAlign: 'left',
        flexWrap: 'wrap',
    },
    pointText: {
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 18,
        color: '#1F487C'
    },
    paraView: {
        margin: 22,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#D0E5FF4D',
        borderRadius: 15,

    },
    paraText: {
        fontSize: 15,
        lineHeight: 25,
        fontWeight: '300',
        color: '#1F487C',
        fontFamily: 'Inter'
    },

    buttonView: {
        gap: 10,
        marginTop: 10,
        padding: 30,
        marginBottom: 80,
        justifyContent: 'center',
        alignItems: 'center'

    },
    submitView: {
        backgroundColor: '#1F487C',
        borderRadius: 25,
        justifyContent: 'center',
        height: 44,
        width: 250,
    },
    delView: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        borderRadius: 25,
        height: 44,
        borderWidth: 1,
        borderColor: '#1F487C',
        width: 250,
    },
    submitText: {
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 19,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    delText: {
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 19,
        color: '#1F487C',
        textAlign: 'center'
    }

})

export default DeleteAcoount