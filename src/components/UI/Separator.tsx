import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type SeparatorProps = {
    className?: HTMLAttributes<HTMLDivElement> | string | undefined;
    vertical?: boolean;
};

export default function Separator({ className, vertical }: SeparatorProps) {
    if (vertical) {
        return <div className={cn("border-text/15 h-full border-r", className)} />;
    }
    return <div className={cn("border-text/15 w-full border-b", className)} />;
}
