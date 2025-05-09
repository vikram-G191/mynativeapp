import axios from "axios";
import { FEED_BACK } from "../../../Redux/Store/Type";


const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

//const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = `https://thebusstand.com/api`;

// const apiUrl = "http://192.168.90.47:4001/api"

export const PostFeedBack = async (values, passengerDetails) => {
  const occId =
  values?.occupation === "Business"
      ? 1
      : values?.occupation === "General Public"
      ? 2
      : values?.occupation === "Physically Challenged"
      ? 3
      : values?.occupation === "Pilgrim Traveler"
      ? 4
      : values?.occupation === "Senior Citizen"
      ? 5
      : values?.occupation === "Student"
      ? 6
      : values?.occupation === "Tourist"
      ? 7
      : values?.occupation === "Corporate Traveler"
      ? 8
      : 2;

  try {
    const response = await axios.post(`${apiUrl}/feedback`, {
      tbs_passenger_id: passengerDetails?.userID,
      name: passengerDetails?.userName,
      rating: values?.rating,
      email:passengerDetails?.userEmail,
      phone:passengerDetails?.userPhone,
      description: values.description,
      occupation: values.occupation,
      occupation_id: occId,
    });
    console.log("Feedback submitted successfully:", response);
  } catch (err) {
    console.error("Error submitting feedback:", err);
  }
};


export const GetFeedbackById = async () => {
  const passenger_id = sessionStorage.getItem("passenger_id");
  const decryppassenger_id = passenger_id && decryptData(passenger_id);

  try {
    const response = await axios.get(`${apiUrl}/passenger-details/${decryppassenger_id}`);
    console.log("Passenger feedback details:", response.data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const GetFeedbacks = async (dispatch, id) => {
  try {
    const response = await axios.post(`${apiUrl}/feedback-By-Rating`, {
      ratingFrom: id || 4,
      ratingTo: 5,
    });
    dispatch({ type: FEED_BACK, payload: response.data });
    console.log("Fetched feedback by rating:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const GetAverageRating = async () => {
  try {
    const response = await axios.get(`${apiUrl}/feedbackCount`);
    console.log("Average rating data:", response.data);
    return response.data;
  } catch (err) {
    handleError(err);
  }
};

export const SendFeedBacks = async (dispatch, values) => {
  console.log("Sending feedback:", values);

  const payload = {
    description: values.description,
    rating: values.rating,
    name: values.name,
    occupation: values.occupation,
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("mobile"),
  };

  const url = `${apiUrl}/feedback`;
  try {
    const response = await api.post(url, payload);
    dispatch({ type: FEED_BACK, payload: response.data });
    console.log("Feedback submitted:", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

const handleError = (error) => {
  console.error("Error details:", error);
  let errorMessage = "An error occurred";

  if (error.response) {
    console.error("Error response from server:", error.response);
    errorMessage = `Server responded with status ${error.response.status}`;
  } else if (error.request) {
    console.error("No response received:", error.request);
    errorMessage = "No response received from server";
  } else {
    console.error("Error setting up request:", error.message);
    errorMessage = error.message;
  }

  if (error.code === "ERR_NETWORK" || error.code === "ERR_CONNECTION_REFUSED") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }

  console.error(errorMessage);
};
