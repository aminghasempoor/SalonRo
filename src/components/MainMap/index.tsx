"use client";
import { Map, MapLayerMouseEvent } from "@vis.gl/react-maplibre";
import { ReactNode, useMemo } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapMove } from "@/utils/useMapMove";
import { useMapLayersStore } from "@/stores/useMapLayersStore";
import { useMapStore } from "@/stores/useMapStore";

// Read From Environment
const BRIGHT_MAP_TILE = process.env.NEXT_PUBLIC_MAP_BRIGHT!;
const DARK_MAP_TILE = process.env.NEXT_PUBLIC_MAP_DARK!;
const STORAGE_KEY = process.env.NEXT_PUBLIC_MAP_VIEW_LOCAL_STORAGE_KEY!;
const MIN_ZOOM = parseFloat(process.env.NEXT_PUBLIC_MAP_MIN_ZOOM!);
const MAX_ZOOM = parseFloat(process.env.NEXT_PUBLIC_MAP_MAX_ZOOM!);

type MainMapProps = {
    id?: string;
    mapLayer?: string;
    children?: ReactNode;
    initialBound?: [number, number];
    initialZoom?: number;
    ref?: React.Ref<any>;
    interactiveLayerIds?: string[];
    handleMapClick?: (e: maplibregl.MapLayerMouseEvent) => void;
    handleContextMenu?: (e: maplibregl.MapMouseEvent & maplibregl.Event) => void;
    handleMapInteraction?: () => void;
    onMouseMove?: (e: MapLayerMouseEvent) => void;
    onMouseLeave?: () => void;
    cursor?: string | null;
};

type MapView = {
    longitude: number;
    latitude: number;
    zoom: number;
};

export default function MainMap({
    id,
    ref,
    onMouseLeave,
    onMouseMove,
    children,
    initialBound = [34.5468992, 52.7300532],
    initialZoom = 5.5,
    handleMapClick,
    interactiveLayerIds,
    mapLayer,
    handleContextMenu,
    handleMapInteraction,
    cursor,
}: MainMapProps) {
    const { mapMove } = useMapMove();
    const activeLayer = useMapLayersStore((s) => s.activeLayer);
    const setIsMapMoving = useMapStore((s) => s.setIsMapMoving);

    const parsed = useMemo(() => {
        if (typeof window === "undefined") return null;
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? (JSON.parse(saved) as MapView) : null;
    }, []);

    const MAP_STYLES = useMemo(
        () => ({
            dark: DARK_MAP_TILE,
            bright: BRIGHT_MAP_TILE,
        }),
        []
    );

    return (
        <div className="relative h-full w-full">
            <Map
                ref={ref}
                id={id ? id : "homePageMap"}
                interactiveLayerIds={interactiveLayerIds}
                initialViewState={{
                    longitude: parsed ? parsed.longitude : initialBound[1],
                    latitude: parsed ? parsed.latitude : initialBound[0],
                    zoom: parsed ? parsed.zoom : initialZoom,
                }}
                onError={(e) => {
                    console.error("Map error:", e);
                }}
                maxBounds={[
                    [35.0, 18.0], // west, south
                    [74.5, 44.0], // east, north
                ]}
                onMoveStart={() => setIsMapMoving(true)}
                RTLTextPlugin={"/mapbox-gl-rtl-text.js"}
                onDragStart={handleMapInteraction}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onZoomStart={handleMapInteraction}
                onMoveEnd={(e) => {
                    setIsMapMoving(false);
                    mapMove(e);
                }}
                onClick={handleMapClick}
                onContextMenu={handleContextMenu}
                cursor={cursor === "default" ? undefined : "auto"}
                mapStyle={mapLayer ? mapLayer : MAP_STYLES[activeLayer]}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                attributionControl={false}
                style={{ width: "100%", height: "100%" }}
            >
                {children}
            </Map>
        </div>
    );
}
