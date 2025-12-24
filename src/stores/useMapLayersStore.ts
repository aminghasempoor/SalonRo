import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LayerType = "dark" | "bright";

type MapLayersStore = {
    activeLayer: LayerType;
    setActiveLayer: (layer: LayerType) => void;
};

export const useMapLayersStore = create<MapLayersStore>()(
    persist(
        (set) => ({
            activeLayer: "dark",
            setActiveLayer: (layer) => set({ activeLayer: layer }),
        }),
        {
            name: "map-theme", // نام کلید در localStorage
        }
    )
);
