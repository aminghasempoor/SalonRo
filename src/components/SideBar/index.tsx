"use client";
import { AvatarIcon, CloseIcon, LogoutIcon } from "@/assets";
import { SideBarComponent } from "./SideBarContent";
import ThemeToggle from "@/components/ThemeToggle";
import { mobileMenuItems } from "@/data/sidebarMenu";
import { useSidebarStore } from "@/stores/SidebarStore";
import useUserStore from "@/stores/userStore";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useModalStore } from "@/stores/useModalStore";
import LogoutModal from "@/components/Modals/LogoutModal";

export const Sidebar = () => {
    const t = useTranslations("Sidebar");
    const ta = useTranslations("Auth");
    const isOpen = useSidebarStore((s) => s.isOpen);
    const isAuth = useUserStore((s) => s.isAuth);
    const close = useSidebarStore((state) => state.close);
    const openModal = useModalStore((s) => s.openModal);
    const pathName = usePathname();

    function handleClick() {
        close();
    }

    useEffect(() => {
        return () => close();
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-desktop-primary/5 fixed inset-0 z-50 backdrop-blur-xl"
                    onClick={close}
                >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-desktop-primary text-text flex h-full w-full max-w-md flex-col rounded-2xl p-4 shadow-lg"
                        >
                            {/* Header */}
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -45 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 45 }}
                                transition={{ duration: 0.1 }}
                                className={"mb-4 flex justify-between px-2"}
                            >
                                <button onClick={close}>
                                    <CloseIcon className="text-text size-6" />
                                </button>
                                <ThemeToggle />
                            </motion.div>

                            {/* Nav Items */}
                            <nav className="overflow-y-auto">
                                {isAuth ? (
                                    <div className="flex w-full flex-col justify-center gap-2 py-6">
                                        <Link
                                            onClick={handleClick}
                                            href="/panel/profile"
                                            className="bg-neo-aqua flex flex-row items-center justify-center gap-2 rounded-lg px-2 py-1 transition-all duration-200 hover:scale-101 active:scale-99"
                                        >
                                            <AvatarIcon className="size-4 text-white" />
                                            <div className="h-4 w-[1.5px] bg-white" />
                                            <p className="text-white">{ta("profile")}</p>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                openModal(<LogoutModal />);
                                            }}
                                            className="bg-error flex flex-row items-center justify-center gap-2 rounded-lg px-2 py-1 transition-all duration-200 hover:scale-101 active:scale-99"
                                        >
                                            <LogoutIcon className="size-5 rotate-180 text-white" />
                                            <p className="text-white">{ta("logout")}</p>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 py-6">
                                        <button className="bg-neo-aqua rounded-lg p-2">
                                            <AvatarIcon className="size-4 text-white" />
                                        </button>
                                        <div className="bg-text hover:text-pwa-primary rounded-lg px-3 py-1 transition-all duration-300 hover:scale-101 active:scale-99">
                                            <Link
                                                href={`/auth?back_url=${pathName}`}
                                                className="text-desktop-primary line-clamp-1 flex cursor-pointer flex-row items-center gap-2"
                                            >
                                                <p>{t("login")}</p>

                                                <div className="bg-desktop-primary h-4 w-[1.5px]" />

                                                <p>{t("register")}</p>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                                <SideBarComponent items={mobileMenuItems} />
                            </nav>

                            {/* Footer */}

                            <div className="text-text mt-auto pt-4 text-center text-[8px]">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-desktop-primary/10 mx-auto mb-3 flex w-fit items-center justify-center gap-4 rounded-2xl p-3 shadow-md"
                                ></motion.div>
                                {t("policy")}
                            </div>
                        </motion.aside>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
