import React, {useState, useEffect, useCallback} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  InputAccessoryView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import {PostFeedBack} from '../API/TBSapi/MyAccount/Ratings';
import {getEmail, getName, getPhone, getUserId} from '../Utils/STorage';
import {useFocusEffect} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {Dimensions} from 'react-native';
import {ScreenWidth} from '@rneui/base';

const occupationOptions = [
  {label: 'Business', value: 'Business'},
  {label: 'General Public', value: 'General Public'},
  {label: 'Differently abled', value: 'Physically Challenged'},
  {label: 'Pilgrim Traveler', value: 'Pilgrim Traveler'},
  {label: 'Senior Citizen', value: 'Senior Citizen'},
  {label: 'Student', value: 'Student'},
  {label: 'Tourist', value: 'Tourist'},
  {label: 'Corporate Traveler', value: 'Corporate Traveler'},
];

const StarSvg = ({fill, stroke}) => (
  <Svg
    width="42.2"
    height="42.01"
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={fill}
    />
  </Svg>
);

const RateAppModels = ({visible, closeModel}) => {
  const [rating, setRating] = useState(0);
  const inputAccessoryViewID = 'uniqueID';
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {height: screenHeight} = Dimensions.get('window');
  const {width} = Dimensions.get('window');

  const closeModal = () => {
    setModalVisible(false);
    setShowForm(false); // Reset form display when modal is closed
    resetForm();
  };

  //   const openModal = () => {
  //     setModalVisible(true);
  //     setShowForm(false); // Ensures it starts fresh without any previous form state
  //   };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Feedback is required'),
    // email: Yup.string().email('Invalid email address').required('Email is required'),
    occupation: Yup.string().required('Occupation is required'),
    rating: Yup.number().required('Please select a rating'),
  });

  const [passengerDetails, setPassengerDetails] = useState({
    userName: '',
    userID: '',
    userPhone: '',
    userEmail: '',
  });

  useEffect(() => {
    if (visible) {
      setRating(0);
    }
    if (visible === false) {
      setShowForm(false);
    }
  }, [visible]);

  const getColor = value => {
    switch (value) {
      case 1:
        return '#FF2B2B';
      case 2:
        return '#FF4A22';
      case 3:
        return '#F3880A';
      case 4:
        return '#FFA800';
      case 5:
        return '#FFDD2B';
      default:
        return '#808080';
    }
  };

  const handleSubmit = async values => {
    try {
      const response = await PostFeedBack(values, passengerDetails);
      console.log(response);
      closeModel();
    } catch (error) {
      console.error('error');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPassengerDetails = async () => {
        const id = await getUserId();
        const name = await getName();
        const phone = await getPhone();
        const email = await getEmail();

        setPassengerDetails({
          userID: id || '',
          userName: name || '',
          userPhone: phone || '',
          userEmail: email || '',
        });
      };

      fetchPassengerDetails();
    }, []),
  );

  //     const inputRef = useRef(null); // Reference to the TextInput

  //   // Focus the TextInput when the modal becomes visible
  //   useEffect(() => {
  //     if (visible && inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal} // Android back button
      onDismiss={() => {
        resetForm(true);
        setShowForm(false);
        setModalVisible(false);
      }}>
      <TouchableWithoutFeedback onPress={closeModel}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'rgba(255, 255, 255, 1)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            overflow: 'hidden',
            display: 'flex',
            gap: 10,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height: screenHeight + 20, // Increase height a little
            justifyContent: 'flex-end',
          }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.modalView}>
                <ImageBackground
                  source={require('../assets/appBackgroundImage.png')}
                  style={{
                    backgroundColor: '#ffffff',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    gap: 10,
                  }}>
                  {/* {rating < 1 ? ( */}
                  {Platform.OS === 'ios' ? (
                    <ImageBackground
                      source={require('../assets/Rate.gif')}
                      style={{overflow: 'hidden'}}>
                      <View style={{height: 292, padding: 20}}>
                        <Text style={styles.modalText}>
                          Enjoying the Tbs App?
                        </Text>
                      </View>
                    </ImageBackground>
                  ) : (
                    <View
                      style={{
                        position: 'relative',
                        height: 208,
                        width: '100%',
                      }}>
                      <FastImage
                        source={require('../assets/Rate.gif')}
                        style={{
                          height: '100%', // Fill parent container height
                          width: '100%', // Fill parent container width
                          borderRadius: 10,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />

                      {/* Text overlay */}
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          padding: 21,
                        }}>
                        <Text style={styles.modalText}>
                          Enjoying the Tbs App?
                        </Text>
                      </View>
                    </View>
                  )}
                  {/* ) : (
                  <View style={{padding: 20}}>
                    <Text style={styles.modalText}>Enjoying the Tbs App?</Text>
                  </View> */}
                  {/* )} */}

                  {/* <Text style={{color:"red"}}>rgiuerg</Text> */}

                  <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={{
                      name: passengerDetails?.userName || '',
                      rating: '',
                      description: '',
                      occupation: '',
                    }}
                    onSubmit={values => {
                      console.log(values, 'Form Values');
                      handleSubmit(values);
                      setModalVisible(false); // close the modal
                    }}>
                    {({
                      handleChange,
                      handleSubmit,
                      touched,
                      errors,
                      values,
                      validateForm,
                      setTouched,
                      setFieldValue,
                      setFieldTouched,
                    }) => (
                      <>
                        <View style={styles.formContainer}>
                          {/* Name Field */}

                          <View style={{padding: 5, marginTop: 5}}>
                            <Text style={styles.subTitleText}>
                              Rate your experience with the Tbs App
                            </Text>
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              flexDirection: 'row',
                              gap: 0,
                              marginBottom: 20,
                              marginTop: -10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: -10,
                              }}>
                              {[1, 2, 3, 4, 5].map(value => (
                                <TouchableOpacity
                                  key={value}
                                  onPress={() => {
                                    //setRating(value)
                                    setFieldValue('rating', value);
                                    setRating(value);
                                  }}>
                                  <StarSvg
                                    fill={
                                      value <= rating
                                        ? getColor(rating)
                                        : 'none'
                                    }
                                    stroke={
                                      value <= rating
                                        ? getColor(rating)
                                        : getColor(rating)
                                    }
                                  />
                                </TouchableOpacity>
                              ))}
                            </View>
                          </View>

                          {/* ERROR MESSAGE UNDER STARS */}
                          {touched.rating && errors.rating && (
                            <Text
                              style={{
                                color: 'red',
                                fontSize: 13,
                                textAlign: 'center',
                                marginBottom: 30,
                                marginTop: -10,
                                // try increasing or decreasing this
                              }}>
                              {errors.rating}
                            </Text>
                          )}

                          <View style={{gap: 10, marginTop: 2}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              <Image
                                source={require('../assets/Rate1.png')}
                                style={{
                                  height: 20,
                                  width: 20,
                                  tintColor: getColor(rating),
                                  marginTop: -25,
                                }}
                              />
                              <Text
                                style={{
                                  color: getColor(rating),
                                  fontSize: 16,
                                  fontWeight: '500',
                                  lineHeight: 21,
                                  marginTop: -25,
                                }}>
                                {rating > 0 ? `${rating} - ` : ''}
                                {rating === 1
                                  ? 'Terrible'
                                  : rating === 2
                                  ? 'Bad'
                                  : rating === 3
                                  ? 'Okay'
                                  : rating === 4
                                  ? 'Good'
                                  : rating === 5
                                  ? 'Excellent'
                                  : 'Select your rating'}
                              </Text>
                            </View>

                            {/* <View style={styles.feebackView}>
                                    <TextInput multiline style={{ minHeight: 130 }} placeholder='Write your feedback :)' />
                                </View> */}

                            <>
                              {/* Name Input Field */}
                              <View
                                style={[
                                  styles.inputWrapper,
                                  {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  },
                                ]}>
                                {/* Your Name TextInput */}
                                <View style={{flex: 1, marginLeft: -3}}>
                                  <TextInput
                                    placeholder="Your Name"
                                    placeholderTextColor="rgba(31, 72, 124, 0.5)"
                                    style={[
                                      styles.textInputStyle,
                                      {
                                        // marginLeft: -20,
                                        paddingLeft: 5,
                                        width: 'auto',
                                      },
                                    ]}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                  />
                                  <ErrorMessage
                                    name="name"
                                    component={Text}
                                    style={styles.errorText2}
                                  />
                                </View>

                                {/* Occupation Dropdown */}
                                <View
                                  style={{
                                    flex: 1,
                                    // flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginRight: 5,
                                  }}>
                                  {/* <Dropdown
                                    style={[
                                      styles.dropdown,
                                      {
                                        width: '100%',
                                        backgroundColor:
                                          'rgba(214, 235, 255, 0.5)',
                                          padding:0,
                                      },
                                    ]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={occupationOptions}
                                    search
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Occupation"
                                    searchPlaceholder="Search..."
                                    value={values.occupation}
                                    onChange={item => {
                                      setFieldValue('occupation', item.value);
                                    }}
                                  /> */}
                                  <Dropdown
                                    style={[
                                      styles.dropdown,
                                      {
                                        width: '100%',
                                        backgroundColor:
                                          'rgba(214, 235, 255, 0.5)',
                                        padding: 0,
                                      },
                                    ]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    itemTextStyle={styles.itemTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={occupationOptions}
                                    search
                                    maxHeight={150}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Occupation"
                                    searchPlaceholder="Search..."
                                    value={values.occupation}
                                    onChange={item => {
                                      setFieldValue('occupation', item.value);
                                    }}
                                  />

                                  <View
                                    style={{position: 'absolute', top: -10}}>
                                    <ErrorMessage
                                      name="occupation"
                                      component={Text}
                                      style={[styles.errorText, {top: -50}]}
                                    />
                                  </View>
                                </View>
                              </View>
                            </>

                            <View style={styles.feedbackView}>
                              <TextInput
                                placeholder="Write your feedback :)"
                                placeholderTextColor={'rgba(31, 72, 124, 0.5)'}
                                style={styles.textfeedbackInput}
                                multiline
                                autoCorrect={false} // Disable auto-correction
                                autoCapitalize="none" // Disable auto-capitalization
                                spellCheck={false} // Disable spell checking
                                textContentType="none"
                                inputAccessoryViewID={inputAccessoryViewID}
                                value={values.description}
                                onChangeText={handleChange('description')}
                              />
                              <ErrorMessage
                                name="description"
                                component={Text}
                                style={styles.errorText1}
                              />
                              <InputAccessoryView
                                nativeID={inputAccessoryViewID}>
                                <View
                                  style={{
                                    backgroundColor: '#ebecec',
                                    padding: 3,
                                    borderTopWidth: 1,
                                    borderColor: '#D3D3D3',
                                    alignItems: 'flex-end',
                                  }}>
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: '#D3D3D3', // Customize the button background color here
                                      paddingVertical: 10,
                                      paddingHorizontal: 20,
                                      borderRadius: 8,
                                    }}
                                    onPress={() => {
                                      Keyboard.dismiss(); // Dismiss the keyboard when Done is pressed
                                    }}>
                                    <Text
                                      style={{
                                        color: 'black', // Customize the button title (text) color here
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                      }}>
                                      Done
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </InputAccessoryView>
                            </View>
                          </View>

                          {/* Submit Button */}
                          {/* <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                      </TouchableOpacity> */}
                          {/* <TouchableOpacity
                          style={styles.submitButton}
                          onPress={() => {
                            if (!showForm) {
                              if (!rating) {
                                setFieldValue('rating', '', true);
                                setFieldTouched('rating', true, true); // ensure touched is set
                              } else {
                                setShowForm(true); // Show additional form fields
                              }
                            } else {
                              handleSubmit(); // Submit entire form
                            }
                          }}>
                          <Text style={styles.submitButtonText}>
                            {showForm ? 'Submit' : 'Continue'}
                          </Text>
                        </TouchableOpacity> */}
                          {/* <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                              if (!showForm) {
                                if (!rating) {
                                  setFieldValue('rating', '', true);
                                  setFieldTouched('rating', true, true); // ensure touched is set
                                } else {
                                  setShowForm(true); // Show additional form fields
                                }
                              } else {
                                handleSubmit(); // Submit entire form
                              }
                            }}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity
                            style={styles.submitButton}
                            onPress={async () => {
                              // Mark all fields as touched to show the error messages
                              setTouched({
                                rating: true,
                                occupation: true,
                                description: true,
                              });

                              // Validate the entire form
                              const errors = await validateForm();

                              // If there are no errors, proceed with submission
                              if (Object.keys(errors).length === 0) {
                                if (!showForm) {
                                  if (!rating) {
                                    setFieldValue('rating', '', true);
                                    setFieldTouched('rating', true, true); // Ensure touched is set
                                  } else {
                                    setShowForm(true); // Show additional form fields
                                  }
                                } else {
                                  handleSubmit(); // Submit entire form if no errors
                                }
                              }
                            }}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </Formik>
                  {/* <TouchableOpacity onPress={closeModel} style={styles.submitView}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity> */}

                  {/* <TouchableOpacity
                onPress={async () => {
                  const payload = {
                    name,
                    occupation,
                    feedback,
                    rating,
                  };

                  try {
                    const response = await fetch(
                      'https://your-backend-api.com/submit-rating',
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                      },
                    );

                    const data = await response.json();
                    console.log('Success:', data);

                    // Optionally reset everything
                    setName('');
                    setOccupation('');
                    setFeedback('');
                    setRating(0);

                    closeModel();
                  } catch (error) {
                    console.error('Error submitting rating:', error);
                  }
                }}
                style={styles.submitView}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity> */}
                </ImageBackground>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  feedbackView: {
    position: 'relative',
    marginHorizontal: 22,
    marginLeft: 150,
    // marginRight: 50,
    backgroundColor: 'rgba(214, 235, 255, 0.5)',
    borderRadius: 10,
    borderColor: '#1F487C',
    borderWidth: 1,
    justifyContent: 'center', // Centers content vertically inside the container
    alignItems: 'center', // Centers content horizontally inside the container
    width: ScreenWidth - 15, // You can adjust the width as needed
    paddingHorizontal: 15, // Padding on the left and right of the feedback box
    height: 80, // The height of the feedback box
    marginLeft: 22,
    marginTop: -7,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },

  //   textInputStyle: {
  //     flex: 1,
  //     fontFamily: 'Inter',
  //     fontSize: 14,
  //     fontWeight: '400',
  //     margin: 5,
  //     top: 5,
  //     color: '#1F487C',
  //     lineHeight: 16,
  //     textAlignVertical: 'top', // Ensure text starts from the top of the TextInput
  //     padding: 0, // Remove any additional padding
  //   },
  textInputStyle: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#1f487c',
    borderRadius: 8,
    color: '#1f487c',
    backgroundColor: 'rgba(214, 235, 255, 0.5)',
    width: '100%',
    height: 50,
    alignItems: 'center',
    marginLeft: 0, // Make sure no margins are added
    paddingLeft: 2, // Remove any internal padding
    paddingRight: 0, // Remove any internal padding
  },
  NameView: {
    marginLeft: 40,
  },

  modalView: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    display: 'flex',
    gap: 10,
    height: 570,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#1F487C',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    marginTop: -5,
  },
  subTitleText: {
    color: '#1F487C',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: -35,
  },
  feebackView: {
    padding: 10,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: 'rgba(208, 229, 255, 0.3)',
    borderColor: 'rgba(31, 72, 124, 1)',
  },
  submitView: {
    backgroundColor: '#1F487C',
    borderRadius: 25,
    paddingHorizontal: 15,
    justifyContent: 'center',
    top: 10,
    height: 44,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 30,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    padding: 10,
  },
  inputWrapper: {
    marginBottom: 15,
    position: 'relative',
    height: 40,
    // width: 252,
    // marginHorizontal:5,
    // paddingLeft:0,
    // alignSelf:"center",
  },

  textfeedbackInput: {
    height: 100, // Adjust height as necessary
    borderWidth: 1,
    borderColor: 'rgba(208, 229, 255, 0.3)',
    paddingHorizontal: 10,
    color: '#1F487C',
    textAlignVertical: 'top', // Ensures the text aligns at the top when multiline
    width: '100%', // Ensure it takes up full width of its container
    backgroundColor: 'transparent', // Make sure the background is transparent to match the parent
    marginLeft: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
  },
  //   textInputStyle: {
  //     height: 50,
  //     borderColor: '#ccc',
  //     borderWidth: 1,
  //     paddingHorizontal: 10,
  //     borderRadius: 5,
  //   },
  OccupationView: {
    marginBottom: 20,
  },
  errorText: {
    ///<========error for occupation
    position: 'absolute',
    color: 'red',
    fontSize: 12,
    // marginBottom:10,
    marginLeft: -70,
    marginTop: 108,
  },
  errorText2: {
    position: 'absolute',
    color: 'green',
    fontSize: 12,
    marginTop: 10,
  },
  rating: {},
  errorText1: {
    ///<===============error for feedback
    // position: 'absolute',
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    marginBottom: 8,
    // marginRight:130,
    marginRight: 10,
    // lineHeight:5,
  },
  submitButton: {
    backgroundColor: '#1F487C',
    borderRadius: 25,
    paddingHorizontal: 15,
    justifyContent: 'center',
    top: 10,
    height: 44,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  pickerContainer: {
    // position: 'relative',
    height: 40,
    width: 252,
    paddingHorizontal: 10,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '',
    backgroundColor: 'white',
    alignItems: 'center', // centers horizontally
    justifyContent: 'center',
    marginHorizontal: 45,
    // marginTop:5,
    marginBottom: 15,
    // alignSelf:"center",
  },
  pickerStyle: {
    color: '#1F487C',
    marginTop: -7,
    fontSize: 5,
    width: 250,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    width: 150,
    borderColor: 'rgba(31, 72, 124, 1)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginTop: 0,
    marginLeft: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'rgba(31, 72, 124, 0.5)',
    numberOfLines: 1, // this is not enough alone
    ellipsizeMode: 'tail', // this is not enough alone
    flexShrink: 1, // important
    flexWrap: 'nowrap', // SUPER IMPORTANT
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#1F487C',
    numberOfLines: 1, // this is not enough alone
    ellipsizeMode: 'tail', // this is not enough alone
    flexShrink: 1, // important
    flexWrap: 'nowrap', // SUPER IMPORTANT
    includeFontPadding: false,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: '#1F487C',
    borderRadius: 8,
    borderColor: '#ccc',
    // borderWidth: 1,
    paddingHorizontal: 10,
  },
  // itemTextStyle: {
  //   fontSize: 14,
  //   color: '#1F487C',
  //   paddingHorizontal:0,
  // },
  itemTextStyle: {
    fontSize: 14,
    color: '#1F487C',
    paddingHorizontal: 0,
    flexShrink: 1,
    flexWrap: 'nowrap',
    includeFontPadding: false,
  },
});

export default RateAppModels;
