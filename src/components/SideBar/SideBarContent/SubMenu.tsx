import { ChevronIcon } from "@/assets";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface SubMenuProps {
    label: string;
    children: ReactNode;
}

export default function SubMenu({ label, children }: SubMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm font-bold"
            >
                <span className="text-text line-clamp-1">{label}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-lines/25 rounded-lg p-1"
                >
                    <ChevronIcon className="text-text size-4 rotate-270 opacity-50" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pr-3 pl-6"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
