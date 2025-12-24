"use client";
import { MapProvider } from "@vis.gl/react-maplibre";

export default function MapProviderComponent({ children }: { children: React.ReactNode }) {
    return <MapProvider>{children}</MapProvider>;
}
