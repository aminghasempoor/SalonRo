import { ReactNode } from "react";
import Link from "next/link";
import { useSidebarStore } from "@/stores/SidebarStore";

interface MenuItemProps {
    label: string;
    onClick?: () => void;
    icon?: ReactNode;
    href?: string;
}

export default function MenuItem({ label, onClick, icon, href }: MenuItemProps) {
    const close = useSidebarStore((state) => state.close);

    function handleClick() {
        onClick?.();
        close();
    }

    return (
        <Link
            href={href || "#"}
            prefetch={href !== "/complaints"}
            onClick={handleClick}
            className="hover:bg-desktop-primary/25 flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm font-bold"
        >
            <span className="flex items-center gap-2">
                {icon}
                <p className="text-text line-clamp-1">{label}</p>
            </span>
        </Link>
    );
}
