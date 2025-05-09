import axios, { Axios } from "axios";
import { decryptData, encryptData } from "../../../component/EncryptDecrypt/Encrypt-Decrypt";
import { storeEmail, storeName, storePhone, storeTokenId, storeUserId } from "../../../Utils/STorage";
// import REACT_APP_API_URL from '@env'

// const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = `http://43.204.152.177:4005/api`
// const apicrm = REACT_APP_CRM_API_URL;

// const apiUrl = `http://192.168.90.47:4001/api`

const apiUrl = `https://thebusstand.com/api`

export const SendMessage = async (mobile, otp) => {
  const payload = {
    mobile: encryptData(mobile),
    otp: encryptData(otp),
  };
  console.log(payload, "payloaddata");

  try {
    const response = await axios.post(`${apiUrl}/send-sms-mob`, payload);
    // console.log(response?.data?.success===true,"hhhhhhhh");

    if (response?.data?.success) {
      const encryptrandom = encryptData(otp);
      // sessionStorage.setItem("mobileOTP", encryptrandom);
    }
    // console.log(response.data);

    return response;
    // console.log("SMS Response:", response?.data?.success);
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
  }
};

export const getPassengerById = async (passId) => {
  const payload = {
    tbs_passenger_id: encryptData(passId)
  }
  try {
    const response = await axios.post(`${apiUrl}/passenger-detailsbyid-mob`, payload)

    const convertedData = decryptData(response.data)
    const parsedData = JSON.parse(convertedData)
    console.log(parsedData, "new apiiiii");
    storeUserId(parsedData?.tbs_passenger_id)
    storeName(parsedData?.user_name)
    storeEmail(parsedData?.email_id)
    storePhone(parsedData?.mobile_number)
    response?.data?.token && storeTokenId(response?.data?.token)
    return parsedData
  }
  catch (err) {
    console.log(err);

  }
}

export const getUserDataByMobile = async (mobileNo) => {
  const payload = {
    mobile_number: encryptData(mobileNo)
  }
  try {
    const response = await axios.post(`${apiUrl}/get-user-data-mob`, payload)
    console.log(response.data.token, "apiress");
    const convertedData = decryptData(response.data.user)
    const parsedData = JSON.parse(convertedData)
    console.log(parsedData.user_name);

    storeUserId(parsedData?.tbs_passenger_id)
    storeName(parsedData?.user_name)
    storeEmail(parsedData?.email_id)
    storePhone(parsedData?.mobile_number)
    storeTokenId(response?.data?.token)

    await getPassengerById(parsedData?.tbs_passenger_id)

    return convertedData
  }
  catch (err) {
    console.log(err);
  }
}

export const SendPassengerDetails = async (values, phone, userId) => {
  const payload = {
    tbs_passenger_id: encryptData(userId),
    user_name: encryptData(values.name),
    email_id: encryptData(values.email),
    mobile_number: encryptData(phone),
    occupation: encryptData(values.occupation),
    date_of_birth: encryptData(null),
    age: encryptData(""),
    gender: encryptData(null),
    state: encryptData(null),
    state_id: encryptData(null),
    user_status: encryptData(null),
    device_id: encryptData(2),
    device_type: encryptData('mobile'),
    occupation_id:
      encryptData(values.occupation === "Business"
        ? 1
        : values.occupation === "General Public"
          ? 2
          : values.occupation === "Physically Challenged"
            ? 3
            : values.occupation === "Pilgrim Travelers"
              ? 4
              : values.occupation === "Senior Citizens"
                ? 5
                : values.occupation === "Students"
                  ? 6
                  : values.occupation === "Tourist"
                    ? 7
                    : 8),
  };
  const npayload = {
    tbs_passenger_id: userId,
    user_name: values.name,
    email_id: values.email,
    mobile_number: phone,
    occupation: values.occupation,
    occupation_id:
      values.occupation === "Business"
        ? "1"
        : values.occupation === "General Public"
          ? "2"
          : values.occupation === "Physically Challenged"
            ? "3"
            : values.occupation === "Pilgrim Travelers"
              ? "4"
              : values.occupation === "Senior Citizens"
                ? "5"
                : values.occupation === "Students"
                  ? "6"
                  : values.occupation === "Tourist"
                    ? "7"
                    : "8",
  };
  console.log(npayload, "payloadkfjhdf");

  try {
    const response = await axios.put(`${apiUrl}/passenger-detailsupdate-mob`, payload)
    console.log((response.data), "decryptedddddddddd");

    getPassengerById(userId)
    return response.data
  }
  catch (err) {
    console.log(err);

  }
}

export const GetMobileByMail = async (mailID) => {
  const payload = {
    email_id: mailID
  }
  try {
    const response = await axios.post(`${apiUrl}/getusernumberbyemail-mob`, payload)
    console.log(decryptData(response.data.user), "emailemailphonenenene");

    return decryptData(response.data.user)

  }
  catch (err) {
    console.log(err);

  }
}

