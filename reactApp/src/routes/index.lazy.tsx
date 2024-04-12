import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <>
            <a className='text-blue-600 underline' href="/steps/paymentDetails">Make a donation!</a >
        </>
    )
}