import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: never[]) => void>(callback: T, delay: number) {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const debounced = useCallback(
        (...args: Parameters<T>) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => callback(...args), delay);
        },
        [callback, delay]
    );

    const cancel = useCallback(() => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
    }, []);

    useEffect(() => cancel, [cancel]);

    return { debounced, cancel };
}
