import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

const WomenModel = ({ visible, closeModel }) => {
    const [selected, setSelected] = useState(null);

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ImageBackground
                        source={require('../assets/appBackgroundImage.png')}
                        style={{
                            backgroundColor: '#ffffff',
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            gap: 10,
                        }}
                    >
                        <Text style={styles.modalText}>Booking for women</Text>
                        <Text style={styles.subTitleText}>
                            Providing helpful details to smartly choose bus travel for women
                        </Text>

                        <View style={{ display: 'flex', gap: 10, padding: 10 }}>
                            {/* Radio Button - Yes */}
                            <TouchableOpacity
                                onPress={() => setSelected(1)}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Text style={styles.subTitleText}>Yes</Text>
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
                            </TouchableOpacity>
                            <View style={styles.dividerView} />

                            {/* Radio Button - No */}
                            <TouchableOpacity
                                onPress={() => setSelected(2)}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <Text style={styles.subTitleText}>No</Text>
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
                            </TouchableOpacity>
                            <View style={styles.dividerView} />
                        </View>

                        <View style={{ padding: 30 }}>
                            <TouchableOpacity onPress={closeModel} style={styles.submitView}>
                                <Text style={styles.submitText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    dividerView: {
        borderBottomColor: '#1F487C',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 10,
    },
    radioButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 30,
        display: 'flex',
        gap: 10,
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
    },
    subTitleText: {
        color: '#1F487C',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 16,
    },
    submitView: {
        backgroundColor: '#1F487C',
        borderRadius: 25,
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default WomenModel;
