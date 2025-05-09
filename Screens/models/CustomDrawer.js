import React, { useRef } from 'react';
import { Animated, Dimensions, ScrollView, View, Text, StyleSheet } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_HEIGHT = SCREEN_HEIGHT * 0.6;
const MAX_HEIGHT = SCREEN_HEIGHT;

const CustomDrawer = () => {
  const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT)).current;
  const lastScrollY = useRef(0);
  const isExpanded = useRef(false);

  const handleScroll = (e) => {
    const currentScrollY = e.nativeEvent.contentOffset.y;
    
    // Detect scroll direction
    if (currentScrollY > lastScrollY.current + 10 && !isExpanded.current) {
      // Scroll down - expand drawer
      Animated.timing(animatedHeight, {
        toValue: MAX_HEIGHT,
        duration: 300,
        useNativeDriver: false
      }).start(() => isExpanded.current = true);
    } 
    else if (currentScrollY <= 0 && isExpanded.current) {
      // At top - collapse drawer
      Animated.timing(animatedHeight, {
        toValue: MIN_HEIGHT,
        duration: 300,
        useNativeDriver: false
      }).start(() => isExpanded.current = false);
    }
    
    lastScrollY.current = currentScrollY;
  };

  return (
    <Animated.View style={[styles.drawer, { height: animatedHeight }]}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
      >
        {/* Drawer Content */}
        <Text style={styles.header}>Navigation</Text>
        <View style={styles.item}><Text>Home Screen</Text></View>
        <View style={styles.item}><Text>Profile Settings</Text></View>
        <View style={styles.item}><Text>Notifications</Text></View>
        {/* Add more items for scrollable content */}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    width: 250,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    top: 0,
    elevation: 10,
    zIndex: 1000,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  content: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
});

export default CustomDrawer;
