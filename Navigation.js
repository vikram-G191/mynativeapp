import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import SpalshScreen from './Screens/SpalshScreen';
import TripListScreen from './Screens/MainScreen/TripListScreen';
import TravelerScreenDetails from './Screens/TravelerScreen/TravelerScreenDetails';
import CardDesignScreen from './Screens/CardDesignScreen';
import HomeScreen from './Screens/HomeScreen';
import TravelerScreenDetailsSuccess from './Screens/TravelerScreen/TravelerScreenDetailsSuccess';
import BusSeatSelectScreen from './Screens/MainScreen/BusSeatSelectScreen';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import LoginScreenReferal from './Screens/LoginScreen/LoginScreenReferal';
import OTPScreen from './Screens/LoginScreen/OTPScreen';
import BookingHistoryScreen from './Screens/BookingScreen/BookingHistoryScreen';
import CancelBookingScreen from './Screens/BookingScreen/CancelBookingScreen';
import OfferListScreen from './Screens/BookingScreen/OfferListScreen';
import Dashboard from './Screens/bottomnavigation/Dashboard';
import ProfileScreen from './Screens/bottomnavigation/ProfileScreen';
import LoginProfileComponent from './Screens/component/LoginProfileComponent';
import HelpScreen from './Screens/bottomnavigation/HelpScreen';
import PersonalInformation from './Screens/profileScreens/mydetails/PersonalInformation';
import Passengers from './Screens/profileScreens/mydetails/Passengers';
import AccountSettings from './Screens/profileScreens/more/AccountSettings';
import DeleteAcoount from './Screens/profileScreens/more/DeleteAcoount';
import AboutUs from './Screens/profileScreens/more/AboutUs';
import FromeScreen from './Screens/HomeSearch/FromeScreen';
import ToScreen from './Screens/HomeSearch/ToScreen';
import BottomTabs from './Screens/bottomnavigation/BottomTabs';
import ReferalScreen from './Screens/profileScreens/mydetails/ReferalScreen';
import CMS from './Screens/profileScreens/more/CMS';
import TbsWallet from './Screens/profileScreens/payments/TbsWallet';

import { Svg } from 'react-native-svg';
import BackWhite from './Screens/assets/BackWhite';
import SearchAI from './Screens/HomeSearch/SearchAI';
import BusTypeDetails from './Screens/HomeSearch/BusTypeDetails';
import HomeStack from './Screens/bottomnavigation/HomeStack';
import Addpassengericon from './Screens/assets/Addpassengericon';
import AddpassangerScreen from './Screens/profileScreens/mydetails/addpassangerScreen';
import FakeTripListScreen from './Screens/MainScreen/FakeTripListScreen';
import LoginPassengerDetails from './Screens/LoginScreen/LoginPassengerDetails';
import PhoneNumberScreen from './Screens/LoginScreen/PhoneNumberScreen';

const Stack = createStackNavigator();

const Navigation = () => {

    const SearchAITitle = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 6
            }}>
                <Text style={{
                    fontSize: 20,
                    color: 'white',
                    lineHeight: 24,
                    fontWeight: '700',
                    textAlign: 'center'
                }}>Our AI is finding you the <Text style={{ fontWeight: '700', color: 'rgba(255, 192, 31, 1)', fontSize: 20, lineHeight: 26 }}>Best Price!</Text> </Text>
            </View>
        );
    };

    const HeaderBackground = () => (
        <ImageBackground
            source={require('./Screens/assets/HeadBg.png')}
            resizeMode='contain'
            style={{ width: '100%', height: '100%', backgroundColor: '#1F487C', }}
        />
    );

    return (

        <NavigationContainer initialRouteName="SpalshScreen">
            <Stack.Navigator>
                <Stack.Screen name="SpalshScreen" options={{ headerShown: false }} component={SpalshScreen} />
                {/* <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} /> */}
                <Stack.Screen name="TripListScreen" options={{ headerShown: false, gestureEnabled: false, }} component={TripListScreen} />
                <Stack.Screen name="TravelerScreenDetails" options={{ headerShown: false }} component={TravelerScreenDetails} />
                <Stack.Screen name="CardDesignScreen" options={{ headerShown: false }} component={CardDesignScreen} />
                <Stack.Screen name="TravelerScreenDetailsSuccess" options={{ headerShown: false }} component={TravelerScreenDetailsSuccess} />
                <Stack.Screen name="BusSeatSelectScreen" options={{ headerShown: false }} component={BusSeatSelectScreen} />
                <Stack.Screen name="LoginScreen" options={{ headerShown: false }} component={LoginScreen} />
                <Stack.Screen name="LoginScreenReferal" options={{ headerShown: false }} component={LoginScreenReferal} />
                <Stack.Screen name="OTPScreen" options={{ headerShown: false }} component={OTPScreen} />
                <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={Dashboard} />
                <Stack.Screen name="OfferListScreen" options={{ headerShown: false }} component={OfferListScreen} />
                <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} component={ProfileScreen} />
                <Stack.Screen name="LoginProfileComponent" options={{ headerShown: false }} component={LoginProfileComponent} />
                <Stack.Screen name="CancelBookingScreen" options={{ headerShown: false }} component={CancelBookingScreen} />
                <Stack.Screen name="FromeScreen" component={FromeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ToScreen" component={ToScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ReferalScreen" component={ReferalScreen} options={{ headerShown: false }} />
                <Stack.Screen name="FakeTripListScreen" component={FakeTripListScreen} options={{ headerShown: false }} />
                <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false, gestureEnabled: false, }} />
                <Stack.Screen name="BookingHistoryScreenStack" options={{ headerShown: false }} component={BookingHistoryScreen} />

                <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ headerShown: true, headerTitle: 'Help & Support', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="PersonalInformation" component={PersonalInformation} options={{ headerShown: false, headerTitle: 'Personal Information', headerBackTitle: ' ', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="Passengers" component={Passengers} options={{ headerShown: false, headerTitle: 'Passengers', headerBackTitle: ' ', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ headerShown: false, headerTitle: 'Account Settings', headerBackTitle: ' ', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="DeleteAcoount" component={DeleteAcoount} options={{ headerShown: false, headerTitle: 'Account Settings', headerBackTitle: ' ', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false, headerTitle: 'Know About Us', headerBackTitle: ' ', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="CMS" component={CMS} options={{ headerShown: false, headerTitle: 'Know About Us', headerBackTitle: ' ', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="TbsWallet" component={TbsWallet} options={{ headerShown: false, headerTitle: 'Bus Type Details', headerBackTitle: ' ', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="BusTypeDetails" component={BusTypeDetails} options={{ headerShown: false, headerTitle: 'Our AI is finding you the Best Price!', headerLeft: '', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="AddpassangerScreen" component={AddpassangerScreen} options={{ headerShown: false, headerTitle: 'Our AI is finding you the Best Price!', headerLeft: '', headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 }, headerStyle: { backgroundColor: '#1F487C' } }} />
                <Stack.Screen name="HomeStack" options={{ headerShown: false }} component={HomeStack} />
                <Stack.Screen name='LoginPassengerDetails' component={LoginPassengerDetails} options={{ headerShown: false }}/>
                <Stack.Screen name='PhoneNumberScreen' component={PhoneNumberScreen}/>


                <Stack.Screen name="SearchAI" component={SearchAI} options={{
                    headerShown: true,
                    headerTitle: () => <SearchAITitle />,
                    headerBackground: () => <HeaderBackground />,
                    headerLeft: '',
                    headerStyle: { backgroundColor: '#1F487C' }
                }}
                />




            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigation;