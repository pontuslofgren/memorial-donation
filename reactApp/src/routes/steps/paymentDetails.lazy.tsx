import { createLazyFileRoute } from '@tanstack/react-router'
import { useAppState } from '../../useAppState'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '../../components/Form'
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from 'react';
import { MemorialFormInput } from '../../memorialForm/types';
import { Stepper } from '../../components/Stepper';
import { Button } from '../../components/Button';

export const Route = createLazyFileRoute('/steps/paymentDetails')({
    component: PaymentDetails,
})

function PaymentDetails() {
    const [state] = useAppState();
    const step = 4;
    const { handleSubmit } = useForm({ defaultValues: state, mode: "onSubmit" });

    const onSubmit: SubmitHandler<MemorialFormInput> = (data) => {
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
        <>
            <Stepper step={step} />
            <h2 className="text-xl mb-3 font-semibold">Payment</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <PaymentElement />
                    <Button disabled={!stripe || loading} >Make donation</Button>
                    {errorMessage && <div>{errorMessage}</div>}
                </fieldset>
            </Form>
        </>
    );
}