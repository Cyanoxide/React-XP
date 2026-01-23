import styles from "./Window.module.scss";
import { useState } from "react";
import type { ReactNode } from "react";

interface WindowProps {
    icon: string;
    title: string;
    children: ReactNode;
}

const Window: React.FC<WindowProps> = ({ icon, title, children }) => {
    const [[windowPositionX, windowPositionY], setWindowPosition] = useState([5, 5]);
    const [[windowWidth, windowHeight], setWindowSize] = useState([500, 350]);

    const onTitleBarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        const activeWindow = event.currentTarget.closest("[data-label=window]")?.getBoundingClientRect();
        const taskBarHeight = document.querySelector("[data-label=taskbar]")?.getBoundingClientRect().height;
        if (!activeWindow || !taskBarHeight) return;

        const windowOffsetX = event.clientX - activeWindow.left;
        const windowOffsetY = event.clientY - activeWindow.top;

        const mouseMove = (event: MouseEvent) => {
            if (event.clientY <= 0 || event.clientY > window.innerHeight - taskBarHeight) return;

            setWindowPosition([event.clientX - windowOffsetX, event.clientY - windowOffsetY]);
            document.body.style.userSelect = "none";
        }

        const mouseUp = () => {
            window.removeEventListener("mouseup", mouseUp);
            window.removeEventListener("mousemove", mouseMove);
            document.body.style.userSelect = "";
        }

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
    }

    function getRegionPosition(position: number, size: number, edgePadding: number) {
        if (position <= edgePadding) return "start";
        if (position >= size - edgePadding) return "end";
        return "center";
    }

    function getWindowClickLocation(event: React.PointerEvent<HTMLDivElement>, element: Element, edgePadding: number) {
        const { left, top, width, height } = element.getBoundingClientRect();

        const x = event.clientX - left;
        const y = event.clientY - top;

        let vertical = "";
        let horizontal = "";

        const horizontalPosition = getRegionPosition(x, width, edgePadding);
        const verticalPosition = getRegionPosition(y, height, edgePadding);

        if (verticalPosition === "start") vertical = "top";
        else if (verticalPosition === "end") vertical = "bottom";

        if (horizontalPosition === "start") horizontal = "left";
        else if (horizontalPosition === "end") horizontal = "right";

        let region = vertical;
        if (horizontal) region = region ? `${region}-${horizontal}` : horizontal;

        return region || "center";
    }

    const onWindowPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget !== event.target) return;

        const activeWindow = event.currentTarget.closest("[data-label=window]");
        const activeTitleBar = activeWindow?.querySelector("[data-label=titlebar]");
        const activeTitleBarHeight = activeTitleBar?.getBoundingClientRect().height;
        const taskBarHeight = document.querySelector("[data-label=taskbar]")?.getBoundingClientRect().height;
        const activeWindowRect = activeWindow?.getBoundingClientRect();

        if (!activeWindow || !activeWindowRect || !taskBarHeight || !activeTitleBarHeight) return;

        const calculateWindowPadding = (window: Element) => {
            const styles = getComputedStyle(window) || 0;
            const paddingLeft = parseFloat(styles.paddingLeft) || 0;
            const paddingRight = parseFloat(styles.paddingRight) || 0;
            const gap = parseFloat(styles.gap) || 0;

            return paddingLeft + gap + paddingRight;
        }

        const calculateMinimumWindowSize = (window: Element) => {
            const titleBar = window?.querySelector("[data-label=titlebar]");
            if (!titleBar) return 0;

            const windowPadding = calculateWindowPadding(window);
            const internalWhiteSpace = calculateWindowPadding(titleBar);
            let minWidth = internalWhiteSpace;

            titleBar?.childNodes.forEach((element) => {
                if (element instanceof HTMLElement) {
                    minWidth = minWidth + element.offsetWidth;
                }
            });

            return minWidth + windowPadding;
        }

        const WINDOW_PADDING = calculateWindowPadding(activeWindow);
        const MIN_WINDOW_WIDTH = calculateMinimumWindowSize(activeWindow);

        const activeWindowRegion = getWindowClickLocation(event, activeWindow, WINDOW_PADDING);
        const mouseMove = (event: MouseEvent) => {
            if (event.clientY - activeWindowRect.top <= activeTitleBarHeight + WINDOW_PADDING) return;
            let width = windowWidth;
            let height = windowHeight;
            let x = windowPositionX;
            let y = windowPositionY;

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

        const mouseUp = () => {
            window.removeEventListener("mouseup", mouseUp);
            window.removeEventListener("mousemove", mouseMove);
            document.body.style.userSelect = "";
        }

        window.addEventListener("mousemove", mouseMove);
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