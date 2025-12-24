import { create } from "zustand";

export type LatLng = { lat: number; lng: number };
export type Mode = "origin" | "destination" | "routing";
export type LocationPoint = {
    id: string;
    locationType: "origin" | "destination";
    coordinate: LatLng | null;
    uniqueId: string;
};

type LocationState = {
    userLocation: LatLng | null;
    origin: LatLng | null;
    destination: LatLng | null;
    locationPoints: LocationPoint[];
    currentStep: Mode;

    setUserLocation: (val: LatLng) => void;
    setLocation: (mode: Mode, val: LatLng | null) => void;
    setLocationPoints: (val: LocationPoint[]) => void;
    setStep: (step: Mode) => void;
    reset: () => void;
};

const buildLocationPoints = (origin: LatLng | null, destination: LatLng | null): LocationPoint[] => {
    const points: LocationPoint[] = [];

    points.push({
        id: "origin",
        locationType: "origin",
        coordinate: origin,
        uniqueId: "0",
    });
    points.push({
        id: "destination",
        locationType: "destination",
        coordinate: destination,
        uniqueId: "1",
    });

    return points;
};

export const useLocationStore = create<LocationState>((set, get) => ({
    userLocation: null,
    origin: null,
    destination: null,
    locationPoints: [
        {
            id: "origin",
            locationType: "origin",
            coordinate: null,
            uniqueId: "0",
        },
        {
            id: "destination",
            locationType: "destination",
            coordinate: null,
            uniqueId: "1",
        },
    ],
    currentStep: "destination",

    setUserLocation: (val) => set({ userLocation: val }),
    setLocation: (mode, val) =>
        set((state) => {
            const updated = { ...state, [mode]: val };
            return {
                ...updated,
                locationPoints: buildLocationPoints(updated.origin, updated.destination),
            };
        }),

    setLocationPoints: (val) => {
        // Create new points in reordered order, but reassign types/ids based on positions
        const newPoints: LocationPoint[] = val.map((point, index, arr) => ({
            uniqueId: point.uniqueId, // Preserve persistent ID
            id: index === 0 ? "origin" : "destination",
            locationType: index === 0 ? "origin" : "destination",
            coordinate: point.coordinate,
        }));

        const origin = newPoints[0]?.coordinate ?? null;
        const destination = newPoints.at(-1)?.coordinate ?? null;

        set({
            locationPoints: newPoints,
            origin,
            destination,
        });
    },
    setStep: (step) => set({ currentStep: step }),
    reset: () =>
        set({
            origin: null,
            destination: null,
            currentStep: "destination",
        }),
}));
