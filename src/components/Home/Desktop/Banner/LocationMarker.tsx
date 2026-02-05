import { MarkerIcon } from "@/assets";
import { LatLng } from "@/stores/LocationStore";
import { Marker, MarkerDragEvent } from "@vis.gl/react-maplibre";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Props = {
    location: LatLng;
    onDragEnd: (e: MarkerDragEvent) => void;
};

const dropInVariants = {
    initial: { y: -50, opacity: 0, scale: 0.8 },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 600,
            damping: 30,
        },
    },
};

export default function LocationMarker({ location, onDragEnd }: Props) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (e: MarkerDragEvent) => {
        setIsDragging(false);
        onDragEnd(e);
    };

    return (
        <Marker
            latitude={location.lat}
            longitude={location.lng}
            draggable
            anchor="bottom"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    variants={dropInVariants}
                    initial="initial"
                    animate={{
                        y: isDragging ? -20 : 0,
                        opacity: 1,
                        transition: {
                            type: "spring" as const,
                            stiffness: 500,
                            damping: 25,
                        },
                    }}
                    exit="exit"
                    className="relative flex flex-col items-center"
                >
                    {/* Drop pointer inside the marker (shown only when dragging) */}
                    {isDragging && (
                        <motion.div
                            layoutId="drop-pointer"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5, y: 10 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute -bottom-4.5 z-[-1] size-1.5 rounded-full bg-black shadow-md"
                        />
                    )}
                        <MarkerIcon className="text-neo-aqua size-8" />
                </motion.div>
            </AnimatePresence>
        </Marker>
    );
}
