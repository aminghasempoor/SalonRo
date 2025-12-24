import { useAuth } from "@/hooks/useAuth";
import { useModalStore } from "@/stores/useModalStore";
import { useTranslations } from "next-intl";

const LogoutModal = () => {
    const t = useTranslations("logout");
    const closeModal = useModalStore((s) => s.closeModal);
    const { logout } = useAuth();

    return (
        <div className="bg-desktop-primary text-text flex flex-col gap-4 rounded-xl p-4">
            <div className="space-y-1">
                <h2 className="text-base font-semibold">{t("logout")}</h2>
                <p className="text-text/75 max-w-3xs text-sm">{t("confirmLogout")}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={closeModal}
                    className="border-lines/40 hover:bg-lines/10 flex-1 rounded-full border px-3 py-1 text-sm"
                >
                    {t("cancel")}
                </button>
                <button
                    onClick={() => {
                        logout().then(() => {
                            closeModal();
                        });
                    }}
                    className="bg-error hover:bg-error/75 flex-1 rounded-full px-3 py-1 text-sm text-white"
                >
                    {t("logout")}
                </button>
            </div>
        </div>
    );
};

export default LogoutModal;
