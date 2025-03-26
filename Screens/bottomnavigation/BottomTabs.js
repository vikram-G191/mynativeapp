
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../bottomnavigation/ProfileScreen';
import HelpScreen from '../bottomnavigation/HelpScreen';
import BookingHistoryScreen from "../BookingScreen/BookingHistoryScreen";
import HomeScreen from '../HomeScreen';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import BusTypeDetails from '../HomeSearch/BusTypeDetails';
import HomeStack from './HomeStack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {

  const iconsvg1 = (color) => `
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="40" height="40" fill="url(#pattern0_514_815)"/>
<defs>
<pattern id="pattern0_514_815" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_514_815" transform="scale(0.00666667)"/>
</pattern>
<image id="image0_514_815" width="150" height="150" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAABw1JREFUeF7tne2SqzgMRJP3f+hsZaoym5shqG3rYIF7/4L10X2QDZm6e7/5PysAKHAHYjqkFbgZLEOAKGCwEFkd1GCZAUQBg4XI6qAGywwgChgsRFYHNVhmAFHAYCGyOqjBMgOIAgYLkdVBDZYZQBQwWIisDmqwzACigMFCZHVQg2UGEAUMFiKrgxosM4AoYLAQWR3UYJkBRAGDhcjqoAbLDCAKGCxEVgc1WGYAUcBgIbI6qMEyA4gCBguR1UENlhlAFDBYiKwOarDMAKKAwdqR9fF4PL5dvt/viHZ7OXsIoOqMakHEiZJWv95ibqZxLXlbNMysUc1rsD6U6jU3w7ze3JHZGbVFOT6vG6w3RUaNHTFwNHdk/EhtUeyt6wbrdrtlmtprYGYNm0ZDZ8KvZ9AeGq+0hjK0FTCqjpdXrfWMerz0xKpkZqVaRqF6rl8WLNrI1klB1+OJlfG4BDFoE/+8IQnnG7omgwWCRZu3V3pkLF1blD9b9mW2Qto41ZhvBtP1GSzVoYb7aNMaSvm5dctkukaD1epSsfOUWv6n0QZLVa7AfbRZoy2+w0XX6ok16lbyl/SEcnZDvAw3WLTSg/FpgwbL21z+hIuu2xNrwDnKnCO3rIH2pclIxf/z7e6oRHSeI6B69UDlIjXyxOpQlzI6MoPK2yFBuCTqJQzQeMOpP5CSxqpGkDU0eumtMEMw0lAVqjNtja09jXp0yolFQTUiPlXTqMGv9SO99dRwOrAoAzOEp2rrMfbPW5rwFxYZeX5BzgxGx6KMy4DqvXeqzhF9s3uMajnFxCKNUgR/z6/c/xSdrDkydeu6WndP7M18WYGoOKRBitjf8o+spbTai6vUm1lX6YlFQaWKHOVX4kQxMs00WIKalCEKDC1bmRKP6kWQ8fcWpc6WeNG9JScWZYQqbmt+Km5kXst1tcaWmLsTMitQRpxWQ1tyKsKO5Ffit0zClt6Ue9X6lFjKPWUm1oipUaOKqFn5j8wV9f1+XamrJV50bwmwskz9bFYVMzu/kjc7Z2j0ah9IKYEVc8mtSclP9b4FmVJPBGfL9akTixJWEZHK3bP9VKqlBZ5yh3dSyCpQtQJGavKsRdElC6qffJnBlFikgIp4ZP7dJ1g445C1Kdoo/qn3HAoWJZwqGpVfFnshuA4DizL1LFC94FPqpbQ6cks8BCxKqNkmqZOqymeQFrh7e/vNMRpgbz0FlPrkkfkzdJv5YCi5R3rEJhZpqiIKmX9E8J7pRfaiaNnTLwLWbCHI/D0iR2sUc8melPxRD38emNYF0f2UAGrzVP6o79HrSn9kb0r+lh5TJxbVuNI0lbtFzNF7lT6fOahe1fxKnylgUY1e5ZCuGPF+j2IwpbmSW+lnGCyqwVWhavkkMFv7PcCGwJrdGJlfeSrpe5TpQWqg5P+mQTdYVENKM1RuGpSe+LP1UPJv9dUFFmWs0gSVu8f0I9fM1EbJPfS5gTRVKZ7MfyQkvblmaqTk/ucFRG2SNFUpmsyvalDhvtlaKfl/XrwUsUhTlULJ/Er/1e6ZrZmSPwSLMlUpjspdDZSeembrF+XfBYsyNiqK/LrcY2LlNTO13Mu9CRYF1OofPSlAK8L1ByxDRdnPxp0J19bA+AcsQ8WaT0evBBcO1uxmaTOrxZ+p93vuX7CIaTWzyWqGH13PDO03wcp+E5vR2NHmVc93tAc4WEc3VN3gmfUd5cVnnvS3wqgRYsudadwZckeeZOxWIVi9SY4o/gwmVq4x8qj3od+K+/XLe0uSqOBeWCubdNbasr36Fm/4J53sQs9q2JnqzvKs+Sedd5H2JldWgWcy5Sq1jnoXre/+64YosLe/+gj2eqisC8F6yfOaXErQzzX1JV6zwh4v1TUyWD3St7wA9MT3mjEFVEh6shisHtUussZgXcTIam0YrGqOXKQeg3URI6u1YbCqOXKRegzWRYys1obBqubIReoxWBcxslobBquaIxepx2BdxMhqbRisao5cpB6DdREjq7VhsEBHKHHP8AM81fvTruV/hKbENVjgNFhZ3JV798QC/8+jBssTCzkOGCyDZbAABhBRX3Wu/NSu3LvPWD5jYYMFC/ykduWnduXePbE8sbDBggX2xHo8gDNxakjq47AnlicWNliwwJ5Ynlip4/U92MoH2JV791borRDbsbDA3gq9FXorBBTwVgiI6p901v447DOWz1jYUQgL7DOWz1jYZrjyOWPl3r0VeivEdiwssLdCb4XeCgEFvBUCovpzgz83eCu83xENPLE8sQwWwAAiqrdCb4UGy1shMK/8bzfcqD/P9RkL4fX/oNUFXhUsqu+X8+hWeIaPpJTAqz5Qh4FVHa4VwaJ6ft/88IlV/Q2RErnqxKL6/TxRHQYWfJRz+GIKGKxihlylHIN1FSeL9WGwihlylXL+A3RJFNMj1qtBAAAAAElFTkSuQmCC"/>
</defs>
</svg>
`;

  const iconsvg2 = (color) => `
 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="28" height="28" fill="url(#pattern0_514_809)"/>
<defs>
<pattern id="pattern0_514_809" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_514_809" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_514_809" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;

  const iconsvg3 = (color) => `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="0.307617" width="28" height="28" fill="url(#pattern0_514_805)"/>
<defs>
<pattern id="pattern0_514_805" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_514_805" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_514_805" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>

`;

  const iconsvg4 = (color) => `
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="28" height="28" fill="url(#pattern0_514_812)"/>
<defs>
<pattern id="pattern0_514_812" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_514_812" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_514_812" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;


  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarItemStyle: { borderRadius: 25 },
        tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.2)',
        tabBarInactiveBackgroundColor: '#1F487C',
        tabBarStyle: { backgroundColor: '#1F487C', }
      })}
    >

      <Tab.Screen name="HomeStack" component={HomeStack} options={{
        tabBarLabel: 'Home',

        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: '600', fontSize: 12,
          lineHeight: 15, color: '#FFF',
        },
        tabBarIcon: ({ focused, color }) => {
          return (
            focused ?

              Platform.OS === 'ios' ? (
                <Image
                  source={require('../assets/home.gif')}
                  resizeMode='contain'
                  style={{ height: 35, width: 40 }}
                />
              ) : (
                <FastImage
                  source={require('../assets/home.gif')}
                  style={{ height: 36, width: 40 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )
              :
              <SvgXml
                xml={iconsvg1(focused ? '#5C469E' : '#797C88')}
                width={30}
                height={30}
                viewBox="0 0 40 40"
                color={color} // Pass the color prop
              />
          )
        }
      }} />

      <Tab.Screen name="BookingHistoryScreen" component={BookingHistoryScreen} options={{
        headerShown: false,
        tabBarLabel: 'Bookings',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12, lineHeight: 15, color: '#FFF' },
        tabBarIcon: ({ focused, color }) => {
          return (
            focused ?
              Platform.OS === 'ios' ? (
                <Image source={require('../assets/ticket.gif')}
                  resizeMode='contain'
                  style={{ height: 40, width: 40 }} />

              ) : (
                <FastImage
                  source={require('../assets/ticket.gif')}
                  style={{ height: 40, width: 40 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )
              :
              <SvgXml
                xml={iconsvg2(focused ? '#5C469E' : '#797C88')}
                width={30}
                height={30}
                viewBox="0 0 32 32"
                color={color} // Pass the color prop
              />)
        }
      }} />

      <Tab.Screen name="HelpScreen" component={HelpScreen} options={{
        headerShown: false,
        headerTitle: 'Help & Support',
        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: '700', lineHeight: 20 },
        headerStyle: { backgroundColor: '#1F487C', },
        tabBarLabel: 'Help',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12, lineHeight: 15, color: '#FFF' },
        tabBarIcon: ({ focused, color }) => {
          return (
            focused ?

              Platform.OS === 'ios' ? (
                <Image source={require('../assets/help.gif')}
                  resizeMode='contain'
                  style={{ height: 40, width: 40 }} />


              ) : (
                <FastImage
                  source={require('../assets/help.gif')}
                  style={{ height: 40, width: 40 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )

              :
              <SvgXml
                xml={iconsvg3(focused ? '#5C469E' : '#797C88')}
                width={30}
                height={30}
                viewBox="0 0 32 32"
                color={color} // Pass the color prop
              />)
        }
      }} />

      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
        headerShown: false,
        headerTitle: ' ',
        headerStyle: { backgroundColor: '#1F487C', height: 60 },
        tabBarLabel: 'Profile',
        tabBarLabelStyle: { fontWeight: '600', fontSize: 12, lineHeight: 15, color: '#FFF' },
        tabBarIcon: ({ focused, color }) => {
          return (
            focused ?
              Platform.OS === 'ios' ? (
                <Image source={require('../assets/profile.gif')}
                  resizeMode='contain'
                  style={{ height: 40, width: 40 }} />
              ) : (
                <FastImage
                  source={require('../assets/profile.gif')}
                  style={{ height: 40, width: 40 }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )
              :
              <SvgXml
                xml={iconsvg4(focused ? '#5C469E' : '#797C88')}
                width={30}
                height={30}
                viewBox="0 0 32 32"
                color={color} // Pass the color prop
              />)
        }
      }} />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 60,
  },
  tabBarItem: {
    borderRadius: 10,
    margin: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BottomTabs