import SubMenu from "./SubMenu";
import MenuItem from "./MenuItem";
import Separator from "@/components/UI/Separator";
import { motion, AnimatePresence } from "framer-motion";

type Menu = {
    title: string;
    href?: string;
    children?: Menu[];
};

interface MenuRendererProps {
    items: Menu[];
    level?: number;
}

export function SideBarComponent({ items, level = 0 }: MenuRendererProps) {
    return (
        <div className="z-50 mt-2 flex flex-col gap-1">
            {items.map((item, index) => (
                <motion.div
                    key={item.title + index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="mb-3"
                >
                    {item.children ? (
                        <>
                            <AnimatePresence initial={false}>
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <SubMenu label={item.title}>
                                        <SideBarComponent items={item.children} level={level + 1} />
                                    </SubMenu>
                                </motion.div>
                            </AnimatePresence>
                        </>
                    ) : (
                        <MenuItem href={item.href} label={item.title} />
                    )}
                    {level === 0 && <Separator className="mt-2" />}
                </motion.div>
            ))}
        </div>
    );
}
