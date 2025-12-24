"use client";

import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const BottomSheet = () => {
    const { isOpen, content, options, closeBottomSheet } = useBottomSheetStore();

    const interactive = options?.interactiveBackground ?? false;

    const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    // Escape key (only active for modal mode)
    useEffect(() => {
        if (!isOpen || interactive) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeBottomSheet();
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, interactive, closeBottomSheet]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Non-interactive background mode (modal) */}
                    {!interactive && (
                        <motion.div
                            key="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-50 bg-black/50"
                            onClick={closeBottomSheet}
                        />
                    )}

                    {/* The sheet (works in both modes) */}
                    <motion.div
                        key="sheet"
                        initial={{ y: viewportHeight }}
                        animate={{ y: 0 }}
                        exit={{ y: viewportHeight }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={{ top: 0, bottom: 0.25 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                closeBottomSheet();
                            }
                        }}
                        className="bg-pwa-primary fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-w-md rounded-t-xl shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-center py-2">
                            <div className="h-1 w-12 rounded-full bg-gray-400" />
                        </div>

                        <div className="overflow-y-auto p-4" style={{ maxHeight: "90vh" }} dir="rtl">
                            {content}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default BottomSheet;
