import { createContext, useState } from "react";
import { useAppState } from "./useAppState";

export const AppStateContext = createContext({});

export function AppProvider({ children }) {
    const value = useState({});
    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
}