"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ClientAppProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    // wait for hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
            <AnimatePresence mode="wait">
                {!mounted ? (
                    <motion.div
                        key="splash"
                        className="bg-map-bg flex h-dvh w-dvw items-center justify-center"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                ) : (
                    <motion.div
                        key="app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-map-bg"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </ThemeProvider>
    );
}
