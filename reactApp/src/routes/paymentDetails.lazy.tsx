import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/paymentDetails')({
    component: PaymentDetails
})

function PaymentDetails() {
    return (
        <>
            Hello
        </>
    )

}
