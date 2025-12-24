import { useModalStore } from "@/stores/useModalStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function RedirectToSignInModal({ confirmLabel = "ورود" }) {
    const t = useTranslations("Bookmarks");
    const closeModal = useModalStore((s) => s.closeModal);
    const router = useRouter();

    return (
        <div className="bg-desktop-primary text-text flex flex-col gap-4 rounded-xl p-4">
            <div className="space-y-1">
                <h2 className="text-base font-semibold">{t("signInModalTitle")}</h2>
                <p className="text-text/75 max-w-3xs text-sm">{t("signInModalDescription")}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={closeModal}
                    className="border-lines/40 hover:bg-lines/10 flex-1 rounded-full border px-3 py-1 text-sm"
                >
                    {t("abort")}
                </button>
                <button
                    onClick={() => {
                        closeModal();
                        router.push("/auth");
                    }}
                    className="bg-neo-aqua hover:bg-neo-aqua/75 flex-1 rounded-full px-3 py-1 text-sm text-white"
                >
                    {t("signin")}
                </button>
            </div>
        </div>
    );
}
