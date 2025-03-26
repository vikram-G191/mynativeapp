import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { CheckBox, Icon } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import CountryPicker from 'react-native-country-picker-modal';
import { Svg } from 'react-native-svg';
import Dropdown1 from "../assets/Dropdown1";

const ContactDetailsComponent = ({ image, title, onPress, titleStyle, valueStyle }) => {

    const allowedCountries = ['IN', 'AE'];
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)
    const [selectedIndex, setIndex] = useState(0);
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const [countryName, setCountryName] = useState('India');
    const [dialCode, setDialCode] = useState('91');

    const renderFlagButton = () => (
        <TouchableOpacity onPress={() => setCountryPickerVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Text style={{ width: 28.88, height: 20 }}>
                    {getFlagEmoji(countryCode)}
                </Text> */}
                <Text style={{ height: 20 }}>
                    {'+91(IND)'}
                    {/* */}
                    {/* {`${dialCode}`} */}
                </Text>
                <Svg style={{ width: 10, height: 40, marginLeft: 10 }}>
                    <Dropdown1 width="100%" height="100%" />
                </Svg>
            </View>
        </TouchableOpacity>
    );

    const getFlagEmoji = countryCode => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    };

    const onCountrySelect = country => {
        setCountryCode(country.cca2);
        setCountryName(country.name);
        setDialCode(country.callingCode[0]);
        setCountryPickerVisible(false); // Close the picker after selection
    };

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.titleText}>Contact Details</Text>
            </View>

            <View style={styles.input}>
                <Text style={styles.label}>State of residence</Text>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    iconColor="#1F487C"
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={item => {
                        setValue(item.value);
                    }}
                />
            </View>
            <Text style={{ fontSize: 14, color: '#1F487C80', fontWeight: '400', marginVertical: -15 }}>Required for GST Tax Invoicing</Text>

            <View style={[styles.row, { alignItems: 'center', marginTop: 10 }]}>
                <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                    <Text style={[styles.label, { textAlign: 'center', marginTop: 1 }]}>Country Code</Text>
                    {renderFlagButton()}
                    {isCountryPickerVisible && (
                        <CountryPicker
                            containerButtonStyle={{ justifyContent: 'center', backgroundColor: '#000' }}
                            visible={isCountryPickerVisible}
                            onClose={() => setCountryPickerVisible(false)}
                            onSelect={onCountrySelect}
                            closeable
                            filterable
                            filterPlaceholder="Search"
                            countryCode={countryCode}
                            withFilter
                            countries={allowedCountries}
                            withCountryNameButton={false}
                            withFlagButton={false}
                        />
                    )}
                </View>

                <View style={[styles.verticleLine, { height: '100%', marginHorizontal: 5 }]}></View>

                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    <Text style={[styles.label]}>Mobile Number</Text>
                    <TextInput
                        placeholder="Enter Mobile Number"
                        keyboardType="phone-pad"
                        returnKeyType="done"
                        style={{
                            borderRadius: 5,
                            paddingVertical: 2,
                            width: '100%',  // Ensure the TextInput takes up the full width
                        }}
                    />
                </View>
            </View>

            {/* <View style={styles.input}>
                <Text style={styles.label}>Email</Text>
                <TextInput

                    placeholder="abcd@gmail.com"
                    keyboardType="email-address"
                />
            </View> */}

            <View style={styles.InputView1 }>
                <Text style={[{ color: '#1F487C80', fontSize: 12 },{marginHorizontal: 5}]}>
                    Email
                </Text>
                <View style={[styles.flagView,{marginHorizontal: 5}]}>
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: 14,
                            paddingVertical: 5,
                            width: '100%', fontSize: 14, fontWeight: "400",
                        }}
                        // placeholder="5 years"
                         placeholder="abcd@gmail.com"
                         keyboardType="email-address" 
                        autoCorrect={false}         // Disable auto-correction
                        autoCapitalize="none"       // Disable auto-capitalization
                        spellCheck={false}          // Disable spell checking
                        textContentType="none"      // Disable predictive suggestions

                    />

                </View>

            </View>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        padding: 10,
        gap: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
        color: '#1F487C'
    },
    phoneView: {
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderColor: '#1F487C',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    caleText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
        color: '#1F487C'
    },
    label: {
        fontSize: 14,
        color: '#1F487C80',
        fontWeight: '400',

    },
    input: {
        borderColor: '#1F487C',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,



    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#1F487C',
        // justifyContent: 'space-around',
        borderWidth: 0.5,
        borderRadius: 5,
        // padding: 10,
        flex: 1,
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },




    dropdown: {
        // margin: 16,
        // height: 50,
        // borderBottomColor: 'gray',
        // borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#1F487C',
        fontWeight: '400',
        lineHeight: 16
    },
    iconStyle: {
        width: 25,
        height: 25,
        fontWeight: '700'

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    }, flagView: {
        flexDirection: 'row'
    }, InputView1: {
        borderColor: '#1F487C',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5

    },

})


export default ContactDetailsComponent