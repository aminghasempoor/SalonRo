import { LatLng } from "@/types/types";
import { MapRef, useMap } from "@vis.gl/react-maplibre";
import maplibregl, { LngLatLike } from "maplibre-gl";

export function useMapMove() {
    const { homePageMap: map } = useMap();

    function mapMove(evt: any) {
        const view = evt.target.getCenter();
        const zoom = evt.target.getZoom();

        const viewState = {
            longitude: view.lng,
            latitude: view.lat,
            zoom,
        };

        localStorage.setItem("mapview", JSON.stringify(viewState));
    }

    function flyToBounds(coordinates: LngLatLike[], mapRef: MapRef | undefined = map, duration = 1000) {
        if (!mapRef) return;

        const bounds = new maplibregl.LngLatBounds();
        coordinates.forEach((c) => bounds.extend(c));

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        mapRef.fitBounds(bounds, {
            padding: {
                top: vh / 5,
                right: vw / 3,
                bottom: vh / 3,
                left: vw / 5,
            },
            duration,
        });
    }

    const flyToLocation = (location: LatLng, zoom: number = 15, mapRef: MapRef | undefined = map) => {
        if (mapRef) {
            mapRef.getMap().flyTo({
                center: [location.lng, location.lat],
                zoom: zoom,
                speed: 1.2,
                curve: 1.42,
                essential: true,
            });
        }
    };

    return {
        mapMove,
        flyToBounds,
        flyToLocation,
    };
}
