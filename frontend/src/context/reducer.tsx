import type { State, Action } from "./types";
import { defaultWallpaper } from "./defaults";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_WALLPAPER":
            return { ...state, wallpaper: action.payload };
        default:
            return state;
    }
};

export const initialState: State = {
    wallpaper: defaultWallpaper,
};