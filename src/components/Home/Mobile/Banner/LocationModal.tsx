"use client";
import MainMap from "@/components/MainMap";
import { motion, AnimatePresence } from "framer-motion";
import LocationMarker from "./LocationMarker";
import {useModalStore} from "@/stores/useModalStore";
import {CloseIcon} from "@/assets";
import MarkerPosition from "@/components/Home/MarkerPosition";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.9 },
};

const LocationModal = () => {
    const closeModal = useModalStore((s) => s.closeModal);
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeModal}
            >
                <motion.div
                    className="relative h-[50vh] w-[90vw] rounded-lg shadow-lg sm:h-[40vh] sm:w-[40vw] lg:h-[60vh] lg:w-[50vw]"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={closeModal}
                        className="absolute top-2 left-2 z-50 cursor-pointer rounded-full bg-black/60 p-2 transition hover:bg-black/60"
                    >
                        <CloseIcon className="h-5 w-5 text-white" />
                    </button>

                    <div className="relative h-full w-full">
                        <MainMap>
                            <MarkerPosition onChange={(loc) => console.log(loc)} />
                        </MainMap>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
export default LocationModal;
