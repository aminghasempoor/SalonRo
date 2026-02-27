import {useTranslations} from "next-intl";
import {motion} from "framer-motion";
import {DownloadIcon, GooglePlayDownloadIcon} from "@/assets";
import Image from "next/image";

export default function App() {
    const t = useTranslations("App")
    return (
        <div className="relative container mx-auto bg-primary-500 rounded-tl-[100px] rounded-br-[100px] w-full mt-32 mb-16 p-8">
            <section className="grid grid-cols-2 gap-5">
                <div className="flex items-center justify-center gap-2 w-full">
                    <section className="flex flex-col items-center justify-center gap-2 w-full">
                        <p className="text-text-primary text-lg lg:text-2xl font-semibold">{t("title")}</p>
                        <p className="text-text-muted text-xs lg:text-sm">{t("description")}</p>
                        <span className="flex w-full items-center justify-center gap-x-2 mt-4">
                            <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="bg-primary-200 flex items-center justify-center gap-x-2 rounded-lg p-3"
                            >
                                <DownloadIcon className="size-4 lg:size-6 text-white"/>
                                <p className="text-white text-xs lg:text-base">{t("download_app")}</p>
                            </motion.button>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="bg-bg flex items-center justify-center gap-x-2 rounded-lg p-3"
                            >
                                <GooglePlayDownloadIcon className="size-4 lg:size-6"/>
                                <p className="text-text-primary text-xs lg:text-base">{t("download_google_play")}</p>
                            </motion.button>
                        </span>
                    </section>
                    <div className="md:hidden lg:block">
                        <Image src={"/images/Qrcode-sample.jpg"} alt={"Qrcode sample..."} width={200} height={200}
                               className="rounded-3xl"/>
                    </div>
                </div>
                <div className="w-fit absolute bottom-0 left-10 lg:left-20">
                    <motion.div
                        className="w-50 sm:w-52 md:w-80 lg:w-90"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                    <Image src={"/images/app-section/ellipse.jpg"} alt={"app ellipse..."} width={500} height={200} className="object-cover rounded-t-full"/>
                    </motion.div>
                    <motion.div
                        className="absolute left-20 -top-40 flex"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="w-50 sm:w-52 md:w-60 lg:w-80"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Image src={"/images/app-section/mobile1.png"} alt="گوشی سفید" width={500} height={500} className="w-full h-auto" />
                        </motion.div>
                        <motion.div
                            className="w-50 sm:w-52 md:w-90 lg:w-110 z-10 absolute -left-30 top-5"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Image src={"/images/app-section/mobile2.png"} alt="گوشی مشکی" width={500} height={500} className="w-full h-auto" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}