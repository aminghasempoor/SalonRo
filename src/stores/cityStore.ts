import { create } from "zustand";
import { GET_CITIES } from "@/utils/apiRoutes";

interface City {
    id: number;
    name: string;
}

interface CityStore {
    city: string;
    selectedProvinceID: string | null;
    cities: City[];
    setCity: (value: string) => void;
    setCities: (data: City[]) => void;
    setSelectedProvinceID: (value: string) => void;
    fetchCities: (provinceId: string) => Promise<void>;
    loadCities: boolean;
    errorCities: null | string;
}

const useCityStore = create<CityStore>((set, get) => ({
    city: "",
    selectedProvinceID: null,
    cities: [],
    loadCities: false,
    errorCities: null,
    setCity: (city) => set({ city }),
    setSelectedProvinceID: (selectedProvinceID) => set({ selectedProvinceID }),
    setCities: (cities) => set({ cities }),
    fetchCities: async (provinceId: string) => {
        if (!provinceId) return;
        set({ loadCities: true, errorCities: null });
        try {
            const res = await fetch(`${GET_CITIES}/${provinceId}`);
            const data = await res.json();
            set({ cities: data.data.cities });
        } catch (e) {
            console.error("خطا در دریافت شهرها", e);
            set({ errorCities: "خطا در دریافت شهرها" });
        } finally {
            set({ loadCities: false });
        }
    },
}));

export default useCityStore;
