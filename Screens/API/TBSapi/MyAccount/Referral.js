import axios from "axios";
const apiUrl = `https://thebusstand.com/api`
// const apiUrl = process.env.REACT_APP_API_URL;
// const apicrm = process.env.REACT_APP_CRM_API_URL;
const apicrm = `https://crm.thebusstand.com/api`

export const GetReffralContent = async () => {
    try {
        const response = await axios.get(`${apicrm}/referEarnContent`);
        console.log(response.data, "apiressponce");
        return response?.data[0];
    } catch (err) {
        handleError(err);
    }
    finally {
        // setSpinning(false)
    }
};

export const GetRefferalCode = async ( user_id ) => {
    // const user_id = sessionStorage.getItem("user_id");
    // const decryptuser_id = user_id && decryptData(user_id);
    // console.log(user_id, 'sending_referral_Code')
    try {
        const response = await axios.get(`${apiUrl}/ReferralCode/${user_id}`)
        console.log(response.data, 'getting_referral_Code')
        return response.data
    }
    catch (err) {
        handleError(err)
    }
}