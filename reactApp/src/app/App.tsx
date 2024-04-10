import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import MemorialForm from "../memorialForm/MemorialForm";

const stripePromise = loadStripe('pk_test_51OJg4MDGsFuWotrxIC3YGoqZV56afGxQIlgb7wrnQ9Er0Pi2Npedc2LNXWyNiD5m9aOmEvOtndtgABcegP9E93u500bcJBhLYM');

function App() {
  // TODO: useState amount

  const options: StripeElementsOptions = {
    mode: 'payment',
    currency: 'sek',
    amount: 20000,
  }

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <MemorialForm />
      </Elements>
    </>
  )
}

export default App
