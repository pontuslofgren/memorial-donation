import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { MemorialFormInput } from "./types";

function MemorialForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<MemorialFormInput>()

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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <h3 className="text-lg font-bold mb-3">Tribute details</h3>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">For whom would you like to pay tribute?</label>
                    <input placeholder="Name of the honoree" {...register("honoreeName", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.honoreeName && <span>This field is required</span>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">How much would you like to donate?</label>
                    <input placeholder="Enter amount" type="number" {...register("amount", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.amount && <span>This field is required</span>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                    <textarea rows={5} placeholder="Your tribute for the eCard here" {...register("message", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.message && <span>This field is required</span>}
                </div>

                <h3 className="text-lg font-bold mb-3">Personal details</h3>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                    <input placeholder="Joe" {...register("donorFirstName", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.donorFirstName && <span>This field is required</span>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                    <input placeholder="Biden" {...register("donorLastName", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.donorLastName && <span>This field is required</span>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
                    <input placeholder="joe.biden@whitehouse.gov" type="email" {...register("email", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.email && <span>This field is required</span>}
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3">Payment details</h3>
                    <PaymentElement />
                </div>
                <button type="submit" disabled={!stripe || loading} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Make donation</button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </>
    )
}

export default MemorialForm;