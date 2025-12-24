import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import nextPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

const withPWA = nextPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
    navigateFallback: "/offline.html",
});

const nextConfig: NextConfig = {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- no type for intl
export default withPWA(withNextIntl(nextConfig));
