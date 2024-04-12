import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { AppProvider } from '../AppProvider'

export const Route = createRootRoute({
    component: () => (
        <>
            <AppProvider>
                <Outlet />
            </AppProvider>
        </>
    ),
})