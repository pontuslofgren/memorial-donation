import { createLazyFileRoute } from '@tanstack/react-router'
import { useAppState } from '../useAppState'

export const Route = createLazyFileRoute('/about')({
    component: About,
})

function About() {
    // const [state, useState] = useAppState();
    return <div className="p-2">
        Hello
        {/* {state.lastName} */}
    </div>
}