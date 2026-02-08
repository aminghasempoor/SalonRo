"use client"
import { MarkerIcon, MarkerPreviewIcon } from "@/assets";
import { useMap } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const createMarkerElement = (preview: boolean) => {
    const el = document.createElement("div");
    const Icon = preview ? MarkerPreviewIcon : MarkerIcon;

    el.innerHTML = renderToStaticMarkup(<Icon className="text-primary-100 size-10" />);

    return el;
};

type Props = {
    preview?: boolean;
    onChange?: (location: { lat: number; lng: number }) => void;
};

const MarkerPosition = ({ preview = false, onChange }: Props) => {
    const { current : homePageMap} = useMap();
    const markerRef = useRef<maplibregl.Marker | null>(null);

    useEffect(() => {
        if (!homePageMap) return;
        const map = homePageMap.getMap();
        if (!map) return;

        // create marker once
        if (!markerRef.current) {
            const el = createMarkerElement(preview);
            markerRef.current = new maplibregl.Marker({
                element: el,
                anchor: "bottom",
                subpixelPositioning: true,
            })
                .setLngLat(map.getCenter())
                .addTo(map);
        }

        const onMove = () => {
            const center = map.getCenter();
            markerRef.current?.setLngLat(center);

            onChange?.({
                lat: center.lat,
                lng: center.lng,
            });
        };

        map.on("move", onMove);

        return () => {
            map.off("move", onMove);
            markerRef.current?.remove();
            markerRef.current = null;
        };
    }, [homePageMap, preview]);

    return null;
};

export default MarkerPosition;
