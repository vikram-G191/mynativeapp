import axios from "axios";
import dayjs from "dayjs";
import Toast from 'react-native-toast-message';
import { REACT_APP_API_URL, REACT_APP_CRM_API_URL } from '@env'
import { DISCOUNT_OFFER_LIST, GET_AVAILABLE_OFFER, TBS_TICKET_DETAILS } from "../../../Redux/Store/Type";
import AsyncStorage from "@react-native-async-storage/async-storage";

let lastToastTime = 0; // Keep track of the last time a toast was shown
const TOAST_DELAY = 2000; // Delay in milliseconds (2 seconds)

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});
// const apiUrl = REACT_APP_API_URL;
// const apicrm = process.env.REACT_APP_CRM_API_URL;
// const apiUrl = process.env.REACT_APP_API_URL;

// const apiUrl = `http://192.168.90.47:4001/api`

const apiUrl = `https://thebusstand.com/api`

export const GetTBSSeatLayout = async (BusDetails, dispatch) => {

    const payload = {
        operatorId: BusDetails?.operatorId,
        Service_key: BusDetails?.Service_key,
        Source_ID: BusDetails?.Source_ID,
        Destination_ID: BusDetails?.Destination_ID,
        // BUS_START_DATE: dayjs(BusDetails?.BUS_START_DATE).format("YYYY-MM-DD"),
        BUS_START_DATE: BusDetails?.BUS_START_DATE,
        layout_id: BusDetails?.layout_id,
        Fare: BusDetails?.Fare,
    };
    const url = `${apiUrl}/getserviceseatinglayout`;
    const method = "post";
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // dispatch({ type: BUSLIST_LOADER, payload: false });
        // dispatch({ type: GET_BUS_LIST, payload: response?.data?.services });
        // dispatch({ type: GET_BUS_FILTERS, payload: response?.data?.services });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const GetTBSSeatBlock = async (
    selectedBusData,
    selectedSeat,
    passengerData,
    billingAddress,
    selectedBoardingPoint,
    selectedDroppingPoint,
    emailInput,
    mobileInput,
    totalPrice
) => {

    // console.log(selectedBusData,
    //     selectedSeat,
    //     passengerData,
    //     billingAddress,
    //     selectedBoardingPoint,
    //     selectedDroppingPoint,
    //     emailInput,
    //     mobileInput, "BusDetails");

    // const LuxuryFind = (type) => {
    //     return type.toLowerCase().includes("volvo") ||
    //         type.toLowerCase().includes("mercedes benz") ||
    //         type.toLowerCase().includes("washroom") ||
    //         type.toLowerCase().includes("bharatBenz") ||
    //         type.toLowerCase().includes("luxury");
    // };

    // const seatpriceList = selectedseatprice?.map((item) => item).join(", ");
    const seatFareList = selectedSeat
        .map((item) => item?.price)  // Extract the price from each seat object
        .filter((price) => price)  // Filter out undefined/null/empty values
        .join(",");  // Join the prices with a comma

    const namesList = Object.values(passengerData)  // Get the values of the object
        .map((item) => item.name)  // Extract the name from each item
        .filter((name) => name)  // Filter out empty names
        .join(",");  // Join the names with a comma

    const genderList = Object.values(passengerData)  // Get the values of the object
        .map((item) => (item.gender === "male" ? "M" : "F"))  // Convert to "M" or "F"
        .filter((gender) => gender)  // Filter out undefined/null values
        .join(",");  // Join the genders with a comma


    const ageList = Object.values(passengerData)  // Get the values of the object
        .map((item) => item.age)  // Extract the age from each item
        .filter((age) => age)  // Filter out undefined/null/empty values
        .join(",");  // Join the ages with a comma

    const seatLists = selectedSeat
        .map((item) => item?.seatNumber)  // Extract the seatNumber from each seat object
        .filter((seat) => seat)  // Filter out undefined/null/empty values
        .join(",");  // Join the seat numbers with a comma

    const seatTypeList = selectedSeat
        .map((item) => item?.type)  // Extract the type from each seat object
        .filter((type) => type)  // Filter out undefined/null/empty values
        .join(",");  // Join the seat types with a comma

    const seatTypeIdList = selectedSeat
        .map((item) => item?.seatTypeID)  // Extract the seatTypeID from each seat object
        .filter((typeId) => typeId)  // Filter out undefined/null/empty values
        .join(",");  // Join the seatTypeIDs with a comma

    const seatTaxList = selectedSeat
        .map((item) => item?.tax?.toString().split(",")[0])  // Extract the first value before the comma
        .filter((tax) => tax)  // Filter out undefined/null/empty values
        .join(",");  // Join the tax values with a comma

    const isAcType = selectedBusData.Bus_Type_Name ? "yes" : "no";

    const payload = {
        operatorId: selectedBusData?.operatorId,
        Service_key: selectedBusData?.Service_key,
        Source_ID: selectedBusData?.Source_ID,
        Destination_ID: selectedBusData?.Destination_ID,
        BUS_START_DATE: dayjs(selectedBusData?.BUS_START_DATE).format("YYYY-MM-DD"),
        layout_id: selectedBusData?.layout_id,
        dep_route_id: selectedBoardingPoint?.place_id,
        arr_route_id: selectedDroppingPoint?.place_id,
        address: billingAddress?.address,
        city: billingAddress?.city,
        pin_code: billingAddress?.pincode,
        state: billingAddress?.state,
        mobileInput: mobileInput,
        emailInput: "info@thebusstand.com",
        namesList: namesList,
        genderList: genderList,
        ageList: ageList,
        seatList: seatLists,
        seatFareList: seatFareList,
        seatTypeList: seatTypeList,
        seatTypeIdList: seatTypeIdList,
        isAcType: isAcType,
        seatTaxList: seatTaxList,
    };
    // console.log(payload, "payloadddddddfkhdf")
    console.log(payload, 'tbs_seat_blocked_payload')
    const url = `${apiUrl}/blocktickets`;
    const method = "post";

    try {

        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response, "tbs_ticket_details");
        Toast.show({
            type: 'info',
            text1: response?.data?.Message || 'Success!',
        });
        console.log(response.data, 'seat_blocked_response')
        return response.data;
    } catch (error) {
        console.error(error);
        Toast.show({
            type: 'error',
            text1: 'An error occurred. Please try again.',
        });
    }
};

export const BackUpData = async (
    TicketNo,
    order_id,
    payment_id,
    signature,
    ticketdetails,
    email,
    mobile,
    msg,
    BusDetails,
    arraivaldate,
    selectedBoardingPoint,
    selectedDroppingPoint,
    seatDetails,
    currentpath,
    Bustype,
    finaldiscount,
    code,
    tbsamount,
    tbsbasefare,
    dispatch,
    tbs_deal,
    tbs_discount,
    totaltax,
    Boarding_time,
    confirmRefNo,
    travelerDetails,
    tbsFare,
    userEmail,
    userID,
    userName,
    userPhone
) => {
    console.log(currentpath, "helloooo");
    const passengerlist = Object.values(travelerDetails).map((passenger) => {
        // const seatInfo = seatDetails[passenger.seat];
        const seatInfo = seatDetails.find(seat => seat.seatNumber === passenger.seat);
        const Tbs_Deal = (Number(seatInfo?.price) * Number(tbs_discount)) / 100;
        const Tbs_Fare = Number(seatInfo?.price) - Number(Tbs_Deal);
        const GST = (Tbs_Fare * 5) / 100;
        console.log(passenger, 'BackUpData_passenger')
        return {
            // ...passenger,
            age: passenger?.age,
            user_name: passenger?.name,
            gender: passenger?.gender,
            seat: passenger?.seat,
            base_price: seatInfo?.price?.toFixed(2) ?? 0,
            tbs_deal: Tbs_Deal?.toFixed(2),
            tbs_fare: Tbs_Fare?.toFixed(2),
            gst: GST?.toFixed(2),
            total_fare: (Tbs_Fare + GST)?.toFixed(2),
        };
    });
    console.log(passengerlist, 'passenger_list_checking')
    // const l_user_id = sessionStorage.getItem("user_id");
    // const l_email_id = sessionStorage.getItem("user_email_id");
    // const l_mobile = sessionStorage.getItem("user_mobile");
    // const l_name = sessionStorage.getItem("user_name");

    const login_name = userName;
    const login_email_id = userEmail;
    const login_mobile = userPhone;
    const login_user_id = userID;

    // const LuxuryFind = (type) =>
    //   type.toLowerCase().includes("volvo") ||
    //   type.toLowerCase().includes("mercedes benz") ||
    //   type.toLowerCase().includes("washroom") ||
    //   type.toLowerCase().includes("bharatBenz") ||
    //   type.toLowerCase().includes("luxury");
    const payload = {
        login_user_id: login_user_id,
        login_user_email: login_email_id,
        login_user_mobile: login_mobile,
        name: login_name ? login_name : null,
        email: email,
        mobile: mobile,
        ticket_no: TicketNo,
        // pnr_no: TicketNo,  operator_pnr
        pnr_no: BusDetails?.Service_Number,
        source_id: currentpath?.from_Id,
        source_name: currentpath?.from_station_name,
        pickup_point_id: selectedBoardingPoint?.place_id,
        pickup_point_name: selectedBoardingPoint?.city,
        depature_date: BusDetails?.BUS_START_DATE,
        // depature_time: BusDetails?.Board_Halt_Time && BusDetails?.Board_Halt_Time,
        depature_time: BusDetails?.Start_time,
        droping_place_time: selectedDroppingPoint?.time,
        destination_id: currentpath?.to_Id,
        destination_name: currentpath?.to_station_name,
        droping_point_id: selectedDroppingPoint?.place_id,
        droping_point_name: selectedDroppingPoint?.city,
        arrival_date: arraivaldate,
        arraival_time: BusDetails?.Arr_Time,
        operator_id: BusDetails?.operatorId,
        operator_name: BusDetails?.Traveler_Agent_Name,
        // passenger_details: travelerDetails,
        passenger_details: passengerlist,
        payment_status: msg,
        razorpay_order_id: order_id,
        razorpay_payment_id: payment_id,
        razorpay_signature: signature,
        total_fare: tbsamount,
        bustype: Bustype,
        dicount_amt: finaldiscount,
        offer_code: code,
        base_fare: tbsbasefare,
        bustype_name: BusDetails?.Bus_Type_Name,
        cancel_policy: BusDetails?.Cancellationpolicy,
        gst: totaltax,
        tbs_deal_amount: tbs_deal,
        tbs_deal_percentage: tbs_discount,
        tbs_fare: tbsFare,
        booking_date_time: new Date(),
        device_id: 2,
        device_type: "Mobile",
        reference_id: confirmRefNo,
        payment_id: 1,
        payment_status: "Pending",
    };

    console.log(payload, 'BackUpData_payload')
    const url = `${apiUrl}/tbsblockedhistory`;
    const method = "post";
    try {
        const response = await api({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response, "Blocked_history")
        return response.data;
        //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
    } catch (error) {
        handleError(error);
    }
};


export const TBSBookingStatusUpdate = async (confirmno, ticketno) => {
    const payload = {
        reference_id: confirmno,
        ticket_no: ticketno,
        payment_id: 2,
        payment_status: "Success",
    };

    const url = `${apiUrl}/blockedticketconfirmation`;
    const method = "put";
    try {
        const response = await api({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        // handleError(error);
        // toast.error(error.response.data.message);
        // console.log(error.response.data.message);
        return error.response.data.message;
    }
};
// export const GetTBSSeatConfirmed = async (selectedBusData, refno, newRefNo) => {
//     // const ReferenceNumber = ""
//     const getData = async () => {
//         try {
//             return await AsyncStorage.getItem("reference");
//         } catch (e) {
//             console.error("Error retrieving data", e);
//             return null;  // Fallback to null if there's an error
//         }
//     };

//     const refnumber = await getData();

//     const ref = refnumber || refno || newRefNo;

//     const payload = {
//         operatorId: selectedBusData?.operatorId,
//         BUS_START_DATE: dayjs(selectedBusData?.BUS_START_DATE).format("YYYY-MM-DD"),
//         refno: ref,

//     };
//     console.log(payload, "pauloadfdfd")
//     const url = `${apiUrl}/confirmationseatbooking`;
//     const method = "post";

//     try {
//         const response = await axios({
//             method,
//             url,
//             data: payload,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         // You can dispatch actions here if needed (using Redux or any state management library)
//         // dispatch({ type: BUSLIST_LOADER, payload: false });
//         // dispatch({ type: GET_BUS_LIST, payload: response?.data?.services });
//         // dispatch({ type: GET_BUS_FILTERS, payload: response?.data?.services });

//         return response.data; // Return the API response data
//     } catch (error) {
//         // Handle error appropriately (you can use a custom error handler)
//         handleError(error);
//     }
// };


export const GetTBSSeatConfirmed = async (BusDetails, refno) => {
    const payload = {
        operatorId: BusDetails?.operatorId,
        BUS_START_DATE: dayjs(BusDetails?.BUS_START_DATE).format("YYYY-MM-DD"),
        refno: refno,
    };
    const url = `${apiUrl}/confirmationseatbooking`;
    // const url = `https://thebusstand.com/api/confirmationseatbooking`
    const method = "post";

    // console.log(payload, "payload_payload")

    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // dispatch({ type: BUSLIST_LOADER, payload: false });
        // dispatch({ type: GET_BUS_LIST, payload: response?.data?.services });
        // dispatch({ type: GET_BUS_FILTERS, payload: response?.data?.services });
        // sessionStorage.setItem("busListLoader", false);
        // console.log(response, "after_booking")
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const Get_TBS_Booking_details = async (values, dispatch) => {
    const payload = {
        ticket_no: values.ticketNumber,
        mobile_number: values.phone,
    };
    // console.log(values, "valuesgggggg");

    try {
        const response = await axios.post(`${apiUrl}/getbookingdetails`, payload);
        dispatch({
            type: TBS_TICKET_DETAILS,
            payload: response?.data,
        });
        return response.data;
    } catch (err) {
        handleError(err);
    }
};

export const GetTBSService = async (ticketno) => {
    const payload = {
        ticket_no: ticketno,
    };

    const url = `${apiUrl}/messagingservice`; // Make sure apiUrl is correctly imported from .env or config file

    try {
        const response = await axios({
            method: 'post',
            url,
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Return response data
        return response.data;
    } catch (error) {
        handleError(error);
        throw error; // Optional: You can re-throw the error to handle it in the calling component
    }
};

export const TBS_Booking_Details = async (
    TicketNo,
    order_id,
    payment_id,
    signature,
    ticketdetails,
    email,
    mobile,
    msg,
    BusDetails,
    arraivaldate,
    selectedBoardingPoint,
    selectedDroppingPoint,
    seatDetails,
    currentpath,
    Bustype,
    finaldiscount,
    code,
    tbsamount,
    tbsbasefare,
    dispatch,
    tbs_deal,
    tbs_discount,
    totaltax,
    Boarding_time,
    tbsFare,
    userEmail,
    userID,
    userName,
    userPhone
) => {
    console.log("workingproperly", ticketdetails, seatDetails, true)

    // const l_user_id = sessionStorage.getItem("user_id");
    // const l_email_id = sessionStorage.getItem("user_email_id");
    // const l_mobile = sessionStorage.getItem("user_mobile");
    // const l_name = sessionStorage.getItem("user_name");
    // const login_name = l_name
    // const login_email_id = l_email_id
    // const login_mobile = l_mobile;
    // const login_user_id = l_user_id
    // const LuxuryFind = (type) =>
    //   type.toLowerCase().includes("volvo") ||
    //   type.toLowerCase().includes("mercedes benz") ||
    //   type.toLowerCase().includes("washroom") ||
    //   type.toLowerCase().includes("bharatBenz") ||
    //   type.toLowerCase().includes("luxury");
    const login_name = userName
    const login_email_id = userEmail
    const login_mobile = userPhone;
    const login_user_id = userID

    const passengerlist = ticketdetails?.ticket_det?.map((passenger) => {

        const seatNum = passenger.Seat_Num;
        // const seatInfo = seatDetails[seatNum];
        const seatInfo = seatDetails.find(seat => seat.seatNumber === passenger.Seat_Num);
        const Tbs_Deal = (Number(seatInfo?.price) * Number(tbs_discount)) / 100;
        const Tbs_Fare = Number(seatInfo?.price) - Number(Tbs_Deal);
        const GST = (Tbs_Fare * 5) / 100;
        console.log(passenger, '| --| ', seatInfo, ' | --| ', seatDetails, ' | --| ', seatNum, 'tbs_booking_history')
        return {
            ...passenger,
            // Age: passenger?.age,
            // Passenger_Name: passenger?.name,
            // GENDER_TYPE: passenger?.gender,
            // Seat_Num: passenger?.seat,
            base_price: seatInfo?.price?.toFixed(2) ?? 0,
            tbs_deal: Tbs_Deal?.toFixed(2),
            tbs_fare: Tbs_Fare?.toFixed(2),
            gst: GST?.toFixed(2),
            total_fare: (Tbs_Fare + GST)?.toFixed(2),

            // "Age": "26",
            // "gst": "35.63",
            // "Seat_Num": "U11",
            // "tbs_deal": "37.50",
            // "tbs_fare": "712.50",
            // "base_price": "750.00",
            // "total_fare": "748.13",
            // "GENDER_TYPE": "Male",
            // "Passenger_Name": "Manojttttttt"
        };
    });
    console.log(passengerlist, 'passenger_list_2_checking')
    const payload = {
        login_user_id: login_user_id || null,
        login_user_email: login_email_id || null,
        login_user_mobile: login_mobile || null,
        name: login_name ? login_name : null,
        email: email,
        mobile: mobile,
        ticket_no: TicketNo,
        // pnr_no: TicketNo,  operator_pnr
        pnr_no: ticketdetails?.operator_pnr,
        source_id: currentpath?.from_Id,
        source_name: currentpath?.from_station_name,
        pickup_point_id: selectedBoardingPoint?.place_id,
        pickup_point_name: selectedBoardingPoint?.city,
        depature_date: BusDetails?.BUS_START_DATE,
        // depature_time: BusDetails?.Board_Halt_Time && BusDetails?.Board_Halt_Time,
        depature_time: ticketdetails?.Board_Halt_Time,
        droping_place_time: selectedDroppingPoint?.time,
        destination_id: currentpath?.to_Id,
        destination_name: currentpath?.to_station_name,
        droping_point_id: selectedDroppingPoint?.place_id,
        droping_point_name: selectedDroppingPoint?.city,
        arrival_date: arraivaldate,
        arraival_time: BusDetails?.Arr_Time,
        operator_id: BusDetails?.operatorId,
        operator_name: BusDetails?.Traveler_Agent_Name,
        // passenger_details: ticketdetails?.ticket_det,
        passenger_details: passengerlist,
        payment_status: msg,
        razorpay_order_id: order_id,
        razorpay_payment_id: payment_id,
        razorpay_signature: signature,
        total_fare: tbsamount,
        bustype: Bustype,
        dicount_amt: finaldiscount,
        offer_code: code || 0,
        base_fare: tbsbasefare,
        bustype_name: ticketdetails?.bustype,
        cancel_policy: ticketdetails?.cancelpolicy,
        gst: totaltax,
        tbs_deal_amount: tbs_deal,
        tbs_deal_percentage: tbs_discount,
        tbs_fare: tbsFare,
        booking_date_time: new Date(),
        device_id: 2,
        device_type: "Mobile"
    };

    console.log(payload, "booking_history_payload")
    const url = `${apiUrl}/tbsbookinghistory`;
    const method = "post";
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response, "alpharespones")
        const values = {
            ticketNumber: TicketNo,
            phone: mobile ? mobile : login_mobile,
        };
        // console.log(response.data, values, 'tbs_bookinghistorywithvalue')
        Get_TBS_Booking_details(values, dispatch);
        GetTBSService(TicketNo);
        console.log(response.data, 'tbs_bookingHistory')
        return response.data;
        //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
    } catch (error) {
        handleError(error);
    }
};

export const GetAvailableOffers = async (dispatch, emailInput, mobileInput) => {
    // const userid = sessionStorage.getItem("user_id");
    // const id = userid && decryptData(userid);
    const payload = {
        user_id: null,
        email: emailInput,
        mobile: mobileInput,
    };
    const url = `${apiUrl}/getdiscountoffers`;
    // const url = `http://192.168.90.47:4001/api/getdiscountoffers`;
    const method = "post";
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        dispatch({
            type: GET_AVAILABLE_OFFER,
            payload: response?.data,
        });
        // console.log(response, "get_offers")
        return response.data;
        //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
    } catch (error) {
        handleError(error);
    }
};

// export const GetDiscountOffers = async (dispatch) => {

//     // const userid = sessionStorage.getItem("occupation_id") ? decryptData(sessionStorage.getItem("occupation_id"))  : 8
//     console.log(apicrm, 'checking_api_url')
//     try {
//         const response = await axios.get(`${apicrm}/livediscountandpromotion/8`);
//         dispatch({ type: DISCOUNT_OFFER_LIST, payload: response.data });
//         return response.data;
//     } catch (error) {
//         handleError(error);
//         // return null;
//     }
// };

export const GetOfferValid = async (emailInput, mobileInput, coupon_code) => {
    // const userid = sessionStorage.getItem("user_id");
    // const id = userid && decryptData(userid);
    const payload = {
        code: coupon_code,
        user_id: null,
        email: emailInput,
        mobile: mobileInput,
    };
    const url = `${apiUrl}/offervalid`;
    const method = "post";
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response, "response_response_offer_Daasboard")
        return response.data;
        //  const response = await axios.get(`${apiUrl}/operator-names/${operator}`);
    } catch (error) {
        handleError(error);
    }
};

export const GetTBSFareInfo = async (adultCount, childCount, confirmRefNo) => {
    const payload = {
        adultCount: adultCount,
        childCount: childCount,
        confirmRefNo: confirmRefNo,
    };

    // console.log(adultCount, childCount, confirmRefNo, 'content_type1111')
    const url = `${apiUrl}/getfaresinfo`;
    const method = "post";
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response, 'content_type')
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    console.error("Error details:", error);
    let errorMessage = "An error occurred";

    if (error?.response) {
        console.error("Error response from server:", error?.response);
        errorMessage = `Server responded with status ${error?.response?.status}`;
    } else if (error?.request) {
        console.error("No response received:", error?.request);
        errorMessage = "No response received from server";
    } else {
        console.error("Error setting up request:", error?.message);
        errorMessage = error?.message;
    }

    if (
        error?.code === "ERR_NETWORK" ||
        error?.code === "ERR_CONNECTION_REFUSED"
    ) {
        errorMessage =
            "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
    }

    const currentTime = new Date().getTime();
    if (currentTime - lastToastTime > TOAST_DELAY) {
        Toast.show({
            type: 'error', // or 'success', 'info', etc.
            position: 'bottom', // You can change the position as per your needs
            text1: errorMessage,
            visibilityTime: 2000, // 2 seconds
            autoHide: true,
        });
        lastToastTime = currentTime;
    }
};
