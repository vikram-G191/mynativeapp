import {useEffect, useState, useCallback} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {
  getUserId,
  getName,
  getPhone,
  getEmail,
  getDOB,
  getGender,
  getState,
} from '../../Utils/STorage';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import ContactDetailsComponent from '../../component/ContactDetailsComponent';
import BackWhite from '../../assets/BackWhite';
import {Svg} from 'react-native-svg';
import TextField from '../../component/TextField';
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {
  GetProfileById,
  UpdateProfile,
} from '../../API/TBSapi/MyAccount/Profile';
import {getOccupation} from '../../Utils/STorage';
import DOBInput from '../../component/DOBInput';
import {useNavigation} from '@react-navigation/native'; // Import the hook
import SaveConfirmationModal from '../../models/Saveconfirmationmodal';

const validationSchema = Yup.object().shape({
  user_name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters') // Allow only letters and spaces
    .required('Name is required'),
  date_of_birth: Yup.date()
    .transform((value, originalValue) => {
      // Try to parse only if it's a string
      const parsedDate = new Date(originalValue);
      return isNaN(parsedDate) ? null : parsedDate;
    })
    .nullable()
    .required('Date of Birth is required')
    .max(new Date(), 'Date of Birth cannot be in the future'),

  gender: Yup.string().required('Gender is required'),
  occupation: Yup.string().required('Occupation is required'),
  state: Yup.string()
    .trim()
    .required('State is required')
    .min(1, 'State is required'),
  mobile_number: Yup.string()
    .required('Mobile number is required')
    .matches(/^[6-9][0-9]{9}$/, 'Enter a valid 10-digit mobile number'),
  email_id: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),
});

const PersonalInformation = props => {
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation(); // Use the hook to get navigation
  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // To determine whether it's success or error
  const showSaveConfirmationModal = type => {
    setModalType(type); // 'success' or 'error'
    setIsModalVisible(true);
  };

  const [passengerDetails, setPassengerDetails] = useState({
    userName: '',
    userID: '',
    userPhone: '',
    userEmail: '',
    occupation: '',
    state: '',
    dob: '',
    gender: '',
  });

  const parseDOB = dob => {
    if (!dob) return '';
    try {
      const cleaned = dob.replace(/^"|"$/g, ''); // remove outer quotes
      const date = new Date(cleaned);
      return isNaN(date.getTime()) ? '' : date; // return Date or ''
    } catch {
      return '';
    }
  };

  const formatDateToYMD = dateInput => {
    if (!dateInput) return '';

    let dateObj;

    // If it's a string, try to parse it
    if (typeof dateInput === 'string') {
      // Ensure valid parsing even if it's just '2001-11-03'
      dateObj = new Date(dateInput);
    } else if (dateInput instanceof Date) {
      dateObj = dateInput;
    } else {
      return '';
    }

    if (isNaN(dateObj)) return '';

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const allowedCountries = ['IN', 'AE'];
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [countryName, setCountryName] = useState('India');
  const [dialCode, setDialCode] = useState('91');
  const route = useRoute();
  const {userId} = route.params;

  console.log(passengerDetails, 'passengerDetails');

  const renderFlagButton = () => (
    <TouchableOpacity onPress={() => setCountryPickerVisible(true)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{width: 28.88, height: 20}}>
          {getFlagEmoji(countryCode)}
        </Text>
        <Text style={{height: 20}}>
          {'+'}
          {`${dialCode}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const getFlagEmoji = countryCode => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  const onCountrySelect = country => {
    setCountryCode(country.cca2);
    setCountryName(country.name);
    setDialCode(country.callingCode[0]);
    setCountryPickerVisible(false); // Close the picker after selection
  };

  // const handleSubmit = async values => {
  //   try {
  //     const response = await UpdateProfile(values, userId);
  //     console.log(response, 'response');
  //     const responseadded = await GetProfileById(userId);
  //     console.log(responseadded, 'responseadded');

  //     //props.navigation.goBack();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async values => {
    try {
      // Try to update profile
      const response = await UpdateProfile(values, userId);
      console.log(response, 'response');

      // Fetch updated profile details
      const responseadded = await GetProfileById(userId);
      console.log(responseadded, 'responseadded');

      const isSaveSuccessful = true;

      if (isSaveSuccessful) {
        showSaveConfirmationModal('success'); // Show success modal
      } else {
        showSaveConfirmationModal('error'); // Show error modal
      }
      // If the response is successful, show success modal
      setModalType('success');
      setIsModalVisible(true);

      // Optionally, you can navigate back or perform other actions here
      // props.navigation.goBack();
    } catch (err) {
      console.log(err);

      // If there's an error, show error modal
      setModalType('error');
      setIsModalVisible(true);
    }
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const isValidDate = date => {
    const d = new Date(date);
    return !isNaN(d.getTime());
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPassengersDetails = async () => {
        const passenger = await GetProfileById(userId);
        console.log(passenger, 'passenger');
        setPassengerDetails({
          userID: passenger.tbs_passenger_id || '',
          userName: passenger.user_name || '',
          userPhone: passenger.mobile_number || '',
          userEmail: passenger.email_id || '',
          dob: passenger.date_of_birth || '',
          gender: passenger.gender || '',
          occupation: passenger.occupation || '',
          state: passenger.state || '',
        });
      };
      fetchPassengersDetails();
    }, [userId]),
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <View style={styles.bgView}>
        <View style={styles.navigationView}>
          <ImageBackground
            source={require('../../assets/HeadBg.png')}
            style={styles.topImageBg}
            imageStyle={{
              resizeMode: 'cover',
            }}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => props.navigation.goBack()}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Svg style={{width: 30, height: 30, borderRadius: 100}}>
                  <BackWhite width="100%" height="100%" />
                </Svg>
              </View>
            </TouchableOpacity>
            <View style={styles.topViewTitle}>
              <Text style={styles.topTitle}>Personal Information</Text>
            </View>
          </ImageBackground>
        </View>
        <ImageBackground
          source={require('../../assets/appBackgroundImage.png')}
          style={{height: '100%', width: '100%'}}>
          {/* <ScrollView style={styles.scrollView} > */}
          <Formik
            enableReinitialize
            initialValues={{
              user_name: passengerDetails?.userName || '',
              date_of_birth: parseDOB(passengerDetails?.dob) || '',
              gender: passengerDetails?.gender || '',
              occupation: passengerDetails?.occupation || '',
              state:
                typeof passengerDetails?.state === 'string' &&
                passengerDetails.state.trim() !== ''
                  ? passengerDetails.state
                  : '',
              mobile_number: passengerDetails?.userPhone || '',
              email_id: passengerDetails?.userEmail || '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              handleSubmit(values);
            }}>
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              validateForm,
              errors,
              touched,
            }) => (
              <KeyboardAwareScrollView
                style={{flex: 1}}
                contentContainerStyle={styles.innerContainer}
                resetScrollToCoords={{x: 0, y: 0}}
                scrollEnabled={true}
                extraHeight={140} // Adjust this height if necessary
              >
                <View style={styles.scrollView}>
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: 'white',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: '#1F487C',
                        fontSize: 20,
                        lineHeight: 24,
                        fontWeight: '600',
                      }}>
                      Personal Details
                    </Text>

                    <View style={{padding: 10, gap: 20, marginTop: 15}}>
                      <View style={{position: 'relative'}}>
                        <TextField
                          value={values.user_name}
                          label="Name *"
                          name="user_name"
                          errorText={touched.user_name && errors.user_name}
                          onChangeText={handleChange('user_name')}
                        />
                      </View>
                      <DOBInput
                        label="Date of Birth *"
                        value={values.date_of_birth}
                        onChange={date => setFieldValue('date_of_birth', date)}
                      />

                      {/* <TouchableOpacity
                        style={styles.phoneView}
                        onPress={() => setOpen(true)}>
                        <Text style={styles.caleText}>
                          {values.date_of_birth
                            ? formatDateToYMD(values.date_of_birth)
                            : 'Date of birth *'}
                        </Text>
                        <Image
                          source={require('../../assets/datepic1.png')}
                          style={{width: 31, height: 27}}
                        />
                        <DatePicker
                          confirmText={'Confirm'}
                          cancelText={'Cancel'}
                          title={'Select Date of Birth'}
                          modal
                          mode="date"
                          open={open}
                          date={date}
                          onConfirm={selectedDate => {
                            setOpen(false);
                            setDate(selectedDate);
                            const formatted = formatDateToYMD(selectedDate);
                            setFieldValue('date_of_birth', formatted);
                          }}
                          onCancel={() => {
                            setOpen(false);
                          }}
                          // onConfirm={date => {
                          //   setOpen(false);
                          //   setDate(date);
                          //   setDatee(date);
                          //   setFieldValue('date_of_birth', date);
                          //   setFieldTouched('date_of_birth', true); // ✅ mark as touched
                          // }}
                        />
                      </TouchableOpacity> */}
                      {touched.date_of_birth && errors.date_of_birth && (
                        <Text style={styles.error1}>
                          {' '}
                          {errors.date_of_birth}{' '}
                        </Text>
                      )}
                      <View style={{flexDirection: 'column'}}>
                        <Text style={styles.genText}>Gender</Text>

                        <View style={styles.checkBoxView}>
                          <TouchableOpacity
                            onPress={() => {
                              setSelected(1);
                              setFieldValue('gender', 'Male');
                            }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                height: 42,
                                width: 110,
                                borderColor: 'rgba(31, 72, 124, 1)',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: 10,
                                borderWidth: 0.5,
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#1F487C',
                                  fontWeight: '400',
                                  marginLeft: 10,
                                }}>
                                Male
                              </Text>
                              {/* <CheckBox

                                                    textStyle={styles.checkBoxText}
                                                    iconRight={true}
                                                    containerStyle={styles.checkBoxStyle}
                                                    checked={selectedIndex === 0}
                                                    onPress={() => setIndex(0)}
                                                    checkedIcon={<Image
                                                        source={require('../../assets/uncheck.png')}
                                                        tintColor={'#1F487C'}
                                                        style={{
                                                            backgroundColor: '#1F487C',
                                                            borderRadius: 30,
                                                            alignSelf: 'flex-end',
                                                            alignItems: 'flex-end',
                                                            justifyContent: 'flex-end',
                                                        }}
                                                    />}
                                                    uncheckedIcon={<Image source={require('../../assets/uncheck.png')} />}
                                                /> */}
                              <View style={styles.radioButtonContainer}>
                                <View style={styles.outerCircle}>
                                  <View
                                    style={[
                                      styles.innerCircle,
                                      selected === 1 ||
                                      values?.gender === 'Male'
                                        ? styles.innerCircleSelected
                                        : styles.innerCircleUnselected,
                                    ]}
                                  />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              setSelected(2);
                              setFieldValue('gender', 'Female');
                              //setFieldTouched('gender', true); // ✅ mark as touched
                            }}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: 110,
                                alignContent: 'flex-end',
                                height: 42,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderColor: 'rgba(31, 72, 124, 1)',

                                borderRadius: 10,
                                borderWidth: 0.5,
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#1F487C',
                                  fontWeight: '400',
                                  marginLeft: 10,
                                }}>
                                Female
                              </Text>
                              {/* <CheckBox


                                                    iconRight={true}
                                                    containerStyle={styles.checkBoxStyle1}
                                                    checked={selectedIndex === 1}
                                                    onPress={() => setIndex(1)}
                                                    checkedIcon={<Image source={require('../../assets/uncheck.png')} tintColor={'#1F487C'} style={{ backgroundColor: '#1F487C', borderRadius: 30 }} />}
                                                    uncheckedIcon={<Image source={require('../../assets/uncheck.png')} />}
                                                /> */}

                              <View style={styles.radioButtonContainer}>
                                <View style={styles.outerCircle}>
                                  <View
                                    style={[
                                      styles.innerCircle,
                                      selected === 2 ||
                                      values?.gender === 'Female'
                                        ? styles.innerCircleSelected
                                        : styles.innerCircleUnselected,
                                    ]}
                                  />
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                        {touched.gender && errors.gender && (
                          <Text style={styles.gendererror}>
                            {' '}
                            {errors.gender}{' '}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <ContactDetailsComponent
                    occupationvalue={values.occupation}
                    setOccupationValue={val => setFieldValue('occupation', val)}
                    statevalue={values.state}
                    setMobileValue={val => setFieldValue('mobile_number', val)}
                    mobilevalue={values.mobile_number}
                    setEmailValue={val => setFieldValue('email_id', val)}
                    emailvalue={values.email_id}
                    setStateValue={val => setFieldValue('state', val)}
                    errors={errors}
                    touched={touched}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.submitView}
                    onPress={() => {
                      validateForm().then(err => {
                        console.log('🧪 Validation result:', err);

                        handleSubmit(); // Call handleSubmit to update the profile

                        // Display success modal for 3 seconds and then navigate to ProfileScreen
                        setIsModalVisible(true); // Show the modal

                        // Timer to hide the modal after 3 seconds and navigate to ProfileScreen
                        setTimeout(() => {
                          setIsModalVisible(false); // Hide the modal after 3 seconds
                          navigation.navigate('ProfileScreen'); // Navigate to ProfileScreen
                        }, 3000); // 3000ms = 3 seconds
                      });
                    }}>
                    <Text style={styles.submitText}>Save Changes</Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    style={styles.submitView}
                    onPress={async () => {
                      try {
                        // Run form validation
                        const err = await validateForm();
                        console.log('🧪 Validation result:', err);

                        // Proceed only if the form is valid (i.e., no errors)
                        if (!err) {
                          // Proceed with form submission (i.e., updating the profile)
                          await handleSubmit(values);

                          // Show success modal after successful profile update
                          setModalType('success');
                          setIsModalVisible(true);

                          // Optionally navigate to the ProfileScreen after success
                          navigation.navigate('ProfileScreen');
                        } else {
                          // Handle form validation errors (e.g., show error messages)
                          console.log('Form has errors:', err);
                        }
                      } catch (error) {
                        // Handle any errors that occur during submission
                        console.log('Error during profile update:', error);

                        // Show error modal if something goes wrong during profile update
                        setModalType('error');
                        setIsModalVisible(true);
                      }
                    }}>
                    <Text style={styles.submitText}>Save Changes</Text>
                  </TouchableOpacity> */}

                  {/* Modal to show after form submission */}
                  <SaveConfirmationModal
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    type={modalType}
                  />
                </View>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F487C',
  },
  bgView: {
    flex: 1,
    backgroundColor: '#E5FFF1',
  },
  scrollView: {
    display: 'flex',
    padding: 10,
    gap: 20,
  },
  radioButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F487C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 14,
  },
  innerCircleUnselected: {
    backgroundColor: '#FFFFFF', // White when not selected
  },
  innerCircleSelected: {
    backgroundColor: '#1F487C', // Blue when selected
  },
  phoneView: {
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
    borderColor: '#1F487C',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caleText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: '#1F487C',
  },
  genText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#1F487C80',
  },
  checkBoxView: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  checkBoxStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#1F487C',
    right: -5,
  },
  checkBoxStyle1: {
    right: -5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#1F487C',
  },
  checkBoxText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: '#1F487C80',
  },
  input: {
    borderColor: '#1F487C',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },
  submitView: {
    backgroundColor: '#1F487C',
    borderRadius: 22,
    paddingHorizontal: 15,
    width: 240,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    width: 240,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  navigationView: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#1F487C',
  },
  topImageBg: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 5,
    overflow: 'hidden',
    position: 'relative',
    bottom: 5,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topViewTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    marginRight: 30,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#1F487C',
    fontWeight: '400',
    lineHeight: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  flagView: {
    flexDirection: 'row',
  },
  InputView1: {
    borderColor: '#1F487C',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },
  label: {
    fontSize: 14,
    color: '#1F487C80',
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#1F487C',
    borderWidth: 0.5,
    borderRadius: 5,
    flex: 1,
    padding: 5,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  InputView1: {
    borderColor: '#1F487C',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
  error: {
    position: 'absolute',
    marginTop: 130,
    marginLeft: 20,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
  error1: {
    position: 'absolute',
    marginTop: 140,
    marginLeft: 20,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
  gendererror: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
});
export default PersonalInformation;
