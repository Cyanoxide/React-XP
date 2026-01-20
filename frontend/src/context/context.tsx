import { createContext, use } from "react";
import type { ContextType } from "./types";

export const Context = createContext<ContextType | undefined>(undefined);

export const useContext = () => {
    const context = use(Context);
    if (!context) {
        throw new Error("useContext must be used within a Provider");
    }
    return context;
};