import { useContext } from "react";
import { AppStateContext } from "./AppProvider";
import { MemorialFormInput } from "./memorialForm/types";

export function useAppState(): MemorialFormInput {
    const context = useContext(AppStateContext) as MemorialFormInput;
    if (!context) {
        throw new Error("useAppState must be used within the AppProvider");
    }
    return context;
}