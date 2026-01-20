import styles from "./Tooltip.module.scss";

interface TooltipProps {
    heading: string;
    content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ heading, content }) => {
    return (
        <span className={`${styles.tooltip} absolute`} data-label="tooltip">
            <span className="flex items-center mb-1.5">
                <img src="/icon__info.png" width="14" height="14" className="cursor-pointer mr-2 min-w-[14px]"></img>
                <h4>{heading}</h4>
                <button className={styles.tooltipClose}><span>+</span></button>
            </span>
            <p className="text-left">{content}</p>
        </span>
    );
};

export default Tooltip;