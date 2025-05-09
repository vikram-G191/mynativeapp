import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Svg } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput, } from 'react-native-gesture-handler';

import BackWhite from '../assets/BackWhite';
import DownArrow from '../assets/DownArrow';
import backgroundImage from '../assets/home_bg.png'; // Replace with your actual image path
import CloseRed from '../assets/CloseRed';
import UpArrow from '../assets/UpArrow';
// import { CheckBox } from '@rneui/base';
import CheckBox from '@react-native-community/checkbox';
import { cancelTicket, getBookingDetails, getTicketDetails, preCancellationPolicy, Tbs_Booking_Cancellation } from '../API/TBSapi/MyAccount/CancelBooking';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getEmail, getPhone, getUserId } from '../Utils/STorage';

const CancelBookingScreen = (props) => {

  const [ticketNumber, onChangeTicketNumber] = React.useState('');
  const [phoneNumber, onChangePhoneNumber] = React.useState('');
  const tbs_discount = useSelector(state => state?.productReducer?.live_per);

  const [data, setData] = useState([
    { title: "How to cancel my booking?", content: "Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket." },
    { title: "Where can I check the cancellation policy?", content: "Guest Users must enter the Booking Id and corresponding Passenger Mobile number to cancel the booking. To cancel a booking made through a registered account, please log in and cancel the ticket." },

  ])
  const [openItem, setOpenItem] = useState(null);

  const [statusVisible, setStatusVisible] = useState(false);
  const [cancelModal, setCancelModal] = useState(false)

  const [selectedRows, setSelectedRows] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([])
  const [preCalcellation, setPrecancellation] = useState([])
  const [cancelResponse, setCancelResponse] = useState([])
  const [responseModal, setResponseModal] = useState(false)
  const [refundAmount, setRefundAmound] = useState("")

  const [loginPassenger, setLoginPassenger] = useState({
    passenger_id: "",
    email: "",
    phone: ""
  });
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const id = await getUserId();
        const email = await getEmail();
        const phone = await getPhone();
        setLoginPassenger({
          passenger_id: id,
          email: email,
          phone: phone
        })
      };

      fetchData();
    }, [])
  );
  const toggleCheckbox = (item) => {
    const alreadySelected = selectedRows?.find(row => row.Seat_Num === item.Seat_Num);
    if (alreadySelected) {
      setSelectedRows(selectedRows?.filter(row => row.Seat_Num !== item.Seat_Num));
    } else {
      setSelectedRows([...selectedRows, item]);
    }
  };

  // console.log(selectedRows, "selectedrows");



  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>?/gm, '');
  };
  const handleItemClick = (index) => {
    setOpenItem(openItem === index ? null : index);
  };
  const renderListItem = ({ item, index }) => {
    // const getItem = item?.faqinfos?.find((each) => each.title)
    return (
      <View style={{ flex: 1 }} key={index} >
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%' }} onPress={() => handleItemClick(index)} >
          <Text style={{ overflow: 'hidden', fontFamily: 'Inter', width: '90%', textAlign: 'left', color: '#1F487C', fontSize: 14, fontWeight: '600', lineHeight: 16, }} >{item.title}
          </Text>
          {
            openItem === index && <UpArrow width={15} height={15} /> || <DownArrow width={15} height={15} />}
        </TouchableOpacity>

        {openItem === index &&
          <Text style={{ color: '#1F487C', fontFamily: 'Inter', fontSize: 12, textAlign: 'left', padding: 5, fontWeight: '400', lineHeight: 14, maxHeight: openItem === index ? 'auto' : 0, opacity: openItem === index ? 1 : 0, paddingBottom: 5, }} >
            {item.content} </Text>
        }
        <View style={{ height: 1, backgroundColor: 'rgba(31, 72, 124, 0.5)', margin: 10, width: '100%' }} />

      </View>
    )
  }

  const closeBottomView = () => {

    setStatusVisible(false)


  }

  const closeCancelmodal = () => {
    setCancelModal(false)
  }

  const closeResponseeModal = () => {
    setCancelResponse("")
    setSelectedRows([])
    setPrecancellation("")
    setTicketDetails('')
    setBookingDetails('')
    setResponseModal(false)
  }

  const can_totalFare = selectedRows?.reduce((sum, passenger) => {
    return sum + Number(passenger?.total_fare);
  }, 0);

  const tbsrefund =
    (Number(can_totalFare) * Number(preCalcellation?.can_ret_amt)) / 100;

  // console.log(tbsrefund, "refuncamounkfkdjfjdf");


  const validateAndSubmit = async () => {
    // console.log('validateAndSubmit')
    // Basic validation for Ticket Number and Mobile Number
    const ticketNumberIsValid = ticketNumber.trim().length > 0;
    const mobileNumberIsValid = /^[0-9]{10}$/.test(phoneNumber);

    if (!ticketNumberIsValid || !mobileNumberIsValid) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid Ticket Number and Mobile Number (10 digits).'
      );
      return;
    }
    else {
      // console.log(ticketNumber, phoneNumber, "validmobilenumber");
      const bookingresponse = await getBookingDetails(phoneNumber, ticketNumber.toLocaleUpperCase())
      if (bookingresponse.status === "success") {
        setTicketDetails(bookingresponse.data)
        console.log(bookingresponse.data, "new datataa");
        const preCancellationres = await preCancellationPolicy(phoneNumber, ticketNumber.toLocaleUpperCase())
        console.log(preCancellationres, "statiejfodjfdjf");

        if (preCancellationres.status === "success") {
          setPrecancellation(preCancellationres)
          console.log("hello how are you");

          const ticketDetails = await getTicketDetails(ticketNumber.toLocaleUpperCase())
          // setTicketDetais(ticketDetails.ticketInfo)
          setBookingDetails(ticketDetails.ticketInfo)
          // console.log(ticketDetails.ticketInfo.ticket_det ,"new datataa");

        }

      }

    }

    // Handle the form submission if valid
    setStatusVisible(true)
  };
  const dataa = [
    { id: 1, name: 'vikram', gender: 'M', age: 23, seatNo: 'I4' },
    { id: 2, name: 'anitha', gender: 'F', age: 26, seatNo: 'I5' },
    { id: 3, name: 'rajesh', gender: 'M', age: 30, seatNo: 'J1' },
    // Add more passengers
  ];

  function getFirstRefundAmount(amount) {
    const firstPolicy = preCalcellation?.CancellationPolicyWithRefund?.[0];

    if (!firstPolicy) {
      return 0;
    }

    const percentageStr = firstPolicy?.rp?.replace('%', '');
    const percentage = parseFloat(percentageStr);

    const calculatedAmount = (amount * percentage) / 100;
    return calculatedAmount.toFixed(2); // returns a string like "1185.00"
  }


  const renderItem = ({ item }) => {
    const isChecked = selectedRows.some(row => row.Seat_Num === item.Seat_Num);
    return (
      <View style={styles.row}>
        <CheckBox
          value={isChecked}
          onValueChange={() => toggleCheckbox(item)}
        />
        {/* <Text style={styles.cell}>{item.id}</Text> */}
        <Text style={styles.cell}>
          {item.Passenger_Name} (
          <Text style={{ color: "black", fontSize: 12, paddingHorizontal: 5 }}>
            {item.Age}
          </Text>,
          <Text style={{ color: "black", fontSize: 12, paddingHorizontal: 5 }}>
            {item.GENDER_TYPE?.toLowerCase() === "male" ? "M" : "F"}
          </Text>
          )
        </Text>

        <Text style={styles.cell}>{item.Seat_Num}</Text>
        <Text style={styles.cell}>{item.total_fare}</Text>
        <Text style={styles.cell}>{getFirstRefundAmount(item.total_fare)}</Text>
      </View>
    );
  };
  const passengerData = useMemo(() => {
    if (!bookingDetails || bookingDetails?.ticket_det?.length === 0)
      return [];
    return bookingDetails?.ticket_det?.map((passenger, i) => ({
      key: `${passenger.Seat_Num}`,
      name: passenger.Passenger_Name,
      age: passenger.Age,
      gender: passenger.GENDER_TYPE,
      bookingId: ticketDetails[0].ticket_no,
      seat: passenger.Seat_Num,
      mobile_number: ticketDetails[0].mobile,
      status:
        passenger.gender === "male"
          ? "AFM"
          : passenger.gender === "female"
            ? "AFF"
            : "AFA",
      base_price: ticketDetails[0]?.passenger_details?.[i]?.base_price,
      tbs_deal: ticketDetails[0]?.passenger_details?.[i]?.tbs_deal,
      tbs_fare: ticketDetails[0]?.passenger_details?.[i]?.tbs_fare,
      gst: ticketDetails[0]?.passenger_details?.[i]?.gst,
      total_fare: ticketDetails[0]?.passenger_details?.[i]?.total_fare,
    }));
  }, [bookingDetails]);

  console.log("ticketdetails", ticketDetails[0]);


  //       const passengerData = useMemo(() => {
  //   if (selectedRows?.length === 0)
  //     return [];
  //   return selectedRows.map((passenger, i) => ({
  //     key: `${passenger.Seat_Num}`,
  //     name: passenger.Passenger_Name,
  //     age: passenger.Age,
  //     gender: passenger.GENDER_TYPE,
  //     bookingId: ticketDetails.Ticket_no,
  //     seat: passenger.Seat_Num,
  //     mobile_number: ticketDetails.mobile_number,
  //     status:
  //       passenger.gender === "male"
  //         ? "AFM"
  //         : passenger.gender === "female"
  //           ? "AFF"
  //           : "AFA",
  //     base_price: passenger.base_price,
  //     tbs_deal: passenger?.tbs_deal,
  //     tbs_fare: ticketDetails?.passenger_details?.[i]?.tbs_fare,
  //     gst: ticketDetails?.passenger_details?.[i]?.gst,
  //     total_fare: ticketDetails?.passenger_details?.[i]?.total_fare,
  //   }));
  // }, [bookingDetails]);

  // console.log(passengerData,"passengerdatatatatat");
  // console.log(selectedRows,"pas");

  const filtertselectedPassenger = () => {
    const seatNums = selectedRows?.map(item => item?.Seat_Num);
    const filteredpass = passengerData?.filter(item => seatNums.includes(item.seat));
    return filteredpass
  }

  // console.log(filtertselectedPassenger(),"filteredPassengerss");



  const handleCancel = async () => {
    setRefundAmound(tbsrefund)
    const isPartialCancellation = selectedRows?.length == ticketDetails[0]?.passenger_details?.length ? 1 : 0;
    // console.log(isPartialCancellation, selectedRows, ticketDetails[0]?.passenger_details?.length, "partialcancellation");
    try {
      const response = await cancelTicket(selectedRows, ticketDetails[0], isPartialCancellation)

      console.log(response, "abicancelresponse");

      setCancelResponse(response)
      if (response?.status === "success") {
        closeBottomView()
        closeCancelmodal()
        const refundAmount =
          response.return_amount -
          (response.return_amount * tbs_discount) / 100;
        const filteredPassengerList = await filtertselectedPassenger()

        const tbsCancellation = await Tbs_Booking_Cancellation(ticketDetails[0],
          bookingDetails, passengerData, selectedRows, isPartialCancellation, preCalcellation, refundAmount, loginPassenger,
          response?.NewPNR, filteredPassengerList
        )

        console.log(tbsCancellation, "TbsCancellation");

      }
      else {
        closeBottomView()
        closeCancelmodal()
        Alert.alert(response?.message)
      }
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setTicketDetails('')
      setBookingDetails('')
      // setPrecancellation("")
      // setCancelModal(true)
      // if (cancelResponse.status === "success") {
      setResponseModal(true)
      // }
      console.log("finally log ", cancelResponse);

    }
  }

  console.log(cancelResponse, "roisdjfio;jf;jfi;");

  console.log(tbsrefund, "refundamounddd");



  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.bgView}>
          <View style={styles.navigationView}>
            <ImageBackground
              source={require('../assets/HeadBg.png')}
              style={styles.topImageBg}
              imageStyle={{
                resizeMode: 'cover',
              }}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => props.navigation.goBack()}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                    <BackWhite width="100%" height="100%" />
                  </Svg>
                </View>
              </TouchableOpacity>
              <View style={styles.topViewTitle}>
                <Text style={styles.topTitle}>Cancel Booking</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.tripInfoview}>
            <ImageBackground
              source={backgroundImage}
              style={{ flex: 1, resizeMode: 'cover', height: '100%', padding: 16 }}>
              <Text style={styles.title}>Enter Ticket Details</Text>
              <Text style={[styles.subtitle, { paddingVertical: 8 }]}>Check your email or SMS for booking confirmation details</Text>
              <View style={{ width: '100%', alignItems: 'center', marginVertical: 5 }}>
                <View style={{
                  backgroundColor: '#FFFFFF',
                  flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center',
                  borderColor: 'rgba(31, 72, 124, 0.5)', borderRadius: 10, borderWidth: 1, marginVertical: 8
                }}>
                  <Image
                    source={require('../assets/ticketnoIcon.png')}
                    style={{ width: 30, height: 30, resizeMode: 'cover', marginLeft: 10 }}
                  />
                  <TextInput style={styles.input}
                    placeholderTextColor={'rgba(31, 72, 124, 0.5)'}
                    onChangeText={onChangeTicketNumber}
                    value={ticketNumber}
                    maxLength={40}
                    placeholder="Ticket Number"
                    returnKeyType="done"
                    // keyboardType="numeric"
                     />
                </View>
                <View style={{
                  backgroundColor: '#FFFFFF',
                  flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center',
                  borderColor: 'rgba(31, 72, 124, 0.5)', borderRadius: 10, borderWidth: 1, marginVertical: 8
                }}>
                  <Image
                    source={require('../assets/PhoneIcon.png')}
                    style={{ width: 25, height: 25, resizeMode: 'cover', marginHorizontal: 10 }}
                  />
                  <TextInput style={styles.input}
                    placeholderTextColor={'rgba(31, 72, 124, 0.5)'}
                    onChangeText={onChangePhoneNumber}
                    returnKeyType="done"
                    value={phoneNumber}
                    maxLength={10}
                    placeholder="Mobile Number"
                    keyboardType="numeric"

                  />
                </View>
                <TouchableOpacity onPress={
                  validateAndSubmit
                } style={{
                  width: 240,
                  height: 46, marginVertical: 15, backgroundColor: '#1F487C', alignItems: 'center', justifyContent: 'center', borderRadius: 22
                }}>
                  <Text style={{
                    color: '#FFFFFF', fontSize: 17, fontWeight: '600',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                  }}>Submit</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.title, { paddingVertical: 10 }]}>Frequently Asked Questions</Text>
              <View style={{ flex: 1, width: '100%', padding: 10, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: 1, borderColor: '#rgba(31, 72, 124, 0.5)' }}>
                <FlatList
                  data={data}
                  renderItem={renderListItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>


            </ImageBackground>

          </View>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        transparent={true}
        visible={statusVisible}
        onRequestClose={closeBottomView}>
        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <TouchableOpacity
            style={{ flex: 1, width: '100%' }}
            onPress={closeBottomView}></TouchableOpacity>
          <View style={styles.modalContent}>
            <ImageBackground
              source={backgroundImage}
              style={{ width: '100%', flex: 1, resizeMode: 'cover', padding: 20, }}>

              {/* <TouchableOpacity onPress={() => { setStatusVisible(false) }} style={{ marginVertical: 10 }}>
                <Svg style={{ width: 35, height: 35, borderRadius: 100 }}>
                  <CloseRed width="100%" height="100%" />
                </Svg>
              </TouchableOpacity>
              <Text style={{
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'center',
                color: '#1F487C',
                lineHeight: 25,
                fontFamily: 'Inter'
              }}>Your Booking has been Cancelled</Text> */}

              {
                ticketDetails?.length > 0  ? 
                <View>
                  {
                    ticketDetails?.length > 0 && ticketDetails?.map((item, ind) => {

                      return (
                        <View key={ind}>

                          <Text style={{ fontSize: 20, color: "#1f487c", textAlign: "center", fontWeight: "semibold" }}>Cancel Your Ticket</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10 }}>
                            <Text style={{ color: "#1f487c", fontSize: 15 }}>{item?.operator_name}</Text>
                            <Text style={{ color: "#808080", fontSize: 12 }}>{`(${item?.bustype_name})`}</Text>
                          </View>
                          <View style={{ justifyContent: "space-between", flexDirection: "row", paddingVertical: 10, color: "black" }}>
                            <View>
                              <Text style={{ color: "black" }}>{`${item.source_name} `}</Text>
                              <Text style={{ color: "black" }}>{moment(item?.depature_date).format("DD MMM, YYYY")}</Text>
                              <Text style={{ color: "black" }}>{moment(item.depature_time, 'HH:mm:ss').format('h:mm A')}</Text>

                            </View>
                            <View>
                              <Text style={{ color: "black" }}>{`${item.destination_name} `}</Text>
                              <Text style={{ color: "black" }}>{moment(item?.arrival_date).format("DD MMM, YYYY")}</Text>
                              <Text style={{ color: "black" }}>{item.droping_place_time}</Text>

                            </View>
                          </View>
                        </View>
                      )
                    })
                  }

                  {/* {
                    <View><Text>Cancellation Policy</Text>
                    <View style={{ padding: 20 }}>
      {preCalcellation?.CancellationPolicyWithRefund?.map((item, index) => {
        const refundAmount = item?.cc?.replace('Rs.', '').trim();
        const refundPercent = item?.rp;
        const refundCondition = item?.con;

        return (
          <Text key={index} style={{ fontSize: 13, marginBottom: 10,color:"black" }}>
            {`. ${" "} ${refundAmount} /- @ ${refundPercent} refund (${refundCondition})`}
          </Text>
        );
      })}
    </View>
                    </View>
                  } */}


                  <View style={styles.containerr}>
                    {/* Table Header */}
                    <View style={[styles.row, styles.headerRow]}>
                      {/* <CheckBox value={false} /> */}
                      {/* <Text style={styles.header}>Select</Text> */}
                      <Text style={styles.header}>Passenger Details</Text>
                      {/* <Text style={styles.header}>Gender</Text> */}
                      {/* <Text style={styles.header}>Age</Text> */}
                      <Text style={styles.header}>Seat NO</Text>
                      <Text style={styles.header}>Total Fare</Text>
                      <Text style={styles.header}>Refund Amount</Text>
                    </View>

                    {/* Table Body */}
                    <FlatList
                      data={ticketDetails[0]?.passenger_details}
                      renderItem={renderItem}
                      keyExtractor={(item) => item?.Seat_Num}
                    />


                  </View>
                  {/* <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: 'bold' }}>Selected Rows:</Text>
                  {selectedRows?.map((row) => (
                    <Text key={row.id}>{`${row.Passenger_Name} - Seat ${row.Seat_Num}`}</Text>
                  ))}
                </View> */}

                  <View style={{ marginTop: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* {selectedRows?.length > 0 && (
                      <TouchableOpacity onPress={() => setCancelModal(true)}>
                        <Text style={{ fontSize: 18, backgroundColor: "red", padding: 10, color: "white", borderRadius: 10 }}>Cancel Ticket</Text>
                      </TouchableOpacity>
                    )} */}

                    <TouchableOpacity
                      onPress={() => setCancelModal(true)}
                      disabled={selectedRows?.length === 0}
                      style={{
                        backgroundColor: selectedRows?.length > 0 ? "red" : "#d7a5a5",
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
                        Cancel Ticket
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                  : <View  style={{margin:"auto",alignItems:"center"}}><Text style={{color:"#1f487c" ,fontWeight:'bold' }}>no ticket details found , or invalid ticket or phone number</Text></View>
              }

            </ImageBackground>
          </View>


        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModal}
        onRequestClose={closeCancelmodal}
      >


        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <TouchableOpacity
            style={{ flex: 1, width: '100%' }}
            onPress={closeCancelmodal}></TouchableOpacity>
          <View style={{ height: '50%', backgroundColor: "white", width: "100%", borderTopEndRadius: 25, borderTopLeftRadius: 25, padding: 20 }}>
            <ImageBackground
              source={backgroundImage}
              style={{ width: '100%', flex: 1, resizeMode: 'cover', padding: 20, }}>
              <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>

                {/* {
                cancelResponse?.status === "success" ? <View><Text>Your Booking was cancelled Successfully</Text><Text> Rerund amount is : {refundAmount}</Text>

                  <Text>Your New Ticket Number is  : {cancelResponse?.NewPNR}</Text></View>
                  : */}
                {/* <>
                  <Text style={{ fontSize: 18, color: '#1f487c' }}>Are you sure want to cancel the ticket ?</Text>
                  <View style={{ paddingBottom: 40, paddingTop: 20 }}>
                    {selectedRows?.map((row) => (
                      <Text key={row.id} style={{ paddingVertical: 5 }} >{`${row.Passenger_Name} - Seat ${row.Seat_Num}`}</Text>
                    ))}
                  </View>


                  <View style={{ flexDirection: 'row', gap: 50 }}>
                    <View style={{ borderColor: '#1F487C', borderWidth: 2, height: 30, width: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <TouchableOpacity onPress={closeCancelmodal} >
                        <Text style={{ color: "black" }}>No</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#1F487C', height: 30, width: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <TouchableOpacity onPress={handleCancel}>
                        <Text style={{ color: "white" }}>Yes</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </> */}
                <>
                  <Text style={{ fontSize: 20, color: '#1f487c', textAlign: 'center', marginBottom: 20 }}>
                    Are you sure you want to cancel the ticket?
                  </Text>

                  <View style={{ paddingBottom: 30, paddingTop: 20 }}>
                    {selectedRows?.map((row) => (
                      <Text key={row.id} style={{ fontSize: 16, paddingVertical: 5, textAlign: 'center', color: "black" }}>
                        {`${row.Passenger_Name} `}
                      </Text>
                    ))}
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                    {/* No Button */}
                    <TouchableOpacity onPress={closeCancelmodal} style={{ paddingVertical: 8 }}>
                      <View
                        style={{
                          borderColor: '#1F487C',
                          borderWidth: 2,
                          height: 40,
                          width: 120,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 8,
                        }}
                      >

                        <Text style={{ fontSize: 16, color: '#1F487C', fontWeight: 'bold' }}>No</Text>
                      </View>
                    </TouchableOpacity>

                    {/* Yes Button */}
                    <TouchableOpacity onPress={handleCancel} style={{ paddingVertical: 8 }}>
                      <View
                        style={{
                          backgroundColor: '#1F487C',
                          height: 40,
                          width: 120,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 8,
                        }}
                      >

                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Yes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>

                {/* } */}


              </View>


            </ImageBackground>
          </View>
        </View>

      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={responseModal}
        onRequestClose={closeResponseeModal}
      >


        <View style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <TouchableOpacity
            style={{ flex: 1, width: '100%' }}
            onPress={closeResponseeModal}></TouchableOpacity>
          <View style={{ height: '40%', backgroundColor: "white", width: "100%", borderTopEndRadius: 25, borderTopLeftRadius: 25, padding: 20 }}>
            <ImageBackground
              source={backgroundImage}
              style={{ width: '100%', flex: 1, resizeMode: 'cover', padding: 20, }}>
              <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <View style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  {
                    cancelResponse?.status === "success" && (
                      <View style={{ alignItems: "center", marginBottom: 20 }}>
                        <Text style={{ color: "#1f487c", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                          Your Booking was cancelled Successfully
                        </Text>
                        <Text style={{  marginTop: 25, color: "#1f487c" }}>
                          Refund amount is:  <Text style={{color:"black"}}>{refundAmount ? refundAmount : "0"}</Text>
                        </Text>
                      </View>
                    )
                  }
                  {cancelResponse?.NewPNR && (
                    <Text style={{ fontSize: 14, marginTop: 10, textAlign: "center",color: "#1f487c"  }}>
                      Your New Ticket Number is:  <Text style={{color:"black"}}>{cancelResponse?.NewPNR}</Text>
                    </Text>
                  )}
                </View>




              </View>
            </ImageBackground>
          </View>
        </View>

      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerr: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  headerRow: {
    backgroundColor: '#25497c',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  container: { flex: 1, backgroundColor: '#1F487C' },
  bgView: { flex: 1, backgroundColor: '#E5FFF1' },
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
  operatorView: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
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
  topSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  tripInfoview: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    marginBottom: 20,

  },
  input: {
    fontFamily: 'Inter',
    color: '#1F487C',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    margin: 5,
    padding: 8,
  }, title: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1F487C',
    fontWeight: '600',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 14,
    color: '#1F487C',
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    // maxHeight: '85%',
    // minHeight: '20%',
    height: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
});

export default CancelBookingScreen;
