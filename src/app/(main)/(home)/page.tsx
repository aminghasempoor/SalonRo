"use client";
import { useDeviceStore } from "@/stores/useDeviceStore";
import dynamic from "next/dynamic";

const HomeMobile = dynamic(() => import("@/components/Home/Mobile"), { ssr: false });
const HomeDesktop = dynamic(() => import("@/components/Home/Desktop"), { ssr: false });

export default function HomePage() {
    const isMobile = useDeviceStore((state) => state.isMobile);
    return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
