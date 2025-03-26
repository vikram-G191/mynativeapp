import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import Svg from 'react-native-svg';
import LandingIcon from './assets/LandingIcon'; // Import your LandingIcon component
import BusList from './assets/BusList'; // Import your BusList component
import BusList1 from './assets/BusList1'; // Import your BusList1 component
import BusList2 from './assets/BusList2'; // Import your BusList2 component

const CardDesignScreen = () => {
  const data = Array.from({ length: 6 }, (_, index) => ({ key: `${index}` }));
  const [busColor, setBusColor] = useState('#04B9EF');
  const [busColor1, setBusColor1] = useState('#04B9EF');

  const renderItem = () => (
    <View style={styles.wrapper}>
      <Svg style={styles.background}>
        <BusList width="100%" height="100%" color={busColor} color1={busColor1} />
      </Svg>

      <Text style={{ fontSize: 10, color: 'black', left: 22, top: 7 }}>Red Bus </Text>
      <View style={styles.busListContainer}>

        <BusList1 width="100%" height="100%" color={busColor} />
        <Text style={styles.rsText}>Rs 12,000</Text>
      </View>
      <Svg style={styles.icon}>
        <BusList2 width="100%" height="100%" />
      </Svg>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.welcomeText}>Welcome To The Bus Stand1</Text>

      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          numColumns={3}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  list: {
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
    width: 110, // adjust as needed
    height: 65, // adjust as needed
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  foreground: {
    width: '70%',
    alignSelf: 'flex-end',
    bottom: 3.5,
    left: 4.7,
    height: '100%',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -12.5 }],
    width: '50%', // adjust as needed
    height: '50%', // adjust as needed
  }, busListContainer: {
    position: 'relative',
    width: 85,
    height: 26,
    top: 15.5,
    left: 29,
  },
  rsText: {
    position: 'absolute',
    top: 0,
    left: 4,
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 10,
  },
});

export default CardDesignScreen;
