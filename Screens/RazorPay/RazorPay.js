import React, { useState, useEffect } from "react";
import "../../App.css";
import axios, { Axios } from "axios";

export const RazorpayGateway = ({ amount1 }) => {
    useEffect(() => {
        if (
            !document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
            )
        ) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () =>  // console.log("Razorpay Loaded");
                document.body.appendChild(script);
        }
    }, []);

    const createOrder = async () => {
        try {
            const response = await fetch("https://api.razorpay.com/v1/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Basic " + btoa("rzp_live_QxJoviEQj1Vg2R:RfFdap42jwLrhk2N9YXutouY"),
                },
                body: JSON.stringify({
                    amount: 103000,
                    currency: "INR",
                    receipt: "receipt_1739883552006",
                    payment_capture: 1,
                    notes: {
                        notes_key_1: "test",
                        notes_key_2: "test2",
                    },
                }),
            });

            const data = await response.json();
            // console.log("Order Created:", data);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    useEffect(() => {
        createOrder();
    }, []);
    // Call the function when needed

    const handlePayment = () => {
        if (!amount1) {
            alert("Please enter an amount");
            return;
        }
        const options = {
            key: "rzp_test_eyuWUoPChgfzBC",
            amount: amount1 * 100,
            currency: "INR",
            name: "THEBUSSTAND.COM",
            description: "For testing purposes",
            order_id: "order_PxIM6PEHMJdG27",
            handler: async function (response) {
                // console.log(response, "responseresponseresponse");
                const payload = {
                    razorpay_order_id: response?.razorpay_order_id,
                    razorpay_payment_id: response?.razorpay_payment_id,
                    razorpay_signature: response?.razorpay_signature,
                    // amount: amount1 * 100,
                };
                try {
                    // Validate payment
                    const { data: jsonRes } = await axios.post(
                        "http://localhost:5000/order/validate",
                        payload
                    );
                    // console.log(jsonRes, "ttttt");
                } catch (err) {
                    console.error("Validation failed:", err);
                }
                alert(`Payment ID: ${response}`);
            },
            prefill: {
                name: "Velmurugan",
                email: "nubiznezakr@gmail.com",
                contact: "8190098951",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#1F4B7F",
            },
            modal: {
                escape: false, // Prevents accidental closing
                backdropclose: false, // Prevents closing by clicking outside
                handleback: true, // Handles back button behavior on mobile
            },
        };

        const pay = new window.Razorpay(options);
        pay.open();
    };

    return <button onClick={handlePayment}>Submit</button>;
};

// import Axios from "axios";
// import TshirtImg from "./tshirt.svg";

// function Product() {
//   const amount = 500;
//   const currency = "INR";
//   const receiptId = "qwsaq1";

//   const paymentHandler = async (e) => {
//     try {
//       // Create order
//       const { data: order } = await Axios.post("http://localhost:5000/order", {
//         amount,
//         currency,
//         receipt: receiptId,
//       });

//        // console.log(order);

//       // Razorpay options
//       const options = {
//         key: "rzp_test_ghTeekIY3ZvfG3", // Enter the Key ID generated from the Dashboard
//         amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         currency,
//         name: "Acme Corp", // your business name
//         description: "Test Transaction",
//         image: "https://example.com/your_logo",
//         order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         handler: async function (response) {
//           try {
//             // Validate payment
//             const { data: jsonRes } = await Axios.post(
//               "http://localhost:5000/order/validate",
//               response
//             );
//              // console.log(jsonRes);
//           } catch (err) {
//             console.error("Validation failed:", err);
//           }
//         },
//         prefill: {
//           name: "Web Dev Matrix", // your customer's name
//           email: "webdevmatrix@example.com",
//           contact: "9000000000", // Provide the customer's phone number for better conversion rates
//         },
//         notes: {
//           address: "Razorpay Corporate Office",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.on("payment.failed", function (response) {
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
//       });
//       rzp1.open();
//     } catch (err) {
//       console.error("Payment initiation failed:", err);
//     }

//     e.preventDefault();
//   };

//   return (
//     <div className="product">
//       <h2>Tshirt</h2>
//       <p>Solid blue cotton Tshirt</p>
//       <img src={TshirtImg} alt="Tshirt" />
//       <br />
//       <button onClick={paymentHandler}>Pay</button>
//     </div>
//   );
// }

// export default Product;
