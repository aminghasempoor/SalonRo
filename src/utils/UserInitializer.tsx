"use client";
import { useEffect } from "react";
import useUserStore from "@/stores/userStore";

const UserInitializer = () => {
    const initialize = useUserStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return null;
};

export default UserInitializer;
