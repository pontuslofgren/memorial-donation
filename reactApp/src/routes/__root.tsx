import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AppProvider } from '../AppProvider'

export const Route = createRootRoute({
    component: () => (
        <>
            <AppProvider>
                <Outlet />
                <TanStackRouterDevtools />
            </AppProvider>
        </>
    ),
})