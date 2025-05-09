import axios from "axios";

// const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = `https://thebusstand.com/api`;
// const apiUrl = "http://192.168.90.47:4001/api"


export const help = async (values, token) => {
    try {
      const response = await axios.post(
        `${apiUrl}/send-inquiry-mob`,
        {
          name: values.name,
          phone: null,
          email: values.email,
          message: values.message,
          terms: values.terms,
        }
      );
      console.log(response, "mailresponse");
    } catch (err) {
        handleError(err);
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
  
  };