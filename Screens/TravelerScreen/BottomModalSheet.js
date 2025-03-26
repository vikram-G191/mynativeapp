import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Svg } from 'react-native-svg';
import Addpassengericon from '../assets/Addpassengericon';
import LinearGradient from 'react-native-linear-gradient';

const BottomModalSheet = ({ visible, onClose, themeColor, screenTheme }) => {
    const [selectedGender, setSelectedGender] = useState('male');

    return (
        <Modal
            statusBarTranslucent={true}
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <View style={{ margin: 10, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10, left: 5, fontWeight: '500', color: 'black' }}>Seat No. L18</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Traveler Name*"
                                        placeholderTextColor="#393939"
                                    />

                                </View>
                                <View style={{ flexDirection: 'row', gap: 5, }}>
                                    <View style={{ flex: 1, marginTop: 10, marginLeft: 10 }}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Age*"
                                            placeholderTextColor="#393939"
                                        />
                                    </View>{
                                        (screenTheme === 'Luxury Coach') ?
                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginTop: 10,
                                                    marginRight: 10,
                                                    marginLeft: 3,
                                                    flexDirection: 'row',
                                                    borderRadius: 6,
                                                    borderColor: '#393939',
                                                    borderWidth: 1,

                                                }}>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.halfView, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, },
                                                        (selectedGender === 'male') && {
                                                            borderColor: '#D89E2F',
                                                            borderWidth: 2,
                                                        }
                                                    ]}
                                                    onPress={() => setSelectedGender('male')}>
                                                    <LinearGradient

                                                        locations={(selectedGender === 'male') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                        colors={(selectedGender === 'male') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : ['#FFFFFF', '#FFFFFF']}
                                                        useAngle={true}
                                                        angle={(selectedGender === 'male') ? 170 : 45}
                                                        style={[{
                                                            flexDirection: 'row', width: '100%', flex: 1,
                                                            justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
                                                        }]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                selectedGender === 'male'
                                                                    ? { color: '#393939', fontWeight: '600', }
                                                                    : styles.unselectedText,
                                                            ]}>
                                                            Male
                                                        </Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.halfView, { borderTopRightRadius: 5, borderBottomRightRadius: 5, },
                                                        (selectedGender === 'female') && {
                                                            borderColor: '#D89E2F',
                                                            borderWidth: 2,
                                                        },
                                                    ]}
                                                    onPress={() => setSelectedGender('female')}>
                                                    <LinearGradient

                                                        locations={(selectedGender === 'female') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                        colors={(selectedGender === 'female') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : ['#FFFFFF', '#FFFFFF']}
                                                        useAngle={true}
                                                        angle={(selectedGender === 'female') ? 170 : 45}
                                                        style={[{
                                                            flexDirection: 'row', width: '100%', flex: 1,
                                                            overflow: 'hidden', borderTopRightRadius: 5, borderBottomRightRadius: 5,
                                                            justifyContent: 'center', alignItems: 'center',
                                                        }]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                selectedGender === 'female'
                                                                    ? { color: '#393939', fontWeight: '600', }
                                                                    : styles.unselectedText,
                                                            ]}>
                                                            Female
                                                        </Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View> :
                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginTop: 10,
                                                    marginRight: 10,
                                                    marginLeft: 3,
                                                    flexDirection: 'row',
                                                    borderRadius: 6,
                                                    borderColor: '#393939',
                                                    borderWidth: 1,

                                                }}>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.halfView, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, },
                                                        selectedGender === 'male'
                                                            ? { backgroundColor: themeColor, }
                                                            : styles.unselected,
                                                    ]}
                                                    onPress={() => setSelectedGender('male')}>
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            selectedGender === 'male'
                                                                ? styles.selectedText
                                                                : styles.unselectedText,
                                                        ]}>
                                                        Male
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.halfView, { borderTopRightRadius: 5, borderBottomRightRadius: 5, },
                                                        selectedGender === 'female'
                                                            ? { backgroundColor: themeColor, }
                                                            : styles.unselected,
                                                    ]}
                                                    onPress={() => setSelectedGender('female')}>
                                                    <Text
                                                        style={[
                                                            styles.text,
                                                            selectedGender === 'female'
                                                                ? styles.selectedText
                                                                : styles.unselectedText,
                                                        ]}>
                                                        Female
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                    }
                                </View>
                                <TouchableOpacity onPress={onClose} style={[styles.closeButton, (screenTheme === 'Luxury Coach') ? { borderColor: '#D89E2F', borderWidth: 1.5 } : { borderColor: themeColor, borderWidth: 1.3 }]}>
                                    {/* <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}> */}
                                    <LinearGradient

                                        locations={(screenTheme === 'Luxury Coach') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                        colors={(screenTheme === 'Luxury Coach') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : [themeColor, themeColor]}
                                        useAngle={true}
                                        angle={(screenTheme === 'Luxury Coach') ? 170 : 45}
                                        style={[{
                                            flexDirection: 'row', flex: 1, gap: 10, paddingHorizontal: 25,
                                            justifyContent: 'center', borderRadius: 23, alignItems: 'center',
                                        }]}
                                    >

                                        <Svg style={{ width: 25, height: 25 }}>
                                            <Addpassengericon width="100%" height="100%" color={(screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF'} />
                                        </Svg>
                                        <Text style={{
                                            fontSize: 16.76,
                                            fontWeight: '600',
                                            fontFamily: 'Inter',
                                            color: (screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF',
                                            lineHeight: 20.28,

                                        }}>Save Passenger</Text>
                                    </LinearGradient>
                                </TouchableOpacity>


                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textInput: {
        height: 40,
        borderColor: '#393939',
        borderWidth: 1,
        borderRadius: 5, // Square rounded corners
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Inter',
        color: '#393939',
    },
    buttonText1: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    genderContainer: {
        flex: 1,
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
    },
    halfView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderText: {
        fontSize: 18,
    },
    selectedText: {
        color: 'white',
    },
    unselectedText: {
        color: 'black',
    },
    selected: {
        backgroundColor: '#1F487C',

    },
    unselected: {
        backgroundColor: 'white',

    },
    closeButton: {
        backgroundColor: '#1F487C',
        width: 210,
        height: 44,
        borderRadius: 25,
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BottomModalSheet;
