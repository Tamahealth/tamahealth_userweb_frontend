BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import { loadStripe } from "@stripe/stripe-js";

const PaymentHandler = {
  // Function to create a payment intent and retrieve the client secret
  createPaymentIntent: async (amount, serviceId, userId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/payments/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            serviceId,
            userId,
          }),
        }
      );
      const data = await response.json();
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
  handlePaymentSubmission: async (
    amount,
    serviceId,
    userId,
    cardElement,
    cardHolderDetails
  ) => {
    try {
      // Load Stripe
      const stripe = await loadStripe(
        import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY
      );

      // Create a payment intent and retrieve the client secret
      const clientSecret = await PaymentHandler.createPaymentIntent(
        amount,
        serviceId,
        userId
      );

      // Confirm the card payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardHolderDetails.cardHolderName,
            address: {
              postal_code: cardHolderDetails.zipCode,
              state: cardHolderDetails.userState,
            },
          },
        },
      });

      if (paymentResult.error) {
        // Handle payment errors here
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
      return { success: false, error: error.message };
    }
  },
};

export default PaymentHandler;
