import { useRoute } from "@react-navigation/native";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { Button, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from 'yup';
import { decryptData, encryptData } from "../component/EncryptDecrypt/Encrypt-Decrypt";
import { SendMessage } from "../API/TBSapi/Login/Login";

const PhoneNumberScreen = ({navigation}) => {
    const route = useRoute()
    const { email,toggleButton } = route?.params || {}
    const validationSchema = Yup.object().shape({
        phone: Yup.string().required('Mobile number is required')
        .min(10,"Mobile number should be 10 digits"),
    });
    const handleSubmit = async(values,setErrors) =>{
        const generateOTP = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
          };
          const random = generateOTP();
        try{
                    const encData = encryptData(values.phone)
                    // console.log(encryptData(values.phone), "encrypted datatata");
                    // console.log(decryptData(encData), "decrypted datatatat");
                    const response = await SendMessage(values.phone, random);
                    const decRes = decryptData(response?.data)
                    const parsedRes = JSON?.parse(decRes)
                    if (parsedRes?.success === true) {
                      navigation.navigate('OTPScreen', { otp: random, phone: values.phone,response:parsedRes,toggleButton:toggleButton,email:email})
                    } else {
                      setErrors({ phone: 'Please enter a valid 10-digit phone number' });
                    }
            // if(toggleButton === 1){
            //     console.log(values,"phone");
            // }
            // else{
            //     console.log(values,"email")
            // }
        }
        catch(err){
         console.log(err);
        }
}

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <ImageBackground style={styles.topImage} source={require("../assets/login.png")}>
                        {/* Additional content can go here */}
                    </ImageBackground>

                    <ImageBackground source={require('../assets/home_bg.png')} style={styles.bottomImage}>
                        {/* <Text style={styles.titleText}>Your are almost there ,Complete your Profile</Text> */}
<Text style={styles.titleText}>Enter your Phone number to continue</Text>
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{
                                phone:"",
                            }}
                            onSubmit={(values,{setErrors}) => {
                                handleSubmit(values,setErrors)
                                console.log(values, "valuesdfjkdjfkdjf"); // Handle form submission here
                            }}
                        >
                            {({ handleChange, handleSubmit, touched, errors, values, setFieldValue }) => {
                                return (

                                    <View style={styles.formContainer}>
                           
                                        {/* Using Field and ErrorMessage */}
                                  
                                                <View style={styles.inputWrapper}>
                                                    <Field
                                                        name="phone"
                                                        value={values?.phone}
                                                        onChangeText={handleChange("phone")}
                                                        component={TextInput}
                                                        style={styles.input}
                                                        placeholderTextColor="#1F487C"
                                                        placeholder="Phone Number"
                                                        maxLength={10}
                                                    />
                                                    <ErrorMessage name="phone" component={Text} style={styles.errorText} />
                                                </View>
                                        <TouchableOpacity
                                            style={styles.submitButton}
                                            onPress={handleSubmit}
                                        >
                                            <Text style={styles.buttonText}>Continue</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                        </Formik>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topImage: {
        flex: 3.5,
        alignItems: "flex-end"
    },
    bottomImage: {
        flex: 6.5,
        backgroundColor: "#E5FFF1"
    },
    titleText: {
        fontSize: 18,
        color: "#1F487c",
        textAlign: "center",
    marginTop:20,
    fontWeight:"bold"
    },
    formContainer: {
        gap: 30,
        paddingHorizontal: 20,
        marginTop: 40
    },
    input: {
        height: 50,
        borderColor: "#1F487c",
        borderBottomWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
        paddingHorizontal: 10,
        fontSize: 15,
        color: "#1F487c"
    },
    inputWrapper: {
        position: "relative"
    },
    errorText: {
        color: "red",
        position: "absolute",
        top: 50,
        left: 10
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dropdownText: {
        fontSize: 15,
        color: '#1F487c',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        maxHeight: 150,  // Limit the height of the dropdown, so it doesn't take the entire screen
        borderColor: '#1F487C',
        borderWidth: 2,
        borderRadius: 10,
        position: 'absolute',
        top: 55,  // Adjust this to control the positioning of the dropdown
        left: 5,
        right: 5,
        zIndex: 10,
    },
    submitButton: {
        backgroundColor: "#1F487c",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: "center",
        marginTop:20
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

});

export default PhoneNumberScreen;
