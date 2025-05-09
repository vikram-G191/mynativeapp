import { useRoute } from "@react-navigation/native";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { Button, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from 'yup';
import { getPassengerById, SendPassengerDetails } from "../API/TBSapi/Login/Login";

const LoginPassengerDetails = ({navigation}) => {
    const route = useRoute()
    const { phone,email,toggleButton,userId } = route?.params || {}
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        // mobile: Yup.string().required('Mobile number is required')
        // .min(10,"Mobile Number Should be 10 digit"),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        occupation: Yup.string().required('Occupation is required')
    });

    const [selectedOccupation, setSelectedOccupation] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [filteredOccupations, setFilteredOccupations] = useState([]);

    // const occupationOption = [
    //     { label: 'Business', value: '1' },
    //     { label: 'Self-Employed', value: '2' },
    //     { label: 'Traveler', value: '3' },
    //     { label: 'Freelancer', value: '4' },
    //     { label: 'Student', value: '5' },
    //     { label: 'Engineer', value: '6' },
    //     { label: 'Doctor', value: '7' },
    //     { label: 'Teacher', value: '8' },
    //     { label: 'Artist', value: '9' },
    //     { label: 'Designer', value: '10' },
    //     { label: 'Writer', value: '11' },
    //     { label: 'Entrepreneur', value: '12' },
    //     { label: 'Consultant', value: '13' },
    //     { label: 'Scientist', value: '14' },
    //     { label: 'Photographer', value: '15' },
    //     { label: 'Chef', value: '16' },
    //     { label: 'Lawyer', value: '17' },
    //     { label: 'Nurse', value: '18' },
    //     { label: 'Architect', value: '19' },
    //     { label: 'Software Developer', value: '20' },
    // ];
    const occupationOptions = [
    { label: "Business", value: "Business" },
    {
      label: "General Public",
      value: "General Public",
    },
    {
      label: "Physically Challenged",
      value: "Physically Challenged",
    },
    {
      label: "Pilgrim Travelers",
      value: "Pilgrim Travelers",
    },
    {
      label: "Senior Citizens",
      value: "Senior Citizens",
    },
    { label: "Students", value: "Students" },
    { label: "Tourist", value: "Tourist" },
    {
      label: "Corporate Travelers",
      value: "Corporate Travelers",
    }
]

    const handleTextChange = (text) => {
        setSelectedOccupation(text);
        if (text?.length > 0) {
            const filtered = occupationOptions.filter((occupation) =>
                occupation.label.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredOccupations(filtered);
            setIsDropdownVisible(true);
        } else {
            setFilteredOccupations(occupationOptions);
        }
    };

    const handleSelectOccupation = (occupation, setFieldValue) => {
        setSelectedOccupation(occupation.label);
        setIsDropdownVisible(false);
        setFieldValue("occupation", occupation.label); // Update Formik's field value for occupation
    };

    const handleFocus = () => {
        setFilteredOccupations(occupationOptions);
        setIsDropdownVisible(true);
    };
    const handleSubmit = async(values) =>{
        try{
           const response = await SendPassengerDetails(values,phone,userId)
           console.log(response.status,"function response");
           if(response.status === true){

            const passDetails = await getPassengerById(userId) 
            if(passDetails?.tbs_passenger_id){
            navigation.navigate('BottomTabs')
            }
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
                        <Text style={styles.titleText}>Your are almost there ,Complete your Profile</Text>

                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{
                                name: "",
                                // mobile: phone ? phone : "",
                                email: email ? email : "",
                                occupation: ""
                            }}
                            onSubmit={(values) => {
                                handleSubmit(values)
                                console.log(values, "valuesdfjkdjfkdjf"); // Handle form submission here
                            }}
                        >
                            {({ handleChange, handleSubmit, touched, errors, values, setFieldValue }) => {
                                return (

                                    <View style={styles.formContainer}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                value={selectedOccupation}
                                                onChangeText={handleTextChange}
                                                placeholder="Select Occupation"
                                                placeholderTextColor="#1F487C"
                                                style={styles.input}
                                                onFocus={handleFocus}
                                            />

                                            {isDropdownVisible && (
                                                <FlatList
                                                    data={filteredOccupations}
                                                    keyExtractor={(item) => item.value}
                                                    style={styles.dropdownContainer}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            style={styles.dropdownItem}
                                                            onPress={() => handleSelectOccupation(item, setFieldValue)}
                                                        >
                                                            <Text style={styles.dropdownText}>{item.label}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                                />
                                            )}
                                            <ErrorMessage name="occupation" component={Text} style={styles.errorText} />
                                        </View>
                                        {/* Using Field and ErrorMessage */}
                                        <View style={styles.inputWrapper}>
                                            <Field
                                                name="name"
                                                value={values?.name}
                                                onChangeText={handleChange("name")}
                                                component={TextInput}
                                                style={styles.input}
                                                placeholderTextColor="#1F487C"
                                                placeholder="Name"
                                            />
                                            <ErrorMessage name="name" component={Text} style={styles.errorText} />
                                        </View>
                                 
                                                {/* <View style={styles.inputWrapper}>
                                                    <Field
                                                        name="mobile"
                                                        value={values?.mobile}
                                                        onChangeText={handleChange("mobile")}
                                                        component={TextInput}
                                                        style={styles.input}
                                                        placeholderTextColor="#1F487C"
                                                        placeholder="Mobile"
                                                        maxLength={10}
                                                    />
                                                    <ErrorMessage name="mobile" component={Text} style={styles.errorText} />
                                                </View>  */}
                                                
                                                <View style={styles.inputWrapper}>
                                                    <Field
                                                        name="email"
                                                        value={values?.email}
                                                        onChangeText={handleChange("email")}
                                                        component={TextInput}
                                                        style={styles.input}
                                                        placeholderTextColor="#1F487C"
                                                        placeholder="Email"
                                                    />
                                                    <ErrorMessage name="email" component={Text} style={styles.errorText} />
                                                </View>
               




                                        <TouchableOpacity
                                            style={styles.submitButton}
                                            onPress={handleSubmit}
                                        >
                                            <Text style={styles.buttonText}>Submit</Text>
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
        marginVertical: 10,
    },
    formContainer: {
        gap: 30,
        paddingHorizontal: 20,
        marginTop: 20
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

export default LoginPassengerDetails;
