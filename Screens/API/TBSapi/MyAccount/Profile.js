import axios from "axios";
import { REACT_APP_API_URL } from "@env"
import { decryptData, encryptData } from "../../../component/EncryptDecrypt/Encrypt-Decrypt";
import { storeDOB, storeEmail, storeGender, storeName, storeOccupation, storePhone, storeState, storeUserId } from "../../../Utils/STorage";
import { Buffer } from 'buffer';
import RNFS from 'react-native-fs';
import { Alert, PermissionsAndroid } from 'react-native';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = `http://43.204.152.177:4005/api`
// const apiUrl = REACT_APP_API_URL
const apicrm = process.env.REACT_APP_CRM_API_URL;

const apiUrl = `https://thebusstand.com/api`

// const apiUrl = `http://192.168.90.47:4001/api`


export const getAllPassengers = async (passengerID) => {
  const payload = {
    tbs_passenger_id: encryptData(passengerID)
  }
  // console.log(payload,"paoidjfodjfoidjf");

  try {
    const response = await axios.post(`${apiUrl}/all-passengers-mob`, payload)
    console.log(response.data, apiUrl, "passdatatatatat");
    return response.data
  }
  catch (err) {
    console.log(err);
  }
}


export const addPassengerDetails = async (values, passId, setUserId, date, calage) => {
  const payload = {
    user_name: values.name,
    date_of_birth: date,
    age: calage,
    gender: values.gender,
    email_id: encryptData(values.email),
    mobile_number: encryptData(values.phone),
    state: values.state,
    state_id: "TN",
    tbs_passenger_id: encryptData(setUserId),
    ...(passId && { tbs_add_pax_id: encryptData(passId) })
  }
  console.log(payload, "pAYLOADDFSAF");

  try {
    if (passId) {
      const response = await axios.put(`${apiUrl}/add-passenger-details-mob`, payload)
      console.log(response.data, "passenger response");
      return response.data
    }
    else {
      const response = await axios.post(`${apiUrl}/addpassengerPost-mob`, payload)
      console.log(response.data, "passenger else datata response");
      return response.data
    }

  }
  catch (err) {
    console.log(err);

  }
}

export const getPassengerDetailsById = async (passid) => {
  const payload = {
    tbs_add_pax_id: encryptData(passid)
  }
  try {
    const response = await axios.post(`${apiUrl}/add-passenger-details-mob`, payload)
    console.log(response.data, "apiDataatat");

    return response.data
  }
  catch (err) {
    console.log(err);

  }
}

export const deletePassengerById = async (passid) => {
  // console.log(passid,"newwpassidf");

  const payload = {
    tbs_add_pax_id: encryptData(passid)
  }
  console.log(payload, "newwpassidf");
  try {
    const response = await axios.post(`${apiUrl}/add-passenger-details-delete-mob`, payload)
    console.log(response.data, "passenger response");
    return response.data
  }
  catch (err) {
    console.log(err);

  }
}

export const downloadTicket = async (id) => {
  // try {
  //     // 1. Request Android Storage Permission
  //     // const granted = await PermissionsAndroid.request(
  //     //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  //     // );
  //     // if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //     //   Alert.alert('Permission Denied', 'Storage permission is required');
  //     //   return;
  //     // }

  //     // 2. API Call to get PDF (Change this to your API URL)
  //     console.log(id);

  //     const apiUrl = `${apiUrl}/downloadticket/${id}`
  //   const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  //   const fileName = `ticket_${id}_${randomNum}.pdf`;
  //     const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

  //     // 3. Fetch file using Axios (as a blob)
  //     const response = await axios.get(`${apiUrl}/downloadticket/${id}`, {
  //             responseType: 'arraybuffer',
  //           });

  //     // 4. Write file to storage
  //     await RNFS.writeFile(filePath, response.data, 'base64'); // if you use 'base64'
  //     Alert.alert('Downloaded!', `PDF saved to ${filePath}`);
  //   } catch (err) {
  //     console.log('Download Error:', err);
  //     Alert.alert('Error', 'Something went wrong');
  //   }
  try {
    // 1️⃣ Fetch the file from API
    console.log(id, 'downloadidpassing..')
    const response = await axios.get(`${apiUrl}/downloadticket/${id}`, {
      responseType: 'arraybuffer',
    });
    console.log(response, 'downlaoded_ticket_response')
    // 2️⃣ Convert to base64
    const base64Data = Buffer.from(response.data, 'binary').toString('base64');

    // 3️⃣ Generate unique file name
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    const fileName = `ticket_${id}_${randomNum}.pdf`;
    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    // 4️⃣ Save file (no need to unlink, filename is already unique)
    await RNFS.writeFile(filePath, base64Data, 'base64');

    console.log('✅ Saved PDF to:', filePath);

    if (FileViewer) {
      // 5️⃣ Open the file
      await FileViewer.open(filePath, { showOpenWithDialog: true });
    } else {
      console.log('FileViewer is not present')
    }

    // // 5️⃣ Share the file
    // const shareOptions = {
    //   title: 'Share Ticket PDF',
    //   url: `${RNFS.DownloadDirectoryPath}/${fileName}`, // Provide the path to the file
    //   type: 'application/pdf', // Share as PDF file
    // };

    // await Share.open(shareOptions);
    // console.log('Shared successfully');

  } catch (err) {
    console.error('❌ Error:', err);
    //   Alert.alert('Download Failed', 'Something went wrong while downloading the ticket.');
  }
};


export const ShareTicket = async (id) => {
  try {
    console.log(id, 'downloadidpassing..');

    // 1️⃣ Fetch the file from API
    const response = await axios.get(`${apiUrl}/downloadticket/${id}`, {
      responseType: 'arraybuffer',
    });
    console.log(response, 'downlaoded_ticket_response');

    // 2️⃣ Convert to base64
    const base64Data = Buffer.from(response.data, 'binary').toString('base64');

    // 3️⃣ Generate unique file name
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    const fileName = `ticket_${id}_${randomNum}.pdf`;
    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    // 4️⃣ Save file
    await RNFS.writeFile(filePath, base64Data, 'base64');
    console.log('✅ Saved PDF to:', filePath);

    if (FileViewer) {
      // 5️⃣ Open the file
      await FileViewer.open(filePath, { showOpenWithDialog: true });
    } else {
      console.log('FileViewer is not present');
    }

    // 6️⃣ Share the file
    const shareOptions = {
      title: 'Share Ticket PDF',
      url: `file://${filePath}`, // Use the correct file URL with 'file://' prefix
      type: 'application/pdf', // Specify the type as PDF
    };

    await Share.open(shareOptions); // Open share dialog
    console.log('Shared successfully');

  } catch (err) {
    console.error('❌ Error:', err);
    // Alert.alert('Download Failed', 'Something went wrong while downloading the ticket.');
  }
};


export const GetProfileById = async (user_id) => {
  const payload = {
    tbs_passenger_id: encryptData(user_id),
  };
  console.log(user_id, 'user_id_profile_id')
  try {
    const response = await axios.post(`${apiUrl}/passenger-detailsbyid-mob`, payload)
    console.log(response.data, 'response_passenger_id')
    const convertedData = decryptData(response.data)
    console.log(convertedData, 'convertedData')
    const parsedData = JSON.parse(convertedData)
    storeUserId(parsedData?.tbs_passenger_id)
    storeName(parsedData?.user_name)
    storeEmail(parsedData?.email_id)
    storePhone(parsedData?.mobile_number)
    storeGender(parsedData?.gender)
    storeState(parsedData?.state)
    storeDOB(parsedData?.date_of_birth)
    storeOccupation(parsedData?.occupation)

    console.log(parsedData, "parsedData");

    return parsedData;
  } catch (error) {
    handleError(error);
    // return null;
  }

};

const calculateAge = (dobString) => {
  if (!dobString) return null;

  const dob = new Date(dobString);
  if (isNaN(dob)) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--; // Not had birthday yet this year
  }

  return age;
};


export const UpdateProfile = async (profilevalues, userId) => {
  const age = calculateAge(profilevalues.date_of_birth);
  const payload = {
    tbs_passenger_id: encryptData(userId),
    user_name: encryptData(profilevalues.user_name),
    email_id: encryptData(profilevalues.email_id),
    mobile_number: encryptData(profilevalues.mobile_number),
    occupation: encryptData(profilevalues.occupation),
    date_of_birth: encryptData(profilevalues.date_of_birth),
    age: encryptData(age),
    gender: encryptData(profilevalues.gender),
    state: encryptData(profilevalues.state),
    state_id: encryptData(profilevalues.state_id || "TN"),
    user_status: encryptData("register"),
    device_id: encryptData(2),
    device_type: encryptData('mobile'),
    occupation_id:
      encryptData(profilevalues.occupation === "Business"
        ? 1
        : profilevalues.occupation === "General Public"
          ? 2
          : profilevalues.occupation === "Physically Challenged"
            ? 3
            : profilevalues.occupation === "Pilgrim Travelers"
              ? 4
              : profilevalues.occupation === "Senior Citizens"
                ? 5
                : profilevalues.occupation === "Students"
                  ? 6
                  : profilevalues.occupation === "Tourist"
                    ? 7
                    : 8),
  };

  const unencryptedpayload = {
    tbs_passenger_id: userId,
    user_name: profilevalues.user_name,
    email_id: profilevalues.email_id,
    mobile_number: profilevalues.mobile_number,
    occupation: profilevalues.occupation,
    date_of_birth: profilevalues.date_of_birth,
    age: age,
    gender: profilevalues.gender,
    state: profilevalues.state,
    state_id: profilevalues.state_id || "TN",
    user_status: "register",
    device_id: 2,
    device_type: 'mobile',
    occupation_id:
      profilevalues.occupation === "Business"
        ? 1
        : profilevalues.occupation === "General Public"
          ? 2
          : profilevalues.occupation === "Physically Challenged"
            ? 3
            : profilevalues.occupation === "Pilgrim Travelers"
              ? 4
              : profilevalues.occupation === "Senior Citizens"
                ? 5
                : profilevalues.occupation === "Students"
                  ? 6
                  : profilevalues.occupation === "Tourist"
                    ? 7
                    : 8,
  };
  console.log(unencryptedpayload, "unencryptedpayload");

  console.log(payload, "Update_profile_payload");
  const url = `${apiUrl}/passenger-detailsupdate-mob`;
  const method = "put";

  try {
    console.log(apiUrl, 'just_checking')
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response, "response1response1");
    GetProfileById(userId);
    console.log(response, "responseresponse");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
  // finally {
  //   setSpinning(false);
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

};