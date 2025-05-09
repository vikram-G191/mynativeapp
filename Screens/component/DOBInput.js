import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const formatDateToYMD = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  };
  

const DOBInput = ({ value, onChange, label }) => {
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getSafeDate = (val) => {
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  const [selectedDate, setSelectedDate] = useState(getSafeDate(value));
  const focusAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocused, value]);

  const handleOpen = () => {
    setIsFocused(true);
    setOpen(true);
  };

  return (
    <View style={styles.container}>
      {/* Animated Floating Label */}
      <TouchableWithoutFeedback onPress={handleOpen}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
                transform: [
                    {
                      scale: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.75],
                      }),
                    },
                    {
                      translateY: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [12, -22], // starts more inside
                      }),
                    },
                    {
                      translateX: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0], // tighter in the field
                      }),
                    },
                  ],                  
            },
          ]}
        >
          <Text style={{fontSize: 14, color: '#1F487C',marginLeft:-8}}>{label}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* Touchable Date Field */}
      <TouchableOpacity onPress={handleOpen} style={styles.touchable}>
        <View style={styles.innerRow}>
        <Text style={styles.dateText}>
  {formatDateToYMD(value)}
</Text>

          <Image
            source={require('../assets/datepic1.png')}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        mode="date"
        open={open}
        date={selectedDate}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setSelectedDate(date);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
          setIsFocused(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    top: 6, // move it lower to appear inside initially
    backgroundColor: 'white',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  
  touchable: {
    borderWidth: 0.5,
    borderColor: '#1F487C',
    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#1F487C',
  },
  icon: {
    width: 31,
    height: 27,
  },
});

export default DOBInput;
