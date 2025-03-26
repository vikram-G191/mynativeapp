import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import ProfileComponent from "../../component/ProfileComponent";
import LogoutModel from "../../models/LogoutModel";
import {SafeAreaView} from 'react-native-safe-area-context';

import { Svg } from 'react-native-svg';
import BackWhite from "../../assets/BackWhite";
import { clearUserId } from "../../Utils/STorage";

const AccountSettings = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = async () => {
        clearUserId()
        navigation.navigate('BottomTabs');
    };
    return (
        <SafeAreaView style={styles.container}  edges={['right', 'left', 'top']}>

<View style={{flex: 1, backgroundColor: '#E5FFF1'}}>
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

                <ImageBackground source={require('../../assets/appBackgroundImage.png')} style={{ height: '100%', width: '100%' }}>

                        <View style={styles.view}>
                            <ProfileComponent onPress={() => setModalVisible(true)} title={'Log Out'} image={require('../../assets/logout.png')} titleStyle={styles.titleStyle} componentStyle={styles.componentStyle} imageStyle={styles.imageStyle} />
                        </View>

                        <View style={styles.view}>
                            <ProfileComponent onPress={() => navigation.navigate('DeleteAcoount')} title={'Delete Account'} image={require('../../assets/delete.png')} titleStyle={styles.valueStyle} componentStyle={styles.componentStyle} imageStyle={styles.imageStyle} />
                        </View>

                </ImageBackground>


            <LogoutModel visible={modalVisible} closeModel={() => { setModalVisible(false) }} onClose={closeModal} />
</View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F487C',
        // justifyContent: 'space-between',
    },
    bgView: {
        flex: 1,
        backgroundColor: '#E5FFF1'
    },
   
    componentStyle: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    view: {
        marginTop: 10,
        padding: 15,
        display: 'flex',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    imageStyle: {
        height: 20,
        width: 20,
        marginRight:5,
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily:'Inter',
        lineHeight: 16,
        color: '#1F487C'
    },
    valueStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily:'Inter',
        lineHeight: 16,
        color: '#C32629'
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
    },

})
export default AccountSettings