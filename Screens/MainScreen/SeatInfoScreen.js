import { color } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Animated } from 'react-native';
import BusSeater from '../assets/BusSeater';
import { Svg } from 'react-native-svg';


const SeatInfoScreen = ({ visible, onClose }) => {


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
    
      <View style={styles.modalContainer}>
     
      <TouchableOpacity
          style={{flex: 1, width: '100%'}}
          onPress={onClose}></TouchableOpacity>
         {/* Legend Table */}
         <View style={styles.legendTable}>
       
        {/* Header Row */}
        <View style={styles.legendHeader}>
        <View style={styles.infoSection}>
        <Image
              source={require('../assets/SeatInfoIcon.png')}
              style={{ width: 18, height: 18,marginHorizontal: 5,tintColor:'#1F487C'
              }}
            />
        <Text style={styles.infoText}>Know your seat</Text>
           </View>
           <View style = {{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={styles.headerText}>Unisex</Text>
          <Text style={styles.headerText}>Women</Text>
          <Text style={styles.headerText}>Men</Text>
          </View>
        </View>

        {/* Rows */}
        {['Available Seat', 'Selected Seat', 'Booked Seat'].map((rowTitle, rowIndex) => {

// Declare variables for colors or other properties
const fillColorUnisex = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#84EC7A' : '#D8D8D8';
const fillColorWomen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#FDB0F9' : '#FFE9FE';
const fillColorMen = rowIndex === 0 ? '#FFFFFF' : rowIndex === 1 ? '#58E1FF' : '#CCF6FF';
// Declare variables for colors or other properties
const strokeColorUnisex = rowIndex === 0 ? '#298121' : rowIndex === 1 ? '#298121' : '#958F8F';
const strokeColorWomen = rowIndex === 0 ? '#FF00D5' : rowIndex === 1 ? '#FF00D5' : '#FF00D5';
const strokeColorMen = rowIndex === 0 ? '#0088D3' : rowIndex === 1 ? '#0088D3' : '#0088D3';

         return (
          <View key={rowIndex} style={styles.legendRow}>
            <Text style={styles.rowTitle}>{rowTitle}</Text>
           <View style = {{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                <View style={[styles.seatIcon]}>
                <Svg style={{ width: 18, height: 20 }}>
                    <BusSeater width="100%" height="100%" fillColor={fillColorUnisex} strokeColor= {strokeColorUnisex}/>
                </Svg>

                </View>
                 <View style={[styles.seatIcon]}>
                 <Svg style={{ width: 18, height: 20 }}>
                  
                 <BusSeater width="100%" height="100%" fillColor={fillColorWomen} strokeColor= {strokeColorWomen}/>
                 </Svg>
                 </View>
                <View style={[styles.seatIcon]}>
                <Svg style={{ width: 18, height: 20 }}>
                <BusSeater width="100%" height="100%" fillColor={fillColorMen} strokeColor= {strokeColorMen}/>
                </Svg>
                </View>
            </View>
        
          </View>)
        })}
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
   
  },
infoSection: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'center',
  },
 
  infoText: {
    fontSize: 10,
    fontWeight:'400',
    fontFamily:'Inter',
    color: '#1F487C',
  },
  legendTable: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  legendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily:'Inter',
    color: '#393939',
    textAlign:'center'
  },
  legendRow: {
    flexDirection: 'row',
  
    marginBottom: 20,
    justifyContent:'flex-start',
    alignItems: 'center',

  },
  rowTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    fontFamily:'Inter',
    color: '#393939',
  },
  seatIcon: {
    // width: 30,
    // height: 30,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#ccc',
    marginHorizontal: 5,
  },

});

export default SeatInfoScreen;
