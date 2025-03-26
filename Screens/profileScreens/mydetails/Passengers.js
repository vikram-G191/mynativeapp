
import React from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, FlatList } from "react-native";
import { Svg } from 'react-native-svg';
import BackWhite from "../../assets/BackWhite";
import { SafeAreaView } from 'react-native-safe-area-context';


const Passengers = (props) => {

    const data = [
        { id: '1', title: 'Raju', iconThemeColor: 'green', Age: 'Male, 24 years' },
        { id: '2', title: 'Mohan', iconThemeColor: 'red', Age: 'Male, 24 years' },
        { id: '3', title: 'Kalanithi', iconThemeColor: 'blue', Age: 'Male, 24 years' },
        { id: '4', title: 'Dhivagar', iconThemeColor: 'orange', Age: 'Male, 24 years' }
    ]

    const renderItem = ({ item }) => {

        return (
            <View style={{ display: 'flex', gap: 5, }}>
                <View style={styles.dividerView} />
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}>
                    <View style={{ flexDirection: 'row', display: 'flex', gap: 10, alignItems: 'center' }}>
                        <View style={{ backgroundColor: item.iconThemeColor, padding: 15, borderRadius: 30 }}>
                            <Image source={require('../../assets/avatar.png')} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F487C' }}>{item.title}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#1F487C' }}>{item?.Age}</Text>
                        </View>
                    </View>
                    <Image source={require('../../assets/Arrow.png')} />
                </TouchableOpacity>
                <View style={styles.dividerView} />
            </View>
        )
    }

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
                            <Text style={styles.topTitle}>Passengers</Text>
                        </View>
                    </ImageBackground>
                </View>

                <ImageBackground source={require('../../assets/appBackgroundImage.png')} style={{ height: '100%', width: '100%' }} >
                    <View style={styles.view}>
                        <View style={{ display: 'flex', gap: 10 }}>
                            <FlatList
                                contentContainerStyle={{ display: 'flex', gap: 10 }}
                                data={data}
                                renderItem={renderItem}
                                scrollEnabled={false}
                            />
                        </View>

                        <View style={{ padding: 20 }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('AddpassangerScreen')} style={styles.submitView} >
                                <Image source={require('../../assets/add.png')} />
                                <Text style={styles.submitText}>Add new passenger</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    bgView: {
        flex: 1,
        backgroundColor: '#E5FFF1'
    },
    dividerView: {
        borderBottomColor: '#1F487C',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
        flex: 1,
        backgroundColor: '#1F487C',
        justifyContent: 'space-between',

    },
    backBtn: {
        alignItems: 'center',
        justifyContent: 'center',
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
    topImageBg1: {

        height: 110,
        flexDirection: 'row',

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
    view: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'space-between',
    },
    detailView: {

    },
    submitView: {
        flexDirection: 'row',
        backgroundColor: '#1F487C',
        borderRadius: 25,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 50
    },
    submitText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19,
        color: '#FFFFFF',
        textAlign: 'center'
    },

})
export default Passengers