import { useState } from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, TextInput } from "react-native";
import PersonalDetailsComponent from "../../component/PersonalDetailsComponent";
import ContactDetailsComponent from "../../component/ContactDetailsComponent";
import BackWhite from "../../assets/BackWhite";
import { Svg } from 'react-native-svg';
import TextField from "../../component/TextField";
import { CheckBox, Icon } from '@rneui/themed';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from 'react-native-safe-area-context';


const PersonalInformation = (props) => {
    const [selected, setSelected] = useState(null);

    const [value, setValue] = useState('')
    const [error, setError] = useState(null)
    const [selectedIndex, setIndex] = useState(0);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [datee, setDatee] = useState('')

    const formatDateTime = (date) => {

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const day = date.getDate();
        // const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

        // return `${dateString}`;

        const dayString = day < 10 ? `0${day}` : day;
        const monthString = month < 10 ? `0${month}` : month;

        return `${dayString}/${monthString}/${year}`;
    };

    const allowedCountries = ['IN', 'AE'];
    const [value1, setValue1] = useState('')
    const [selectedIndex1, setIndex1] = useState(0);
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const [countryName, setCountryName] = useState('India');
    const [dialCode, setDialCode] = useState('91');

    const renderFlagButton = () => (
        <TouchableOpacity onPress={() => setCountryPickerVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ width: 28.88, height: 20 }}>
                    {getFlagEmoji(countryCode)}
                </Text>
                <Text style={{ height: 20 }}>
                    {'+'}
                    {`${dialCode}`}
                </Text>
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
                            onPress={() => props.navigation.goBack()}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                                    <BackWhite width="100%" height="100%" />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.topViewTitle}>
                            <Text style={styles.topTitle}>Personal Information</Text>
                        </View>
                    </ImageBackground>
                </View>
                <ImageBackground source={require('../../assets/appBackgroundImage.png')} style={{ height: '100%', width: '100%' }} >

                    {/* <ScrollView style={styles.scrollView} > */}
                    <KeyboardAwareScrollView style={{flex:1}}
      contentContainerStyle={styles.innerContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      extraHeight={140} // Adjust this height if necessary
      >
                        <View style={styles.scrollView}>

                            <View style={{ padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 10 }}>

                                <Text style={{ color: '#1F487C', fontSize: 20, lineHeight: 24, fontWeight: '600' }}>Personal Details</Text>

                                <View style={{ padding: 10, gap: 20, marginTop: 15 }}>
                                    <TextField
                                        value={value}
                                        label="Name *"
                                        errorText={error}
                                        onChangeText={(text) => setValue(text)}
                                    />

                                    <TouchableOpacity style={styles.phoneView} onPress={() => setOpen(true)}>
                                        <Text style={styles.caleText}>{datee ? formatDateTime(datee) : 'Date of birth *'}</Text>
                                        <Image source={require('../../assets/datepic1.png')} style={{ width: 31, height: 27 }} />
                                        <DatePicker
                                            confirmText={'Confirm'}
                                            cancelText={'Cancel'}
                                            title={'Select Date of Birth'}
                                            modal
                                            mode='date'
                                            open={open}
                                            date={date}
                                            onConfirm={(date) => {
                                                console.log('date', date)
                                                setOpen(false)
                                                setDate(date)
                                                setDatee(date)
                                            }}
                                            onCancel={() => {
                                                setOpen(false)
                                            }}
                                        />
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'column', }}>
                                        <Text style={styles.genText}>Gender</Text>

                                        <View style={styles.checkBoxView}>
                                            <TouchableOpacity
                                                onPress={() => setSelected(1)}
                                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <View style={{
                                                    flexDirection: 'row',
                                                    height: 42,
                                                    width: 110,
                                                    borderColor: 'rgba(31, 72, 124, 1)',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderRadius: 10, borderWidth: 0.5
                                                }}>

                                                    <Text style={{
                                                        fontSize: 14, color: '#1F487C',
                                                        fontWeight: '400',
                                                        marginLeft: 10,
                                                    }}>Male</Text>
                                                    {/* <CheckBox

                                                    textStyle={styles.checkBoxText}
                                                    iconRight={true}
                                                    containerStyle={styles.checkBoxStyle}
                                                    checked={selectedIndex === 0}
                                                    onPress={() => setIndex(0)}
                                                    checkedIcon={<Image
                                                        source={require('../../assets/uncheck.png')}
                                                        tintColor={'#1F487C'}
                                                        style={{
                                                            backgroundColor: '#1F487C',
                                                            borderRadius: 30,
                                                            alignSelf: 'flex-end',
                                                            alignItems: 'flex-end',
                                                            justifyContent: 'flex-end',
                                                        }}
                                                    />}
                                                    uncheckedIcon={<Image source={require('../../assets/uncheck.png')} />}
                                                /> */}
                                                    <View style={styles.radioButtonContainer}>
                                                        <View style={styles.outerCircle}>
                                                            <View
                                                                style={[
                                                                    styles.innerCircle,
                                                                    selected === 1 ? styles.innerCircleSelected : styles.innerCircleUnselected,
                                                                ]}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => setSelected(2)}
                                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <View style={{
                                                    flexDirection: 'row',
                                                    width: 110,
                                                    alignContent: 'flex-end',
                                                    height: 42,
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderColor: 'rgba(31, 72, 124, 1)',

                                                    borderRadius: 10,
                                                    borderWidth: 0.5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 14, color: '#1F487C',
                                                        fontWeight: '400',
                                                        marginLeft: 10,
                                                    }}>Female</Text>
                                                    {/* <CheckBox


                                                    iconRight={true}
                                                    containerStyle={styles.checkBoxStyle1}
                                                    checked={selectedIndex === 1}
                                                    onPress={() => setIndex(1)}
                                                    checkedIcon={<Image source={require('../../assets/uncheck.png')} tintColor={'#1F487C'} style={{ backgroundColor: '#1F487C', borderRadius: 30 }} />}
                                                    uncheckedIcon={<Image source={require('../../assets/uncheck.png')} />}
                                                /> */}

                                                    <View style={styles.radioButtonContainer}>
                                                        <View style={styles.outerCircle}>
                                                            <View
                                                                style={[
                                                                    styles.innerCircle,
                                                                    selected === 2 ? styles.innerCircleSelected : styles.innerCircleUnselected,
                                                                ]}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>

                            {/* <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10, }}>

                                <Text style={{ color: '#1F487C', fontSize: 20, lineHeight: 24, fontWeight: '600' }}>Contact Details</Text>

                                <View style={{ gap: 20, marginTop: 15 }}>
                                    <View style={styles.input}>
                                        <Text style={styles.label}>State of residence</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={data}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select item"
                                            searchPlaceholder="Search..."
                                            value={value1}
                                            onChange={item => {
                                                setValue1(item.value);
                                            }}
                                        />
                                    </View>

                                    <View style={[styles.row, { alignItems: 'center' }]}>
                                        <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                                            <Text style={[styles.label, { textAlign: 'center', marginBottom: 5 }]}>Country Code</Text>
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
                                                style={{
                                                    borderRadius: 5,
                                                    paddingVertical: 2,

                                                    width: '100%',  // Ensure the TextInput takes up the full width
                                                }}
                                            />
                                        </View>
                                    </View>


                                    <View style={styles.InputView1}>
                                        <Text style={{ color: '#1F487C80', fontSize: 12 }}>
                                            Email
                                        </Text>
                                        <View style={styles.flagView}>
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    fontSize: 14,
                                                    paddingVertical: 2,
                                                    width: '100%', fontSize: 14, fontWeight: "400",
                                                }}
                                                // placeholder="5 years"
                                                placeholder="abcd@gmail.com"
                                                keyboardType="email-address"

                                            />

                                        </View>

                                    </View>

                                </View>
                            </View> */}
                            <ContactDetailsComponent />

                            {/* <ContactDetailsComponent> */}



                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.submitView} onPress={() => props.navigation.goBack()} >

                                <Text style={styles.submitText}>Save Changes</Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAwareScrollView>
                </ImageBackground>

            </View>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F487C',
    },
    bgView: {
       flex:1,
        backgroundColor: '#E5FFF1',
    },
    scrollView: {
        display: 'flex',
        padding: 10,
        gap: 20
    }, radioButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
    },
    outerCircle: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#1F487C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 16,
        height: 16,
        borderRadius: 14,
    },
    innerCircleUnselected: {
        backgroundColor: '#FFFFFF', // White when not selected
    },
    innerCircleSelected: {
        backgroundColor: '#1F487C', // Blue when selected
    },
    phoneView: {
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10,

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
    genText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
        color: '#1F487C80'
    },
    checkBoxView: {
        marginTop: 10,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',

    },
    checkBoxStyle: {

        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: '#1F487C',
        right: -5,


    }, checkBoxStyle1: {

        right: -5,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: '#1F487C',

    },
    checkBoxText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
        color: '#1F487C80'
    },
    input: {
        borderColor: '#1F487C',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5,
    },
    submitView: {
        backgroundColor: '#1F487C',
        borderRadius: 22,
        paddingHorizontal: 15,
        width: 240,
        height: 44,
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: 80
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        width: 240,
        color: '#FFFFFF',
        textAlign: 'center'
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
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    flagView: {
        flexDirection: 'row'
    },
    InputView1: {
        borderColor: '#1F487C',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5
    },
    label: {
        fontSize: 14,
        color: '#1F487C80',
        fontWeight: '400',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#1F487C',
        borderWidth: 0.5,
        borderRadius: 5,
        flex: 1,
        padding: 5
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
    InputView1: {
        borderColor: '#1F487C',
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10

    },




})
export default PersonalInformation