import { createLazyFileRoute } from '@tanstack/react-router'
import App from '../app/App'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <App />
    )
}