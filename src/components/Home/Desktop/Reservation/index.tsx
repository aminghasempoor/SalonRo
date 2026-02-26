"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowTopLeft } from "@/assets";
import Image from "next/image";

export default function Reservation() {
    const t = useTranslations("Reservation");

    return (
        <section className="my-32 w-full lg:my-40">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-primary-50 relative grid grid-cols-2 items-center gap-16 rounded-tr-[60px] rounded-bl-[60px] p-8 md:rounded-tr-[80px] md:rounded-bl-[80px] md:px-12"
                >
                    {/* ================= TEXT CONTENT ================= */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="order-1 w-full space-y-8 text-white lg:px-10"
                    >
                        <h2 className="text-xl leading-relaxed font-bold md:text-2xl lg:text-3xl">{t("title")}</h2>

                        <p className="text-primary-100 max-w-xl text-sm leading-8 md:text-base">{t("description")}</p>

                        {/* Features */}
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2 text-sm">
                            {[t("stations"), t("online_reserve"), t("score")].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="bg-primary-200 h-3 w-3 rounded-full" />
                                    <span className="text-xs md:text-sm">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Button */}
                        <motion.button
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-primary-100 mt-4 flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium shadow-lg"
                        >
                            {t("start_reserve")}
                            <ArrowTopLeft className="size-5" />
                        </motion.button>
                    </motion.div>

                    {/* ================= IMAGE + STATS ================= */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.9 }}
                        className="relative order-2 flex flex-col items-center"
                    >
                        {/* Image */}
                        <div className="relative h-[320px] w-[260px] overflow-hidden rounded-full border-8 border-white shadow-2xl md:h-[420px] md:w-[320px] lg:h-[580px] lg:w-[450px]">
                            <Image
                                src="/images/reservation/reservation.jpg"
                                alt="reservation"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="bg-card mt-8 flex w-full max-w-md items-center justify-between gap-6 rounded-[40px] px-6 py-6 shadow-2xl md:rounded-[60px] lg:absolute lg:-bottom-16"
                        >
                            {[
                                { number: t("customer_number"), label: t("customer") },
                                { number: t("clinic_number"), label: t("clinic") },
                                { number: t("salon_number"), label: t("salon") },
                            ].map((item, i) => (
                                <div key={i} className="flex-1 text-center">
                                    <p className="text-text-primary text-lg font-bold md:text-xl">{item.number}</p>
                                    <p className="text-text-muted mt-1 text-xs md:text-sm">{item.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
