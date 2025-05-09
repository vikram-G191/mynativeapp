import { color } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Animated } from 'react-native';
import BusSeater from '../assets/BusSeater';
import { Svg } from 'react-native-svg';


const SeatInfoScreen = ({ visible, onClose }) => {


  return (
    <Modal
    animationType="fade" // Changed from "slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      {/* Transparent backdrop */}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={onClose}
        activeOpacity={1}
      />
  
      {/* Positioned modal content starting at 30% from top */}
      <View style={styles.modalContent}>
        {/* Legend Table */}
        <View style={styles.legendTable}>
          {/* Header Row */}
          <View style={styles.legendHeader}>
            <View style={styles.infoSection}>
              <Image
                source={require('../assets/SeatInfoIcon.png')}
                style={{
                  width: 18,
                  height: 18,
                  marginHorizontal: 5,
                  tintColor: '#1F487C',
                }}
              />
              <Text style={styles.infoText}>Know your seat</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft:10 }}>
              <Text style={styles.headerText}>Unisex</Text>
              <Text style={styles.headerText}>Women</Text>
              <Text style={styles.headerText}>Men</Text>
            </View>
          </View>
  
          {/* Rows */}
          {['Available Seat', 'Selected Seat', 'Booked Seat'].map((rowTitle, rowIndex) => {
            const fillColorUnisex = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#298121' : '#D8D8D8';
            const fillColorWomen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#FF70E7' : '#FFE9FE';
            const fillColorMen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#3FBAFF' : '#CCF6FF';
            const strokeColorUnisex = rowIndex === 0 ? '#298121' : rowIndex === 1 ? 'white' : '#958F8F';
            const strokeColorWomen = rowIndex === 0 ? '#FF70E7' : rowIndex === 1 ? 'white' : '#FF00D5';
            const strokeColorMen = rowIndex === 0 ? '#0088D3' : rowIndex === 1 ? 'white' : '#0088D3';
            const bottomColorUnisex = rowIndex === 0 ? '#298121' : rowIndex === 1 ? '#298121' : '#D8D8D8';
            const bottomColorWomen = rowIndex === 0 ? '#FF70E7' : rowIndex === 1 ? '#FF70E7' : '#FFE9FE';
            const bottomColorMen = rowIndex === 0 ? '#3FBAFF' : rowIndex === 1 ? '#3FBAFF' : '#CCF6FF';
     
            return (
              <View key={rowIndex} style={styles.legendRow}>
                <Text style={styles.rowTitle}>{rowTitle}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={styles.seatIcon}>
                    <Svg style={{ width: 20, height: 22 }}>
                      <BusSeater width="100%" height="100%" bottomColor={bottomColorUnisex} fillColor={fillColorUnisex} strokeColor={strokeColorUnisex} />
                    </Svg>
                  </View>
                  <View style={styles.seatIcon}>
                    <Svg style={{ width: 20, height: 22 }}>
                      <BusSeater width="100%" height="100%" bottomColor={bottomColorWomen} fillColor={fillColorWomen} strokeColor={strokeColorWomen} />
                    </Svg>
                  </View>
                  <View style={styles.seatIcon}>
                    <Svg style={{ width: 20, height: 22 }}>
                      <BusSeater width="100%" height="100%" bottomColor={bottomColorMen} fillColor={fillColorMen} strokeColor={strokeColorMen} />
                    </Svg>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  </Modal>
  
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    position: 'absolute',
    top: '7%',
    left: 0,
    right: 0,
    paddingHorizontal: 6,
  },
  legendTable: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
  },
  legendHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#1F487C',
    fontWeight: '600',
  },
  headerText: {
    fontWeight: '600',
    color: '#1F487C',
    fontSize: 14,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  rowTitle: {
    width: 120,
    fontSize: 14,
    color: '#333',
  },
  seatIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:'12%'
  },
});

export default SeatInfoScreen;
