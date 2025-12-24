import { create } from "zustand";

export type AuthPanelStateType =
    | "loginWithPhoneNumber"
    | "loginWithUserName"
    | "signUp"
    | "signUpOtp"
    | "loginOtp"
    | "startAuth";

type AuthStore = {
    authPanelState: AuthPanelStateType;
    setAuthPanelState: (state: AuthPanelStateType) => void;

    tempPhoneNumber: string | null;
    setTempPhoneNumber: (phone: string | null) => void;

    isAuthenticating: boolean;
    setIsAuthenticating: (isAuthenticating: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    authPanelState: "loginWithPhoneNumber", // Default
    tempPhoneNumber: null,
    isAuthenticating: false,

    setAuthPanelState: (state) => set({ authPanelState: state }),
    setTempPhoneNumber: (phone) => set({ tempPhoneNumber: phone }),
    setIsAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
}));
