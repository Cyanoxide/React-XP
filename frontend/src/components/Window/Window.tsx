import styles from "./Window.module.scss";
import { act, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { throttle } from "../../utils/general";
import { getWindowPadding, getMinimumWindowSize, getWindowClickRegion } from "../../utils/window";

interface WindowProps {
    icon: string;
    title: string;
    children: ReactNode;
}

const THROTTLE_DELAY = 50;
const taskBarHeight = document.querySelector("[data-label=taskbar]")?.getBoundingClientRect().height || 0;

const Window: React.FC<WindowProps> = ({ icon, title, children }) => {
    const [[windowPositionX, windowPositionY], setWindowPosition] = useState([5, 5]);
    const [[windowWidth, windowHeight], setWindowSize] = useState([500, 350]);
    const [isMaximized, setIsMaximized] = useState(false);
    const [unmaximizedValues, setUnmaximizedValues] = useState({ left: "", top: "", width: "", height: "" });
    const activeWindow = useRef<HTMLDivElement | null>(null);
    const titleBar = useRef<HTMLDivElement | null>(null);

    const isWindowMaximized = (
        activeWindow.current?.style?.left === "0px"
        && activeWindow.current?.style?.top === "0px"
        && activeWindow.current?.style?.width === "100%"
        && activeWindow.current?.style?.height === (window.innerHeight - taskBarHeight) + "px"
    );

    useEffect(() => {
        if (!activeWindow.current) return;
        if (!isWindowMaximized) setIsMaximized(false);

        if (isWindowMaximized) {
            activeWindow.current.style.borderRadius = "0";
            activeWindow.current.style.padding = "0";
        } else {
            activeWindow.current.style.removeProperty("border-radius");
            activeWindow.current.style.removeProperty("padding");
        }
    }, [isWindowMaximized, isMaximized, setIsMaximized]);

    const onTitleBarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        const activeWindowRect = activeWindow.current?.getBoundingClientRect();
        if (!activeWindowRect) return;

        const windowOffsetX = event.clientX - activeWindowRect.left;
        const windowOffsetY = event.clientY - activeWindowRect.top;

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

        const activeWindowRect = activeWindow.current?.getBoundingClientRect();
        const activeTitleBarHeight = titleBar.current?.getBoundingClientRect().height || 0;

        if (!activeWindow.current || !activeWindowRect) return;


        const WINDOW_PADDING = getWindowPadding(activeWindow.current);
        const MIN_WINDOW_WIDTH = getMinimumWindowSize(activeWindow.current);
        const activeWindowRegion = getWindowClickRegion(event, activeWindow.current, WINDOW_PADDING);
        document.body.style.userSelect = "none";

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

    const onButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        const buttonType = event.currentTarget.dataset.button;
        if (!activeWindow.current) return;

        if (buttonType === "close") {
            activeWindow.current.remove();
            // Todo: Remove Window from Taskbar
        }

        if (buttonType === "minimize") {
            activeWindow.current.classList.add("hidden");
        }

        if (buttonType === "maximize") {
            if (isMaximized) setIsMaximized(false);
            else {
                setIsMaximized(true);
                setUnmaximizedValues({
                    left: activeWindow.current.style.left,
                    top: activeWindow.current.style.top,
                    width: activeWindow.current.style.width,
                    height: activeWindow.current.style.height,
                });
            }

            activeWindow.current.style.left = (isMaximized) ? unmaximizedValues.left : "0px";
            activeWindow.current.style.top = (isMaximized) ? unmaximizedValues.top : "0px";
            activeWindow.current.style.width = (isMaximized) ? unmaximizedValues.width : "100%";
            activeWindow.current.style.height = (isMaximized) ? unmaximizedValues.height : window.innerHeight - taskBarHeight + "px";
        }
    }

    return (
        <>
            <div ref={activeWindow} className={`${styles.window} absolute`} data-label="window" style={{ left: windowPositionX, top: windowPositionY, height: windowHeight + "px", width: windowWidth + "px" }} onPointerDown={(e) => onWindowPointerDown(e)}>
                <div ref={titleBar} className={`${styles.titleBar} flex justify-between`} data-label="titlebar" onPointerDown={(e) => onTitleBarPointerDown(e)}>
                    <div className="flex items-center">
                        <img src={icon} width="14" height="14" className="mx-2 min-w-[14px]"></img>
                        <h3>{title}</h3>
                    </div>
                    <div className="flex">
                        <button onClick={(e) => onButtonClick(e)} data-button="minimize">Minimise</button>
                        <button onClick={(e) => onButtonClick(e)} data-button="maximize">Maximise</button>
                        <button onClick={(e) => onButtonClick(e)} data-button="close">Close</button>
                    </div>
                </div>
                <div className={`${styles.windowContent}`} style={{ height: "calc(100% - 2.5rem)", width: "100%", background: "#fff" }}>{children}</div>
            </div>
        </>
    )
};

export default Window;