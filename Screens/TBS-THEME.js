import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Dimensions,
    View,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { GetCurrentTheme } from './API/TBSapi/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Text } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const TBSTHEME = ({ isReduced, setIsReduced }) => {

    const [moveAnim] = useState(new Animated.Value(0));
    const dispatch = useDispatch()

    useEffect(() => {
        GetCurrentTheme(dispatch);
    }, []);

    const [lazyloading, setLazyLoading] = useState(false);

    const apiCrmImage = 'https://crm.thebusstand.com';

    // const apiCrmImage = `http://192.168.90.47:4000`

    const currentTheme = useSelector(state => state?.productReducer?.current_theme)

    useEffect(() => {
        // Continuous loop without any delay
        Animated.loop(
            Animated.timing(moveAnim, {
                toValue: 1,
                duration: 8000, // Duration of one full cycle (can be adjusted)
                easing: Easing.linear, // Ensures smooth, constant speed
                useNativeDriver: true,
            }),
            { iterations: -1 } // Make sure it loops indefinitely
        ).start();
    }, [moveAnim]);

    // Smooth translation without delay between loops
    const roadTranslateX = moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * -0.00025 * 10000], // Adjust based on the image width or desired movement
    });

    const [busAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        // Continuous loop without any delay
        Animated.loop(
            Animated.timing(busAnim, {
                toValue: 1,
                duration: 10000, // Duration of one full cycle (can be adjusted)
                easing: Easing.linear, // Ensures smooth, constant speed
                useNativeDriver: true,
            }),
            { iterations: -1 } // Make sure it loops indefinitely
        ).start();
    }, [busAnim]);
    // Smooth translation without delay between loops
    const buildingsTranslateX = busAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * -0.0003 * 10000], // Adjust based on the image width or desired movement
    });


    const [doubleAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        // Continuous loop without any delay
        Animated.loop(
            Animated.timing(doubleAnim, {
                toValue: 1,
                duration: 10000, // Duration of one full cycle (can be adjusted)
                easing: Easing.linear, // Ensures smooth, constant speed
                useNativeDriver: true,
            }),
            { iterations: -1 } // Make sure it loops indefinitely
        ).start();
    }, [doubleAnim]);
    // Smooth translation without delay between loops
    const doubleTranslateX = doubleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.12 * 10000], // Adjust based on the image width or desired movement
    });


    const [autoAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        // Continuous loop without any delay
        Animated.loop(
            Animated.timing(autoAnim, {
                toValue: 1,
                duration: 10000, // Duration of one full cycle (can be adjusted)
                easing: Easing.linear, // Ensures smooth, constant speed
                useNativeDriver: true,
            }),
            { iterations: -1 } // Make sure it loops indefinitely
        ).start();
    }, [autoAnim]);
    // Smooth translation without delay between loops
    const autoTranslateX = autoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.15 * 10000], // Adjust based on the image width or desired movement
    });

    const [singleAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        // Continuous loop without any delay
        Animated.loop(
            // Animated.delay(3000),
            Animated.timing(singleAnim, {
                toValue: 1,
                duration: 10000, // Duration of one full cycle (can be adjusted)
                easing: Easing.linear, // Ensures smooth, constant speed
                useNativeDriver: true,
            }),
            { iterations: -1 } // Make sure it loops indefinitely
        ).start();
    }, [singleAnim]);

    // Smooth translation without delay between loops
    const singleTranslateX = singleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.17 * 10000], // Adjust based on the image width or desired movement
    });


    const [bikeAnime] = useState(new Animated.Value(0));

    useEffect(() => {
        // Continuous loop without any delay
        Animated.loop(
            // Animated.delay(3000),
            Animated.timing(bikeAnime, {
                toValue: 1,
                duration: 8000, // Duration of one full cycle (can be adjusted)
                easing: Easing.linear, // Ensures smooth, constant speed
                useNativeDriver: true,
            }),
            { iterations: -1 } // Make sure it loops indefinitely
        ).start();
    }, [bikeAnime]);

    // Smooth translation without delay between loops
    const bikeTranslateX = bikeAnime.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.12 * 10000], // Adjust based on the image width or desired movement
    });


    const screenHeight = Dimensions.get('window').height;

    // Toggle the height of the first View
    const handlePress = () => {
        setIsReduced(!isReduced);
    };

    return (
        <SafeAreaView style={styles.safeAreaView} edges={['right', 'left']}>
            <View
                style={[
                    styles.firstView,
                    // { height: isReduced ? screenHeight * 0.05 : screenHeight * 0.40 },
                ]}
            >
                <ImageBackground
                    source={currentTheme?.background
                        ? { uri: `${apiCrmImage}${currentTheme.background}` }
                        : require('./assets/Theme/Sky/General_Sky.png')}

                    style={[styles.background_theme, {
                        width: width * 1,
                        height: height * 0.4,
                    }]} // Dynamically set width and height to screen size
                >
                    <Text style={styles.text}>BOOK YOUR TRIP WITH US</Text>
                </ImageBackground>
                <Animated.View
                    style={{
                        transform: [{ translateX: buildingsTranslateX }],
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 15,
                        left: 0,
                        resizeMode: 'contain',
                        // zIndex: 1,
                    }}
                >
                    <Image
                        source={currentTheme?.building
                            ? { uri: `${apiCrmImage}${currentTheme.building}` }
                            : require('./assets/Theme/Buildings/General_Building_1.png')}
                        style={{ height: 240, width: width * 3.25, resizeMode: 'contain' }}
                    />
                    <Image
                        source={currentTheme?.building
                            ? { uri: `${apiCrmImage}${currentTheme.building}` }
                            : require('./assets/Theme/Buildings/General_Building_1.png')}
                        style={{ height: 240, width: width * 3.25, resizeMode: 'contain' }}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{ translateX: roadTranslateX }],
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: -40,
                        left: 0,
                        resizeMode: 'contain',
                        // zIndex: 2,
                    }}
                >
                    <Image
                        source={currentTheme?.road
                            ? { uri: `${apiCrmImage}${currentTheme.road}` }
                            : require('./assets/Theme/Roads/General_road_1.png')}
                        style={{ height: 240, width: width * 2.5, resizeMode: 'contain' }}
                    />
                    <Image
                        source={currentTheme?.road
                            ? { uri: `${apiCrmImage}${currentTheme.road}` }
                            : require('./assets/Theme/Roads/General_road_1.png')}
                        style={{ height: 240, width: width * 2.5, resizeMode: 'contain' }}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{ translateX: doubleTranslateX }],
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 5,
                        left: -500,
                        resizeMode: 'cover',
                        // zIndex: 2,
                    }}
                >
                    <Image
                        source={require('./assets/Theme/Vehicles/doubleducker.png')}
                        style={{ height: 95, width: width * 1, resizeMode: 'contain' }}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{ translateX: autoTranslateX }],
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 0,
                        left: -700,
                        resizeMode: 'cover',
                        // zIndex: 2,
                    }}
                >
                    <Image
                        source={require('./assets/Theme/Vehicles/car1.png')}
                        style={{ height: 72, width: width * 1, resizeMode: 'contain' }}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{ translateX: singleTranslateX }],
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: -2,
                        left: -1300,
                        resizeMode: 'cover',
                        // zIndex: 2,
                    }}
                >
                    <Image
                        source={require('./assets/Theme/Vehicles/bus1.png')}
                        style={{ height: 95, width: width * 1.15, resizeMode: 'contain' }}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        transform: [{ translateX: bikeTranslateX }],
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: -2,
                        left: -500,
                        resizeMode: 'cover',
                        // zIndex: 2,
                    }}
                >
                    <Image
                        source={require('./assets/Theme/Vehicles/bike.png')}
                        style={{ height: 57, width: '100%', resizeMode: 'contain' }}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    safeAreaView: {
        flex: 1,
        backgroundColor: '#E5FFF1',
    },
    container: {
        flex: 1,
        backgroundColor: '#E5FFF1',
        // borderTopLeftRadius: 100,
        // zIndex: 1
    },
    image: {
        width: 34,
        height: 40,
        left: 10,
    },
    image1: {
        width: 90,
        height: 40,
        right: 10,
    },
    flagView: {
        flexDirection: 'row',
    },
    icon: {
        width: 22,
        height: 27,
        left: 1,
    },
    icon1: {
        height: 25,

        position: 'absolute',
    },
    icon2: {
        width: 140,
        height: 28,
        position: 'absolute',
    },
    iconsearch: {
        width: 16.93,
        height: 25,
        left: 1,
        alignSelf: 'center',
    },
    squareBorder: {
        marginTop: 25,
        borderWidth: 2,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: '#1F487C',
    },
    squareBorder1: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 62,
        borderWidth: 2,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: '#1F487C',
    },
    squareBorder2: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 10,
        justifyContent: 'center',
        height: 42,
        borderWidth: 2,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
        backgroundColor: '#1F487C',
        borderColor: '#1F487C',
    },
    squareBorder3: {
        width: 'auto',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        height: 78.2,
        borderWidth: 2,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#1F487C',
    },
    infoContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginVertical: 5,
    },
    distanceText: {
        padding: 4,
        fontSize: 10,
        color: 'white',
    },
    bookButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 65,
        height: 30,
        backgroundColor: '#1F487C',
        borderRadius: 7.5,
        marginRight: 5,
    },
    bookText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderBottomWidth: 1,

        margin: 5,
        fontSize: 14,
        fontWeight: '400',
    },
    background: {
        flex: 1,
        resizeMode: 'contain',
        height: '100%',
        // zIndex: 1
    },
    backgroundWrapper: {
        flex: 1, // Ensures the wrapper takes up the full available space
        justifyContent: 'center', // Centering text vertically
        alignItems: 'center', // Centering text horizontally
    },
    background_theme: {
        flex: 1,
        resizeMode: 'contain',

        // justifyContent: 'center', // Centers vertically
        alignItems: 'center', // Centers horizontally
    },
    scrollView: {
        flexDirection: 'column',
    },
    overlay: {
        flexDirection: 'column',
        margin: 20,
        marginVertical: 5,
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '900',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
        textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x, y)
        textShadowRadius: 5, // Shadow blur radius
        // marginLeft: 17.5,
        marginTop: 60
    },
    womenBookingText: {
        alignSelf: 'center',
        left: 20,
        fontSize: 15,
        fontWeight: '600',
        color: '#062B5A',
    },
    searchText: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    recentlySearchedText: {
        marginTop: 10,
        color: '#1F487C',
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '700',

    },
    dateButton: {
        justifyContent: 'center',
        width: 68,
        height: 40,
        backgroundColor: '#67DCFF',
        borderRadius: 15,
    },
    dateButton1: {
        justifyContent: 'center',
        width: 78,
        height: 40,
        backgroundColor: '#67DCFF',
        borderRadius: 15,
    },
    dateButtonText: {
        alignSelf: 'center',
        color: '#062B5A',
        fontWeight: '600',
    },
    item: {
        margin: 5,
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
    },
    imageimg: {
        width: 237,
        height: 97,
        borderRadius: 10,
    },
    roadImage: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        width: '225%',
        height: '65%',
        resizeMode: 'cover',
        // zIndex: 1,
        // transform: [
        //   { scaleX: 20 }, // Scale width (similar to the '1000%' in CSS, though a massive scale might need tweaking)
        //   { scaleY: 20 }, // Scale height based on the 65% height
        // ],
    },
    dayContainer: {
        width: 50,
        height: 60,
        backgroundColor: 'transparent', // fully transparent
        borderColor: '#1F487C',         // dark blue border
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderWidth: 1,                 // you can adjust thickness if needed
        borderRadius: 8,                // rounded corners
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayName: {
        color: '#1F487C'
    },
    dayNum: {
        color: '#1F487C'
    },
    selectingScrollDateContainer: {
        backgroundColor: '#1F487C', // Background color for selected date
        borderRadius: 8,  // Optional: Add border radius for rounded corners
    },
    selectingScrollDateText: {
        color: 'white', // White text color for the selected date
    },
});
export default TBSTHEME