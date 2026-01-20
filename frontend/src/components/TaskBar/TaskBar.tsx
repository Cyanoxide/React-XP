import React, { useState, useEffect } from "react";
import styles from "./TaskBar.module.scss";

interface TaskBarProps {
    placeholder?: string
}

const TaskBar: React.FC<TaskBarProps> = ({ placeholder = "" }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    //Todo: Add more accurate clock that updates in sync with system clock
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 30_000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className={`${styles.taskBar} flex justify-between`}>
            <button className={`${styles.startButton}`}>Start</button>
            <ul className={`${styles.windows} flex items-center justify-start w-full`}>
                <li data-active="true">
                    <span className="w-full relative flex">
                        <img src="/icon__internet_explorer.png" width="14" height="14" className="mr-2 min-w-[14px]"></img>
                        <span className="absolute ml-7">Internet Explorer</span>
                    </span>
                </li>
                <li>
                    <span className="w-full relative flex">
                        <img src="/icon__documents.png" width="14" height="14" className="mr-2 min-w-[14px]"></img>
                        <span className="absolute ml-7">My Documents</span>
                    </span>
                </li>
            </ul>
            <div className={`${styles.systemTray} flex justify-center items-center`}>
                <span>{formattedTime}</span>
            </div>
        </div>
    );
};

export default TaskBar;