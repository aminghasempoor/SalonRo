import { create } from "zustand";
import { GET_PROVINCES } from "@/utils/apiRoutes";

interface Province {
    id: number;
    name_fa: string;
}

interface ProvinceStore {
    province: string;
    provinces: Province[];
    setProvince: (value: string) => void;
    setProvinces: (data: Province[]) => void;
    fetchProvinces: () => Promise<void>;
    loadProvinces: boolean;
    errorProvinces: null | string;
}

const useProvinceStore = create<ProvinceStore>((set, get) => ({
    province: "",
    provinces: [],
    loadProvinces: false,
    errorProvinces: null,
    setProvince: (province) => set({ province }),
    setProvinces: (provinces) => set({ provinces }),
    fetchProvinces: async () => {
        if (get().provinces.length) return;
        set({ loadProvinces: true });
        try {
            const res = await fetch(GET_PROVINCES);
            const data = await res.json();
            set({ provinces: data.data.provinces });
        } catch (e) {
            console.error("خطا در دریافت استان‌ها", e);
            set({ errorProvinces: "خطا در دریافت استان ها" });
        } finally {
            set({ loadProvinces: false });
        }
    },
}));

export default useProvinceStore;
