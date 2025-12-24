"use client";

import { AnimatePresence, motion } from "framer-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
