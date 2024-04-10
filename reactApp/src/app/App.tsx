import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import MemorialForm from "../memorialForm/MemorialForm";

const stripePromise = loadStripe('pk_test_4QHSdRjQiwkzokPPCiK33eOq');

function App() {
  // TODO: useState amount

  const options: StripeElementsOptions = {
    mode: 'payment',
    currency: 'usd',
    amount: 1099,
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
