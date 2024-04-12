import { createLazyFileRoute } from '@tanstack/react-router'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'




export const Route = createLazyFileRoute('/success')({
    component: Success,
})

function Success() {
    const { width, height } = useWindowSize()

    return (
        <>
            <Confetti
                width={width}
                height={height}
            />

            <div className="my-6">
                <h2 className="text-xl mb-3 font-semibold">Thank you for your donation!</h2>
                <p>You will soon receive the eCard to your email inbox.</p>
            </div>
        </>
    )
}