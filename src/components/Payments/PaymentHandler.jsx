const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);
import getStripeErrorMessage from "./paymentErrorHandling";

const PaymentHandler = {
  // Function to fetch service type and details
  fetchServiceDetails: async (serviceId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/payments/services/${serviceId}`
      );
      const serviceData = await response.json();
      // console.log("Service Data is ", serviceData);
      return serviceData;
    } catch (error) {
      console.error("Error fetching service details:", error);
      throw error;
    }
  },
  // Function to get the current user's ID from local storage
  getCurrentUserId: () => {
    const user = JSON.parse(localStorage.getItem("userId"));
    // console.log("User ID is ", user?.userId);
    return user?.userId;
  },

  // Function to create a payment intent and retrieve the client secret
  createPaymentIntent: async (amount, serviceId) => {
    const userId = localStorage.getItem("userId");
    // console.log("User ID in create payment intent is ", userId);
    try {
      const response = await fetch(
        `${BASE_URL}/api/payments/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            amount: amount * 100,
            serviceId,
            user_id: userId,
          }),
        }
      );
      if (!response.ok) {
        console.error(
          "Error response from server:",
          response.status,
          response.statusText
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // console.log("API Response:", response);
      const data = await response.json();
      // console.log("Data received:", data);
      return data.clientSecret;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  },

  // Function to verify the payment status
  verifyPayment: async (paymentIntentId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/payments/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  },

  // New function to handle payment submission
  handlePaymentSubmission: async (serviceId, userId, cardDetails, stripe) => {
    try {
      // Retrieve service details to get the amount
      const response = await fetch(
        `${BASE_URL}/api/payments/services/${serviceId}`
      );
      const serviceData = await response.json();
      const amount = serviceData.price;

      // Create a payment intent and retrieve the client secret
      const clientSecret = await PaymentHandler.createPaymentIntent(
        amount,
        serviceId,
        localStorage.getItem("userId")
      );
      // console.log("Client Secret: ", clientSecret);

      // console.log("Card Number Element: ", cardDetails.cardNumberElement);
      // Confirm the card payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardDetails.cardNumberElement,
          billing_details: {
            name: cardDetails.cardHolderName,
            address: {
              postal_code: cardDetails.zipCode,
              state: cardDetails.userState,
            },
          },
        },
      });
      console.log("Payment Result:", paymentResult);
      if (paymentResult.error) {
        if (paymentResult.error.type === "StripeCardError") {
          const errorMessage = getStripeErrorMessage(paymentResult.error);
          throw new Error(errorMessage);
        }
        throw new Error(paymentResult.error.message);
      }

      if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        // Payment succeeded, update your backend as needed
        return { success: true, paymentIntent: paymentResult.paymentIntent };
      }
      return { success: false, error: "Payment failed" };
    } catch (error) {
      console.error("Payment failed", error);
      return { success: false, error: error };
    }
  },
};

export default PaymentHandler;
