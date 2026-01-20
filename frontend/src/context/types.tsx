export interface State {
    wallpaper: string;
}

export type Action =
    | { type: "SET_WALLPAPER"; payload: string }


export interface ContextType extends State {
    dispatch: React.Dispatch<Action>;
}