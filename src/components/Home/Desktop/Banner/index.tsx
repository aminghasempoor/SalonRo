"use client";

import { ArrowTopLeft, AvatarIcon, BannerImage, BannerLine, BannerStar, LogoIcon, MyOrderIcon } from "@/assets";
import { useTranslations } from "next-intl";
import userStore from "@/stores/userStore";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import GroupAvatar from "@/components/UI/GroupAvatar";
import SearchBar from "@/components/Home/Desktop/Banner/SearchBar";

export default function BannerComponent() {
    const t = useTranslations("HomePage");
    const isAuth = userStore((s) => s.isAuth);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="bg-home-page-banner relative mx-16 mt-16 rounded-tr-[200px] rounded-bl-[200px] px-2 pt-2"
        >
            {/* ================= Header ================= */}
            <header className="flex w-full items-center justify-center pt-8">
                <div className="flex w-full items-center justify-center space-x-5">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <LogoIcon className="size-12" />
                    </motion.div>

                    <ThemeToggle />

                    {["home", "search", "salons", "about_us", "contact_us"].map((item, index) => (
                        <motion.p
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="text-text-primary hover:text-primary-200 cursor-pointer transition"
                        >
                            {t(item)}
                        </motion.p>
                    ))}
                </div>

                <div className="flex w-full items-center justify-center">
                    {isAuth ? (
                        <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                            <AvatarIcon className="h-6 w-6" />
                        </motion.div>
                    ) : (
                        <span className="flex w-full items-center justify-center gap-x-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-bg flex items-center justify-center gap-x-2 rounded-lg p-3"
                            >
                                <MyOrderIcon className="h-6 w-6" />
                                <p>{t("my_order")}</p>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary-200 flex items-center justify-center gap-x-2 rounded-lg p-3"
                            >
                                <AvatarIcon className="h-6 w-6" />
                                <p>{t("auth")}</p>
                            </motion.button>
                        </span>
                    )}
                </div>
            </header>

            {/* ================= Main ================= */}
            <motion.main initial="hidden" animate="visible" className="flex w-full items-center justify-center py-12">
                {/* ===== Left Content ===== */}
                <div className="flex w-full flex-col items-center justify-center space-y-7">
                    {/* Title */}
                    <motion.div className="text-4xl font-bold">
                        <motion.span
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="block"
                        >
                            {t("main_title_line1")}
                        </motion.span>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            className="flex items-center justify-between"
                        >
                            {t("main_title_line2")}

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                className="origin-right"
                            >
                                <BannerLine className="h-1 w-28" />
                            </motion.div>

                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            >
                                <BannerStar className="h-6 w-6" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 },
                        }}
                        className="text-center text-xs"
                    >
                        {t("des")}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-primary-200 flex items-center justify-center gap-x-3 rounded-lg p-3"
                    >
                        <p className="text-white">{t("see_salons")}</p>

                        <motion.div whileHover={{ x: -4, y: -4 }}>
                            <ArrowTopLeft className="size-5 text-white" />
                        </motion.div>
                    </motion.button>
                    <GroupAvatar />
                </div>

                {/* ===== Right Image ===== */}
                <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="flex w-full items-center justify-center"
                >
                    <Image
                        src={BannerImage}
                        alt="main_image"
                        className="object-cover"
                        width={400}
                        height={200}
                        priority
                    />
                </motion.div>
            </motion.main>
            <div className="absolute -bottom-10 left-24">
                <SearchBar />
            </div>
        </motion.div>
    );
}
