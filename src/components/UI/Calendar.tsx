"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Chevron, DayButton, getDefaultClassNames } from "react-day-picker";
import { DayPicker } from "react-day-picker/persian";

interface CalendarHijriProps {
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
    defaultMonth?: Date;
    className?: string;
}

export function CalendarHijri({ selected, onSelect, defaultMonth, className }: CalendarHijriProps) {
    return (
        <Calendar
            mode="single"
            defaultMonth={defaultMonth ?? selected ?? new Date()}
            selected={selected}
            onSelect={onSelect}
            className={cn("rounded-lg shadow-sm", className)}
        />
    );
}

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    formatters,
    components,
    ...props
}: React.ComponentProps<typeof DayPicker>) {
    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("bg-text text-desktop-primary p-3 [--cell-size:--spacing(10)]", className)}
            captionLayout={captionLayout}
            formatters={{
                formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
                ...formatters,
            }}
            classNames={{
                root: cn("w-fit", defaultClassNames.root),
                months: cn("flex gap-4 flex-col md:flex-row relative", defaultClassNames.months),
                month: cn("flex flex-col w-full gap-3", defaultClassNames.month),
                nav: cn("flex items-center w-full absolute top-0 inset-x-0 justify-between", defaultClassNames.nav),
                button_previous: cn(
                    "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
                    defaultClassNames.button_previous
                ),
                button_next: cn(
                    "size-(--cell-size) aria-disabled:opacity-50 select-none",
                    defaultClassNames.button_next
                ),
                month_caption: cn(
                    "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
                    defaultClassNames.month_caption
                ),
                dropdowns: cn(
                    "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
                    defaultClassNames.dropdowns
                ),
                dropdown_root: cn(
                    "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
                    defaultClassNames.dropdown_root
                ),
                dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
                caption_label: cn(
                    "select-none font-medium",
                    captionLayout === "label"
                        ? "text-sm"
                        : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-text-desktop-primary [&>svg]:size-3.5",
                    defaultClassNames.caption_label
                ),
                table: "w-full border-collapse",
                weekdays: cn("flex items-center justify-center", defaultClassNames.weekdays),
                weekday: cn(
                    "text-neo-aqua rounded-md flex-1 font-normal text-sm select-none",
                    defaultClassNames.weekday
                ),
                week: cn("flex w-full mt-2", defaultClassNames.week),
                week_number_header: cn("select-none w-(--cell-size)", defaultClassNames.week_number_header),
                week_number: cn("text-sm select-none text-desktop-primary", defaultClassNames.week_number),
                day: cn(
                    "relative w-full h-full text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
                    defaultClassNames.day
                ),
                range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
                range_middle: cn("rounded-none", defaultClassNames.range_middle),
                range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
                today: cn(
                    "bg-neo-aqua/10 text-accent-foreground rounded-md data-[selected=true]:rounded-none",
                    defaultClassNames.today
                ),
                outside: cn(
                    "text-text-desktop-primary aria-selected:text-text-desktop-primary",
                    defaultClassNames.outside
                ),
                disabled: cn("text-text-desktop-primary opacity-50", defaultClassNames.disabled),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Root: ({ className, rootRef, ...props }) => (
                    <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
                ),
                Chevron: ({ className, orientation, ...props }) => {
                    if (orientation === "left") {
                        return <Chevron className={cn("size-4 rotate-180", className)} {...props} />;
                    }
                    if (orientation === "right") {
                        return <Chevron className={cn("size-4 justify-self-end", className)} {...props} />;
                    }
                    return <Chevron className={cn("size-4 rotate-90", className)} {...props} />;
                },
                DayButton: CalendarDayButton,
                WeekNumber: ({ children, ...props }) => (
                    <td {...props}>
                        <div className="flex size-(--cell-size) items-center justify-center text-center">
                            {children}
                        </div>
                    </td>
                ),
                ...components,
            }}
            {...props}
        />
    );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
    const defaultClassNames = getDefaultClassNames();
    const ref = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    return (
        <button
            ref={ref}
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                "data-[selected-single=true]:bg-neo-aqua data-[selected-single=true]:text-text data-[range-middle=true]:bg-neo-aqua/20 data-[range-middle=true]:text-text data-[range-start=true]:bg-neo-aqua/20 data-[range-start=true]:text-text data-[range-end=true]:bg-neo-aqua/20 data-[range-end=true]:text-text flex aspect-square size-auto w-full min-w-(--cell-size) flex-col items-center justify-center gap-1 rounded leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:scale-90 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
                defaultClassNames.day,
                className
            )}
            {...props}
        />
    );
}
