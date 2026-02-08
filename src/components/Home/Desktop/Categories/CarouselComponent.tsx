"use client"

import { Card, CardContent } from "@/components/UI/card"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/UI/Carousel";


export function CarouselComponent() {

    return (
        <Carousel
            dir={"rtl"}
            className="w-full"
            opts={{
                direction: "rtl",
            }}
        >
            <CarouselContent>
                {Array.from({ length: 150 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                        <div className="p-1">
                            <Card dir={"rtl"}>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    hello
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
