import styles from "./Desktop.module.scss";
import { useState, useRef } from "react";
import DesktopIcon from "../DesktopIcon/DesktopIcon";

const Desktop = () => {
    const desktop = useRef<HTMLDivElement | null>(null);
    const [selectedId, setSelectedId] = useState<number | string>("");
    const next = (() => { let count = 0; return () => ++count; })();


    return (
        <div ref={desktop} className={styles.desktop}>
            <DesktopIcon id={next()} appId="documents" top={5} left={5} selectedId={selectedId} setSelectedId={setSelectedId} />
            <DesktopIcon id={next()} appId="internetExplorer" top={70} left={5} selectedId={selectedId} setSelectedId={setSelectedId} />
            <DesktopIcon id={next()} appId="gitHub" top={145} left={5} selectedId={selectedId} setSelectedId={setSelectedId} />
            <DesktopIcon id={next()} appId="kofi" top={210} left={5} selectedId={selectedId} setSelectedId={setSelectedId} />
            <DesktopIcon id={next()} appId="recycleBin" bottom={5} right={5} selectedId={selectedId} setSelectedId={setSelectedId} />
        </div>
    );
};

export default Desktop;
