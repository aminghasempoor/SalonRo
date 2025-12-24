import type { Metadata } from "next";
import "&/fonts.css";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { ClientAppProvider } from "@/providers/ClientAppProvider";
import UserInitializer from "@/utils/UserInitializer";
import Modal from "@/components/UI/Modal";
import ToastProvider from "@/utils/ToastProvider";
import { Sidebar } from "@/components/SideBar";
import { AppShell } from "@/providers/AppShell";

export const metadata: Metadata = {
    title: {
        template: "%s | سالن رو",
        default: "سالن رو",
    },
    description: "وب سایت سالن رو",
    authors: {
        name: "شرکت میرفران تک",
        url: "https://menulita.ir",
    },

    manifest: "/manifest.json",
    icons: {
        icon: "/logo/192px.png",
        apple: "/logo/512px.png",
    },
};
export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const messages = await getMessages({ locale });
    return (
        <html lang={locale} dir="rtl">
            <body>
                <NextTopLoader color="#16a795" />
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ClientAppProvider>
                        <AppShell>
                            <UserInitializer />
                            {children}
                            <Modal />
                            <ToastProvider />
                            <Sidebar />
                        </AppShell>
                    </ClientAppProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
