import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/UI/Tooltip";
import React from "react";

type WithTooltipProps = {
    children: React.ReactNode;
    delayDuration?: number;
    tooltipContent: string;
    side: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
};

export default function WithTooltip({
    children,
    delayDuration = 400,
    tooltipContent,
    side,
    sideOffset,
}: WithTooltipProps) {
    return (
        <Tooltip delayDuration={delayDuration}>
            <TooltipTrigger asChild>
                <div>{children}</div>
            </TooltipTrigger>
            <TooltipContent side={side} sideOffset={sideOffset}>
                <p>{tooltipContent}</p>
            </TooltipContent>
        </Tooltip>
    );
}
