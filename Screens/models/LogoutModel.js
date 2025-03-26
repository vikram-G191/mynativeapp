import React, { useState } from 'react';
import {  Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import ProfileComponent from '../component/ProfileComponent';
import { clearUserId } from '../Utils/STorage';

const LogoutModel = ({ visible, onPress, onClose, closeModel, navigation }) => {

    const goto = async () => {
        onClose()
    }


    return (
        <Modal animationType='slide' transparent={true} visible={visible}  >

            <View style={styles.centeredView}>
          

                <View style={styles.modalView}>
                <ImageBackground source={require('../assets/appBackgroundImage.png')} style={{backgroundColor:'#ffffff',   borderTopRightRadius: 20,
        borderTopLeftRadius: 20,padding: 30, gap: 10,}} >
                    <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                    {/* <View style={styles.subView}> */}
                    <Text style={styles.subTitleText}>Ticket booking is faster when you are logged in</Text>
                    {/* </View> */}

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.submitView} onPress={goto} >
                           
                            <Text style={styles.submitText}>Yes, Log out</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeModel} style={styles.delView} >
                          
                            <Text style={styles.delText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
                </View>
           
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        // height: 60,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor:'#ffffff',
        display: 'flex',
       
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        color: '#1F487C',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24,
        fontFamily:'Inter',
        textAlign: 'center',
    },
    subView: {
        // padding:30,
        // marginLeft: 35,
        // marginRight: 35,
        // backgroundColor: '#000'
    },
    subTitleText: {
        color: '#1F487C',
        fontWeight: '400',
        fontFamily:'Inter',
        fontSize: 14,
        lineHeight: 17,
        textAlign: 'center',
    },
    buttonView: {
        gap: 10,
        marginTop:5,
        paddingLeft: 30,
        paddingRight: 30,
        // backgroundColor: '#000'
    },
    submitView: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#1F487C',
        borderRadius: 22,
        height: 44,
        marginLeft: 15,
        marginRight: 15
    },
    delView: {
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#1F487C',
        borderWidth: 1,
        borderRadius: 22,
        height: 44,
        marginLeft: 15,
        marginRight: 15
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily:'Inter',
        lineHeight: 19,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    delText: {
        fontSize: 16,
        fontFamily:'Inter',
        fontWeight: '600',
        lineHeight: 19,
        color: '#1F487C',
        textAlign: 'center'
    }
});

export default LogoutModel;