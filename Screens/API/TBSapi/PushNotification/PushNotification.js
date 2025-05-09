import axios from "axios";


// const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl = `http://43.204.152.177:4005/api`
const apicrm = `https://crm.thebusstand.com/api`
const apiUrl = `https://thebusstand.com/api`
// const apiUrl = `http://192.168.90.43:4000/api`
// const apicrm = REACT_APP_CRM_API_URL;


export const PostNotificationToken = async (token) => {
  const payload = {
    notification_token: token
  }
  console.log(payload, "checking_payload")
  try {
    console.log("passing......")
    const response = await axios.post(`${apicrm}/notificationtoken`, payload)

    console.log(response, "notification token sended");
    console.log(payload, "checking_payload")
    return response
  }
  catch (err) {
    console.error(err);
  }
}