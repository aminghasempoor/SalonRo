import { useLocationStore } from "@/stores/LocationStore";
import { LatLng } from "@/types/types";
import toast from "react-hot-toast";

export function getUserLocation(): Promise<LatLng> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            toast.error("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند");
            reject(new Error("Geolocation is not supported by your browser."));
            return;
        }

        let didRespond = false;

        const timeout = setTimeout(() => {
            if (!didRespond) {
                didRespond = true;
                toast.error("دریافت موقعیت با مشکل مواجه شد");
                reject(new Error("The request to get your location timed out."));
                return;
            }
        }, 500); // TODO: refactor to handle more gracefully

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (didRespond) return;
                didRespond = true;
                clearTimeout(timeout);
                const { latitude, longitude } = position.coords;
                useLocationStore.setState({ userLocation: { lat: latitude, lng: longitude } });
                resolve({ lat: latitude, lng: longitude });
            },
            (error) => {
                if (didRespond) return;
                didRespond = true;
                clearTimeout(timeout);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error("Location access is denied. Please enable it in your browser settings."));
                        toast.error("اجازه دسترسی به موقعیت رد شده است");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error("Location information is unavailable."));
                        toast.error("موقعیت در دسترس نیست");
                        break;
                    case error.TIMEOUT:
                        reject(new Error("The request to get your location timed out."));
                        toast.error("مدت زمان برای دریافت موقعیت منقضی شد");
                        break;
                    default:
                        toast.error("خطای ناشناخته");
                        reject(new Error("An unknown error occurred while getting location."));
                        break;
                }
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
            }
        );
    });
}
