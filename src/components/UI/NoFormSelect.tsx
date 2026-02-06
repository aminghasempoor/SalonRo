"use client";
import React from "react";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/UI/Select";
import {motion} from "framer-motion";

interface Option {
    value: string | number;
    label: string;
}

interface ReusableSelectProps {
    value: string | number;
    onChange: (value: string | number) => void;
    options: Option[];
    loading?: boolean;
    error?: string | null;
    placeholder?: string;
    onOpen?: () => void;
}

const NoFormSelect: React.FC<ReusableSelectProps> = ({
                                                         value,
                                                         onChange,
                                                         options,
                                                         loading = false,
                                                         error = null,
                                                         placeholder = "انتخاب کنید",
                                                         onOpen,
                                                     }) => {
    return (
        <Select
            value={value?.toString() || ""}
            onValueChange={(val) => onChange(val)}
            onOpenChange={(open) => {
                if (open && onOpen) onOpen();
            }}
        >
            <SelectTrigger
                className={`"text-black placeholder-black w-full overflow-x-scroll rounded-lg `}
            >
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent
                className="bg-card overflow-y-auto rounded-xl border-0 shadow-lg">
                {loading && (
                    <SelectItem value="loading" disabled>
                        در حال بارگذاری...
                    </SelectItem>
                )}
                {error && (
                    <SelectItem value="error" disabled>
                        {error}
                    </SelectItem>
                )}
                {!loading && !error && (
                    <>
                        <motion.div
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            className="rounded px-2 py-1"
                        >
                            <SelectItem
                                value="all"
                                className="hover:from-primary-400 hover:to-primary-500 cursor-pointer hover:bg-linear-to-l"
                            >
                                تمامی موارد
                            </SelectItem>
                        </motion.div>
                        {options.map((opt) => (
                            <motion.div
                                key={opt.value}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                className="rounded px-2 py-1"
                            >
                                <SelectItem
                                    value={opt.value.toString()}
                                    className="hover:from-primary-400 hover:to-primary-500 cursor-pointer hover:bg-linear-to-l"
                                >
                                    {opt.label}
                                </SelectItem>
                            </motion.div>
                        ))}
                    </>
                )}
            </SelectContent>
        </Select>
    );
};

export default NoFormSelect;
