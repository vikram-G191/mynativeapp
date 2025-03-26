import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, InputAccessoryView, KeyboardAvoidingView, Keyboard } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import { TextInput } from "react-native-gesture-handler";

const StarSvg = ({ fill, stroke }) => (
    <Svg width="42.2" height="42.01" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" fill={fill} />
    </Svg>
);

const RateAppModels = ({ visible, closeModel }) => {
    const [rating, setRating] = useState(0);
    const inputAccessoryViewID = 'uniqueID';


    useEffect(() => {
        if (visible) {
            setRating(0); // Reset rating to 0 when modal opens
        }
    }, [visible]);

    const getColor = (value) => {
        switch (value) {
            case 1: return '#FF2B2B';
            case 2: return '#FF4A22';
            case 3: return '#F3880A';
            case 4: return '#FFA800';
            case 5: return '#FFDD2B';
            default: return '#FEE322';
        }
    };

    //     const inputRef = useRef(null); // Reference to the TextInput

    //   // Focus the TextInput when the modal becomes visible
    //   useEffect(() => {
    //     if (visible && inputRef.current) {
    //       inputRef.current.focus();
    //     }
    //   }, [visible]);

    return (
        <Modal animationType='slide' transparent={true} visible={visible}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.centeredView}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <ImageBackground source={require('../assets/appBackgroundImage.png')} style={{
                            backgroundColor: '#ffffff', borderTopRightRadius: 20,
                            borderTopLeftRadius: 20, gap: 10,
                        }} >
                            {rating < 1 ? (
                                Platform.OS === 'ios' ? (
                                    <ImageBackground source={require('../assets/Rate.gif')} style={{ overflow: 'hidden' }}>
                                        <View style={{ height: 292, padding: 20 }}>
                                            <Text style={styles.modalText}>Enjoying the Tbs App?</Text>
                                        </View>
                                    </ImageBackground>
                                ) : (

                                    <View style={{ position: 'relative', height: 208, width: '100%' }}>
                                        <FastImage
                                            source={require('../assets/Rate.gif')}
                                            style={{
                                                height: '100%', // Fill parent container height
                                                width: '100%',  // Fill parent container width
                                                borderRadius: 10,
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                        />

                                        {/* Text overlay */}
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            padding: 21,
                                        }}>
                                            <Text style={styles.modalText}>Enjoying the Tbs App?</Text>
                                        </View>
                                    </View>
                                )
                            ) : (
                                <View style={{ padding: 20 }}>
                                    <Text style={styles.modalText}>Enjoying the Tbs App?</Text>
                                </View>
                            )}

                            <View style={{ padding: 5 }}>
                                <Text style={styles.subTitleText}>Rate your experience with the Tbs App</Text>
                            </View>

                            <View style={{ justifyContent: 'center', flexDirection: 'row', gap: 0 }}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <TouchableOpacity key={value} onPress={() => setRating(value)}>
                                        <StarSvg
                                            fill={value <= rating ? getColor(rating) : 'none'}
                                            stroke={value <= rating ? getColor(rating) : getColor(rating)}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {rating >= 1 && (
                                <View style={{ gap: 10, marginTop: 2 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                                        <Image source={require('../assets/Rate1.png')} style={{ height: 20, width: 20, tintColor: getColor(rating) }} />
                                        <Text style={{ color: getColor(rating), fontSize: 16, fontWeight: '500', lineHeight: 21 }}>
                                            {rating} - {rating === 1 ? 'Terrible' : rating === 2 ? 'Bad' : rating === 3 ? 'Okay' : rating === 4 ? 'Good' : 'Excellent'}
                                        </Text>
                                    </View>

                                    {/* <View style={styles.feebackView}>
                                    <TextInput multiline style={{ minHeight: 130 }} placeholder='Write your feedback :)' />
                                </View> */}
                                    <View style={styles.feedbackView}>
                                        <TextInput
                                            placeholder="Write your feedback :)"
                                            placeholderTextColor={'rgba(31, 72, 124, 0.5)'}
                                            style={styles.textInputStyle}
                                            multiline
                                            autoCorrect={false}         // Disable auto-correction
                                            autoCapitalize="none"       // Disable auto-capitalization
                                            spellCheck={false}          // Disable spell checking
                                            textContentType="none"
                                            inputAccessoryViewID={inputAccessoryViewID}
                                        />
                                        <InputAccessoryView nativeID={inputAccessoryViewID}>
                                            <View style={{
                                                backgroundColor: '#ebecec',
                                                padding: 3,
                                                borderTopWidth: 1,
                                                borderColor: '#D3D3D3',
                                                alignItems: 'flex-end',
                                            }}>
                                                <TouchableOpacity style={{
                                                    backgroundColor: '#D3D3D3',  // Customize the button background color here
                                                    paddingVertical: 10,
                                                    paddingHorizontal: 20,
                                                    borderRadius: 8,
                                                }}
                                                    onPress={() => {
                                                        Keyboard.dismiss(); // Dismiss the keyboard when Done is pressed
                                                    }}


                                                ><Text style={{
                                                    color: 'black',  // Customize the button title (text) color here
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }}>Done</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </InputAccessoryView>

                                    </View>

                                </View>
                            )}

                            <TouchableOpacity onPress={closeModel} style={styles.submitView}>
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>

                        </ImageBackground>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    }, feedbackView: {
        marginHorizontal: 22,
        height: 134,
        marginLeft: 50,
        marginRight: 50,
        backgroundColor: 'rgba(208, 229, 255, 0.3)',
        borderRadius: 10,
        borderColor: 'rgba(31, 72, 124, 1)',
        borderWidth: 0.5,
        justifyContent: 'flex-start',  // Ensure content starts from the top
        paddingHorizontal: 15,  // Padding only on the left and right
    },

    textInputStyle: {
        flex: 1,
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        margin: 5,
        top: 5,
        color: '#1F487C',
        lineHeight: 16,
        textAlignVertical: 'top',  // Ensure text starts from the top of the TextInput
        padding: 0,  // Remove any additional padding
    },
    modalView: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        overflow: 'hidden',
        display: 'flex',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        color: '#1F487C',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24,
    },
    subTitleText: {
        color: '#1F487C',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 16,
        textAlign: 'center',
    },
    feebackView: {
        padding: 10,
        marginLeft: 60,
        marginRight: 60,
        borderRadius: 10,
        borderWidth: 0.5,
        backgroundColor: 'rgba(208, 229, 255, 0.3)',
        borderColor: 'rgba(31, 72, 124, 1)',
    },
    submitView: {
        backgroundColor: '#1F487C',
        borderRadius: 25,
        paddingHorizontal: 15,
        justifyContent: 'center',
        top: 10,
        height: 44,
        marginLeft: 80,
        marginRight: 80,
        marginBottom: 30,
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default RateAppModels;