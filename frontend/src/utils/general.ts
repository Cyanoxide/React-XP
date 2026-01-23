// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const throttle = (fn: Function, delay: number) => {
    let lastTime = 0;

    return function (...args: unknown[]) {
        const now = new Date().getTime();
        if (now - lastTime >= delay) {
            fn(...args);
            lastTime = now;
        }
    };
}

