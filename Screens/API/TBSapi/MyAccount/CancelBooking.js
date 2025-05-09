import axios from "axios"
import moment from "moment"

// const apiUrl = "http://192.168.90.47:4001/api"

const apiUrl = 'https://thebusstand.com/api'

export const getBookingDetails = async (mobile, ticketno) => {
    const payload = {
        mobile_number: mobile,
        ticket_no: ticketno
    }
    console.log(payload, "payloasdkjfhddfjkhsdkjfhsdk;fjhxdfo;ihsdkjdfhksd;sdhf");

    try {
        const response = await axios.post(`${apiUrl}/getbookingdetails`, payload)
        console.log(response.data)
        return response.data
    }
    catch (err) {
        console.error(err)
    }
}

export const preCancellationPolicy = async (mobile, ticketno) => {
    const payload = {
        ticketNumber: ticketno,
        mblno: mobile
    }
    console.log(payload, "newpyloasdkjf");

    try {
        const response = await axios.post(`${apiUrl}/precancellation`, payload)
        console.log(response.data);
        return response.data

    }
    catch (err) {
        console.error(err);

    }
}

export const getTicketDetails = async (ticketId) => {
    const payload = {
        "ticketID": ticketId
    }
    try {
        const response = await axios.post(`${apiUrl}/getticketdetails`, payload)
        console.log(response.data);
        return response.data

    }
    catch (err) {
        console.error(err);
    }

}

export const cancelTicket = async (selectedRows, ticketdetails, partialcancel) => {

    const seatno = selectedRows.map(item => item.Seat_Num).join(",")


    const payload = {
        ticketNumber: ticketdetails?.ticket_no,
        mobileno: ticketdetails?.mobile,
        cancelseat: seatno,
        partialCancellation: partialcancel,
        operatorId: ticketdetails?.operator_id
    }
    console.log(payload, "cancel_payload");
    try {
        const response = await axios.post(`${apiUrl}/cancelticket`, payload)
        console.log(response, 'cancel_response')
        return response.data
    }
    catch (err) {
        console.error(err);

    }
}

export const Tbs_Booking_Cancellation = async (ticketDetails, ticketInfo, passengerData, selectedRows, isPartialCancellation, preCalcellation, refundAmount, loginPassenger, NewPNR, filteredPassengerList) => {
    console.log(ticketDetails, "rowsoreoj");

    const can_totalFare = selectedRows.reduce((sum, passenger) => {
        return sum + Number(passenger.total_fare)
    }, 0)
    const can_gst = selectedRows.reduce((sum, passenger) => {
        return sum + Number(passenger.gst);
    }, 0);
    const can_tbs_deal = selectedRows.reduce((sum, passenger) => {
        return sum + Number(passenger.tbs_deal);
    }, 0);
    const can_basefare = selectedRows.reduce((sum, passenger) => {
        return sum + Number(passenger.base_price);
    }, 0);
    const can_tbs_fare = selectedRows.reduce((sum, passenger) => {
        return sum + Number(passenger.tbs_fare);
    }, 0);
    const tbsrefund =
        (Number(can_totalFare) * Number(preCalcellation?.can_ret_amt)) / 100;

    const payload = {
        login_user_id: loginPassenger.passenger_id,
        login_user_email: loginPassenger.email,
        login_user_mobile: loginPassenger.phone,
        ticket_no: ticketInfo.Ticket_no,
        pnr_no: ticketInfo.Ticket_no,
        source_name: ticketDetails.source_name,
        pickup_point_name: ticketDetails.pickup_point_name,
        depature_date: moment(ticketDetails.depature_date).local().format("YYYY-MM-DD"),
        depature_time: ticketDetails.depature_time,
        destination_name: ticketDetails.destination_name,
        droping_point_name: ticketDetails.droping_point_name,
        arrival_date: moment(ticketDetails.arrival_date).local().format("YYYY-MM-DD"),
        arraival_time: ticketDetails.arraival_time,
        operator_name: ticketDetails.operator_name,
        passenger_details: filteredPassengerList,
        partialcancellation: isPartialCancellation == 0 ? true : false,
        new_ticket_no: NewPNR ? NewPNR : null,
        cancel_date_time: new Date(),
        offer_code: ticketDetails.offer_code,
        device_id: 2,
        device_type: "Mobile",
        refund_percent: preCalcellation?.can_ret_amt,
        abhibus_refund: refundAmount,
        refund_amt: tbsrefund ? tbsrefund : "",
        total_fare: can_totalFare,
        tbs_fare: can_tbs_fare,
        base_fare: can_basefare,
        gst: can_gst,
        tbs_deal: can_tbs_deal,
        tbs_discount: ticketDetails?.discount_amt,
        bal_base_fare: Number(ticketDetails?.base_fare) - Number(can_basefare),
        bal_gst: Number(ticketDetails?.gst) - Number(can_gst),
        bal_tbs_deal: Number(ticketDetails?.tbs_deal_amount) - Number(can_tbs_deal),
        bal_tbs_discount: 0,
        bal_total_fare: Number(ticketDetails?.total_fare) - Number(can_totalFare),
        bal_tbs_fare: Number(ticketDetails?.tbs_fare) - Number(can_tbs_fare),
    }

    console.log(payload, "paylosdjfhkdjf");

    // const payload = {
    //     login_user_id: "tbs-PA477",
    //     login_user_email: "vikram@gmail.com",
    //     login_user_mobile: "8870858264",
    //     ticket_no: "AB358",
    //     pnr_no: "ABRS7358358",
    //     source_name: "Hyderabad",
    //     pickup_point_name: "Ameerpet",
    //     depature_date: "2025-04-30",
    //     depature_time: "08:30:00",
    //     destination_name: "Vijayawada",
    //     droping_point_name: "Kanchikacharla Bypass",
    //     arrival_date: "2025-05-01",
    //     arraival_time: "19:00:00",
    //     operator_name: "SVR Tours & Travels",
    //     passenger_details: [
    //         {
    //             "key": "44",
    //             "name": "you",
    //             "age": "23",
    //             "gender": "Female",
    //             "bookingId": "ABRS7358",
    //             "seat": "44",
    //             "status": "AFA",
    //             "base_price": "1000.00",
    //             "tbs_deal": "50.00",
    //             "tbs_fare": "950.00",
    //             "gst": "47.50",
    //             "total_fare": "997.50"
    //         }
    //     ],
    //     partialcancellation: false,
    //     new_ticket_no: null,
    //     cancel_date_time: "2025-04-25T11:02:57.360Z",
    //     offer_code: "OFFER2025",
    //     device_id: 1,
    //     device_type: "App-Mobile",
    //     refund_percent: "75",
    //     abhibus_refund: 824,
    //     refund_amt: 748.125,
    //     total_fare: 997.5,
    //     tbs_fare: 950,
    //     base_fare: 1000,
    //     gst: 47.5,
    //     tbs_deal: 50,
    //     tbs_discount: "25.00",
    //     bal_base_fare: 4000,
    //     bal_gst: 190,
    //     bal_tbs_deal: 200,
    //     bal_tbs_discount: 0,
    //     bal_total_fare: 3965,
    //     bal_tbs_fare: 3800
    // }
    try {
        const response = await axios.post(`${apiUrl}/cancellation`, payload)

        console.log(response.data, "tbscancel response");

        return response.data
    }
    catch (err) {
        console.error(err);

    }
}

