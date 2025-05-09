import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button, Dimensions, Animated } from 'react-native';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

const FilterModal = ({ visible, onClose }) => {
  const [price, setPrice] = useState(500);
  const minPrice = 260;
  const maxPrice = 1260;

  const sliderWidth = width * 0.7; // 70% of the screen width
  const thumbWidth = 30; // Assume the thumb is 30px wide (adjust if different)
  const labelWidth = 50; // Assume the label is 50px wide (adjust if different)

  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Initial position calculation
    handleValueChange(price);
  }, []);

  const handleValueChange = (value) => {
    setPrice(value);

    // Calculate the exact position of the thumb
    const ratio = (value - minPrice) / (maxPrice - minPrice);
    const position = ratio * (sliderWidth/2) - (thumbWidth / 2) -40;

    // Update the animated value
    Animated.timing(animatedValue, {
      toValue: position,
      duration: 100, // smooth transition
      useNativeDriver: false,
    }).start();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            <Text style={styles.menuItem}>Vehicle Type</Text>
            <Text style={styles.menuItem}>Star Ratings</Text>
            <Text style={[styles.menuItem, styles.activeMenuItem]}>Price Range</Text>
            <Text style={styles.menuItem}>Boarding Points</Text>
            <Text style={styles.menuItem}>Boarding Time</Text>
            <Text style={styles.menuItem}>Travel Operators</Text>
            <Text style={styles.menuItem}>Dropping Points</Text>
            <Text style={styles.menuItem}>Dropping Time</Text>
            <Text style={styles.menuItem}>Amenities</Text>
          </View>

          {/* Right Section */}
          <View style={styles.rightSection}>
            <Text style={styles.priceRangeText}>Price Range</Text>
            <View style={styles.sliderContainer}>
              {/* Floating label */}
              <Animated.View
                style={[
                  styles.floatingLabel,
                  {
                    transform: [{ translateX: animatedValue }],
                  },
                ]}
              >
                <Text style={styles.floatingLabelText}>₹{price}</Text>
              </Animated.View>

              <Slider
                style={styles.slider}
                minimumValue={minPrice}
                maximumValue={maxPrice}
                step={10}
                value={price}
                onValueChange={handleValueChange}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1fb28a"
              />
              <View style={styles.labelContainer}>
                <Text style={styles.label}>₹{minPrice}</Text>
                <Text style={styles.label}>₹{maxPrice}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Button title="CLEAR" onPress={() => setPrice(minPrice)} color="#1f487e" />
          <Button title="APPLY" onPress={onClose} color="#1f487e" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
   
  },
  modalContent: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#e8f0f2',
    borderRadius: 10,
    padding: 20,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
  },
  rightSection: {
    flex: 1.5,
    justifyContent: 'flex-start',
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 17,
  },
  activeMenuItem: {
    backgroundColor: '#1f487e',
    color: '#fff',
    borderRadius: 10,
  },
  priceRangeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  sliderContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  slider: {
    width: '100%',
    backgroundColor:'red',
    height: 40,
  },
  labelContainer: {
    flexDirection: 'row',
    backgroundColor:'blue',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor:'white',
    color: '#1f487e',
  },
  floatingLabel: {
    position: 'absolute',
    top: -40,
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingLabelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'green',
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

export default FilterModal;
