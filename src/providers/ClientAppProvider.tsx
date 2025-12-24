"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useEffectEvent, useState } from "react";

export function ClientAppProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const syncDevice = useEffectEvent(() => {
        setMounted(true);
    });

    useEffect(() => {
        syncDevice();
    }, []);

    if (!mounted) return null;

    return (
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
            {children}
        </ThemeProvider>
    );
}
