import axios from "axios";
import { ADS_LIST } from "../../../Redux/Store/Type";


REACT_APP_API_URL = "http://192.168.90.47:4001/api"
REACT_APP_CRM_API_URL = "http://192.168.90.47:4000/api"
REACT_APP_API_URL_IMAGE = "http://192.168.90.47:4001"
REACT_APP_CRM_API_URL_IMAGE = "http://192.168.90.47:4000"

const apiCrmImage = process.env.REACT_APP_CRM_API_URL_IMAGE

export const GetAds = async (dispatch, id) => {
    try {
        // const response = await axios.get(`https://crm.thebusstand.com/api/Active-ads`);
        const response = await axios.get(`https://crm.thebusstand.com/api/getLiveMobAdvertisements`);
        dispatch({ type: ADS_LIST, payload: response.data });
        // console.log(response.data, "footerresponse");
        return response.data;
    } catch (error) {
        // handleError(error);
        console.log(error);

        // return null;
    }
};