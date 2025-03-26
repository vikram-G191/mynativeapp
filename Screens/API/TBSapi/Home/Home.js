import axios from "axios";
import Toast from 'react-native-toast-message';
import { GET_BUS_FILTERS, GET_BUS_LIST, GET_STATIONS } from "../../../Redux/Store/Type";
import { REACT_APP_API_URL } from '@env'


let lastToastTime = 0; // Keep track of the last time a toast was shown
const TOAST_DELAY = 2000; // Delay in milliseconds (2 seconds)

// const apiUrl = REACT_APP_API_URL;
// const apiUrl = `http://192.168.90.47:4006/api`
const apiUrl = `https://thebusstand.com/api`
const apicrm = process.env.REACT_APP_CRM_API_URL;

// console.log(apiUrl, "axioserror")
export const GetStations = async (dispatch, val, module) => {
    try {
        const response =
            val === ""
                ? await axios.get(`${apiUrl}/getStation/$`)
                : await axios.get(`${apiUrl}/getStation/${val}`);
        dispatch({ type: GET_STATIONS, payload: response.data });
        // console.log(response.data, "station response");
    } catch (err) {
        handleError(err);
    }
};

export const GetTBSAvailableService = async (
    dispatch,
    Journey_Details,
    getselecteddate
) => {
    const payload = {
        from_sourceID: Journey_Details.from_Id,
        to_sourceID: Journey_Details.to_Id,
        getselecteddate: getselecteddate
    };

    const url = `${apiUrl}/getavaliableservice`;
    const method = "post";
    // console.log(payload, "payload");
    try {
        const response = await axios({
            method,
            url,
            data: payload,
            headers: {
                "Content-Type": "application/json",
            },
        });
        dispatch({ type: GET_BUS_LIST, payload: response?.data?.services });
        dispatch({ type: GET_BUS_FILTERS, payload: response?.data?.services });

        // console.log("App Link", response);
        return response.data;
    } catch (error) {
        handleError(error);
    }
    // finally {
    //     dispatch({ type: BUSLIST_LOADER, payload: false });
    //     sessionStorage.setItem("busListLoader", false);
    // }
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
