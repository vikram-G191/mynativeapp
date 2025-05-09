import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SaveConfirmationModal = ({ isVisible, onClose, type }) => {
  const modalMessage =
    type === 'success'
      ? 'Your details have been saved successfully!'
      : 'Your details could not be saved. Please try again.';

  const modalButtonLabel = type === 'success' ? 'Close' : 'Try Again';

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
          {/* SVG icon for success or error */}
          <Svg
            width={52}
            height={52}
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.svgIcon}
          >
            <Path
              d="M14 26L24.2857 34.5714L38 17.4286M26 50C22.8483 50 19.7274 49.3792 16.8156 48.1731C13.9038 46.967 11.258 45.1992 9.02944 42.9706C6.80083 40.742 5.033 38.0962 3.82689 35.1844C2.62078 32.2726 2 29.1517 2 26C2 22.8483 2.62078 19.7274 3.82689 16.8156C5.033 13.9038 6.80083 11.258 9.02944 9.02944C11.258 6.80083 13.9038 5.033 16.8156 3.82689C19.7274 2.62078 22.8483 2 26 2C32.3652 2 38.4697 4.52856 42.9706 9.02944C47.4714 13.5303 50 19.6348 50 26C50 32.3652 47.4714 38.4697 42.9706 42.9706C38.4697 47.4714 32.3652 50 26 50Z"
              stroke="#2CA103"
              strokeWidth={3}
            />
          </Svg>

          {/* Modal message */}
          <Text style={styles.modalTitle}>{modalMessage}</Text>

          {/* Close button */}
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{modalButtonLabel}</Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};



// Modal Styles
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Position the modal closer to the bottom
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    // borderRadius: 10,
    borderTopLeftRadius: 10, // Top corners can remain rounded
    borderTopRightRadius: 10, // Top corners can remain rounded
    borderBottomLeftRadius: 0, // Remove bottom-left corner rounding
    borderBottomRightRadius: 0, // Remove bottom-right corner rounding
    alignItems: 'center',
    marginBottom: 0, // Adjust the bottom margin as needed
  },
  svgIcon: {
    marginBottom: 20, // Space between SVG and the message
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F487C',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SaveConfirmationModal;
