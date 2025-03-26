import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";



const LoginProfileComponent = ({ image, title, onPress, navigation }) => {

    return (

        <View style={styles.titleView} >
            <Text style={styles.titleText} >Log in to manage your Bookings</Text>

            <TouchableOpacity style={styles.loginView} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sigupView}>
                <Text style={styles.signupText}>Don’t have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text> </Text>
            </TouchableOpacity>
        </View>

    )

}
const styles = StyleSheet.create({

    titleView: {
        display: 'flex',
        gap: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
        color: '#1F487C'
    },


})


export default LoginProfileComponent