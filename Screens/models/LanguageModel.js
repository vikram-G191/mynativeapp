import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

const LanguageModel = ({ visible, closeModel }) => {
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
                        <Text style={styles.modalText}>Language</Text>

                        <View style={{ display: 'flex', gap: 10, padding: 5, left: -9 }}>
                            {/* English Option */}
                            <TouchableOpacity
                                onPress={() => setSelected(1)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.languageText}>English</Text>
                                <View style={styles.radioButtonContainer}>
                                    <View style={styles.outerCircle}>
                                        <View
                                            style={[
                                                styles.innerCircle,
                                                selected === 1
                                                    ? styles.innerCircleSelected
                                                    : styles.innerCircleUnselected,
                                            ]}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.dividerView} />

                            {/* Tamil Option */}
                            <TouchableOpacity
                                onPress={() => setSelected(2)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.languageText}>தமிழ் (Tamil)</Text>
                                <View style={styles.radioButtonContainer}>
                                    <View style={styles.outerCircle}>
                                        <View
                                            style={[
                                                styles.innerCircle,
                                                selected === 2
                                                    ? styles.innerCircleSelected
                                                    : styles.innerCircleUnselected,
                                            ]}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.dividerView} />

                            {/* Malayalam Option */}
                            <TouchableOpacity
                                onPress={() => setSelected(3)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.languageText}>മലയാളം (Malayalam)</Text>
                                <View style={styles.radioButtonContainer}>
                                    <View style={styles.outerCircle}>
                                        <View
                                            style={[
                                                styles.innerCircle,
                                                selected === 3
                                                    ? styles.innerCircleSelected
                                                    : styles.innerCircleUnselected,
                                            ]}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.dividerView} />

                            {/* Hindi Option */}
                            <TouchableOpacity
                                onPress={() => setSelected(4)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={styles.languageText}>हिन्दी (Hindi)</Text>
                                <View style={styles.radioButtonContainer}>
                                    <View style={styles.outerCircle}>
                                        <View
                                            style={[
                                                styles.innerCircle,
                                                selected === 4
                                                    ? styles.innerCircleSelected
                                                    : styles.innerCircleUnselected,
                                            ]}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.dividerView} />
                        </View>

                        <TouchableOpacity onPress={closeModel} style={styles.submitView}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
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
        marginLeft: 5,

        marginRight: 5,
        marginTop: 10,
    },
    radioButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 1
    },
    outerCircle: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 1,
        right: 9,
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
    languageText: {
        fontSize: 14,
        left: 10,
        fontWeight: '400',
        color: '#1F487C',
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

export default LanguageModel;
