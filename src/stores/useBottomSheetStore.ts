import { ReactNode } from "react";
import { create } from "zustand";

interface BottomSheetOptions {
    interactiveBackground?: boolean;
}

interface BottomSheetState {
    isOpen: boolean;
    content: ReactNode | null;
    options: BottomSheetOptions;
    openBottomSheet: (content: ReactNode, options?: BottomSheetOptions) => void;
    closeBottomSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
    isOpen: false,
    content: null,
    options: {},
    openBottomSheet: (content, options) => set({ isOpen: true, content, options }),
    closeBottomSheet: () => set({ isOpen: false, content: null, options: {} }),
}));
