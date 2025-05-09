import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const CustomScroll = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 10 }}
      >
        {/* Your content here */}
      </ScrollView>

      {/* Fake scrollbar track */}
      <View style={styles.scrollBarTrack}>
        <Animated.View
          style={[
            styles.scrollBarThumb,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 1000], // adjust based on your content
                    outputRange: [0, 200], // scrollbar travel
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollBarTrack: {
    position: 'absolute',
    right: 2,
    top: 10,
    bottom: 10,
    width: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
  },
  scrollBarThumb: {
    width: 6,
    height: 60,
    backgroundColor: '#1F487C',
    borderRadius: 3,
  },
});

export default CustomScroll;
