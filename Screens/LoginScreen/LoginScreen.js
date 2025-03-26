import React from 'react';
import { View, ImageBackground, TextInput, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import Svg from 'react-native-svg';
import DropDownicone from '../assets/DropDownicone';
import { Formik } from 'formik';
import * as Yup from 'yup'


const LoginScreen = ({ navigation }) => {

    const gotoscreen1 = () => {
        navigation.navigate('LoginScreenReferal');
    }
    const values = {
        phone: "",
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object({
        phone: Yup.string()?.matches(phoneRegExp, 'Phone number is not valid').required(),
        // phone: Yup.string().required(),

    })

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/login.png')}
                style={styles.topImage}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 50, marginRight: 20 }}>
                    <Image source={require('../assets/close.png')} />
                </TouchableOpacity>
            </ImageBackground>

            <ImageBackground source={backgroundImage} style={styles.bottomImage} >

                <Formik initialValues={values} validationSchema={validationSchema} enableReinitialize

                    onSubmit={(values, formikActions) => {

                        if (values?.phone.length === 10) {
                            console.log('----')
                            navigation.navigate('OTPScreen')
                        }
                    }}
                >

                    {({ values, handleChange, errors, touched, handleSubmit }) => {

                        console.log('values', values)
                        console.log('errors', errors)


                        return (
                            <View style={{ flex: 1, width: '100%', height: '100%', }}>

                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.text}>Create Account or Sign in</Text>
                                </View>

                                <View style={{ margin: 20, }}>

                                    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', borderRadius: 10, gap: 5 }}>
                                        <Text style={{ alignSelf: 'center', left: 5 }}>+91</Text>
                                        <Svg style={{ height: 15, width: 15, alignSelf: 'center', left: 7 }}>
                                            <DropDownicone width="100%" height="100%" />
                                        </Svg>
                                        <View style={{ width: 1, height: '60%', backgroundColor: '#888', alignSelf: 'center', marginHorizontal: 8, }} />
                                        <TextInput
                                            style={styles.textInput}
                                            value={values?.phone}
                                            onChangeText={handleChange('phone')}
                                            placeholder="Enter a 10 digit phone number"
                                            placeholderTextColor="#888"
                                            maxLength={10}
                                        />
                                    </View>
                                    {(touched.phone || errors.phone) && (
                                        <Text style={{ color: 'red', fontSize: 12, margin: 5, }}>
                                            {errors.phone}
                                        </Text>
                                    )}

                                    <View style={{ alignSelf: 'center', width: '100%', marginTop: 10 }}>
                                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                            <Text style={styles.buttonText}>GENERATE OTP</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ marginTop: 10 }}>
                                        <Text style={styles.text1}>OR, Connect using Google</Text>
                                    </View>

                                    <Image source={require('../assets/GoogleIcone.png')} style={{ width: 30, height: 30, alignSelf: 'center', marginTop: 20 }} />
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={styles.text2}>By Signing up, you agree to our Terms and </Text>
                                        <Text style={styles.text2}>Conditions and Privacy Policy</Text>
                                    </View>
                                </View>


                                <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, }}>
                                    <View style={{ width: '100%', height: 0.5, bottom: 15, backgroundColor: '#1F487C', }}></View>
                                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreenReferal')}>
                                        <Text style={styles.text}>HAVE A REFERRAL CODE?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                </Formik>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
        // Adding shadow for Material Design look
    },
    button: {
        backgroundColor: '#1F487C', // White background
        borderRadius: 10, // Square rounded corners
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 0,
        // Adding shadow for a subtle Material Design look
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    },
    buttonText: {
        fontSize: 16,
        color: '#fff', // Text color
        textAlign: 'center',
    },
    topImage: {
        flex: 3.5,
        // justifyContent: 'center',
        alignItems: 'flex-end',
    },
    bottomImage: {
        flex: 6.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5FFF1',
    },
    text: {
        color: '#1F487C',
        fontSize: 18,
        fontWeight: '600',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    text1: {
        color: '#1F487C',
        fontSize: 14,
        fontWeight: '400',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    text2: {
        color: '#1F487C',
        fontSize: 14,
        fontWeight: '600',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});

export default LoginScreen;
