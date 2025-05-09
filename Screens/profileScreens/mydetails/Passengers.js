
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, FlatList } from "react-native";
import { Svg } from 'react-native-svg';
import BackWhite from "../../assets/BackWhite";
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import { deletePassengerById, downloadTicket, getAllPassengers } from "../../API/TBSapi/MyAccount/Profile";
import { getUserId } from "../../Utils/STorage";
import { useFocusEffect } from "@react-navigation/native";


const Passengers = (props) => {

    const data = [
        { id: '1', title: 'Raju', iconThemeColor: 'green', Age: 'Male, 24 years' },
        { id: '2', title: 'Mohan', iconThemeColor: 'red', Age: 'Male, 24 years' },
        { id: '3', title: 'Kalanithi', iconThemeColor: 'blue', Age: 'Male, 24 years' },
        { id: '4', title: 'Dhivagar', iconThemeColor: 'orange', Age: 'Male, 24 years' }
    ]

    const [userId, setUserId] = useState("")
    const [PassengerData, setPassengerData] = useState([])
    //   useFocusEffect(
    //     useCallback(() => {
    //       getUserId().then((id) => {
    //         setUserId(id);
    //         console.log("id", id);
    //       });
    //     }, []))

    // useEffect(()=>{
    //     getUserId().then((id) => {
    //         setUserId(id);
    //         console.log("id", id);
    //       });
    //       if(userId){
    //     const response = getAllPassengers(userId)
    //       }
    // },[])
    const handledownload = async () => {
        console.log("emaksdhfkjdhfkd");
        const id = "AY5231715566";
        const response = await downloadTicket(id)
        console.log(response);

    }

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
            console.log("User ID:", id);
        };

        fetchUserId();
    }, []);

    // useEffect(() => {
    //     if (!userId) return;
    //     const fetchPassengers = async () => {
    //         const response = await getAllPassengers(userId);
    //         console.log("Passengers:", response.add_passenger_details);
    //         setPassengerData(response.add_passenger_details)
    //     };

    //     fetchPassengers();
    // }, [userId]);
    const fetchPassengers = async () => {
        const response = await getAllPassengers(userId);
        console.log("Passengers (on focus):", response.add_passenger_details);
        setPassengerData(response.add_passenger_details);
    };

    useFocusEffect(
        useCallback(() => {
            if (!userId) return;
            fetchPassengers();
        }, [userId])
    );
    const colors = [
        '#2980B9', // Blue
        '#27AE60', // Green
        '#8E44AD', // Purple
        '#E91E63', // Pink
        '#2ECC71', // Light green
        '#3498DB', // Light blue
        '#9B59B6', // Light purple
        '#34495E', // Dark gray-blue
        '#16A085', // Jade
        '#D35400', // Dark orange
        '#C0392B', // Dark red
        '#7F8C8D', // Gray
    ];

    const handleDelete = async (id) => {
        const response = await deletePassengerById(id)
        if (response.success === true) {
            fetchPassengers()
        }
    }
    const renderItem = ({ item, index }) => {
        const bgColor = colors[index % colors.length];
        console.log(item.tbs_add_pax_id);

        return (
            <View style={{ display: 'flex', gap: 5, }}>
                <View style={styles.dividerView} />
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15 }}
                    onPress={() => props.navigation.navigate("AddpassangerScreen", { passengerId: item.tbs_add_pax_id })}
                >
                    <View style={{ flexDirection: 'row', display: 'flex', gap: 10, alignItems: 'center' }}>
                        <View style={{ backgroundColor: bgColor, padding: 15, borderRadius: 50 }}>
                            <Image source={require('../../assets/avatar.png')} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F487C' }}>{item.user_name}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#1F487C' }}> {item?.gender?.charAt(0).toUpperCase() + item?.gender?.slice(1)} {item?.age} </Text>
                        </View>
                    </View>
                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center", gap: 20, }}>
                        <TouchableOpacity style={{ backgroundColor: '#1F487C', width: 60, borderRadius: 5, padding: 2 }} onPress={() => handleDelete(item.tbs_add_pax_id)}>
                            <Text style={{ color: '#FFF', textAlign: 'center' }}>Delete</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate("AddpassangerScreen", { passengerId: item.tbs_add_pax_id })}>
                            <Image source={require('../../assets/Arrow.png')} />
                        </TouchableOpacity>
                    </View>
                    {/* <Image onPress={()=> props.navigation.navigate("AddpassangerScreen",{passenger:item.tbs_add_pax_id})} source={require('../../assets/Arrow.png')} /> */}
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
                        <View style={{ display: 'flex', gap: 10, paddingBottom: 10 }}>
                            <FlatList
                                contentContainerStyle={{ display: 'flex', gap: 10 }}
                                data={PassengerData}
                                renderItem={renderItem}
                                scrollEnabled={true}
                            />
                        </View>


                    </View>
                    <View style={{ padding: 20 }}>
                        <TouchableOpacity onPress={() => {
                            // handledownload
                            props.navigation.navigate('AddpassangerScreen')

                        }}
                            style={styles.submitView} >
                            <Image source={require('../../assets/add.png')} />
                            <Text style={styles.submitText}>Add new passenger</Text>
                        </TouchableOpacity>
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