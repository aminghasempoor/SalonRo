"use client";

import { useModalStore } from "@/stores/useModalStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = () => {
    const isOpen = useModalStore((s) => s.isOpen);
    const content = useModalStore((s) => s.content);
    const closeModal = useModalStore((s) => s.closeModal);

    const modalRef = useRef<HTMLDivElement>(null);

    // Handle escape key to close
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, closeModal]);

    const handleClickOutside = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                role="dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                onClick={handleClickOutside}
            >
                <motion.div
                    ref={modalRef}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-lg shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    {content}
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default Modal;
