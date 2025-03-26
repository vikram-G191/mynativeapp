import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Image,
    Alert, TextInput,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line } from 'react-native-svg';

import BackWhite from '../assets/BackWhite';
import HeadWhite from '../assets/HeadArrow';
import BusIcon from '../assets/BusIcon';
import PlaceIcon from '../assets/PlaceIcon';
import ArrowIcone from '../assets/ArrowIcone';
import { ScrollView } from 'react-native-gesture-handler';
import Addpassengericon from '../assets/Addpassengericon';
import CustomCheckbox from './CustomCheckbox';
import BottomModalSheet from './BottomModalSheet';
import PersonIcon from '../assets/PersonIcon';
import BusTimeBg from '../assets/BusTimeBg';
import BlackCar from '../assets/BlackCar';
import LinearGradient from 'react-native-linear-gradient';
import { BackgroundImage } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GetAvailableOffers, GetDiscountOffers, GetOfferValid, GetTBSFareInfo, GetTBSSeatBlock, GetTBSSeatConfirmed, TBS_Booking_Details } from '../API/TBSapi/DashBoard/Dashboard';
import { GetViewTicketID } from '../API/TBSapi/MyAccount/MyBooking';
import { calculateDiscountedFare } from '../component/Tbs_Disocunt';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CURRENT_PERCENTAGE, GET_TICKET_DETAILS } from '../Redux/Store/Type';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { REACT_APP_API_URL, REACT_APP_RAZORPAY_KEY_ID, REACT_APP_RAZORPAY_KEY_SECRET, REACT_APP_CRM_API_URL_IMAGE } from "@env"


const CustomCheckbox1 = ({ label, checked, onChange }) => {


    return (
        <TouchableOpacity style={styles.container1} onPress={onChange}>

            <Image
                source={
                    checked
                        ? require('../assets/selectTick.png')
                        : require('../assets/UnCheckBlockIcon.png')
                }
                style={{
                    width: 15,
                    height: 15,
                    borderWidth: 1,
                    borderColor: '#1F487C',
                    justifyContent: 'center',
                    alignItems: 'center',

                    // width: 18,
                    // height: 18,
                    // resizeMode: 'cover',
                    // marginRight: 10,
                    // marginTop: 2,
                }}
            />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const screenWidth = Dimensions.get('window').width;

const TravelerScreenDetails = ({ props, navigation, route }) => {


    // const api_crm_image = REACT_APP_CRM_API_URL_IMAGE
    const api_crm_image = `https://crm.thebusstand.com/api`

    const { themecolor = '#1F487C' } = route.params || {};

    const { screenTheme = 'Normal Coach' } = route.params || {};

    const themeheaderFontColor = (screenTheme === 'Luxury Coach') ? '#141414' : '#FFFFFF'; // Default to black if not '#393939'

    const themeheaderFontColor1 = (screenTheme === 'Luxury Coach') ? '#141414' : 'rgba(255, 255, 255, 0.5)'; // Default to black if not '#393939'
    const {
        selectedBoardingPoint,
        selectedDroppingPoint,
        seatLayout,
        selectedBusData,
        selectedSeat,
        totalPrice,
        Journey_Details
    } = route.params;

    console.log(Journey_Details, selectedBoardingPoint, " Journey_Details")
    // Mapping the seatNumber from the selectedSeats array
    const seatNumbers = selectedSeat.map(seat => seat.seatNumber);

    console.log(totalPrice, "totalPrice")
    const [finaldiscount, setFinalDiscount] = useState(0);

    const [promoCode, setPromoCode] = useState('');

    const [selectvalue, setSelectValues] = useState({
        value: null,
        Symbol: "",
        code: "",
    });
    const [tbsdiscountamount, setDiscount] = useState(null);

    const [selectedGender, setSelectedGender] = useState('male');
    //  setSelectedGender('male')
    const [checked, setChecked] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [isChecked1, setIsChecked1] = useState(false);

    const [isOfferExpand, setOfferExpand] = useState(true)

    const [isJourneyExpand, setJourneyExpand] = useState(false)

    const [isbilling, setIsBilling] = useState(false)

    const [isActive, setIsActive] = useState(false);

    const [emailInput, setEmailInuput] = useState('')

    const [mobileInput, setMobileInput] = useState('')

    const [confirmRefNo, setConfirmRefNo] = useState(null);

    const [orderid, setOrderId] = useState(null);

    const [ticketNumber, setTicketNumber] = useState()

    // State to track input data for each seat
    const [passengerData, setPassengerData] = useState(
        Object.keys(selectedSeat).reduce((acc, seat) => {
            acc[seat] = { name: '', age: '', gender: '' };
            return acc;
        }, {})
    );


    const dispatch = useDispatch()
    // If you need to display them as a list (e.g., as a comma-separated string)
    const seatList = seatNumbers.join(', ');

    //-------------------Validation----------------------

    const validationSchema = Yup.object().shape({
        // address: Yup.string().required('Address is required'),
        // pincode: Yup.string()
        //     .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
        // .required('Pincode is required'),
        // state: Yup.string().required('State is required'),
        // city: Yup.string().required('City is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
            .required('Mobile number is required'),
        passengers: Yup.object().shape(
            Object.keys(selectedSeat).reduce((acc, seat) => {
                acc[seat] = Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                    age: Yup.number().required('Age is required').positive().integer('Age must be a valid number'),
                    gender: Yup.string().oneOf(['male', 'female'], 'Gender is required').required(),
                });
                return acc;
            }, {})
        ),
    });


    // console.log(mobileInput, emailInput, "emailInput")

    const newArrival = (departureDate, departureTime, duration) => {
        const departureDateTime = moment(
            `${departureDate} ${departureTime}`,
            "YYYY-MM-DD hh:mm A"
        );
        // Add the duration to the departure time
        const arrivalDateTime = departureDateTime.add(moment.duration(duration));
        // Format the arrival date and time
        const arrivalDate = arrivalDateTime.format("YYYY-MM-DD");
        return arrivalDate;
    };

    const arraivaldate = newArrival(
        selectedBusData?.BUS_START_DATE,
        selectedBusData?.Start_time,
        selectedBusData?.TravelTime
    );

    // console.log(arraivaldate, "arrivaldateeeee");
    // const [razorpayLoading, setRazorpayLoading] = useState()

    const handleEmailChange = (text) => {
        setEmailInuput(text);
    };

    const handleMobileChange = (text) => {
        setMobileInput(text);
    };


    // console.log(passengerData, "passengerData_formik")

    // Function to handle changes in any of the input fields
    const handleInputChange = (seat, field, value) => {
        setPassengerData(prevData => ({
            ...prevData,
            [seat]: {
                ...prevData[seat],
                [field]: value
            }
        }));
    };

    // Function to handle gender selection for each seat
    const handleGenderSelect = (seat, gender) => {
        setPassengerData(prevData => ({
            ...prevData,
            [seat]: {
                ...prevData[seat],
                gender: gender
            }
        }));
    };


    const seatTypeIdList = selectedSeat
        .map((item) => item?.seatTypeID)  // Extract the seatTypeID from each seat object
        .filter((typeId) => typeId)  // Filter out undefined/null/empty values
        .join(",");  // Join the seatTypeIDs with a comma

    // console.log(selectedSeat, "|---|", "handle_submite_seattypeid")

    const [billingAddress, setBillingAddress] = useState({
        address: selectedBoardingPoint?.landmark,
        pincode: '',
        state: Journey_Details?.from_state,
        city: Journey_Details?.from_station_name,
    });
    // console.log(billingAddress, "billingAddress")
    // Function to handle input changes
    const handleBillingAddress = (field, value) => {
        setBillingAddress({
            ...billingAddress,  // Keep existing data
            [field]: value,  // Update the specific field
        });
    };

    const getPassengerCount = (data) => {
        let adultCount = 0;
        let childCount = 0;

        data.forEach((passenger) => {
            const age = parseInt(passenger.age, 10); // Ensure it's parsed as a number
            if (!isNaN(age)) { // Check if the age is a valid number
                if (age > 3) {
                    adultCount++;
                } else {
                    childCount++;
                }
            } else {
                // Handle the case where the age is invalid, maybe log or set defaults
                console.warn('Invalid age found for passenger:', passenger);
            }
        });

        return { adultCount, childCount };
    };

    // Usage
    const { adultCount, childCount } = getPassengerCount(Object.values(passengerData));

    const [faredetails, setFareDetails] = useState("");

    // console.log(adultCount, childCount, "getPassengerCount")

    const handleSubmit = async (values) => {
        try {
            const response = await GetTBSSeatBlock(
                selectedBusData,
                selectedSeat,
                passengerData,
                billingAddress,
                selectedBoardingPoint,
                selectedDroppingPoint,
                emailInput,
                mobileInput,
                totalPrice
            );
            if (response?.status === "success") {
                // setConfirmModal(true);
                // setEnableInput(true);
                setConfirmRefNo(response?.ReferenceNo);
                // try {
                //     // const data = await Abhibus_GetFareInfo(
                //     //   adultCount,
                //     //   childCount,
                //     //   response?.ReferenceNo
                //     // );
                const data = await GetTBSFareInfo(
                    adultCount,
                    childCount,
                    response?.ReferenceNo
                );
                setFareDetails(data?.GetFaresInfo);
                // } catch { }
            }
            // console.log(response.data, "|------------|", "seatblocking")
        } catch (error) {
            console.error("API call failed:", error);
        }
    };

    const OfferList = [
        { id: '1', image: require('../assets/SliderImg.png') },
        { id: '2', image: require('../assets/SliderImg.png') },
        { id: '3', image: require('../assets/SliderImg.png') },
        { id: '4', image: require('../assets/SliderImg.png') },
        { id: '5', image: require('../assets/SliderImg.png') },
    ];
    const PassengerList = [
        { id: '1', name: "xxxxxxx" },
        { id: '2', name: "YYYYYYYY" },

    ];
    const Separator = () => <View style={{
        marginVertical: 5,
        borderBottomColor: '#393939',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }} />;

    const Formatting = date => {
        const formattedDate = new Date(date);
        const options = { day: '2-digit', month: 'short' }; // '2-digit' for day, 'short' for month abbreviation (e.g., Mar)
        const travel_date = new Intl.DateTimeFormat('en-GB', options).format(
            formattedDate,
        );
        // console.log(travel_date); // Output: "13 Mar"
        return travel_date;
    };


    const PassengerItemRow = ({ item }) => (
        <View
            style={{
                flexDirection: 'row',
                borderRadius: 6,
                borderWidth: 1,
                marginHorizontal: 20,
                marginTop: 12,
                borderColor: '#393939',
            }}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 5,
                    marginLeft: 15,
                    gap: 15,

                }}>
                <View style={styles.circle}>
                    <Svg
                        style={{
                            width: 12.17,
                            height: 12.19,
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}>
                        <PersonIcon width="100%" height="100%" />
                    </Svg>
                </View>
                <View style={{
                    flexDirection: 'column', justifyContent: 'center',
                }}>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 14,
                        fontFamily: 'Inter',
                        color: '#393939',
                        lineHeight: 17,
                    }}>MithunKumar </Text>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 12,
                        fontFamily: 'Inter',
                        color: '#393939',
                        lineHeight: 15,
                    }}>male, 24 years </Text>
                </View>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    alignSelf: 'center',
                }}>
                <CustomCheckbox
                    label=""
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
            </View>
        </View>
    );

    const handleBookingPrice = async (order_id, payment_id, signature, msg) => {
        // setTicketLoading(true);
        // console.log(order_id, "order_id")
        try {
            // console.log("Calling API...");
            // const response = await Abhibus_SeatConfirmed(BusDetails, confirmRefNo);
            const response = await GetTBSSeatConfirmed(selectedBusData, confirmRefNo);
            // console.log(selectedBusData, "selectedBusData")
            // console.log(confirmRefNo, "confirmRefNo")
            if (response?.status === "success") {
                // toast.success(
                //   `Ticket Booked Successfully, your TicketNo: ${response?.TicketNo}`
                // );
                // setDropDown(null);
                // Fetch ticket details
                // const ticketdetails = await ViewTicketById(
                //   response?.TicketNo,
                //   setSpinning
                // );
                // console.log(response?.TicketNo, "ticketnumberesponse")
                const ticketdetails = await GetViewTicketID(
                    response?.TicketNo,
                );
                // const ticketservices = await GetTBSService(response?.TicketNo);
                const values = {
                    ticketNumber: response?.TicketNo,
                };
                // console.log(ticketdetails, "ticketdetails");

                // const cancel_data = await PreCancelTicket(values, mobileInput);
                //  // console.log("cancel_data", cancel_data);
                // console.log(ticketdetails, "ticketdetails")
                if (response?.TicketNo) {
                    setTicketNumber(response?.TicketNo);
                    // setTicketLoading(false);
                }
                // console.log(response?.TicketNo, "TicketNo")
                const tbs_deal = Math?.round(
                    Number(faredetails?.TotadultFare) * Number(tbs_discount / 100)
                );
                // const data = await PreCancelTicket(values, tbs_ticket_details?.mobile);
                // console.log(tbs_deal, "tbs_deal")
                // 
                const TBS_booking = await TBS_Booking_Details(
                    response?.TicketNo,
                    order_id,
                    payment_id,
                    signature,
                    ticketdetails?.ticketInfo,
                    emailInput,
                    mobileInput,
                    msg,
                    selectedBusData,
                    arraivaldate,
                    selectedBoardingPoint,
                    selectedDroppingPoint,
                    // selectedSeat,
                    Journey_Details,
                    ticketdetails?.ticketInfo?.bustype,
                    finaldiscount,
                    selectvalue?.code,
                    tbsamount,
                    tbsbasefare,
                    dispatch,
                    tbs_deal,
                    tbs_discount,
                    totaltax,
                    ticketdetails?.ticketInfo?.Board_Halt_Time
                );

                dispatch({
                    type: GET_TICKET_DETAILS,
                    payload: ticketdetails,
                });
                // console.log(response?.TicketNo, "afterTbs_history")
                if (response?.TicketNo) {
                    navigation.navigate('TravelerScreenDetailsSuccess', {
                        screenTheme: screenTheme,
                        themecolor: themecolor,
                        themeColor2: route.params.themeColor2,
                        // ticketlist: ticketlist,
                        Journey_Details: Journey_Details

                    }
                    )
                }
                // sessionStorage.setItem("ticket_view", "open"); // Update state with ticket details
                // console.log(ticketdetails, "ggggggggggg");
            }
            // console.log(response, "API Response");
        } catch (error) {
            console.error("API call failed:", error);
        }
    };


    const seatTaxList = selectedSeat
        .map((item) => item?.tax?.toString().split(",")[0])  // Extract the first value before the comma
        .filter((tax) => tax)  // Filter out undefined/null/empty values
        .map((tax) => Number(tax)); // Convert the tax values to numbers

    const totaltax =
        seatTaxList?.length > 0 &&
        seatTaxList.reduce((a, b) => a + b, 0); // Sum up the tax values


    // REACT_APP_RAZORPAY_KEY_ID =
    //     REACT_APP_RAZORPAY_KEY_SECRET =

    // const key_id = REACT_APP_RAZORPAY_KEY_ID;
    // const key_secret = REACT_APP_RAZORPAY_KEY_SECRET;
    // const OrderApi = REACT_APP_API_URL;


    // const key_id = "rzp_test_eyuWUoPChgfzBC";
    // const key_secret = "J4pAlk65GJZE4SgPt6PWzzin";
    // const OrderApi = "http://192.168.90.47:4006/api";
    const key_id = "rzp_live_uc9PmoclYw2dFk"
    const key_secret = "3oWO6A1iQQ7EbWa1VkEs3L1C"
    const OrderApi = `https://thebusstand.com/api`

    const tbs_discount = useSelector(state => state?.productReducer?.live_per)

    const tbs_available_offer = useSelector(
        (state) => state?.productReducer?.tbs_available_offer?.data
    );
    const offerlist = useSelector((state) => state?.productReducer?.discount_offer_list);

    console.log(tbs_available_offer, "tbs_available_offer")
    // useEffect(() => {
    //     dispatch({ type: CURRENT_PERCENTAGE, payload: 5 })
    // }, [])

    const tbsamount = calculateDiscountedFare(
        selectedBusData?.BUS_START_DATE,
        Number(faredetails?.TotadultFare),
        tbs_discount
    ) +
        Number(Math.round(totaltax)) -
        Number(finaldiscount);

    // console.log(selectedBusData?.BUS_START_DATE, tbs_discount, faredetails, totaltax, "tbsamount")

    const tbsbasefare =
        calculateDiscountedFare(
            selectedBusData?.BUS_START_DATE,
            Number(faredetails?.TotadultFare),
            tbs_discount
        ) + Number(Math.round(totaltax));

    const OrderId_Generate = async () => {
        const username = key_id;
        const password = key_secret;
        const apiUrl = `${OrderApi}/order`;

        const requestBody = {
            amount: tbsamount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                notes_key_1: "test",
                notes_key_2: "test2",
            },
            payment_capture: 1,
        };

        try {
            // console.log("API URL:", apiUrl); // Debugging API URL

            const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
            // const authHeader = `Basic ${btoa(
            //   `${process.env.REACT_APP_RAZORPAY_KEY_ID}:${process.env.REACT_APP_RAZORPAY_KEY_SECRET}`
            // )}`;

            const response = await axios.post(apiUrl, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
            });

            // console.log("Generated Order ID:", response?.data?.id); // Debugging Order ID
            setOrderId(response?.data?.id);
            // console.log(response?.data, "generatingid_id")
            return response?.data.id; // Return the order ID
        } catch (error) {
            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Response Status:", error.response.status);
            } else if (error.request) {
                console.error("No Response Received:", error.request);
            } else {
                console.error("Error Configuring Request:", error.message);
            }
            return null;
        }
    };

    const textRef = useRef(null);

    // const loadRazorpayScript = (callback) => {
    //     if (
    //         document.querySelector(
    //             'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    //         )
    //     ) {
    //         callback();
    //         return;
    //     }

    //     const script = document.createElement("script");
    //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
    //     script.async = true;
    //     script.onload = callback;
    //     script.onerror = () => console.error("Failed to load Razorpay script.");
    //     document.body.appendChild(script);
    // };

    const handlePayment = () => {
        var options = {
            description: "ticket details",
            image: '',
            currency: 'INR',
            key: key_id,
            amount: tbsamount * 100,
            name: 'thebusstand.com',
            order_id: generatedOrderId,//Replace this with an order_id created using Orders API.
            prefill: {
                name: "Nubiznez",
                email: emailInput,
                contact: mobileInput,
            },
            theme: { color: '#53a20e' }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    const initiateRazorpay = (generatedOrderId) => {
        // console.log(generatedOrderId, "generatedOrderId")
        const options = {
            key: key_id,
            amount: tbsamount * 100,
            currency: "INR",
            name: "thebusstand.com",
            description: "ticket details",
            order_id: generatedOrderId,
            // handler: async function (response) {

            //     if (response?.razorpay_payment_id) {
            //         try {
            //             const payload = {
            //                 razorpay_order_id: response.razorpay_order_id,
            //                 razorpay_payment_id: response.razorpay_payment_id,
            //                 razorpay_signature: response.razorpay_signature,
            //             };
            //             console.log(response?.razorpay_payment_i, 'jsonRes')
            //             const { data: jsonRes } = await axios.post(
            //                 `${OrderApi}/order/validate`,
            //                 payload
            //             );

            //             if (jsonRes?.msg === "success") {
            //                 handleBookingPrice(
            //                     response.razorpay_order_id,
            //                     response.razorpay_payment_id,
            //                     response.razorpay_signature,
            //                     jsonRes?.msg
            //                 );
            //             }
            //         } catch (err) {
            //             console.error("Validation failed:", err);
            //         }
            //     }
            // },
            prefill: {
                name: "Nubiznez",
                email: emailInput,
                contact: mobileInput,
            },
            theme: {
                color: "#1F4B7F",
            },
        };

        // // const pay = new window.Razorpay(options);
        // // pay.open();
        // RazorpayCheckout.open(options).then((data) => {
        //     // handle success
        //     alert(`Success: ${data.razorpay_payment_id}`);
        // }).catch((error) => {
        //     // handle failure
        //     alert(`Error: ${error.code} | ${error.description}`);
        // });
        RazorpayCheckout.open(options)
            .then(async (response) => {
                // This is where you handle the success response
                if (response?.razorpay_payment_id) {
                    try {
                        const payload = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        };
                        // console.log('Payment Response:', response);

                        // Example of making an API call to validate the payment
                        const { data: jsonRes } = await axios.post(
                            `${OrderApi}/order/validate`,
                            payload
                        );

                        if (jsonRes?.msg === 'success') {
                            handleBookingPrice(
                                response.razorpay_order_id,
                                response.razorpay_payment_id,
                                response.razorpay_signature,
                                jsonRes?.msg
                            );
                        } else {
                            alert('Payment validation failed!');
                        }
                    } catch (err) {
                        console.error('Validation failed:', err);
                        alert('Error during validation. Please try again later.');
                    }
                }
            })
    };

    const RazorpayGateway = async () => {
        // setPayButton(true);
        // setRazorpayLoading(true);
        if (!tbsamount) {
            // console.log("Please enter an amount");
            return;
        }
        try {
            const generatedOrderId = await OrderId_Generate();
            if (!generatedOrderId) {
                alert("Failed to generate Order ID. Please try again.");
                return;
            }
            // console.log(generatedOrderId, "praveeeeeen")
            // loadRazorpayScript(() => {
            // setRazorpayLoading(false);
            initiateRazorpay(generatedOrderId);
            // });
        } catch (error) {
            console.error("Error generating order ID:", error);
        }
    };
    var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: '<YOUR_KEY_ID>',
        amount: '5000',
        name: 'Acme Corp',
        order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
        prefill: {
            email: 'gaurav.kumar@example.com',
            contact: '9191919191',
            name: 'Gaurav Kumar'
        },
        theme: { color: '#53a20e' }
    }

    // useEffect(() => {

    //     if (ticketlist?.status === "success") {
    //         navigation.navigate('TravelerScreenDetailsSuccess', {
    //             screenTheme: screenTheme,
    //             themecolor: themecolor,
    //             themeColor2: route.params.themeColor2,
    //             ticketlist: ticketlist,
    //         }
    //         )
    //     }
    // }, [ticketlist]);


    const hexToRGB = (hex_value, opecity = 1) => {
        const numericValue = parseInt(hex_value.slice(1), 16);
        const r = numericValue >> 16 & 0xFF;
        const g = numericValue >> 8 & 0xFF;
        const b = numericValue & 0xFF;
        return `rgba(${r}, ${g}, ${b},${opecity})`
    }

    const OfferItemsRow = ({ image }) => (
        < View style={{
            marginVertical: 10,
            width: screenWidth * 0.62,
            height: 105,
            borderRadius: 8, marginRight: 9
        }}>
            <TouchableOpacity onPress={() => {
                handleImagePress(image)
                handleoffer(image)
                console.log(image, "touchbleoopac")
            }}>
                <Image
                    source={{ uri: `${api_crm_image}${image?.theme ? image?.theme : image?.background_image}` }}
                    style={{ height: 100, width: 185, borderRadius: 8 }}
                />
                {console.log(`${api_crm_image}${image?.theme ? image?.theme : image?.background_image}`, "prafbnwe")}
                {/* <Text>{image?.code}</Text> */}
            </TouchableOpacity>
        </View >
    );


    const handleImagePress = (item) => {

        // Extract the promo code from the image data or API response
        const code = item?.code || "default_code"; // Replace this with actual logic to get the promo code
        setPromoCode(code);
    };


    const GetOffers = async () => {
        try {
            const data = await GetAvailableOffers(dispatch, emailInput, mobileInput);
        } catch {
            // console.log("hi");
        }
    };
    useEffect(() => {
        GetOffers()
        // GetDiscountOffers(dispatch);
    }, []);

    const handleOfferValid = async (values) => {

        setPromoCode(values);
        try {
            const response = await GetOfferValid(
                emailInput,
                mobileInput,
                values
            );
            if (response?.data === true) {
                setFinalDiscount(tbsdiscountamount);
            } else {
                setFinalDiscount(null);

            }
            console.log(response, "response_response")
        } catch (error) {

        }
    };

    const handleoffer = (item) => {
        setSelectValues((prev) => {
            const isSelected = prev?.code === item.code;
            const newState = isSelected
                ? null
                : {
                    value: item?.offer_value,
                    Symbol: item?.value_symbol,
                    code: item?.code,
                };

            // Update discount based on the new selection
            setDiscount((prevDiscount) => {
                if (isSelected) {
                    return null; // Remove discount when deselecting
                }

                if (item?.value_symbol?.includes("₹")) {
                    return Math.round(item?.offer_value);
                } else {
                    const amount = calculateDiscountedFare(
                        selectedBusData?.BUS_START_DATE,
                        faredetails?.TotadultFare,
                        tbs_discount
                    );
                    return Math.round((Number(item?.offer_value) / 100) * Number(amount));
                }
            });

            return newState;
        });
    };


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor }}
            edges={['right', 'left', 'top']}>
            <View style={styles.container}>
                <ImageBackground
                    source={(screenTheme === 'Luxury Coach') ? require('../assets/luxuryHeaderBg.png') : require('../assets/HeadBg.png')}
                    imageStyle={{
                        resizeMode: 'cover',
                    }}
                    style={[styles.navigationView, {
                        backgroundColor: (screenTheme === 'Luxury Coach') ? '#F6B642' : themecolor,
                    }]}>
                    <View
                        style={styles.topImageBg}
                    >
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Svg style={{ width: 30, height: 30, borderRadius: 100 }}>
                                    <BackWhite width="100%" height="100%" color={themeheaderFontColor} />
                                </Svg>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.topViewTitle}>
                            <Text style={[styles.topTitle, { color: themeheaderFontColor }]}>Traveler Details</Text>
                            <Text style={[styles.topSubtitle, { color: themeheaderFontColor1 }]}>Step 3 of 4</Text>
                        </View>
                    </View>
                </ImageBackground>
                <Formik
                    initialValues={{
                        address: billingAddress.address ? billingAddress.address : '',
                        pincode: billingAddress.pincode ? billingAddress.pincode : '',
                        state: billingAddress.state ? billingAddress.state : '',
                        city: billingAddress.city ? billingAddress.city : '',
                        email: emailInput ? emailInput : '',
                        mobile: mobileInput ? emailInput : '',
                        name: '',
                        age: '',
                        gender: '',
                        passengers: passengerData, // Dynamic passenger data
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        setFieldValue
                    }) => (
                        <>


                            <KeyboardAwareScrollView style={{ flex: 1 }}
                                contentContainerStyle={{ flexGrow: 1, }}
                                resetScrollToCoords={{ x: 0, y: 0 }}
                                scrollEnabled={true}>
                                <View style={styles.card}>

                                    <View
                                        style={
                                            {
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: 13,
                                                marginTop: 10,
                                                marginHorizontal: 7,
                                                shadowColor: 'rgba(31, 72, 124, 0.22)',
                                                shadowOpacity: 0.8,
                                                shadowRadius: 2,
                                                paddingHorizontal: 14,
                                                borderWidth: 1,
                                                borderColor: "#1F487C",
                                                shadowOffset: {
                                                    height: 1,
                                                    width: 0,
                                                },
                                            }
                                        }>
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    paddingTop: 14,
                                                },
                                                isJourneyExpand === false && { height: 60, paddingTop: 0, },
                                            ]}
                                            onPress={() => { setJourneyExpand(!isJourneyExpand) }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: '500',
                                                    fontSize: 16,
                                                    fontFamily: 'Inter',
                                                    color: '#393939',
                                                    lineHeight: 19,
                                                }}>
                                                {'Journey Details'}
                                            </Text>
                                            <Image
                                                source={
                                                    isJourneyExpand === true
                                                        ? require('../assets/upBlackIcon.png')
                                                        : require('../assets/downBlackIcon.png')
                                                }
                                                style={{ width: 18, height: 9 }}
                                            />
                                        </TouchableOpacity>
                                        {isJourneyExpand === true && (
                                            <View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    paddingVertical: 10,
                                                }}>
                                                    {/* <Image
                                            source={require('../assets/Operatorlogo.png')}
                                            style={{ width: 40, height: 40, }}
                                        /> */}
                                                    <View style={{ paddingHorizontal: 8, gap: 2 }}>
                                                        <Text style={{ fontSize: 15, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 18 }}>
                                                            {selectedBusData?.Traveler_Agent_Name}
                                                        </Text>
                                                        <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '500', lineHeight: 14 }}>
                                                            {selectedBusData?.Bus_Type_Name}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 8 }}>
                                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                                            <View style={{ alignItems: 'flex-start', flex: 1, justifyContent: 'center', gap: 3 }}>
                                                                <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>{Formatting(selectedBusData?.BUS_START_DATE)}</Text>
                                                                <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '700', lineHeight: 14 }}>
                                                                    {selectedBusData?.Start_time}
                                                                </Text>
                                                                <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>
                                                                    {Journey_Details?.from_station_name}
                                                                </Text>
                                                            </View>
                                                            <View
                                                                style={{
                                                                    justifyContent: 'center', // This aligns the SVG vertically centered
                                                                    alignItems: 'center',
                                                                    position: 'absolute',
                                                                    height: '100%',
                                                                    width: '100%',
                                                                }}>
                                                                <View style={{
                                                                    width: 140,
                                                                    position: 'relative',
                                                                    height: 40,
                                                                    justifyContent: 'center', // This aligns the SVG vertically centered
                                                                    alignItems: 'center',
                                                                }}>
                                                                    <BlackCar width="100%" height="100%" />

                                                                    <Text
                                                                        style={{
                                                                            position: 'absolute',
                                                                            top: 8, left: -2,
                                                                            width: '100%', alignSelf: 'center', textAlign: 'center',
                                                                            fontSize: 9, fontFamily: 'Inter', color: '#FFFFFF', fontWeight: '600', lineHeight: 11,
                                                                        }}>
                                                                        {selectedBusData?.TravelTime.split(':').slice(0, 2).join(':')} Hrs
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', gap: 3 }}>
                                                                <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>{Formatting(selectedBusData?.jdate)}</Text>
                                                                <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '700', lineHeight: 14 }}>
                                                                    {selectedBusData?.Arr_Time}
                                                                </Text>
                                                                <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '400', lineHeight: 14 }}>
                                                                    {Journey_Details?.to_station_name}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <Image
                                                                source={require('../assets/LineIcon.png')}
                                                                style={{
                                                                    width: 1,
                                                                    height: 60,
                                                                    marginRight: 10,
                                                                    marginLeft: 8,
                                                                    alignSelf: 'center',
                                                                }}
                                                            />
                                                        </View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', gap: 3 }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '500', lineHeight: 14
                                                                }}>
                                                                Seat Number(s)
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 14
                                                                }}>
                                                                {seatNumbers}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingBottom: 14, }}>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', gap: 2 }}>
                                                        <Text style={{ fontSize: 12, fontFamily: 'Inter', color: 'rgba(57, 57, 57, 0.5)', fontWeight: '400', lineHeight: 14 }}>
                                                            Boarding Point & Time
                                                        </Text>
                                                        <Text style={{ fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 14 }}>
                                                            {selectedBoardingPoint?.city}: {selectedBoardingPoint?.time}
                                                        </Text>
                                                    </View>

                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', gap: 2 }}>
                                                        <Text style={{ fontSize: 15, fontFamily: 'Inter', color: 'rgba(57, 57, 57, 0.5)', fontWeight: '400', lineHeight: 14 }}>
                                                            Dropping Point & Time
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 12, fontFamily: 'Inter', color: '#393939', fontWeight: '600', lineHeight: 14
                                                            }}>
                                                            {selectedDroppingPoint?.city} : {selectedDroppingPoint?.time}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                        }
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                margin: 7,
                                                height: 'auto',
                                                backgroundColor: 'white',
                                                borderColor: "#1F487C",
                                                borderRadius: 13,
                                                borderWidth: 1,
                                                shadowColor: 'rgba(31, 72, 124, 0.22)',
                                                shadowOpacity: 0.8,
                                                shadowRadius: 2,
                                                shadowOffset: {
                                                    height: 1,
                                                    width: 0,
                                                },
                                            }}>
                                            <View style={{ flexDirection: 'column', marginTop: 12, paddingHorizontal: 14, }}>
                                                <Text
                                                    style={{
                                                        fontWeight: '500',
                                                        fontSize: 17,
                                                        fontFamily: 'Inter',
                                                        color: '#393939',
                                                        lineHeight: 20,
                                                    }}>
                                                    Passenger Details
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontWeight: '500',
                                                        fontSize: 14.66,
                                                        fontFamily: 'Inter',
                                                        color: '#393939',
                                                        lineHeight: 17,
                                                        marginLeft: 5,
                                                        marginTop: 5,
                                                    }}>
                                                    Contact Details
                                                </Text>
                                                <TextInput
                                                    style={[styles.textInput, { marginTop: 10, marginLeft: 5, marginRight: 10 }]}
                                                    placeholder="Email Id*"
                                                    placeholderTextColor={"#A9A9A9"}
                                                    value={values.email}
                                                    onChangeText={(text) => {
                                                        handleChange('email')(text); // Update Formik state
                                                        handleEmailChange(text); // Update local state
                                                    }}
                                                    editable={!confirmRefNo}
                                                />
                                                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                                                <View style={{
                                                    flexDirection: 'row', marginLeft: 5, marginTop: 5,
                                                }}>
                                                    <View style={{ flex: 1, marginTop: 10, marginRight: 5 }}>
                                                        <TextInput
                                                            style={styles.textInput}
                                                            placeholder="Mobile Number*"
                                                            placeholderTextColor={"#A9A9A9"}
                                                            value={values.mobile}
                                                            keyboardType="numeric"
                                                            maxLength={10}
                                                            onChangeText={(text) => {
                                                                handleChange('mobile')(text); // Update Formik state
                                                                handleMobileChange(text); // Update local state
                                                            }}

                                                        />

                                                        {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}
                                                    </View>
                                                    <View style={{ alignSelf: 'center' }}>
                                                        <Image
                                                            source={require('../assets/ToggleGreen.png')}
                                                            style={{ width: 94.27, margin: 10, height: 47.14 }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginHorizontal: 5 }}>
                                                <Text style={{
                                                    fontWeight: '400',
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    fontFamily: 'Inter',
                                                    color: 'rgba(57, 57, 57, 0.5)',
                                                    lineHeight: 12,
                                                }}>
                                                    Your booking details will be sent to this email address and
                                                    mobile number
                                                </Text>
                                                <View
                                                    style={{
                                                        marginTop: 8,
                                                        borderWidth: 0.5,
                                                        borderColor: 'rgba(31, 72, 124, 0.5)',
                                                    }}></View>
                                            </View>
                                            <View style={{ paddingHorizontal: 14, flexDirection: 'column' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: '500',
                                                        fontFamily: 'Inter',
                                                        color: '#393939',
                                                        lineHeight: 16,
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                        left: 5,

                                                    }}>
                                                    Seat No: {seatList}
                                                </Text>
                                                {/* <TextInput
                                            style={[styles.textInput, { marginLeft: 5, marginRight: 10 }]}
                                            placeholder="Traveler Name*"
                                            placeholderTextColor="#393939"
                                        />
                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                            <View style={{ flex: 1, marginTop: 10, marginHorizontal: 5 }}>
                                                <TextInput
                                                    style={styles.textInput}
                                                    placeholder="Age*"
                                                    placeholderTextColor="#393939"
                                                />
                                            </View>{
                                                // (screenTheme === 'Luxury Coach') ?
                                                //  <View
                                                //     style={{
                                                //         flex: 1,
                                                //         marginTop: 10,
                                                //         marginRight: 10,
                                                //         marginLeft: 3,
                                                //         flexDirection: 'row',
                                                //         borderRadius: 6,
                                                //         borderColor: '#393939',
                                                //         borderWidth: 1,

                                                //     }}>
                                                //     <TouchableOpacity
                                                //         style={[
                                                //             styles.halfView, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, }, (selectedGender === 'male') && {
                                                //                 borderColor: '#D89E2F',
                                                //                 borderWidth: 2,
                                                //             },

                                                //         ]}
                                                //         onPress={() => setSelectedGender('male')}>
                                                //         <LinearGradient

                                                //             locations={(selectedGender === 'male') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                //             colors={(selectedGender === 'male') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : ['#FFFFFF', '#FFFFFF']}
                                                //             useAngle={true}
                                                //             angle={(selectedGender === 'male') ? 170 : 45}
                                                //             style={[{
                                                //                 flexDirection: 'row', width: '100%', flex: 1,
                                                //                 justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
                                                //             }]}
                                                //         >
                                                //             <Text
                                                //                 style={[
                                                //                     styles.text,
                                                //                     selectedGender === 'male'
                                                //                         ? { color: '#393939', fontWeight: '600', }
                                                //                         : styles.unselectedText,
                                                //                 ]}>
                                                //                 Male
                                                //             </Text>
                                                //         </LinearGradient>
                                                //     </TouchableOpacity>
                                                //     <TouchableOpacity
                                                //         style={[
                                                //             styles.halfView, { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
                                                //             , (selectedGender === 'female') && {
                                                //                 borderColor: '#D89E2F',
                                                //                 borderWidth: 2,
                                                //             },
                                                //         ]}
                                                //         onPress={() => setSelectedGender('female')}>
                                                //         <LinearGradient

                                                //             locations={(selectedGender === 'female') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                //             colors={(selectedGender === 'female') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : ['#FFFFFF', '#FFFFFF']}
                                                //             useAngle={true}
                                                //             angle={(selectedGender === 'female') ? 170 : 45}
                                                //             style={[{
                                                //                 flexDirection: 'row', width: '100%', flex: 1,
                                                //                 overflow: 'hidden', borderTopRightRadius: 5, borderBottomRightRadius: 5,
                                                //                 justifyContent: 'center', alignItems: 'center',
                                                //             }]}
                                                //         >
                                                //             <Text
                                                //                 style={[
                                                //                     styles.text,
                                                //                     selectedGender === 'female'
                                                //                         ? { color: '#393939', fontWeight: '600', }
                                                //                         : styles.unselectedText,
                                                //                 ]}>
                                                //                 Female
                                                //             </Text>
                                                //         </LinearGradient>
                                                //     </TouchableOpacity>

                                                // </View> 
                                                // :
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            marginTop: 10,
                                                            marginRight: 10,
                                                            marginLeft: 3,
                                                            flexDirection: 'row',
                                                            borderRadius: 6,
                                                            borderColor: '#393939',
                                                            borderWidth: 1,

                                                        }}>
                                                        <TouchableOpacity
                                                            style={[
                                                                styles.halfView, { borderTopLeftRadius: 5, borderBottomLeftRadius: 5, },
                                                                selectedGender === 'male'
                                                                    ? { backgroundColor: themecolor }
                                                                    : styles.unselected,
                                                            ]}
                                                            onPress={() => setSelectedGender('male')}>
                                                            <Text
                                                                style={[
                                                                    styles.text,
                                                                    selectedGender === 'male'
                                                                        ? styles.selectedText
                                                                        : styles.unselectedText,
                                                                ]}>
                                                                Male
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={[
                                                                styles.halfView, { borderTopRightRadius: 5, borderBottomRightRadius: 5, },
                                                                selectedGender === 'female'
                                                                    ? { backgroundColor: themecolor }
                                                                    : styles.unselected,
                                                            ]}
                                                            onPress={() => setSelectedGender('female')}>
                                                            <Text
                                                                style={[
                                                                    styles.text,
                                                                    selectedGender === 'female'
                                                                        ? styles.selectedText
                                                                        : styles.unselectedText,
                                                                ]}>
                                                                Female
                                                            </Text>
                                                        </TouchableOpacity>

                                                    </View>
                                            }
                                        </View> */}
                                                <View style={{ flexDirection: 'column' }}>
                                                    <View >
                                                        {/* Passenger fields */}
                                                        {Object.keys(selectedSeat).map((seat) => (
                                                            <View key={seat} style={styles.seatContainer}>
                                                                <Text style={styles.seatLabel}>Traveler for Seat {seat}</Text>

                                                                {/* Name Input */}
                                                                <TextInput
                                                                    style={[
                                                                        styles.input,
                                                                        touched.passengers?.[seat]?.name && errors.passengers?.[seat]?.name
                                                                            ? styles.errorInput
                                                                            : null,
                                                                    ]}
                                                                    placeholder="Enter Name"
                                                                    placeholderTextColor={"#A9A9A9"}
                                                                    value={values.passengers[seat].name}
                                                                    onChangeText={(text) => {
                                                                        handleInputChange(seat, 'name', text);
                                                                        setFieldValue(`passengers.${seat}.name`, text); // Synchronize Formik state
                                                                    }}
                                                                />
                                                                {touched.passengers?.[seat]?.name && errors.passengers?.[seat]?.name && (
                                                                    <Text style={styles.error}>{errors.passengers[seat].name}</Text>
                                                                )}

                                                                {/* Age Input */}
                                                                <TextInput
                                                                    style={[
                                                                        styles.input,
                                                                        touched.passengers?.[seat]?.age && errors.passengers?.[seat]?.age
                                                                            ? styles.errorInput
                                                                            : null,
                                                                    ]}
                                                                    placeholder="Enter Age"
                                                                    placeholderTextColor={"#A9A9A9"}
                                                                    value={values.passengers[seat].age}
                                                                    maxLength={2}
                                                                    onChangeText={(text) => {
                                                                        handleInputChange(seat, 'age', text);
                                                                        setFieldValue(`passengers.${seat}.age`, text); // Synchronize Formik state
                                                                    }}
                                                                    keyboardType="numeric"
                                                                />
                                                                {touched.passengers?.[seat]?.age && errors.passengers?.[seat]?.age && (
                                                                    <Text style={styles.error}>{errors.passengers[seat].age}</Text>
                                                                )}

                                                                {/* Gender Selection */}
                                                                <View style={styles.genderContainer}>
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            styles.genderButton,
                                                                            values.passengers[seat].gender === 'male' && styles.selectedGenderButton,
                                                                        ]}
                                                                        onPress={() => {
                                                                            handleGenderSelect(seat, 'male');
                                                                            setFieldValue(`passengers.${seat}.gender`, 'male'); // Synchronize Formik state
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={[
                                                                                styles.genderButtonText,
                                                                                values.passengers[seat].gender === 'male' && styles.selectedGenderText,
                                                                            ]}
                                                                        >
                                                                            Male
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            styles.genderButton,
                                                                            values.passengers[seat].gender === 'female' && styles.selectedGenderButton,
                                                                        ]}
                                                                        onPress={() => {
                                                                            handleGenderSelect(seat, 'female');
                                                                            setFieldValue(`passengers.${seat}.gender`, 'female'); // Synchronize Formik state
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            style={[
                                                                                styles.genderButtonText,
                                                                                values.passengers[seat].gender === 'female' && styles.selectedGenderText,
                                                                            ]}
                                                                        >
                                                                            Female
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                {touched.passengers?.[seat]?.gender && errors.passengers?.[seat]?.gender && (
                                                                    <Text style={styles.error}>{errors.passengers[seat].gender}</Text>
                                                                )}
                                                            </View>
                                                        ))}

                                                    </View>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    marginVertical: 10,
                                                    marginHorizontal: 5,
                                                    borderWidth: 0.5,
                                                    borderColor: 'rgba(31, 72, 124, 0.5)',
                                                }}></View>
                                            {/* <View style={{ alignSelf: 'center' }}>
                                                <TouchableOpacity
                                                    style={[{
                                                        height: 46.09,
                                                        backgroundColor: '#1F487C', // White background
                                                        borderRadius: 23, // Square rounded corners
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }, (screenTheme === 'Luxury Coach') ? { borderColor: '#D89E2F', borderWidth: 1.5 } : { borderColor: themecolor, borderWidth: 1.3 }]}
                                                    onPress={() => setModalVisible(true)}>
                                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                                    <LinearGradient

                                                        locations={(screenTheme === 'Luxury Coach') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                        colors={(screenTheme === 'Luxury Coach') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : [themecolor, themecolor]}
                                                        useAngle={true}
                                                        angle={(screenTheme === 'Luxury Coach') ? 170 : 45}
                                                        style={[{
                                                            flexDirection: 'row', flex: 1, gap: 10, paddingHorizontal: 25,
                                                            justifyContent: 'center', borderRadius: 23, alignItems: 'center',
                                                        }]}
                                                    >
                                                        <Svg style={{ width: 25, height: 25 }}>
                                                            <Addpassengericon width="100%" height="100%" color={(screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF'} />
                                                        </Svg>
                                                        <Text style={{
                                                            fontSize: 16.76,
                                                            fontWeight: '600',
                                                            fontFamily: 'Inter',
                                                            color: (screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF',
                                                            lineHeight: 20.28,
                                                        }}>Add New Passenger</Text>

                                                    </LinearGradient>
                                                    </View>
                                                </TouchableOpacity>
                                            </View> */}
                                            {/* <View style={{ marginBottom: 15 }}>
                                                <FlatList
                                                    data={PassengerList}
                                                    renderItem={({ item }) => <PassengerItemRow item={item} />}
                                                    keyExtractor={item => item.id}
                                                    showsVerticalScrollIndicator={false} // Optional: hide scroll indicator
                                                />
                                            </View> */}

                                        </View>

                                    </View>
                                    <View
                                        style={[
                                            {
                                                backgroundColor: '#FFFFFF',
                                                borderRadius: 13,
                                                marginTop: 5,
                                                marginHorizontal: 7,
                                                shadowColor: 'rgba(31, 72, 124, 0.22)',
                                                shadowOpacity: 0.8,
                                                shadowRadius: 2,
                                                borderColor: "#1F487C",
                                                borderWidth: 1,
                                                paddingHorizontal: 14,
                                                shadowOffset: {
                                                    height: 1,
                                                    width: 0,
                                                },
                                            },
                                        ]}>
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    paddingTop: 14,
                                                },
                                                isbilling === false && { height: 60, paddingTop: 0, },
                                                isbilling === true && {
                                                    marginBottom: 5
                                                }
                                            ]}
                                            onPress={() => { setIsBilling(!isbilling) }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight: '500',
                                                    fontSize: 16,
                                                    fontFamily: 'Inter',
                                                    color: '#393939',
                                                    lineHeight: 19,
                                                }}>
                                                {'Billing Address:'}
                                            </Text>
                                            <Image
                                                source={
                                                    isbilling === true
                                                        ? require('../assets/upBlackIcon.png')
                                                        : require('../assets/downBlackIcon.png')
                                                }
                                                style={{ width: 18, height: 9 }}
                                            />
                                        </TouchableOpacity>
                                        <Separator />
                                        {isbilling === true && (
                                            <View>

                                                {/* Address Input */}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Enter Address"
                                                    placeholderTextColor="#888"
                                                    value={values.address}
                                                    onChangeText={(value) => {
                                                        handleChange('address')(value);
                                                        setBillingAddress((prev) => ({ ...prev, address: value }));
                                                    }}
                                                />
                                                {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

                                                {/* Pincode Input */}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Enter Pincode"
                                                    placeholderTextColor="#888"
                                                    value={values.pincode}
                                                    maxLength={6}
                                                    onChangeText={(value) => {
                                                        handleChange('pincode')(value);
                                                        setBillingAddress((prev) => ({ ...prev, pincode: value }));
                                                    }}
                                                    keyboardType="numeric"
                                                />
                                                {touched.pincode && errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}

                                                {/* State Input */}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Enter State"
                                                    placeholderTextColor="#888"
                                                    value={values.state}
                                                    onChangeText={(value) => {
                                                        handleChange('state')(value);
                                                        setBillingAddress((prev) => ({ ...prev, state: value }));
                                                    }}
                                                />
                                                {touched.state && errors.state && <Text style={styles.error}>{errors.state}</Text>}

                                                {/* City Input */}
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Enter City"
                                                    placeholderTextColor="#888"
                                                    value={values.city}
                                                    onChangeText={(value) => {
                                                        handleChange('city')(value);
                                                        setBillingAddress((prev) => ({ ...prev, city: value }));
                                                    }}
                                                />
                                                {touched.city && errors.city && <Text style={styles.error}>{errors.city}</Text>}
                                            </View>
                                        )}
                                    </View>
                                    {confirmRefNo?.length > 0 ?
                                        <View
                                            style={[
                                                {
                                                    backgroundColor: '#FFFFFF',
                                                    borderRadius: 13,
                                                    borderWidth: 1,
                                                    borderColor: "#1F487C",
                                                    marginTop: 10,
                                                    marginHorizontal: 7,
                                                    shadowColor: 'rgba(31, 72, 124, 0.22)',
                                                    shadowOpacity: 0.8,
                                                    shadowRadius: 2,
                                                    paddingHorizontal: 14,
                                                    shadowOffset: {
                                                        height: 1,
                                                        width: 0,
                                                    },
                                                },
                                            ]}>
                                            <TouchableOpacity
                                                style={[
                                                    {
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        paddingTop: 14,
                                                    },
                                                    isOfferExpand === false && { height: 60, paddingTop: 0, },
                                                ]}
                                                onPress={() => { setOfferExpand(!isOfferExpand) }}
                                            >
                                                <Text
                                                    style={{
                                                        fontWeight: '500',
                                                        fontSize: 16,
                                                        fontFamily: 'Inter',
                                                        color: '#393939',
                                                        lineHeight: 19,
                                                    }}>
                                                    {'Offers'}
                                                </Text>

                                                <Image
                                                    source={
                                                        isOfferExpand === true
                                                            ? require('../assets/upBlackIcon.png')
                                                            : require('../assets/downBlackIcon.png')
                                                    }
                                                    style={{ width: 18, height: 9 }}
                                                />
                                            </TouchableOpacity>
                                            <Separator />
                                            {isOfferExpand === true && (
                                                <View>
                                                    <FlatList
                                                        data={tbs_available_offer}
                                                        renderItem={({ item }) => <OfferItemsRow image={item} />}
                                                        keyExtractor={item => item.id}
                                                        horizontal={true} // Set to horizontal
                                                        showsHorizontalScrollIndicator={false} // Optional: hide scroll indicator
                                                    />
                                                    <View>
                                                        <Text
                                                            style={{
                                                                fontWeight: '500',
                                                                fontSize: 15,
                                                                fontFamily: 'Inter',
                                                                color: '#393939',
                                                                lineHeight: 19,
                                                            }}>
                                                            Do you have a coupon code?
                                                        </Text>
                                                        <View style={{
                                                            position: 'relative',
                                                            height: 45,
                                                            borderRadius: 7,
                                                            overflow: 'hidden',
                                                            marginVertical: 14,
                                                            borderTopRightRadius: 8,
                                                            borderBottomRightRadius: 8,
                                                        }}>
                                                            <Svg height="100%" width="100%" style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                bottom: 0,
                                                            }}>
                                                                <Line
                                                                    x1="0"
                                                                    y1="0"
                                                                    x2="100%"
                                                                    y2="0"
                                                                    stroke={themecolor}
                                                                    strokeWidth="2"
                                                                    strokeDasharray="10,5"
                                                                />
                                                                <Line
                                                                    x1="0"
                                                                    y1="100%"
                                                                    x2="100%"
                                                                    y2="100%"
                                                                    stroke={themecolor}
                                                                    strokeWidth="2"
                                                                    strokeDasharray="10,5"
                                                                />
                                                                <Line
                                                                    x1="0"
                                                                    y1="0"
                                                                    x2="1"
                                                                    y2="100%"
                                                                    stroke={themecolor}
                                                                    strokeWidth="1"
                                                                    strokeDasharray="10,5"
                                                                />
                                                            </Svg>

                                                            <View
                                                                style={{
                                                                    borderRadius: 7,
                                                                    height: 45,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                }}>
                                                                <TextInput
                                                                    style={{
                                                                        flex: 1,
                                                                        paddingVertical: 12,
                                                                        paddingHorizontal: 20,
                                                                        fontSize: 15,
                                                                        lineHeight: 19,
                                                                        fontFamily: 'Inter',
                                                                        fontWeight: '400',
                                                                        color: '#1F487C',
                                                                    }}
                                                                    value={promoCode || ''}
                                                                    placeholder="Enter Promo code"
                                                                    placeholderTextColor="rgba(57, 57, 57, 0.5)"
                                                                />
                                                                <TouchableOpacity
                                                                    style={[{
                                                                        backgroundColor: 'white',
                                                                        overflow: 'hidden',
                                                                        height: 45,

                                                                    }, (screenTheme === 'Luxury Coach') ? { borderColor: '#D89E2F', borderWidth: 1.5 } : { borderColor: themecolor, borderWidth: 1.3 }]}
                                                                    onPress={() => {
                                                                        if (mobileInput === "") {
                                                                            alert("Please enter your mobile number and E-mail.");
                                                                        } else {
                                                                            //    handleOfferValid
                                                                            handleOfferValid(selectvalue?.code)
                                                                        }
                                                                    }}
                                                                >
                                                                    <LinearGradient

                                                                        locations={(screenTheme === 'Luxury Coach') ? [0.15, 0.38, 0.60, 0.69, 0.85] : [0, 0]}
                                                                        colors={(screenTheme === 'Luxury Coach') ? ['#F6B642', '#FFF279', '#F6B642', '#FFDF71', '#FBE67B'] : [themecolor, themecolor]}
                                                                        useAngle={true}
                                                                        angle={(screenTheme === 'Luxury Coach') ? 150 : 45}
                                                                        style={[{
                                                                            justifyContent: 'center', flex: 1, alignItems: 'center', paddingVertical: 12,
                                                                            paddingHorizontal: 20,
                                                                        }]}
                                                                    >
                                                                        <Text style={{
                                                                            fontSize: 15,
                                                                            lineHeight: 19,
                                                                            fontFamily: 'Inter',
                                                                            fontWeight: '700',
                                                                            color: (screenTheme === 'Luxury Coach') ? '#393939' : '#FFFFFF',
                                                                        }}>Apply</Text>
                                                                    </LinearGradient>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                            }
                                        </View>
                                        : ''
                                    }
                                </View>
                            </KeyboardAwareScrollView>
                            <View >
                                <View style={{
                                    margin: 10,
                                    marginLeft: 25,
                                    gap: 7,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <CustomCheckbox1
                                        checked={isChecked1}
                                        onChange={() => setIsChecked1(!isChecked1)}
                                    />

                                    <Text style={{ fontSize: 12, color: '#393939', fontFamily: 'Inter', fontWeight: '600' }}>
                                        I accept the Terms & Conditions
                                    </Text>
                                </View>

                                <View style={{ marginHorizontal: 5, marginBottom: 20, marginTop: 3, overflow: 'hidden', flexDirection: 'column', borderWidth: 1.2, borderRadius: 10, borderColor: (screenTheme === 'Luxury Coach') ? '#D89E2F' : themecolor, }}>
                                    {/* {confirmRefNo?.length > 0 ? */}
                                    <View style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: '#FFFFFF',
                                        overflow: 'hidden',
                                        width: '99.8%',
                                        position: 'relative',
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                    }}>
                                        <TouchableOpacity style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            paddingHorizontal: 15,
                                            paddingVertical: 10,
                                        }} onPress={() => setIsActive(!isActive)}>
                                            <Text style={{
                                                fontFamily: 'Inter',
                                                fontSize: 15,
                                                fontWeight: '400',
                                                fontStyle: 'normal',
                                                textAlign: 'left',
                                                lineHeight: 20,
                                                color: '#393939',
                                            }}>Fare Details</Text>
                                            <Image
                                                source={
                                                    isActive === true
                                                        ? require('../assets/downBlackIcon.png') : require('../assets/upBlackIcon.png')
                                                }
                                                style={{ width: 18, height: 9 }}
                                            />
                                        </TouchableOpacity>
                                        {(isActive == true) && (
                                            <View>
                                                <Separator />
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        width: '100%',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 5,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: 15,
                                                            fontWeight: '400',
                                                            fontStyle: 'normal',
                                                            textAlign: 'left',
                                                            lineHeight: 20,
                                                            color: '#393939',
                                                        }}>
                                                        {"Base Fare "}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: 15,
                                                            fontWeight: '400',
                                                            fontStyle: 'normal',
                                                            textAlign: 'right',
                                                            lineHeight: 20,
                                                            color: '#393939',
                                                        }}>
                                                        {`₹ ${Math?.round(faredetails?.TotadultFare)}`}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        width: '100%',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 5,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: 15,
                                                            fontWeight: '400',
                                                            fontStyle: 'normal',
                                                            textAlign: 'left',
                                                            lineHeight: 20,
                                                            color: '#393939',
                                                        }}>
                                                        {"GST"}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: 15,
                                                            fontWeight: '400',
                                                            fontStyle: 'normal',
                                                            textAlign: 'right',
                                                            lineHeight: 20,
                                                            color: '#393939',
                                                        }}>
                                                        + ₹ {Math.round(totaltax)}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        width: '100%',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 5,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                    }}>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: 15,
                                                            fontWeight: '400',
                                                            fontStyle: 'normal',
                                                            textAlign: 'left',
                                                            lineHeight: 20,
                                                            color: '#393939',
                                                        }}>
                                                        {"TBS Deal"}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: 15,
                                                            fontWeight: '400',
                                                            fontStyle: 'normal',
                                                            textAlign: 'right',
                                                            lineHeight: 20,
                                                            color: '#393939',
                                                        }}>
                                                        {`- ₹ ${Math?.round(
                                                            Number(faredetails?.TotadultFare) *
                                                            Number(tbs_discount / 100)
                                                        )}`}
                                                    </Text>
                                                </View>

                                                {/* Discount Section */}
                                                {finaldiscount != null && promoCode !== "" && (
                                                    <View
                                                        style={{
                                                            width: '100%',
                                                            paddingHorizontal: 15,
                                                            paddingVertical: 5,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}>

                                                        <Text
                                                            style={{
                                                                fontFamily: 'Inter',
                                                                fontSize: 15,
                                                                fontWeight: '400',
                                                                fontStyle: 'normal',
                                                                textAlign: 'left',
                                                                lineHeight: 20,
                                                                color: '#393939',
                                                            }}>
                                                            Discount
                                                            <Text style={{ color: '#A9A9A9' }}>
                                                                {selectvalue?.Symbol?.includes('%')
                                                                    ? ` ( ${selectvalue?.value} % )`
                                                                    : `( Flat ₹ ${selectvalue?.value} )`}
                                                            </Text>
                                                        </Text>
                                                        <Text style={{
                                                            fontFamily: 'Inter',
                                                            fontSize: 15,
                                                            fontWeight: '400',
                                                            fontStyle: 'normal',
                                                            textAlign: 'right',
                                                            lineHeight: 20,
                                                            color: '#393939',
                                                        }}>
                                                            - ₹ {finaldiscount}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                    </View>
                                    {/* :
                                        ""
                                    } */}

                                    <BackgroundImage
                                        source={(screenTheme === 'Luxury Coach') ? require('../assets/luxuryContBg.png') : ''}
                                        style={{
                                            height: 60,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            backgroundColor: (screenTheme === 'Luxury Coach') ? '#D89E2F' : themecolor,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            bottom: -1,
                                        }}
                                        imageStyle={{
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        }}>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <View style={{ marginLeft: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                {confirmRefNo?.length > 0 ?
                                                    <>
                                                        <View style={{ justifyContent: 'flex-start', gap: 5 }}>
                                                            <Text style={{ color: (screenTheme === 'Luxury Coach') ? themecolor : 'white', fontWeight: '700', fontFamily: 'Inter', fontSize: 15, width: 100 }}>{`Proceed To Pay`}</Text>
                                                            {/* <Text style={{
                                           fontWeight: '400', fontSize: 13,
                                           fontFamily: 'Inter',
                                           lineHeight: 16, color: (screenTheme === 'Luxury Coach') ? themecolor : 'white'
                                       }}>
                                           Selected Seat
                                       </Text> */}
                                                        </View>

                                                        <View style={{ justifyContent: 'flex-end', gap: 5 }}>
                                                            <Text style={{ alignSelf: 'flex-end', fontWeight: '700', fontFamily: 'Inter', fontSize: 13, color: (screenTheme === 'Luxury Coach') ? themecolor : 'white' }}>
                                                                {`₹ ${calculateDiscountedFare(
                                                                    selectedBusData?.BUS_START_DATE,
                                                                    Number(faredetails?.TotadultFare),
                                                                    tbs_discount
                                                                ) +
                                                                    Number(Math.round(totaltax)) -
                                                                    Number(finaldiscount)
                                                                    }`}
                                                            </Text>
                                                            {/* <Text
                                           style={{
                                               fontWeight: '400', fontFamily: 'Inter', fontSize: 15,
                                               alignSelf: 'flex-end',
                                               fontWeight: '500',
                                               color: (screenTheme === 'Luxury Coach') ? themecolor : 'white',
                                           }}>
                                           Price
                                       </Text> */}
                                                        </View>
                                                    </>
                                                    : ""}
                                            </View>
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image
                                                source={require('../assets/Linewhite.png')}
                                                style={{ width: 1.5, margin: 10, height: 36, tintColor: (screenTheme === 'Luxury Coach') ? themecolor : '#FFFFFF' }}
                                            />
                                        </View>
                                        <View style={{ alignSelf: 'center', paddingRight: 15 }}>
                                            {confirmRefNo?.length > 0 ?
                                                <TouchableOpacity style={[styles.cornerbutton, (screenTheme === 'Luxury Coach') ? { backgroundColor: themecolor, } : { backgroundColor: '#fff', }]}
                                                    onPress={() => {
                                                        // navigation.navigate('TravelerScreenDetailsSuccess', {
                                                        //     screenTheme: screenTheme,
                                                        //     themecolor: themecolor,
                                                        //     themeColor2: route.params.themeColor2,
                                                        // }
                                                        // )
                                                        RazorpayGateway()
                                                    }}>


                                                    <Text style={{ fontWeight: '400', color: (screenTheme === 'Luxury Coach') ? '#FFFFFF' : themecolor, fontFamily: 'Inter', fontSize: 18, lineHeight: 22 }}>Confirm</Text>
                                                </TouchableOpacity>
                                                :
                                                // <TouchableOpacity style={[styles.cornerbutton, (screenTheme === 'Luxury Coach') ? { backgroundColor: themecolor, } : { backgroundColor: '#fff', }]}
                                                //     onPress={() => {
                                                //         // navigation.navigate('TravelerScreenDetailsSuccess', {
                                                //         //     screenTheme: screenTheme,
                                                //         //     themecolor: themecolor,
                                                //         //     themeColor2: route.params.themeColor2,
                                                //         // }
                                                //         // )
                                                //         handleSubmit()
                                                //     }}>


                                                //     <Text style={{ fontWeight: '400', color: (screenTheme === 'Luxury Coach') ? '#FFFFFF' : themecolor, fontFamily: 'Inter', fontSize: 18, lineHeight: 22 }}>Continue</Text>
                                                // </TouchableOpacity>
                                                <TouchableOpacity title="submit" style={[styles.cornerbutton, (screenTheme === 'Luxury Coach') ? { backgroundColor: themecolor, } : { backgroundColor: '#fff', }]}
                                                    onPress={() => {
                                                        // navigation.navigate('TravelerScreenDetailsSuccess', {
                                                        //     screenTheme: screenTheme,
                                                        //     themecolor: themecolor,
                                                        //     themeColor2: route.params.themeColor2,
                                                        // }
                                                        // )
                                                        handleSubmit()
                                                    }}
                                                >


                                                    <Text style={{ fontWeight: '400', color: (screenTheme === 'Luxury Coach') ? '#FFFFFF' : themecolor, fontFamily: 'Inter', fontSize: 18, lineHeight: 22 }}>Continue</Text>
                                                </TouchableOpacity>
                                            }

                                        </View>
                                    </BackgroundImage>
                                </View>

                            </View>
                        </>
                    )}
                </Formik>

                <BottomModalSheet
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    themeColor={themecolor}
                    screenTheme={screenTheme}
                />
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5FFF1',

    },
    navigationView: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
    },
    topImageBg: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        overflow: 'hidden',
        position: 'relative',
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
        marginRight: 25,
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
    cornerbutton: {
        backgroundColor: '#fff', // White background
        borderRadius: 20, // Square rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        // Adding shadow for a subtle Material Design look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    },
    circle: {
        width: 30, // Diameter of the circle
        height: 30, // Diameter of the circle
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally 
        backgroundColor: '#3498db', // Background color
    }, button: {
        backgroundColor: '#fff', // White background
        borderRadius: 20, // Square rounded corners
        paddingVertical: 10,
        paddingHorizontal: 20,
        // Adding shadow for a subtle Material Design look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    }, button1: {
        height: 46.09,
        backgroundColor: '#1F487C', // White background
        borderRadius: 23, // Square rounded corners
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        // Adding shadow for a subtle Material Design look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    },
    buttonText: {
        fontSize: 18,
        color: '#1F487C', // Text color
        textAlign: 'center',
        fontFamily: 'Inter',
        fontWeight: '400',

    }, buttonText1: {
        fontSize: 16,
        color: '#fff', // Text color
        textAlign: 'center',
        alignSelf: 'center'
    }, halfView: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 14,
        color: '#393939', // Text color
        textAlign: 'center',
        fontFamily: 'Inter',
        fontWeight: '400',
        lineHeight: 16,
    },
    selectedText: {
        color: '#ffffff',
    },
    unselectedText: {
        color: '#393939',
    },
    selected: {
        backgroundColor: '#1F487C',
    },
    unselected: {
        backgroundColor: '#ffffff',

    },
    card: {
        flex: 1,
    }, textInput: {
        height: 40,
        borderColor: '#393939',
        borderWidth: 1,
        borderRadius: 5, // Square rounded corners
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Inter',
        color: '#393939',
        lineHeight: 17,
        // Adding shadow for Material Design look
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
        // elevation: 2, // For Android shadow
    },
    headerView: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#1F487C',
    },
    Headbackground: {
        flexDirection: 'row',
        minHeight: 30,
        width: '100%',
        resizeMode: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    slide: {
        height: 120,
        flex: 1,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        flex: 1,
    },
    trackingView: {

        height: 24,
        marginHorizontal: 1,
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper1: {
        position: 'relative',
        flex: 1, // adjust as needed
        height: 65, // adjust as needed
    },
    busPlatformBg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },

    icon: {
        position: 'absolute',
        left: 10,
        top: '55%',
        transform: [{ translateY: -12.5 }],
        width: '50%', // adjust as needed
        height: '50%', // adjust as needed
    }, busListContainer: {
        position: 'relative',
        width: '80%',
        height: 30,
        top: 16,
        left: 28,
    },
    rsText: {
        position: 'absolute',
        top: 3,
        right: 10,
        width: '100%',
        textAlign: 'right',
        color: '#FFFFFF',
        fontSize: 11,
    },
    list: {
        justifyContent: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#1F487C',
        borderRadius: 5,
        marginRight: 10,
    },
    filterIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    filterTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 5,
        color: '1F487C'
    },
    filteAarrowIcon: {
        width: 12,
        height: 6,
    },
    appContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#1F487C',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        width: 14,
        height: 14,
        backgroundColor: '#007AFF',
    },
    label: {
        fontSize: 16,
    },
    seatContainer: {
        marginBottom: 20,
    },
    seatLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#393939"
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        color: '#1F487C',

    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedGenderButton: {
        backgroundColor: '#1F487C',
    },
    genderButtonText: {
        fontSize: 14,
        color: '#000',
    },
    selectedGenderText: {
        fontWeight: 'bold',
        color: '#FFF',
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});

export default TravelerScreenDetails;
