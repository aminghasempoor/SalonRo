import { useAuthStore } from "@/stores/useAuthStore";
import useUserStore from "@/stores/userStore";
import { POST_LOGOUT, POST_OTP, POST_USER_PASS_LOGIN, POST_VERIFY_OTP_LOGIN_AND_SIGNUP } from "@/utils/apiRoutes";

import { useRouter, useSearchParams } from "next/navigation";
import useRequest from "./useRequest";

export function useAuth() {
    const logoutClient = useUserStore((s) => s.logout);
    const setIsAuthenticating = useAuthStore((s) => s.setIsAuthenticating);
    const setTempPhoneNumber = useAuthStore((s) => s.setTempPhoneNumber);
    const setAuthPanelState = useAuthStore((s) => s.setAuthPanelState);
    const tempPhoneNumber = useAuthStore((s) => s.tempPhoneNumber);

    const setToken = useUserStore((s) => s.setToken);
    const setUser = useUserStore((s) => s.changeUser);

    const router = useRouter();
    const searchParams = useSearchParams();

    const requestServer = useRequest({ auth: true, notification: true });

    async function requestOtp(phone_number: string, aythType: "login" | "signup") {
        setIsAuthenticating(true);
        try {
            await requestServer(POST_OTP, "post", {
                data: { phone_number },
            });
            setTempPhoneNumber(phone_number);
            setAuthPanelState(aythType === "login" ? "loginOtp" : "signUpOtp");
        } catch (error) {
            console.error("OTP request failed:", error);
        } finally {
            setIsAuthenticating(false);
        }
    }

    async function VerifyOtpLoginAndSignup(otp: string) {
        if (!tempPhoneNumber) return;

        setIsAuthenticating(true);
        try {
            const response = await requestServer(POST_VERIFY_OTP_LOGIN_AND_SIGNUP, "post", {
                data: {
                    phone_number: tempPhoneNumber,
                    otp,
                },
            });
            const { token, user } = response.data;
            setToken(token);
            setUser(user);

            const backUrl = searchParams.get("back_url");
            if (backUrl) {
                router.replace(backUrl);
            } else {
                router.replace("/");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
        } finally {
            setIsAuthenticating(false);
        }
    }

    async function loginWithUserName(userName: string, password: string) {
        setIsAuthenticating(true);
        try {
            const response = await requestServer(POST_USER_PASS_LOGIN, "post", {
                data: {
                    username: userName,
                    password,
                },
            });
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsAuthenticating(false);
        }
    }

    async function logout() {
        setIsAuthenticating(true);
        try {
            await requestServer(POST_LOGOUT, "post");
            logoutClient();
            window.location.reload();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsAuthenticating(false);
        }
    }

    return {
        logout,
        requestOtp,
        signIn: VerifyOtpLoginAndSignup,
        loginWithUserName,
    };
}
