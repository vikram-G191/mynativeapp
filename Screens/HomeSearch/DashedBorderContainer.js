import React from 'react';
import { View, StyleSheet } from 'react-native';

const DashedBorderContainer = () => {
    return (
        <View style={styles.imageContainer}>
            {/* Top Left */}
            <View style={[styles.dash, styles.topLeft]} />
            {/* Top Right */}
            <View style={[styles.dash, styles.topRight]} />
            {/* Bottom Left */}
            <View style={[styles.dash, styles.bottomLeft]} />
            {/* Bottom Right */}
            <View style={[styles.dash, styles.bottomRight]} />
            {/* Top Center */}
            <View style={[styles.dash, styles.topCenter]} />
            {/* Middle Left */}
            <View style={[styles.dash, styles.middleLeft]} />
            {/* Middle Right */}
            <View style={[styles.dash, styles.middleRight]} />
            {/* Bottom Center */}
            <View style={[styles.dash, styles.bottomCenter]} />
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        margin: 20,
        height: 290,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    dash: {
        position: 'absolute',
        width: 20, // Adjust this for the length of the dashes
        height: 2,  // Adjust this for the thickness of the dashes
        backgroundColor: 'red',
    },
    topLeft: {
        top: 0,
        left: 0,
    },
    topRight: {
        top: 0,
        right: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
    },
    topCenter: {
        top: 0,
        left: '50%',
        transform: [{ translateX: -10 }],
    },
    middleLeft: {
        top: '50%',
        left: 0,
        transform: [{ translateY: -1 }],
    },
    middleRight: {
        top: '50%',
        right: 0,
        transform: [{ translateY: -1 }],
    },
    bottomCenter: {
        bottom: 0,
        left: '50%',
        transform: [{ translateX: -10 }],
    },
});

export default DashedBorderContainer;
