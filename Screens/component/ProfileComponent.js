import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";



const ProfileComponent = ({ image, SvgIcon, title, onPress, value, titleStyle, valueStyle, imageStyle, componentStyle, divider }) => {

    return (

        <TouchableOpacity onPress={onPress}>
            <View style={[componentStyle ? componentStyle : { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }]}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    {SvgIcon ? (
                        <View style={imageStyle ? imageStyle : { width: 30, height: 30 }}>
                            {SvgIcon}
                        </View>
                    ) : (
                        <Image resizeMode="contain" style={[imageStyle ? imageStyle : { height: 30, width: 30 }]} source={image} />
                    )}

                    <View>
                        <Text style={[titleStyle ? titleStyle : styles.titleText,]}>{title}</Text>

                        {value && <Text style={[valueStyle ? valueStyle : styles.valueText]}>{value}</Text>}
                    </View>

                </View>

                <View style={{ flexDirection: 'row', right: 5 }}>
                    <Image source={require('../assets/BackArrow.png')} style={{ width: 9.45, height: 12 }} />
                </View>
            </View>
            {divider === true &&
                <View style={styles.dividerView} />
            }

        </TouchableOpacity>

    )

}
const styles = StyleSheet.create({

    dividerView: {
        borderBottomColor: '#1F487C',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 8
    },
    titleText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20,
        fontFamily: 'Inter',
        color: '#1F487C'
    },
    valueText: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Inter',
        lineHeight: 20,
        color: '#1F487C80'
    }

})


export default ProfileComponent