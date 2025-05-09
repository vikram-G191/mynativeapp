import React, { useEffect } from 'react';
import {useColorScheme, Appearance, StatusBar} from 'react-native';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './Screens/Redux/Store'; // Correct way to import store
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
const App = () => {
  const colorScheme = useColorScheme() || Appearance.getColorScheme();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async() =>{
    const token = await messaging().getToken()
    console.log("token value" , token);
    
  }

  useEffect(()=>{
    requestUserPermission()
    getToken()
  },[])

  GoogleSignin.configure({
    webClientId: '358198261652-knv8475jo1c241jrmvma7kmp0qofvj8r.apps.googleusercontent.com', // Must be WEB ID
    offlineAccess: true,
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
