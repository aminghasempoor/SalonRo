"use client";

import React, { useEffect, useState, useEffectEvent } from "react";
import { useDeviceStore } from "@/stores/useDeviceStore";
import useDevice from "@/hooks/useDevice";

export default function DeviceProvider({ children }: { children: React.ReactNode }) {
    const isMobileDevice = useDevice();
    const setIsMobile = useDeviceStore((state) => state.setIsMobile);

    const [ready, setReady] = useState(false);

    const syncDevice = useEffectEvent((isMobile: boolean) => {
        setIsMobile(isMobile);
        setReady(true);
    });

    useEffect(() => {
        syncDevice(isMobileDevice);
    }, [isMobileDevice]);

    if (!ready) return null;

    return <>{children}</>;
}
