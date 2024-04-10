import { PaymentElement } from "@stripe/react-stripe-js";

function MemorialForm() {
    return (
        <>
            <form>
                <PaymentElement />
                <button>Submit</button>
            </form>
        </>
    )
}

export default MemorialForm;