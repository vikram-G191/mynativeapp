import React from 'react';
import {useColorScheme, Appearance, StatusBar} from 'react-native';
import Navigation from './Navigation';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './Screens/Redux/Store'; // Correct way to import store

const App = () => {
  const colorScheme = useColorScheme() || Appearance.getColorScheme();

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
