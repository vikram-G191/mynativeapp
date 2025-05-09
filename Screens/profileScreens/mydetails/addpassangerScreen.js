import {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import PersonalDetailsComponent from '../../component/PersonalDetailsComponent';
import ContactDetailsComponent from '../../component/ContactDetailsComponent';
import BackWhite from '../../assets/BackWhite';
import {Svg} from 'react-native-svg';
import TextField from '../../component/TextField';
import {CheckBox, Icon} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ErrorMessage, Field, Formik} from 'formik';
import * as Yup from 'yup';
import {
  addPassengerDetails,
  getPassengerDetailsById,
} from '../../API/TBSapi/MyAccount/Profile';
import {getUserId} from '../../Utils/STorage';
import {useNavigation} from '@react-navigation/native';
import DOBInput from '../../component/DOBInput';

const AddpassangerScreen = props => {
  const {passengerId} = props.route.params || {};
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),

    dob: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),

    gender: Yup.string().required('Gender is required'),

    state: Yup.string().required('State is required'),

    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),

    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
  });

  const [selected, setSelected] = useState(1);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [selectedIndex, setIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [datee, setDatee] = useState('');
  const [passengerData, setPassengerData] = useState('');
  const [focus, setFocus] = useState(false);

  //     const formatDateTime = (date) => {
  // console.log(date);

  //         const year = date.getFullYear();
  //         const month = date.getMonth() + 1; // Months are zero-indexed
  //         const day = date.getDate();
  //         // const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

  //         // return `${dateString}`;
  //         const dayString = day < 10 ? `0${day}` : day;
  //         const monthString = month < 10 ? `0${month}` : month;

  //         return `${dayString}/${monthString}/${year}`;
  //     };
  const formatDateTime = date => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();

    const dayString = day < 10 ? `0${day}` : day;
    const monthString = month < 10 ? `0${month}` : month;

    return `${dayString}/${monthString}/${year}`;
  };

  const allowedCountries = ['IN', 'AE'];
  const [value1, setValue1] = useState('');
  const [selectedIndex1, setIndex1] = useState(0);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [countryName, setCountryName] = useState('India');
  const [dialCode, setDialCode] = useState('91');

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

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  const indianStates = [
    {value: 'Andhra Pradesh', label: 'Andhra Pradesh'},
    {value: 'Arunachal Pradesh', label: 'Arunachal Pradesh'},
    {value: 'Assam', label: 'Assam'},
    {value: 'Bihar', label: 'Bihar'},
    {value: 'Chhattisgarh', label: 'Chhattisgarh'},
    {value: 'Goa', label: 'Goa'},
    {value: 'Gujarat', label: 'Gujarat'},
    {value: 'Haryana', label: 'Haryana'},
    {value: 'Himachal Pradesh', label: 'Himachal Pradesh'},
    {value: 'Jharkhand', label: 'Jharkhand'},
    {value: 'Karnataka', label: 'Karnataka'},
    {value: 'Kerala', label: 'Kerala'},
    {value: 'Madhya Pradesh', label: 'Madhya Pradesh'},
    {value: 'Maharashtra', label: 'Maharashtra'},
    {value: 'Manipur', label: 'Manipur'},
    {value: 'Meghalaya', label: 'Meghalaya'},
    {value: 'Mizoram', label: 'Mizoram'},
    {value: 'Nagaland', label: 'Nagaland'},
    {value: 'Odisha', label: 'Odisha'},
    {value: 'Punjab', label: 'Punjab'},
    {value: 'Rajasthan', label: 'Rajasthan'},
    {value: 'Sikkim', label: 'Sikkim'},
    {value: 'Tamil Nadu', label: 'Tamil Nadu'},
    {value: 'Telangana', label: 'Telangana'},
    {value: 'Tripura', label: 'Tripura'},
    {value: 'Uttar Pradesh', label: 'Uttar Pradesh'},
    {value: 'Uttarakhand', label: 'Uttarakhand'},
    {value: 'West Bengal', label: 'West Bengal'},
    {
      value: 'Andaman and Nicobar Islands',
      label: 'Andaman and Nicobar Islands',
    },
    {value: 'Chandigarh', label: 'Chandigarh'},
    {
      value: 'Dadra and Nagar Haveli and Daman and Diu',
      label: 'Dadra and Nagar Haveli and Daman and Diu',
    },
    {value: 'Lakshadweep', label: 'Lakshadweep'},
    {value: 'Delhi', label: 'Delhi'},
    {value: 'Puducherry', label: 'Puducherry'},
    {value: 'Ladakh', label: 'Ladakh'},
    {value: 'Jammu and Kashmir', label: 'Jammu and Kashmir'},
  ];

  const stateOptions = indianStates?.map((value, ind) => ({
    value: value.values,
    label: (
      <div
        className="md:text-[1vw] text-[4vw] font-normal px-[0.2vw] pb-[0.1vw] text-[#1F487C]"
        title={value.label} // This will show full text on hover
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '28ch', // Ensure truncation if text is too long
        }}>
        {value.label?.length > 28
          ? `${value.label.substring(0, 28)}...`
          : value.label}
      </div>
    ),
    id: ind,
  }));
  const defaultoption = {
    value: '',
    label: (
      <div className="md:text-[1vw] text-[4vw]  px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select State
      </div>
    ),
    disabled: true,
  };

  const options = [defaultoption, ...stateOptions];
  function calculateAge(dobString) {
    const today = new Date();

    // Parse the date string in a safe, local format (YYYY-MM-DD to local)
    const [year, month, day] = dobString.split('-');
    const dob = new Date(+year, month - 1, +day); // Month is 0-indexed

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }
  const handleSubmit = async values => {
    const originalDate = '2001-09-01T11:34:31.371Z';
    const formattedDate = new Date(values.dob).toISOString().split('T')[0];
    try {
      const response = await addPassengerDetails(
        values,
        passengerId,
        userId,
        formattedDate,
        calculateAge(formattedDate),
      );
      console.log(response, 'new response');

      if (response.success === true) {
        navigation.navigate('Passengers');
      }
      console.log(response, 'submitresponse');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
        console.log('User ID:', id);
      } catch (error) {
        console.log('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    // console.log(props.route.params.passengerId,passengerId,"passidididid");
    const getPassenger = async () => {
      if (passengerId) {
        const getPassDetails = await getPassengerDetailsById(passengerId);
        setPassengerData(getPassDetails);
        const isoString = new Date(getPassDetails.date_of_birth).toISOString();
        setDatee(isoString);
        console.log(isoString, 'datadfkj');
      }
    };
    getPassenger();
  }, []);
  console.log(passengerData.user_name, 'passdatata');
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
              <Text style={styles.topTitle}>Add Passengers Details</Text>
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
              name: passengerData.user_name || '',
              dob: passengerData.date_of_birth || '',
              gender: passengerData.gender || '',
              state: passengerData.state || '',
              phone: passengerData.mobile_number || '',
              email: passengerData.email_id || '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values, 'alllvaluesohfkdjhf');
              handleSubmit(values);
            }}>
            {({
              handleChange,
              handleSubmit,
              touched,
              errors,
              values,
              setFieldValue,
            }) => {
              return (
                <KeyboardAwareScrollView
                  style={{flex: 1}}
                  contentContainerStyle={styles.innerContainer}
                  resetScrollToCoords={{x: 0, y: 0}}
                  scrollEnabled={true}>
                  <View style={styles.scrollView}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
                        {/* <TextField
                                        value={value}
                                        label="Name *"
                                        errorText={error}
                                        onChangeText={(text) => setValue(text)}
                                    /> */}
                        <View style={{position: 'relative'}}>
                          <TextField
                            name="name"
                            label="Name *"
                            component={TextField}
                            placeholderTextColor="#1F487C"
                            value={values?.name}
                            color="#1F487C"
                            // onChangeText={handleChange("name")}
                            onChangeText={handleChange('name')}
                          />
                          <ErrorMessage
                            name="name"
                            component={Text}
                            style={{
                              color: 'red',
                              position: 'absolute',
                              top: 53,
                              left: 10,
                              fontSize: 11,
                            }}
                          />
                        </View>

                        <DOBInput
                          label="Date of Birth *"
                          value={values.dob}
                          onChange={date => setFieldValue('dob', date)}
                        />
                        <ErrorMessage
                          name="dob"
                          component={Text}
                          style={styles.errorText1}
                        />
                        {/* <TouchableOpacity style={styles.phoneView} onPress={() => setOpen(true)}>
                                                    <Text style={styles.caleText}>{datee ? formatDateTime(datee) : 'Date of birth *'}</Text>
                                                    <Image source={require('../../assets/datepic2.png')} style={{ width: 30, height: 26 }} />
                                                    <DatePicker
                                                        name="date"
                                                        confirmText={'Confirm'}
                                                        cancelText={'Cancel'}
                                                        title={'Select Date of Birth'}
                                                        modal
                                                        mode='date'
                                                        open={open}
                                                        date={date}
                                                        onConfirm={(date) => {
                                                            console.log('date', date)
                                                            setOpen(false)
                                                            setDate(date)
                                                            setDatee(date)
                                                            setFieldValue("dob", date);
                                                        }}
                                                        onCancel={() => {
                                                            setOpen(false)
                                                        }}
                                                    />
                                                    <ErrorMessage name="dob" component={Text} style={styles.errorText} />
                                                </TouchableOpacity> */}

                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.genText}>Gender</Text>

                          {/* <View style={styles.checkBoxView}>
                                            <TouchableOpacity
                                                onPress={() => setSelected(1)}
                                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <View style={{
                                                    flexDirection: 'row',
                                                    height: 42,
                                                    width: 110,

                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderRadius: 10, borderWidth: 0.5
                                                }}>

                                                    <Text style={{
                                                        fontSize: 14, color: '#1F487C',
                                                        fontWeight: '400',
                                                        marginLeft: 10,
                                                    }}>Male</Text>
                                                    <View style={styles.radioButtonContainer}>
                                                        <View style={styles.outerCircle}>
                                                            <View
                                                                style={[
                                                                    styles.innerCircle,
                                                                    selected === 1 ? styles.innerCircleSelected : styles.innerCircleUnselected,
                                                                ]}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => setSelected(2)}
                                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <View style={{
                                                    flexDirection: 'row',
                                                    width: 110,
                                                    alignContent: 'flex-end',
                                                    height: 42,
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderRadius: 10,
                                                    borderWidth: 0.5
                                                }}>
                                                    <Text style={{
                                                        fontSize: 14, color: '#1F487C',
                                                        fontWeight: '400',
                                                        marginLeft: 10,
                                                    }}>Female</Text>
                                                    <View style={styles.radioButtonContainer}>
                                                        <View style={styles.outerCircle}>
                                                            <View
                                                                style={[
                                                                    styles.innerCircle,
                                                                    selected === 2 ? styles.innerCircleSelected : styles.innerCircleUnselected,
                                                                ]}
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View> */}
                          <View style={styles.checkBoxView}>
                            <TouchableOpacity
                              onPress={() => setFieldValue('gender', 'male')}
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
                                <View style={styles.radioButtonContainer}>
                                  <View style={styles.outerCircle}>
                                    <View
                                      style={[
                                        styles.innerCircle,
                                        values.gender == 'male'
                                          ? styles.innerCircleSelected
                                          : styles.innerCircleUnselected,
                                      ]}
                                    />
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => setFieldValue('gender', 'female')}
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
                                <View style={styles.radioButtonContainer}>
                                  <View style={styles.outerCircle}>
                                    <View
                                      style={[
                                        styles.innerCircle,
                                        values.gender == 'female'
                                          ? styles.innerCircleSelected
                                          : styles.innerCircleUnselected,
                                      ]}
                                    />
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                            <ErrorMessage
                              name="gender"
                              component={Text}
                              style={{
                                color: 'red',
                                position: 'absolute',
                                top: 44,
                                left: 10,
                                fontSize: 11,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10, }}>

                                <Text style={{ color: '#1F487C', fontSize: 20, lineHeight: 24, fontWeight: '600' }}>Contact Details</Text>

                                <View style={{ gap: 20, marginTop: 15 }}>
                                    <View style={styles.input}>
                                        <Text style={styles.label}>State of residence</Text>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            iconStyle={styles.iconStyle}
                                            data={data}
                                            search
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select item"
                                            searchPlaceholder="Search..."
                                            value={value1}
                                            onChange={item => {
                                                setValue1(item.value);
                                            }}
                                        />
                                    </View>

                                    <View style={[styles.row, { alignItems: 'center' }]}>
                                        <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                                            <Text style={[styles.label, { textAlign: 'center', marginBottom: 5 }]}>Country Code</Text>
                                            {renderFlagButton()}
                                            {isCountryPickerVisible && (
                                                <CountryPicker
                                                    containerButtonStyle={{ justifyContent: 'center', backgroundColor: '#000' }}
                                                    visible={isCountryPickerVisible}
                                                    onClose={() => setCountryPickerVisible(false)}
                                                    onSelect={onCountrySelect}
                                                    closeable
                                                    filterable
                                                    filterPlaceholder="Search"
                                                    countryCode={countryCode}
                                                    withFilter
                                                    countries={allowedCountries}
                                                    withCountryNameButton={false}
                                                    withFlagButton={false}
                                                />
                                            )}
                                        </View>

                                        <View style={[styles.verticleLine, { height: '100%', marginHorizontal: 5 }]}></View>

                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <Text style={[styles.label]}>Mobile Number</Text>
                                            <TextInput
                                                placeholder="Enter Mobile Number"
                                                keyboardType="phone-pad"
                                                style={{
                                                    borderRadius: 5,
                                                    paddingVertical: 2,

                                                    width: '100%',  // Ensure the TextInput takes up the full width
                                                }}
                                            />
                                        </View>
                                    </View>


                                    <View style={styles.InputView1}>
                                        <Text style={{ color: '#1F487C80', fontSize: 12 }}>
                                            Email
                                        </Text>
                                        <View style={styles.flagView}>
                                            <TextInput
                                                style={{
                                                    flex: 1,
                                                    fontSize: 14,
                                                    paddingVertical: 2,
                                                    width: '100%', fontSize: 14, fontWeight: "400",
                                                }}
                                                // placeholder="5 years"
                                                placeholder="abcd@gmail.com"
                                                keyboardType="email-address"

                                            />

                                        </View>

                                    </View>

                                </View>
                            </View> */}
                    {/* <ContactDetailsComponent
                                            values={values}
                                            handleChange={handleChange}
                                            // handleBlur={handleBlur}
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                        /> */}

                    {/* <ContactDetailsComponent> */}
                    <View style={styles.container2}>
                      <View>
                        <Text
                          style={{
                            color: '#1F487C',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          Contact Details
                        </Text>
                      </View>

                      <View style={styles.input}>
                        <Text style={[styles.label, {paddingHorizontal: 10}]}>
                          State of residence
                        </Text>
                        <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          itemTextStyle={{color: '#1F487C'}}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          iconColor="#1F487C"
                          data={indianStates}
                          search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select State"
                          searchPlaceholder="Search..."
                          value={values.state}
                          onChange={item => {
                            setFieldValue('state', item.value);
                          }}
                          renderItem={item => (
                            <View style={[styles.dropdownItem]}>
                              <Text
                                style={[
                                  styles.dropdownText,
                                  {color: '#1F487C'},
                                ]}>
                                {item.label}
                              </Text>
                            </View>
                          )}
                        />
                        {touched.state && errors.state && (
                          <Text
                            style={{
                              color: 'red',
                              position: 'absolute',
                              top: 70,
                              left: 10,
                              fontSize: 12,
                            }}>
                            {' '}
                            {errors.state}{' '}
                          </Text>
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#1F487C80',
                          fontWeight: '400',
                          marginVertical: -15,
                        }}>
                        Required for GST Tax Invoicing
                      </Text>

                      <View
                        style={[
                          styles.row,
                          {alignItems: 'center', marginTop: 10},
                        ]}>
                        <View
                          style={{paddingHorizontal: 10, alignItems: 'center'}}>
                          <Text
                            style={[
                              styles.label,
                              {
                                textAlign: 'center',
                                marginTop: -40,
                                marginBottom: 5,
                                backgroundColor: 'white',
                              },
                            ]}>
                            Mobile Number
                          </Text>
                          {/* <TouchableOpacity
                                                                onPress={() => setCountryPickerVisible(true)}
                                                                style={{}}> */}
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 6,
                            }}>
                            <Text style={{color: '#1F487C', fontSize: 14}}>
                              +{dialCode} (
                              {countryName?.slice(0, 3).toUpperCase()})
                            </Text>
                          </View>
                          {/* </TouchableOpacity> */}

                          {/* Country Picker Modal (Hidden default button) */}
                          {/* <CountryPicker
                                                                visible={isCountryPickerVisible}
                                                                onClose={() => setCountryPickerVisible(false)}
                                                                onSelect={onCountrySelect}
                                                                countryCode={countryCode}
                                                                withFilter
                                                                filterPlaceholder="Search"
                                                                closeable
                                                                withCountryNameButton={false}
                                                                withFlagButton={false}
                                                                withCallingCode
                                                                withAlphaFilter={false}
                                                                withEmoji={false}
                                                                theme={{
                                                                  onBackgroundTextColor: '#1F487C',
                                                                }}
                                                                containerButtonStyle={{display: 'none'}}
                                                              /> */}
                          {/* {renderFlagButton()}
                                                    {isCountryPickerVisible && (
                                                        <CountryPicker
                                                            containerButtonStyle={{
                                                                justifyContent: 'center',
                                                                backgroundColor: '#000',
                                                            }}
                                                            visible={isCountryPickerVisible}
                                                            onClose={() => setCountryPickerVisible(false)}
                                                            onSelect={onCountrySelect}
                                                            closeable
                                                            filterable
                                                            filterPlaceholder="Search"
                                                            countryCode={countryCode}
                                                            withFilter
                                                            countries={allowedCountries}
                                                            withCountryNameButton={false}
                                                            withFlagButton={false}
                                                        />
                                                    )} */}
                        </View>

                        <View
                          style={[
                            styles.verticleLine,
                            {height: '100%', marginHorizontal: 5},
                          ]}></View>

                        <View style={{flex: 1, alignItems: 'flex-start'}}>
                          {/* <Text style={[styles.label]}>Mobile Number</Text> */}
                          {/* <Text
                            style={[
                              styles.Mobilelabel,
                              (focus || value) && styles.MobilelabelFocused, // Apply floating label style when focused or when there's text
                            ]}>
                            Mobile Number
                          </Text> */}

                          {/* Input Field */}
                          <TextInput
                            style={styles.Mobileinput}
                            onChangeText={text => {
                              // Allow only numbers and limit to 10 digits
                              const numericText = text
                                .replace(/[^0-9]/g, '')
                                .slice(0, 10);
                              setFieldValue('phone', numericText); // Set inside Formik
                            }}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            value={values.phone}
                            keyboardType="numeric" // Open numeric keyboard
                            placeholder={values.phone ? '' : 'Phone Number'}
                            placeholderTextColor="#1F487C"
                            maxLength={10} // max limit
                          />
                          <ErrorMessage
                            name="phone"
                            component={Text}
                            style={{
                              color: 'red',
                              position: 'absolute',
                              top: 57,
                              left: -110,
                              fontSize: 11,
                            }}
                          />
                          {/* <TextInput
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            returnKeyType="done"
            value={values.phone}
            onChangeText={text => {
              setMobileValue(text);
            }}
            style={{
              borderRadius: 5,
              paddingVertical: 2,
              width: '100%',
            }}
          /> */}
                          {/* <Field
                            name="phone"
                            value={values?.phone}
                            onChangeText={handleChange('phone')}
                            keyboardType="phone-pad"
                            component={TextInput}
                            color="#1F487C"
                            style={{
                              borderRadius: 5,
                              paddingVertical: 2,
                              width: '100%', // Ensure the TextInput takes up the full width
                            }}
                            placeholderTextColor="#1F487C"
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            name="phone"
                            component={Text}
                            style={{
                              color: 'red',
                              position: 'absolute',
                              top: 57,
                              left: -110,
                              fontSize: 11,
                            }}
                          /> */}
                        </View>
                      </View>
                      {/* {touched.mobile_number && errors.mobile_number && (
        <Text style={styles.mobileerror}> {errors.mobile_number} </Text>
      )} */}
                      {/* <View style={styles.input}>
                <Text style={styles.label}>Email</Text>
                <TextInput
 
                    placeholder="abcd@gmail.com"
                    keyboardType="email-address"
                />
            </View> */}

                      <View style={styles.InputView1}>
                        <Text
                          style={[
                            {color: '#1F487c', fontSize: 13,backgroundColor:"white",alignSelf: 'flex-start',marginTop:-10,position:"absolute"},
                            {marginHorizontal: 5},
                          ]}>
                          Email
                        </Text>
                        {/* <View style={[styles.flagView, {marginHorizontal: 5}]}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 14,
              paddingVertical: 5,
              width: '100%',
              fontWeight: '400',
            }}
            placeholder="abcd@gmail.com"
            keyboardType="email-address"
            value={values.email}
            onChangeText={text => {
              setEmailValue(text);
            }}
            autoCorrect={false}
            autoCapitalize="none"
            spellCheck={false}
            textContentType="none"
          />
        </View> */}
                        {/* {touched.email_id && errors.email_id && (
          <Text style={styles.emailerror}> {errors.email_id} </Text>
        )} */}
                        <Field
                          name="email"
                          value={values?.email}
                          onChangeText={handleChange('email')}
                          keyboardType="email-address"
                          component={TextInput}
                          color="#1F487C"
                          style={{
                            borderRadius: 5,
                            paddingVertical: 2,
                            width: '100%', // Ensure the TextInput takes up the full width
                          }}
                          placeholderTextColor="#1F487C"
                          placeholder="Email"
                        />
                        <ErrorMessage
                          name="email"
                          component={Text}
                          style={{
                            color: 'red',
                            position: 'absolute',
                            top: 69,
                            left: 10,
                            fontSize: 11,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.submitView}
                      onPress={handleSubmit}>
                      <Text style={styles.submitText}>Save Changes</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAwareScrollView>
              );
            }}
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
  dropdown: {
    color: '#1F487C',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  dropdownText: {
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#1F487C',
    paddingHorizontal: 9,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#1F487C',
    fontWeight: '400',
    lineHeight: 16,
    paddingHorizontal: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#1F487C',
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
    fontSize: 12,
    color: '#1F487c',
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
  errorText: {
    color: 'red',
    position: 'absolute',
    top: 50,
    left: 10,
    fontSize: 11,
  },
  errorText1: {
    color: 'red',
    position: 'absolute',
    top: 140,
    left: 23,
    fontSize: 11,
  },
  container2: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 25,
    gap: 20,
  },
  Mobileinput: {
    padding: 12,
    // borderWidth: 1,
    // borderColor: '#ccc',
    height: 40,
    marginTop: 10, // Space between label and input
    fontSize: 16,
    borderRadius: 5,
    color:'#1F487c',
    marginBottom:5,
  },
  Mobilelabel: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontSize: 12,
    color: '#1F487c',
    fontWeight: '400',
    textAlign: 'left', // Align text to the left
    transition: 'top 0.3s ease, fontSize 0.3s ease', // Smooth transition for floating effect
    backgroundColor: 'white', // To cover the input box behind the label
    paddingHorizontal: 5,
    zIndex: 1, // Ensure label is above input field
  },
  MobilelabelFocused: {
    top: -16, // Move the label above the input field when focused
    fontSize: 12, // Smaller font size when label floats
  },
});
export default AddpassangerScreen;
