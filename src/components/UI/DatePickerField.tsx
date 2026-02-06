"use client";

import { CalendarHijri } from "@/components/UI/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/UI/Popover";
import { motion } from "framer-motion";
import { useState } from "react";
import { Path, UseFormSetValue } from "react-hook-form";

type Props<T extends Record<string, any>> = {
    name: Path<T>;
    label?: string | null;
    setValue: UseFormSetValue<T>;
    defaultValue?: string | null;
};

export default function DatePickerField<T extends Record<string, any>>({
    name,
    label,
    setValue,
    defaultValue,
}: Props<T>) {
    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
    const [open, setOpen] = useState(false);

    // format date into Persian numerals
    const formatJalali = (date?: Date) => {
        if (!date) return "";
        const formatter = new Intl.DateTimeFormat("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        return formatter.format(date);
    };

    return (
        <div className="relative flex flex-col justify-between gap-1">
            <motion.label
                className="text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {label}
            </motion.label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className={"rounded-lg px-3 text-start text-black focus:outline-none"}
                    >
                        {date ? formatJalali(date) : "تاریخ"}
                    </button>
                </PopoverTrigger>

                <PopoverContent align="center" className="z-50 w-auto p-0" sideOffset={8}>
                    <div>
                        <CalendarHijri
                            selected={date}
                            onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                if (selectedDate) {
                                    setValue(name, selectedDate.toISOString() as any, { shouldValidate: true });
                                    setOpen(false);
                                }
                            }}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
