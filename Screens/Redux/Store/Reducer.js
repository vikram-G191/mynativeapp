// import { GET_STATIONS } from "./Type";

import { CHECKING_DATA, GET_BUS_FILTERS, GET_STATIONS } from './Type';

// const initialState ={
//     GET_STATIONS:[]
// }

// export const busreducer = (state=initialState,action)=>{
//     const {type,payload}=action;

//     switch(type){
//         case GET_STATIONS:
//             return {
//                 state,
//                 GET_STATIONS: payload,
//             }
//     }
// }

const initialState = {
  checking_data: [], // Instead of `never[]`, explicitly use `any[]`
  get_stations: [],
  get_buslist_filter: [],
  live_per: [],
  get_ticket_detail: [],
  tbs_available_offer: [],
  discount_offer_list: [],
  tbs_booking_details: [],
  get_buslist: [],
  filtered_operator: [],
  ads_list: [],
  completed_booking: [],
  upcomming_booking: [],
  ticket_details: [],
  top_route_list: [],
  tbs_info: [],
  current_theme: [],
  cancelled_ticket: []
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CHECKING_DATA':
      return {
        ...state,
        checking_data: payload,
      };
    case 'GET_STATIONS': {
      return {
        ...state,
        get_stations: payload,
      };
    }
    case "GET_BUS_FILTERS": {
      return {
        ...state,
        get_buslist_filter: payload,
      };
    }
    case "CURRENT_PERCENTAGE": {
      return {
        ...state,
        // after discuss set 4% default at 1-3-25
        // live_per: payload?.data?.data?.[0].Percentage,
        // live_per: payload,
        live_per: 5,
      };
    }
    case "GET_TICKET_DETAILS": {
      return {
        ...state,
        get_ticket_detail: payload,
      };
    }
    case "GET_AVAILABLE_OFFER": {
      return {
        ...state,
        tbs_available_offer: payload,
      };
    }
    case "DISCOUNT_OFFER_LIST": {
      return {
        ...state,
        discount_offer_list: payload,
      };
    }
    case "DISCOUNT_OFFER_LIST": {
      return {
        ...state,
        discount_offer_list: payload,
      };
    }
    case "TBS_TICKET_DETAILS": {
      return {
        ...state,
        tbs_booking_details: payload?.data?.[0],
      };
    }
    case "GET_BUS_LIST": {
      return {
        ...state,
        get_buslist: payload,
      };
    }
    case "FILTERED_OPERATOR": {
      return {
        ...state,
        filtered_operator: payload,
      };
    }
    case "ADS_LIST":
      return {
        ...state,
        ads_list: payload
      }
    case "COMPLETED_BOOKING":
      return {
        ...state,
        completed_booking: payload
      }
    case "UPCOMMING_BOOKING":
      return {
        ...state,
        upcomming_booking: payload
      }
    case "TICKET_DETAILS":
      return {
        ...state,
        ticket_details: payload
      }
    case "TOP_ROUTE_LIST":
      return {
        ...state,
        top_route_list: payload
      }
    case 'TBS_INFO': {
      return {
        ...state,
        tbs_info: payload,
      };
    }
    case "GET_CURRENT_THEME": {
      return {
        ...state,
        current_theme: payload
      }
    }
    case "CANCELLED_TICKET": {
      return {
        ...state,
        cancelled_ticket: payload
      }
    }

    default:
      return state;
  }
};
