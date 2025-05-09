import axios from "axios";
import Toast from 'react-native-toast-message';
import { GET_BUS_FILTERS, GET_BUS_LIST, GET_CURRENT_THEME, GET_STATIONS, TOP_ROUTE_LIST } from "../../../Redux/Store/Type";
import { REACT_APP_API_URL } from '@env'
import { storeOffersList } from "../../../Utils/STorage";


let lastToastTime = 0; // Keep track of the last time a toast was shown
const TOAST_DELAY = 2000; // Delay in milliseconds (2 seconds)

// const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = process.env.REACT_APP_API_URL;
// const apiurltow = process.env.REACT_APP_API_URL
// const apicrm = `https://crm.thebusstand.com/api`

// const apiUrl = `http://192.168.90.47:4001/api`
// const apicrm = `http://192.168.90.47:4000/api`

const apiUrl = `https://thebusstand.com/api`
const apicrm = `https://crm.thebusstand.com/api`


// // console.log(apiUrl, "axioserror")
// export const GetStations = async (dispatch, val, module) => {
//     try {
//         const response = await axios.get(`${apiUrl}/getstation/$`)
//         dispatch({ type: GET_STATIONS, payload: response.data });
//         // console.log(response.data, "station response");
//     } catch (err) {
//         handleError(err);
//     }
// };

export const GetStations = async (dispatch, val, module) => {
    // console.log(val, 'getting_station')
    // console.log(apiUrl, 'checking_Home_env_file')
    try {
        const response =
            val === ""
                ? await axios.get(`${apiUrl}/getStation/$`)
                : await axios.get(`${apiUrl}/getStation/${val}`);
        dispatch({ type: GET_STATIONS, payload: response.data });
    } catch (err) {
        handleError(err);
    }
};


export const GetTopBusRoutes = async (dispatch, id) => {
    try {
        const response = await axios.get(`${apiUrl}/top-bus-routes`);
        dispatch({
            type: TOP_ROUTE_LIST,
            payload: response?.data?.data,
        });
        // console.log(response.data, "footerresponse");
        return response.data;
    } catch (error) {
        handleError(error);
        // return null;
    }
};

export const GetTBSAvailableService = async (
    dispatch,
    Journey_Details,
    getselecteddate
) => {
    const payload = {
        from_sourceID: Journey_Details.from_Id ? Journey_Details.from_Id : Journey_Details.from_id,
        to_sourceID: Journey_Details.to_Id ? Journey_Details.to_Id : Journey_Details.to_id,
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
        // console.log(response.data, "availe_response");
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



export const GetDiscountOffers = async () => {
    // console.log(apicrm, 'apicrm_apicrm')
    try {
        const response = await axios.get(`${apicrm}/livediscountandpromotion/8`);
        // console.log(response);

        const parsedData = response.data; // Already JSON
        storeOffersList(response.data.response);

        return parsedData;
    } catch (error) {
        handleError(error);
    }
};

export const GetCurrentTheme = async (dispatch) => {
    try {
        const response = await axios.get(`${apicrm}/themes-statusId/2`);
        // console.log(response.data[0], "current theme");
        dispatch({ type: GET_CURRENT_THEME, payload: response.data[0] });
        return response.data[0];
    } catch (error) {
        // toast.warning(err.message)
        handleError(error);
        // return null
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
