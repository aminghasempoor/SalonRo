import neshanLogo from "&/icons/neshan-logo.png";
import logo from "&/logo/144px.png";
import { CloseIcon, GoogleMapsIcon } from "@/assets";
import { useLocationStore } from "@/stores/LocationStore";
import { useModalStore } from "@/stores/useModalStore";
import Image from "next/image";
import { JSX } from "react";

type MapLauncherItem = {
    id: string;
    icon: JSX.Element;
    label: string;
    onClick: () => void;
};

export default function MapLauncherModal() {
    const destination = useLocationStore((s) => s.destination);
    const origin = useLocationStore((s) => s.origin);
    const closeModal = useModalStore((s) => s.closeModal);
    const openModal = useModalStore((s) => s.openModal);

    function openGoogleMaps() {
        if (!destination) return;
        const originParam = origin ? `&origin=${origin.lat},${origin.lng}` : "";
        const url = `https://www.google.com/maps/dir/?api=1${originParam}&destination=${destination.lat},${destination.lng}`;
        window.location.href = url;
    }

    function open141Map() {
        openModal(
            <div>
                <div className="bg-desktop-primary text-text flex flex-col gap-4 rounded-xl p-4">
                    <div className="space-y-1">
                        <p className="text-text/75 max-w-3xs text-sm">
                            به زودی می‌توانید از اپلیکیشن 141 برای مسیریابی استفاده کنید.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={closeModal}
                            className="border-lines/40 hover:bg-lines/10 flex-1 rounded-full border px-3 py-1 text-sm"
                        >
                            متوجه شدم
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function openNeshanMap() {
        if (!destination) return;

        const url = `https://nshn.ir/?lat=${destination.lat}&lng=${destination.lng}`;

        window.location.href = url;
    }

    const launchers: MapLauncherItem[] = [
        {
            id: "google-maps",
            icon: <GoogleMapsIcon className="size-10" />,
            label: "Google Maps",
            onClick: openGoogleMaps,
        },
        {
            id: "141",
            icon: <Image src={logo} alt="141 Map" className="size-10" />,
            label: "141",
            onClick: open141Map,
        },
        {
            id: "neshan",
            icon: <Image src={neshanLogo} alt="neshan Map" className="size-10" />,
            label: "نشان",
            onClick: openNeshanMap,
        },
    ];

    return (
        <div className="bg-pwa-primary text-text w-full max-w-100 min-w-81 rounded-2xl">
            <div className="border-lines/20 flex items-center justify-between border-b px-4 py-3">
                <button onClick={closeModal} aria-label="Close">
                    <CloseIcon className="text-text/80 size-5" />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 py-6">
                {launchers.map((item) => (
                    <button
                        key={item.id}
                        onClick={item.onClick}
                        className="group border-lines/20 bg-buttons/50 flex flex-col items-center justify-center gap-2 rounded-xl border p-3 shadow-sm transition hover:shadow-md active:scale-[0.97]"
                    >
                        <div className="flex items-center justify-center">{item.icon}</div>

                        <span className="text-text/80 text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
