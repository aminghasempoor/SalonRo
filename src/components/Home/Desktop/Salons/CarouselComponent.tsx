"use client";

import { Card, CardContent } from "@/components/UI/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/UI/Carousel";
import { salons } from "@/data/mockCategories";
import Image from "next/image";
import { easeOut, motion } from "framer-motion";

type Props = {
    title: string;
    description: string;
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: easeOut,
        },
    },
};

export function CarouselComponent({ title, description }: Props) {
    return (
        <div className="relative w-full">
            <Carousel dir="rtl" className="w-full" opts={{ direction: "rtl" }}>
                {/* 🔥 Animated Header */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="my-5 flex h-full w-full items-center justify-between"
                >
                    <span className="flex items-center justify-center gap-x-2">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 64 }}
                            transition={{ duration: 0.5 }}
                            className="bg-primary-100 w-4 rounded-2xl rounded-tr-none"
                        />
                        <div>
                            <p className="text-lg font-semibold">{title}</p>
                            <p className="text-muted-foreground">{description}</p>
                        </div>
                    </span>
                </motion.div>

                {/* 🔥 Animated Carousel Items */}
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                    <CarouselContent>
                        {salons.map((category) => (
                            <CarouselItem
                                key={category.id}
                                className="after:bg-border relative after:absolute after:top-1/2 after:left-2 after:h-[60%] after:w-px after:-translate-y-1/2 after:content-[''] last:after:hidden md:basis-1/3 lg:basis-1/5"
                            >
                                <motion.div variants={itemVariants} className="p-1">
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                            y: -5,
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Card dir="rtl" className="cursor-pointer transition-shadow hover:shadow-xl">
                                            <CardContent className="flex h-30 flex-col items-center justify-center gap-3">
                                                <motion.div
                                                    whileHover={{ rotate: 5 }}
                                                    transition={{ type: "spring", stiffness: 200 }}
                                                    className="h-full"
                                                >
                                                    <Image
                                                        src={category.image}
                                                        alt={category.salon_name}
                                                        width={200}
                                                        height={500}
                                                        className="rounded-xl"
                                                    />
                                                </motion.div>

                                                <p className="text-text-muted font-semibold">{category.salon_name}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </motion.div>

                {/* 🔥 Animated Controls */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-10 left-16 flex gap-2"
                >
                    <motion.div whileTap={{ scale: 0.85 }}>
                        <CarouselPrevious />
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.85 }}>
                        <CarouselNext />
                    </motion.div>
                </motion.div>
            </Carousel>
        </div>
    );
}
