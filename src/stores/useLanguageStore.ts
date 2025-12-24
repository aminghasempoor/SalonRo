import { create } from "zustand";
import Cookies from "js-cookie";
import { Language } from "@/types/language.types";

interface LanguageState {
    localization: Language;
    language_lists: Language[];
    changeLanguage: (languageKey: string) => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
    language_lists: [
        {
            id: 0,
            key: "fa",
            language: "فارسی",
            direction: "rtl",
        },
    ],

    localization: {
        id: 0,
        key: "fa",
        language: "فارسی",
        direction: "rtl",
    },

    changeLanguage: (languageKey) => {
        const currentState = get();
        const selectedLanguage = currentState.language_lists.find((language) => language.key === languageKey);

        if (selectedLanguage) {
            Cookies.set("language", languageKey, { expires: 365, secure: true });
            set({ localization: selectedLanguage });
        }
    },
}));
