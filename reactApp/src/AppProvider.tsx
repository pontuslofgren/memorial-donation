import { createContext, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Header } from "./components/Header";

const stripePromise = loadStripe('pk_test_51OJg4MDGsFuWotrxIC3YGoqZV56afGxQIlgb7wrnQ9Er0Pi2Npedc2LNXWyNiD5m9aOmEvOtndtgABcegP9E93u500bcJBhLYM');

export const AppStateContext = createContext({});

export function AppProvider({ children }) {
    const options: StripeElementsOptions = {
        mode: 'payment',
        currency: 'sek',
        amount: 20000,
        appearance: {
            theme: 'stripe',
            variables: {
                fontSizeBase: "14px"
            },
            rules: {
                '.Label': {
                    fontWeight: '600',
                    color: '#111827'
                },
                '.Input::placeholder': {
                    fontSize: '0.9rem'
                }
            }
        }
    }

    const value = useState({});
    return (
        <Elements stripe={stripePromise} options={options}>
            <AppStateContext.Provider value={value}>
                <Header />
                <div className="px-3 max-w-screen-sm mx-auto">
                    {children}
                </div>
            </AppStateContext.Provider>
        </Elements>
    );
}