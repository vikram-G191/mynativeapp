import { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, SafeAreaView } from "react-native";
import TextField from "./TextField";
import { CheckBox, Icon } from '@rneui/themed';
import DatePicker from 'react-native-date-picker'

const PersonalDetailsComponent = ({ image, title, onPress, titleStyle, valueStyle }) => {

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
        const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

        return `${dateString}`;
    };


    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.titleText}>Personal Details</Text>
            </View>

            <TextField

                value={value}
                label="Name *"
                errorText={error}
                onChangeText={(text) => setValue(text)}
            />

            <TouchableOpacity style={styles.phoneView} onPress={() => setOpen(true)}>
                <Text style={styles.caleText}>{datee ? formatDateTime(datee) : 'Date of birth *'}</Text>
                <Image source={require('../assets/datepic2.png')} />
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

            <View>
                <Text style={styles.genText}>Gender</Text>

                <View style={styles.checkBoxView}>
                    <CheckBox
                        title={'Male'}
                        textStyle={styles.checkBoxText}
                        iconRight={true}
                        containerStyle={styles.checkBoxStyle}
                        checked={selectedIndex === 0}
                        onPress={() => setIndex(0)}
                        checkedIcon={<Image source={require('../assets/uncheck.png')} tintColor={'#1F487C'} style={{ backgroundColor: '#1F487C', borderRadius: 30 }} />}
                        uncheckedIcon={<Image source={require('../assets/uncheck.png')} />}
                    />

                    <CheckBox
                        title={'Female'}
                        textStyle={styles.checkBoxText}
                        iconRight={true}
                        containerStyle={styles.checkBoxStyle}
                        checked={selectedIndex === 1}
                        onPress={() => setIndex(1)}
                        checkedIcon={<Image source={require('../assets/uncheck.png')} tintColor={'#1F487C'} style={{ backgroundColor: '#1F487C', borderRadius: 30 }} />}
                        uncheckedIcon={<Image source={require('../assets/uncheck.png')} />}
                    />
                </View>
            </View>


        </View>
    )

}
const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFFFFF',
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
        padding: 20,
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
    genText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
        color: '#1F487C80'
    },
    checkBoxView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '100%'
    },
    checkBoxStyle: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#1F487C',
        padding: 10,
        justifyContent: 'center'
    },
    checkBoxText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
        color: '#1F487C80'
    }



})


export default PersonalDetailsComponent