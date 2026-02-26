"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowTopLeft } from "@/assets";
import Image from "next/image";

export default function Reservation() {
    const t = useTranslations("Reservation");

    return (
        <section className="w-full my-32 lg:my-40">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="
            relative
            bg-primary-50
            rounded-tr-[60px] md:rounded-tr-[80px]
            rounded-bl-[60px] md:rounded-bl-[80px]
            p-8 md:px-12
            grid
            gap-16
            grid-cols-2
            items-center
          "
                >

                    {/* ================= TEXT CONTENT ================= */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="text-white space-y-8 order-1 w-full lg:px-10"
                    >
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed">
                            {t("title")}
                        </h2>

                        <p className="text-sm md:text-base text-primary-100 leading-8 max-w-xl">
                            {t("description")}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2 text-sm">
                            {[t("stations"), t("online_reserve"), t("score")].map(
                                (item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-primary-200" />
                                        <span className="text-xs md:text-sm">{item}</span>
                                    </div>
                                )
                            )}
                        </div>

                        {/* Button */}
                        <motion.button
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.95 }}
                            className="
                mt-4
                bg-white
                flex
                items-center
                gap-2
                text-primary-100
                px-6
                py-3
                rounded-xl
                font-medium
                shadow-lg
                w-fit
              "
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
                        className="relative flex flex-col items-center order-2"
                    >

                        {/* Image */}
                        <div
                            className="
                relative
                rounded-full
                overflow-hidden
                border-8
                border-white
                shadow-2xl
                w-[260px] h-[320px]
                md:w-[320px] md:h-[420px]
                lg:w-[450px] lg:h-[580px]
              "
                        >
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
                            className="
                mt-8
                lg:absolute
                lg:-bottom-16
                bg-card
                w-full
                max-w-md
                rounded-[40px] md:rounded-[60px]
                shadow-2xl
                px-6
                py-6
                flex
                items-center
                justify-between
                gap-6
              "
                        >
                            {[
                                { number: t("customer_number"), label: t("customer") },
                                { number: t("clinic_number"), label: t("clinic") },
                                { number: t("salon_number"), label: t("salon") },
                            ].map((item, i) => (
                                <div key={i} className="text-center flex-1">
                                    <p className="text-lg md:text-xl font-bold text-text-primary">
                                        {item.number}
                                    </p>
                                    <p className="text-xs md:text-sm text-text-muted mt-1">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </motion.div>

                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}