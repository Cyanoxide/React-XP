import styles from "./Window.module.scss";
import { useState } from "react";
import type { ReactNode } from "react";
import { throttle } from "../../utils/general";
import { getWindowPadding, getMinimumWindowSize, getWindowClickRegion} from "../../utils/window";

interface WindowProps {
    icon: string;
    title: string;
    children: ReactNode;
}

const THROTTLE_DELAY = 50;

const Window: React.FC<WindowProps> = ({ icon, title, children }) => {
    const [[windowPositionX, windowPositionY], setWindowPosition] = useState([5, 5]);
    const [[windowWidth, windowHeight], setWindowSize] = useState([500, 350]);

    const onTitleBarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        const activeWindow = event.currentTarget.closest("[data-label=window]")?.getBoundingClientRect();
        const taskBarHeight = document.querySelector("[data-label=taskbar]")?.getBoundingClientRect().height;
        if (!activeWindow || !taskBarHeight) return;

        const windowOffsetX = event.clientX - activeWindow.left;
        const windowOffsetY = event.clientY - activeWindow.top;

        const onMouseMove = (event: MouseEvent) => {
            if (event.clientY <= 0 || event.clientY > window.innerHeight - taskBarHeight) return;

            setWindowPosition([event.clientX - windowOffsetX, event.clientY - windowOffsetY]);
            document.body.style.userSelect = "none";
        }
        const throttledMouseMove = throttle(onMouseMove, THROTTLE_DELAY);

        const onMouseUp = () => {
            window.removeEventListener("mousemove", throttledMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            document.body.style.userSelect = "";
        }


        window.addEventListener("mousemove", throttledMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    const onWindowPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget !== event.target) return;

        const activeWindow = event.currentTarget.closest("[data-label=window]");
        const activeTitleBar = activeWindow?.querySelector("[data-label=titlebar]");
        const activeTitleBarHeight = activeTitleBar?.getBoundingClientRect().height;
        const taskBarHeight = document.querySelector("[data-label=taskbar]")?.getBoundingClientRect().height;
        const activeWindowRect = activeWindow?.getBoundingClientRect();

        if (!activeWindow || !activeWindowRect || !taskBarHeight || !activeTitleBarHeight) return;


        const WINDOW_PADDING = getWindowPadding(activeWindow);
        const MIN_WINDOW_WIDTH = getMinimumWindowSize(activeWindow);
        const activeWindowRegion = getWindowClickRegion(event, activeWindow, WINDOW_PADDING);

        const onMouseMove = (event: MouseEvent) => {
            if (event.clientY - activeWindowRect.top <= activeTitleBarHeight + WINDOW_PADDING) return;
            let width = windowWidth;
            let height = windowHeight;
            let x = windowPositionX;
            const y = windowPositionY;

            if (activeWindowRegion.includes("right")) {
                width = event.clientX - activeWindowRect.left;
            }

            if (activeWindowRegion.includes("left")) {
                width = Math.max((activeWindowRect.right - event.clientX), MIN_WINDOW_WIDTH);
                x = activeWindowRect.right - width;
            }

            if (activeWindowRegion.includes("bottom")) {
                height = event.clientY - activeWindowRect.top;
            }

            setWindowPosition([x, y]);
            setWindowSize([width, height]);
            document.body.style.userSelect = "none";
        }
        const throttledMouseMove = throttle(onMouseMove, THROTTLE_DELAY);

        const mouseUp = () => {
            window.removeEventListener("mousemove", throttledMouseMove);
            window.removeEventListener("mouseup", mouseUp);
            document.body.style.userSelect = "";
        }

        window.addEventListener("mousemove", throttledMouseMove);
        window.addEventListener("mouseup", mouseUp);
    }

    return (
        <>
            <div className={`${styles.window} absolute`} data-label="window" style={{ left: windowPositionX, top: windowPositionY, height: windowHeight + "px", width: windowWidth + "px" }} onPointerDown={(e) => onWindowPointerDown(e)}>
                <div className={`${styles.titleBar} flex justify-between`} data-label="titlebar" onPointerDown={(e) => onTitleBarPointerDown(e)}>
                    <div className="flex items-center">
                        <img src={icon} width="14" height="14" className="mx-2 min-w-[14px]"></img>
                        <h3>{title}</h3>
                    </div>
                    <div className="flex">
                        <button data-button="minimize">Minimise</button>
                        <button data-button="maximize">Maximise</button>
                        <button data-button="close">Close</button>
                    </div>
                </div>
                <div className={`${styles.windowContent}`} style={{ height: "calc(100% - 2.5rem)", width: "100%", background: "#fff" }}>{children}</div>
            </div>
        </>
    )
};

export default Window;