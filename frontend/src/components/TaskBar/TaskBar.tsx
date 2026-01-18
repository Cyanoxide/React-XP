import React, { useState, useEffect } from "react";
import styles from "./TaskBar.module.scss";

interface TaskBarProps {
    placeholder?: string
}

const TaskBar: React.FC<TaskBarProps> = ({ placeholder = "" }) => {


    return (
        <div className={`${styles.taskBar} flex justify-between`}>
            <button className={`${styles.startButton}`}>Start</button>
            <ul className={`${styles.windows} flex items-center justify-start w-full`}>
                <li>Chrome</li>
                <li>File Explorer</li>
            </ul>
            <div className={`${styles.systemTray} flex justify-center items-center`}>
                <span>4:39 PM</span>
            </div>
        </div>
    );
};

export default TaskBar;