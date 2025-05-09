import {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import {CheckBox, Icon} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import CountryPicker from 'react-native-country-picker-modal';
import {Svg} from 'react-native-svg';
import Dropdown1 from '../assets/Dropdown1';

const ContactDetailsComponent = ({
  image,
  title,
  onPress,
  titleStyle,
  valueStyle,
  setMobileValue,
  mobilevalue,
  setEmailValue,
  emailvalue,
  statevalue,
  setStateValue,
  occupationvalue,
  setOccupationValue,
  errors,
  touched,
}) => {
  const allowedCountries = ['IN', 'AE'];
  const [error, setError] = useState(null);
  const [selectedIndex, setIndex] = useState(0);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [countryName, setCountryName] = useState('India');
  const [dialCode, setDialCode] = useState('91');

  const renderFlagButton = () => (
    <TouchableOpacity onPress={() => setCountryPickerVisible(true)}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Text style={{ width: 28.88, height: 20 }}>
                    {getFlagEmoji(countryCode)}
                </Text> */}
        <Text style={{height: 20}}>
          {'+91(IND)'}
          {/* */}
          {/* {`${dialCode}`} */}
        </Text>
        <Svg style={{width: 10, height: 40, marginLeft: 10}}>
          <Dropdown1 width="100%" height="100%" />
        </Svg>
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

  const categories = [
    {value: 'Business', label: 'Business'},
    {value: 'General Public', label: 'General Public'},
    {value: 'Physically Challenged', label: 'Physically Challenged'},
    {value: 'Pilgrim Travelers', label: 'Pilgrim Traveler'},
    {value: 'Senior Citizens', label: 'Senior Citizen'},
    {value: 'Students', label: 'Student'},
    {value: 'Tourist', label: 'Tourist'},
    {value: 'Corporate Travelers', label: 'Corporate Traveler'},
  ];

  const occOptions = categories?.map((value, ind) => ({
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
  const occdefaultoption = {
    value: '',
    label: (
      <div className="md:text-[1vw] text-[4vw]  px-[0.2vw] pb-[0.1vw] text-gray-400">
        Select State
      </div>
    ),
    disabled: true,
  };

  const occoptionss = [occdefaultoption, ...occOptions];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Contact Details</Text>
      </View>

      {/* <View style={styles.input}>
        <Text style={styles.label}>State of residence</Text>
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
          value={statevalue}
          onChange={item => {
            setStateValue(item.value);
          }}
        />
        {touched?.state && errors?.state && (
          <Text style={styles.stateerror}> {errors.state} </Text>
        )}
      </View> */}

      <View style={[styles.input, {position: 'relative', marginBottom: 20}]}>
  
  {/* Floating Label */}
  <View style={{
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: 'white', // match your card/input background
    paddingHorizontal: 5,
    zIndex: 1,
    
  }}>
    <Text style={[styles.label, {fontSize: 12, color: '#1F487C',marginLeft:-8}]}>
      State of residence *
    </Text>
  </View>

  {/* Dropdown */}
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
    value={statevalue}
    onChange={item => {
      setStateValue(item.value);
    }}
  />

  {/* Error Message */}
  {touched?.state && errors?.state && (
    <Text style={styles.stateerror}> {errors.state} </Text>
  )}
  
</View>

      <Text
        style={{
          fontSize: 14,
          color: '#1F487C80',
          fontWeight: '400',
          marginVertical: -20,
          marginTop:-35,
        }}>
        Required for GST Tax Invoicing
      </Text>

      <View style={[styles.row, {alignItems: 'center', marginTop: 10}]}>
        <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
          <Text style={[styles.label, {marginTop:-25,backgroundColor:'white',marginBottom:8,fontSize:12,marginLeft:-2 ,color:'#1F487C'}]}>
            Mobile Number
          </Text>
          {/* <TouchableOpacity
            onPress={() => setCountryPickerVisible(true)}
            style={{}}> */}
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:4}}>
              <Text style={{color: '#1F487C', fontSize: 14}}>
                +{dialCode} ({countryName?.slice(0, 3).toUpperCase()})
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
        </View>

        <View
          style={[
            styles.verticleLine,
            {height: '100%', marginHorizontal: 5},
          ]}></View>

        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={[styles.label,{marginTop:-10,backgroundColor:'white',marginBottom:8,fontSize:12,marginLeft:3 ,color:'#1F487C'}]}></Text>
          <TextInput
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            returnKeyType="done"
            value={mobilevalue}
            onChangeText={text => {
              setMobileValue(text);
            }}
            style={{
              borderRadius: 5,
              paddingVertical: 2,
              width: '100%',
              color:'#1F487C',
              marginBottom:8,

            }}
          />
        </View>
      </View>
      {touched?.mobile_number && errors?.mobile_number && (
        <Text style={styles.mobileerror}> {errors?.mobile_number} </Text>
      )}
      {/* <View style={styles.input}>
                <Text style={styles.label}>Email</Text>
                <TextInput

                    placeholder="abcd@gmail.com"
                    keyboardType="email-address"
                />
            </View> */}

      <View style={styles.InputView1}>
        <Text
          style={[styles.label, {marginHorizontal: 6,marginTop:-14,backgroundColor:"white",marginBottom:0,color:'#1F487C', alignSelf: 'flex-start',}]}>
          Email
        </Text>
        <View style={[styles.flagView, {marginHorizontal: 3}]}>
          <TextInput
            style={{
              flex: 1,
              fontSize: 14,
              height:40,
              paddingVertical: 1,
              width: '100%',
              fontWeight: '400',
               color:'#1F487C',
               marginBottom:5,
            }}
            placeholder="abcd@gmail.com"
            keyboardType="email-address"
            value={emailvalue}
            onChangeText={text => {
              setEmailValue(text);
            }}
            autoCorrect={false}
            autoCapitalize="none"
            spellCheck={false}
            textContentType="none"
          />
        </View>
        {touched?.email_id && errors?.email_id && (
          <Text style={styles.emailerror}> {errors?.email_id} </Text>
        )}
      </View>

      <View style={[styles.input,{height:60,marginVertical:5,justifyContent:'center'}]}>
        <Text style={[styles.label,{color:'#1F487C',backgroundColor:'white',marginTop:-25,alignSelf:"flex-start",marginBottom:10}]}>Occupation</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{color: '#1F487C'}}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          iconColor="#1F487C"
          data={categories}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Occupation"
          searchPlaceholder="Search..."
          value={occupationvalue}
          onChange={item => {
            setOccupationValue(item.value);
          }}
        />
        {touched?.occupation && errors?.occupation && (
          <Text style={styles?.emailerror}> {errors?.occupation} </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 25,
    gap: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20,
    color: '#1F487C',
  },
  phoneView: {
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
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
  label: {
    fontSize: 12,
    color: '#1F487C80',
    fontWeight: '400',
  },
  input: {
    position: 'relative',
    borderColor: '#1F487C',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    height:50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#1F487C',
    // justifyContent: 'space-around',
    borderWidth: 0.5,
    borderRadius: 5,
    // padding: 10,
    flex: 1,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },

  dropdown: {
    // margin: 16,
    // height: 50,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
    color:'#1F487C'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'#1F487C'
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#1F487C',
    fontWeight: '400',
    lineHeight: 16,
  },
  iconStyle: {
    width: 25,
    height: 25,
    fontWeight: '700',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'#1F487C'
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
  emailerror: {
    position: 'absolute',
    marginTop: 63,
    marginLeft: 5,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
  mobileerror: {
    position: 'absolute',
    marginTop: 210,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
  stateerror: {
    position: 'absolute',
    marginTop: 85,
    marginLeft: 2,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
});

export default ContactDetailsComponent;
