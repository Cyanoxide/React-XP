import { useReducer } from "react";
import type { ReactNode } from "react";
import { reducer, initialState } from "./reducer";
import { Context } from "./context";

export const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context value={{ ...state, dispatch }}>
            {children}
        </Context>
    );
};
