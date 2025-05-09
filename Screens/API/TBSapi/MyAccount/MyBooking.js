import axios from "axios";
import dayjs from "dayjs";
import Toast from 'react-native-toast-message';
import { REACT_APP_API_URL } from "@env"
import { BOOKING_DETAILS_STATUS, CANCELLED_TICKET, COMPLETED_BOOKING, TBS_INFO, TICKET_DETAILS, UPCOMMING_BOOKING } from "../../../Redux/Store/Type";
import { encryptData } from "../../../component/EncryptDecrypt/Encrypt-Decrypt";

let lastToastTime = 0; // Keep track of the last time a toast was shown
const TOAST_DELAY = 2000; // Delay in milliseconds (2 seconds)

// const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = `http://43.204.152.177:4005/api`
// const apiUrl = REACT_APP_API_URL
// const apicrm = process.env.REACT_APP_CRM_API_URL;

const apicrm = `https://crm.thebusstand.com/api`;
const apiUrl = `https://thebusstand.com/api`

// const apiUrl = `http://192.168.90.47:4001/api`
// const apicrm = `http://192.168.90.47:4000/api`

export const GetViewTicketID = async (ticketID, dispatch, setLoader) => {
  const payload = {
    ticketID: ticketID,
  };
  // console.log(ticketID, 'ticket_details')

  const url = `${apiUrl}/getticketdetails`;
  const method = "post";

  try {
    // setSpinning(true); // Start the spinner or loading state
    // Make the API call using axios
    // console.log("ticekt_api_passing")
    const response = await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Store data in AsyncStorage (replacing sessionStorage)
    // await AsyncStorage.setItem("ticket_view", "open");

    // Stop the spinner once the response is received
    // setSpinning(false);

    // Return the response data
    // console.log(response.data, "response__response")
    dispatch({ type: TICKET_DETAILS, payload: response.data })

    console.log(response.data, 'response_ticket_details')
    // setLoader(false)
    return response.data;

  } catch (error) {
    // Handle the error (you can display a message or log it)
    handleError(error);

    // Stop the spinner if an error occurs
    // setSpinning(false);
  } finally {
    // setLoader(false)
  }
};

export const GetUpcommingBookingDetails = async (
  statusid,
  mobile,
  dispatch,
  setLoader
) => {
  try {
    // setLoader(true)
    const encrypted_mobile = encryptData(mobile)
    console.log(encryptData(mobile), statusid, mobile, "apiUr")

    const response = await axios.post(`${apiUrl}/journey-mob/${statusid}`, {
      mobile_number: encrypted_mobile,
    },
      {
        headers: {
          'Content-Type': 'application/json', // Or 'application/x-www-form-urlencoded' depending on your API
        }
      });
    dispatch({ type: UPCOMMING_BOOKING, payload: response?.data?.data });
    console.log(response.data, "upcomingdata");
    // setLoader(false)
    return response.data;
  } catch (err) {
    // console.log(err);
  } finally {
    // setSpinning && setSpinning(false);
    // setLoader(false)
  }
};

export const GetCompletedBookingDetails = async (
  statusid,
  mobile,
  dispatch,
  setLoader
) => {
  try {
    // setLoader(true)
    const encrypted_mobile = encryptData(mobile)
    console.log(statusid, apiUrl, "HiBOokingStatusDetailsisworking")

    const response = await axios.post(`${apiUrl}/journey-mob/${statusid}`, {
      mobile_number: encrypted_mobile,
    });
    dispatch({ type: COMPLETED_BOOKING, payload: response?.data?.data });
    console.log(response.data, "upcomingdata");
    return response.data;
  } catch (err) {
    console.log(err);
  } finally {
    // setSpinning && setSpinning(false);
    // setLoader(false)
  }
};

export const GetCancelledTicket = async (
  user_id,
  dispatch
) => {
  try {
    const response = await axios.post(`${apiUrl}/getcancelledticket`, {
      login_user_id: "tbs-PAX2492",
    });
    dispatch({
      type: CANCELLED_TICKET,
      payload: response?.data?.data
    });
    console.log(response.data, "cancelleddata");
    return response.data;
  } catch (err) {
    console.error("Error fetching cancelled ticket data:", err);
  } finally {
    setSpinning && setSpinning(false);
  }
};

export const GetFooterTabs = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apicrm}/tbsInfo`);
    dispatch({ type: TBS_INFO, payload: response.data });
    console.log(response.data, 'Get_Footer_Tabs');
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

export const GetFooter = async (dispatch, id) => {
  try {
    const response = await axios.get(`${apiUrl}/footer`);
    dispatch({ type: FOOTER, payload: response.data });
    console.log(response.data, 'footerresponse');
    return response.data;
  } catch (error) {
    handleError(error);
    // return null;
  }
};

// Sample error handler function
const handleError = (error) => {
  console.error("API Error:", error);
  // You can also display an alert or toast message here if needed
};
