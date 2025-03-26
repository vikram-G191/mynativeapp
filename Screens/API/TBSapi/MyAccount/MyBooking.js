import axios from "axios";
import dayjs from "dayjs";
import Toast from 'react-native-toast-message';
import { REACT_APP_API_URL } from "@env"

let lastToastTime = 0; // Keep track of the last time a toast was shown
const TOAST_DELAY = 2000; // Delay in milliseconds (2 seconds)

// const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = `http://192.168.90.47:4006/api`
// const apiUrl = REACT_APP_API_URL
// const apicrm = process.env.REACT_APP_CRM_API_URL;
const apiUrl = `https://thebusstand.com/api`
export const GetViewTicketID = async (ticketID, setSpinning) => {
  const payload = {
    ticketID: ticketID,
  };
  const url = `${apiUrl}/getticketdetails`;
  const method = "post";

  try {
    // setSpinning(true); // Start the spinner or loading state

    // Make the API call using axios
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
    return response.data;

  } catch (error) {
    // Handle the error (you can display a message or log it)
    handleError(error);

    // Stop the spinner if an error occurs
    // setSpinning(false);
  }
};

// Sample error handler function
const handleError = (error) => {
  console.error("API Error:", error);
  // You can also display an alert or toast message here if needed
};
