import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { MemorialFormInput } from "./types";

function MemorialForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<MemorialFormInput>()
    const onSubmit: SubmitHandler<MemorialFormInput> = (data) => {
        console.log(data);
        processPayment();
    }

    console.log(watch("donorFirstName"));

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleError = (error: StripeError) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const processPayment = async () => {


        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            return;
        }

        setLoading(true);

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements!.submit();
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
            elements: elements ? elements : undefined,
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
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                    <input placeholder="test" {...register("donorFirstName")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.donorFirstName && <span>This field is required</span>}
                </div>
                <PaymentElement />
                <button type="submit" disabled={!stripe || loading}>Make donation</button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </>
    )
}

export default MemorialForm;