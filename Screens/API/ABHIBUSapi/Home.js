import axios from 'axios';
//  import { toast } from "react-toastify";
import {XMLParser} from 'fast-xml-parser';
// import { GET_STATIONS } from "../../Redux/Store/Type";

// Environment variables
// const username = process.env.REACT_APP_ABHIBUS_USERNAME || "demo@test";
// const password = process.env.REACT_APP_ABHIBUS_PASSWORD || "demo@abhibus";
// const abhibusurl = process.env.REACT_APP_ABHIBUS_URL ||  "https://staging.abhibus.com/"
// const abhibuscollection = process.env.REACT_APP_ABHIBUS_COLLECTIONS || "https://staging.abhibus.com/"

//Live API
const username = process.env.REACT_APP_ABHIBUS_USERNAME || 'ratrvtech-api';
const password = process.env.REACT_APP_ABHIBUS_PASSWORD || 'ra292t538@a69';
const abhibusurl =
  process.env.REACT_APP_ABHIBUS_URL || 'https://affapi.abhibus.com/';
const abhibuscollection =
  process.env.REACT_APP_ABHIBUS_COLLECTIONS || 'http://www.abhibus.com/';

// Utility function to parse XML response
export const processSOAPResponse = async (soapResponse, name) => {
  try {
    const parser = new XMLParser({
      ignoreAttributes: true,
      parseNodeValue: true,
      alwaysCreateTextNode: true,
    });

    const parsedSOAP = parser.parse(soapResponse);

    const getStationsResult =
      parsedSOAP['SOAP-ENV:Envelope']?.['SOAP-ENV:Body']?.[
        `ns1:${name}Response`
      ]?.[`ns1:${name}Result`]?.['#text'];

    if (getStationsResult) {
      const jsonObject = JSON.parse(getStationsResult);
      return jsonObject;
    } else {
      console.error('No valid response found.');
      return null;
    }
  } catch (error) {
    console.error('Error processing SOAP response:', error);
    return null;
  }
};

// Function to fetch stations===============================================================================================================================
export const fetchStations = async () => {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${abhibuscollection}">
      <soap:Body>
        <tns:GetStationsV1>
          <username>${username}</username>
          <password>${password}</password>
        </tns:GetStationsV1>
      </soap:Body>
    </soap:Envelope>`;

  const url = `${abhibusurl}abhiWebServer`;

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    const response = await axios.post(url, soapRequest, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}GetStationsV1`,
      },
    });

    // console.log(response,"hiiiissii");
    const result = await processSOAPResponse(response.data, 'GetStationsV1');
    // console.log(result,"hiiiissii");
    return result;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    // toast.error(error.message);
    return null;
  }
};

//========================================================================================================================================================

export const Abhibus_GetBusList = async (from_id, to_id, setBusList) => {
  console.log('consoe_log1');

  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <tns:GetAvailableServices xmlns:tns="${abhibuscollection}">
        <tns:username>${username}</tns:username>
        <tns:password>${password}</tns:password>
        <tns:sourceStationId>${from_id}</tns:sourceStationId>
        <tns:destinationStationId>${to_id}</tns:destinationStationId>
        <tns:journeyDate>2025-03-15</tns:journeyDate>
      </tns:GetAvailableServices>
    </soap:Body>
  </soap:Envelope>`;

  console.log('consoe_log2');

  const url = `${abhibusurl}abhiWebServer`;

  // dispatch({type: BUSLIST_LOADER, payload: true});

  try {
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

    console.log('Request Headers:', {
      'Content-Type': 'text/xml;charset=UTF-8',
      Authorization: authHeader,
      SOAPAction: `${abhibusurl}/GetAvailableServices`,
    });

    console.log('SOAP Request Body:', soapRequest);

    const response = await axios.post(url, soapRequest, {
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        Authorization: authHeader,
        SOAPAction: `${abhibusurl}/GetAvailableServices`,
      },
    });

    // dispatch({type: BUSLIST_LOADER, payload: false});

    console.log('SOAP Response:', response.data);

    const result = await processSOAPResponse(
      response.data,
      'GetAvailableServices',
    );

    if (result?.status === 'fail') {
      console.error(`Error: ${result?.message}`);
    }
    // dispatch({type: GET_BUS_LIST, payload: result?.services});
    // dispatch({type: GET_BUS_FILTERS, payload: result?.services});
    console.log(result, 'consoe_log3');
    return result;
  } catch (error) {
    console.error(
      'Error Fetching Bus Data:',
      error.response?.data || error.message,
    );
    // dispatch({type: BUSLIST_LOADER, payload: false});
    return null;
  }
};

//=======================================================================================================================================================

// export const GetStation = async(dispatch,val) =>{
//   try{

//     const response =
//     val ===""
//     ? await axios.get (`${apiUrl}/getStations/$`)
//     : await axios.get (`${apiUrl}/getStations/${val}`);

//     dispatch({type:GET_STATIONS,payload:response.data})
//     return response.data
//   }
//   catch(err){

//   }
// }
