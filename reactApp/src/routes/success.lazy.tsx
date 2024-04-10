import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/success')({
    component: Success,
})

function Success() {
    return <div className="p-2">Hello from Success!</div>
}