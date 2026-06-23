import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import LocaleNotice from "@/components/i18n/LocaleNotice";
import SkipLink from "@/components/SkipLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { ChatProvider } from "@/components/chat/ChatProvider";
import ChatAssistant from "@/components/chat/ChatAssistant";

export const metadata: Metadata = {
  applicationName: "Project 3AM",
  title: "Project 3AM",
  description:
    "A calm first step for caregivers planning for the future care of a person with Autism Spectrum Disorder. Educational and signposting only, not legal advice.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Project 3AM",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#2b5160",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col">
        <LocaleProvider>
          <ChatProvider>
            <SkipLink />
            <LocaleNotice />
            <Header />
            <main
              id="main-content"
              tabIndex={-1}
              className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 focus:outline-none"
            >
              {children}
            </main>
            <Footer />
            <ChatAssistant />
            <ServiceWorkerRegister />
          </ChatProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
