import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../../useAppState'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '../../components/Form'
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from 'react';
import { MemorialFormInput } from '../../memorialForm/types';

export const Route = createLazyFileRoute('/steps/paymentDetails')({
    component: PaymentDetails,
})

function PaymentDetails() {
    const [state] = useAppState();
    console.log(state);
    const { handleSubmit } = useForm({ defaultValues: state, mode: "onSubmit" });

    const onSubmit: SubmitHandler<MemorialFormInput> = (data) => {
        console.log(data);
        console.log(state);
        processPayment(data);
    }

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleError = (error: StripeError) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const processPayment = async (data: MemorialFormInput) => {
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
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const { client_secret: clientSecret } = await res.json();

        // update amount
        elements?.update({ amount: data.amount * 100 })

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const { error } = await stripe.confirmPayment({
            elements: elements ? elements : undefined,
            clientSecret,
            confirmParams: {
                // TODO: create success route and add return url
                return_url: 'https://localhost:5173/success',
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment. Show the error to your customer (for example, payment details incomplete)
            handleError(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <PaymentElement />
                <button type="submit" disabled={!stripe || loading} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Make donation</button>
                {errorMessage && <div>{errorMessage}</div>}
            </fieldset>
        </Form>
    );
}