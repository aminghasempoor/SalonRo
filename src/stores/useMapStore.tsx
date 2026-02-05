import { create } from "zustand";

type MapStoreState = {
    isMapMoving: boolean;
    setIsMapMoving: (isMoving: boolean) => void;
};

export const useMapStore = create<MapStoreState>((set) => ({
    isMapMoving: false,
    setIsMapMoving: (isMapMoving) => set({ isMapMoving }),
}));
