import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

const SeatIcon = ({ fillColor = "#A3EBA5", borderColor = "#357935" }) => {
  return (
    <View style={styles.container}>
      <Svg height="52" width="53" viewBox="0 0 53 52">
        {/* Outer Rounded Shape */}
        <Path
          d="M10 20 Q15 5, 40 5 Q45 5, 50 20 L50 35 Q50 45, 10 45 Z"
          fill={fillColor}
          stroke={borderColor}
          strokeWidth="2"
        />
        {/* Inner Backrest */}
        <Path
          d="M15 20 Q18 10, 35 10 Q38 10, 42 20 L42 35 Q42 40, 15 40 Z"
          fill={fillColor}
          stroke={borderColor}
          strokeWidth="1"
        />
        {/* Bottom Part */}
        <Rect x="10" y="35" width="40" height="10" fill={fillColor} stroke={borderColor} strokeWidth="1" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SeatIcon;
