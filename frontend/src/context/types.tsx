export interface State {
    wallpaper: string;
    currentTime: Date;
}

export type Action =
    | { type: "SET_WALLPAPER"; payload: string }
    | { type: "SET_CURRENT_TIME"; payload: Date }


export interface ContextType extends State {
    dispatch: React.Dispatch<Action>;
}