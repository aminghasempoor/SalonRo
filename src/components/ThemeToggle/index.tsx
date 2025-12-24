import { DarkModeIcon, LightModeIcon } from "@/assets";
import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const setActiveLayer = useMapLayersStore((s) => s.setActiveLayer);

    function handleThemeToggle() {
        if (theme === "dark") {
            setActiveLayer("bright");
            setTheme("light");
        } else {
            setActiveLayer("dark");
            setTheme("dark");
        }
    }

    return (
        <AnimatePresence>
            <button onClick={handleThemeToggle} className="flex cursor-pointer items-center py-2">
                <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {theme === "dark" ? (
                        <DarkModeIcon className="text-text size-6" />
                    ) : (
                        <LightModeIcon className="text-text size-6" />
                    )}
                </motion.div>
            </button>
        </AnimatePresence>
    );
}
