import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomCheckbox = ({ label, checked, onChange }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onChange}>
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <View style={styles.innerCheckbox} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 15.23,
        height: 15.71,
        borderRadius: 0,
        borderWidth: 1.2,
        borderColor: '#1F487C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checked: {
        backgroundColor: '#1F487C',
    },
    innerCheckbox: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 16,
    },
});

export default CustomCheckbox;
