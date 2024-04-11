import { createContext, useState } from "react";
import { useAppState } from "./useAppState";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe('pk_test_51OJg4MDGsFuWotrxIC3YGoqZV56afGxQIlgb7wrnQ9Er0Pi2Npedc2LNXWyNiD5m9aOmEvOtndtgABcegP9E93u500bcJBhLYM');

export const AppStateContext = createContext({});

export function AppProvider({ children }) {
    const options: StripeElementsOptions = {
        mode: 'payment',
        currency: 'sek',
        amount: 20000,
    }

    const value = useState({});
    return (
        <Elements stripe={stripePromise} options={options}>
            <AppStateContext.Provider value={value}>
                {children}
            </AppStateContext.Provider>
        </Elements>
    );
}