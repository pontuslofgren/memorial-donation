import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

function MemorialForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret
        const res = await fetch("http://localhost:5040/api/payments/create-payment-intent", {
            method: "POST",
        });

        const { client_secret: clientSecret } = await res.json();

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                // TODO: create success route and add return url
                return_url: 'https://example.com/order/123/complete',
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            handleError(error);
        } else {
            // Your customer is redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer is redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button type="submit" disabled={!stripe || loading}>Make donation</button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </>
    )
}

export default MemorialForm;